import assert from "node:assert/strict";
import test from "node:test";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { createHealthServer } from "../src/create-health-server.js";

async function withClient(run) {
  const server = createHealthServer();
  const client = new Client({ name: "health-context-test", version: "0.1.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  try {
    await run(client);
  } finally {
    await client.close();
    await server.close();
  }
}

test("exposes one read-only tool that returns only requested synthetic domains", async () => {
  await withClient(async (client) => {
    const { tools } = await client.listTools();

    assert.deepEqual(
      tools.map(({ name, annotations }) => ({ name, annotations })),
      [
        {
          name: "get_health_context",
          annotations: {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: false,
          },
        },
      ],
    );

    const result = await client.callTool({
      name: "get_health_context",
      arguments: {
        from: "2099-04-01",
        to: "2099-04-07",
        domains: ["sleep"],
      },
    });

    assert.equal(result.structuredContent.synthetic, true);
    assert.deepEqual(result.structuredContent.window, {
      from: "2099-04-01",
      to: "2099-04-07",
    });
    assert.deepEqual(Object.keys(result.structuredContent.domains), ["sleep"]);
    assert.deepEqual(Object.keys(result.structuredContent.domains.sleep).sort(), [
      "coverage",
      "freshness",
      "gaps",
      "observations",
      "provenance",
    ]);
  });
});

test("keeps distinct nutrition items that share a timestamp and never turns missing into zero", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "get_health_context",
      arguments: {
        from: "2099-04-01",
        to: "2099-04-01",
        domains: ["nutrition"],
      },
    });

    const [first, second] = result.structuredContent.domains.nutrition.observations;

    assert.equal(first.occurredAt, second.occurredAt);
    assert.notEqual(first.id, second.id);
    assert.deepEqual(second.metrics.carbohydrateGrams, {
      availability: "unavailable",
    });
    assert.equal("value" in second.metrics.carbohydrateGrams, false);
  });
});

test("fixture makes mixed sources, stale data, and a missing domain explicit", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "get_health_context",
      arguments: {
        from: "2099-04-01",
        to: "2099-04-07",
        domains: ["activity", "sleep", "indicators", "body", "nutrition"],
      },
    });

    const { domains } = result.structuredContent;

    assert.equal(domains.activity.provenance.length, 2);
    assert.equal(domains.indicators.freshness.status, "stale");
    assert.equal(domains.body.coverage.status, "unavailable");
    assert.deepEqual(domains.body.observations, []);
    assert.ok(domains.body.gaps.length > 0);
  });
});

test("stdio entrypoint can be discovered and called by an MCP client", async () => {
  const client = new Client({ name: "stdio-smoke-test", version: "0.1.0" });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ["src/mcp-server.js"],
    cwd: process.cwd(),
    stderr: "pipe",
  });

  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map(({ name }) => name), ["get_health_context"]);

    const result = await client.callTool({
      name: "get_health_context",
      arguments: {
        from: "2099-04-01",
        to: "2099-04-01",
        domains: ["sleep"],
      },
    });
    assert.equal(result.structuredContent.synthetic, true);
  } finally {
    await client.close();
  }
});

test("rejects a reversed date window before reading a fixture", async () => {
  await withClient(async (client) => {
    const result = await client.callTool({
      name: "get_health_context",
      arguments: {
        from: "2099-04-07",
        to: "2099-04-01",
        domains: ["sleep"],
      },
    });

    assert.equal(result.isError, true);
    assert.match(result.content[0].text, /Input validation error/);
  });
});
