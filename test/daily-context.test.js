import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("builds a Drive-ready daily artifact with freshness, provenance, and explicit gaps", async () => {
  const directory = await mkdtemp(join(tmpdir(), "health-context-"));
  const output = join(directory, "health-context.md");

  try {
    const result = spawnSync(
      process.execPath,
      [
        "src/build-daily-context.js",
        "--input",
        "fixtures/synthetic-daily-context.json",
        "--output",
        output,
      ],
      { encoding: "utf8" },
    );

    assert.equal(result.status, 0, result.stderr);

    const artifact = await readFile(output, "utf8");
    assert.match(artifact, /# Health context — 2099-04-07/);
    assert.match(artifact, /Synthetic data: yes/);
    assert.match(artifact, /Generated at: 2099-04-08T06:00:00Z/);
    assert.match(artifact, /Data covered through: 2099-04-07T22:00:00Z/);
    assert.match(artifact, /Overall status: partial/);
    assert.match(artifact, /## Nutrition/);
    assert.match(artifact, /synthetic_zepp \(nutrition\)/);
    assert.match(artifact, /carbohydrateGrams: unavailable/);
    assert.match(artifact, /## Body/);
    assert.match(artifact, /Coverage: unavailable/);
    assert.match(artifact, /No body observation is available in the requested window/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("refuses a non-JSON input", () => {
  const result = spawnSync(
    process.execPath,
    ["src/build-daily-context.js", "--input", "fixtures/drive-freshness-probe.txt", "--output", "/tmp/unused.md"],
    { encoding: "utf8" },
  );

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /valid JSON/);
});
