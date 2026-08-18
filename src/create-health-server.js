import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";

import { getSyntheticHealthContext } from "./synthetic-health-context.js";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DOMAINS = ["activity", "sleep", "indicators", "body", "nutrition"];

const healthContextInputSchema = z
  .object({
    from: z.string().regex(ISO_DATE).describe("Inclusive start date in YYYY-MM-DD format."),
    to: z.string().regex(ISO_DATE).describe("Inclusive end date in YYYY-MM-DD format."),
    domains: z
      .array(z.enum(DOMAINS))
      .min(1)
      .describe("Health domains needed for the current question."),
  })
  .refine(({ from, to }) => from <= to, {
    message: "The start date must not be after the end date.",
    path: ["to"],
  });

const metricSchema = z.object({
  availability: z.enum(["observed", "unavailable"]),
  value: z.number().optional(),
  unit: z.string().optional(),
});

const domainSchema = z.object({
  provenance: z.array(
    z.object({
      source: z.string(),
      recordType: z.string(),
    }),
  ),
  freshness: z.object({
    status: z.enum(["current", "stale"]),
    collectedThrough: z.string(),
    generatedAt: z.string(),
  }),
  coverage: z.object({
    from: z.string(),
    to: z.string(),
    status: z.enum(["complete", "partial", "unavailable"]),
  }),
  gaps: z.array(z.string()),
  observations: z.array(
    z.object({
      id: z.string(),
      occurredAt: z.string(),
      source: z.string().optional(),
      metrics: z.record(z.string(), metricSchema),
    }),
  ),
});

export function createHealthServer() {
  const server = new McpServer(
    { name: "synthetic-health-context", version: "0.1.0" },
    {
      instructions:
        "This validation server contains synthetic data only. Never describe its observations as the user's real health data.",
    },
  );

  server.registerTool(
    "get_health_context",
    {
      title: "Get synthetic health context",
      description:
        "Retrieve synthetic health context for a requested date window and selected domains. Use only to validate health conversations; the result is never real user data.",
      inputSchema: healthContextInputSchema,
      outputSchema: {
        schemaVersion: z.literal("1.0.0"),
        synthetic: z.literal(true),
        window: z.object({ from: z.string(), to: z.string() }),
        domains: z.record(z.string(), domainSchema),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (request) => {
      const structuredContent = getSyntheticHealthContext(request);

      return {
        structuredContent,
        content: [
          {
            type: "text",
            text: `Returned synthetic context for ${request.domains.join(", ")} from ${request.from} through ${request.to}.`,
          },
        ],
      };
    },
  );

  return server;
}
