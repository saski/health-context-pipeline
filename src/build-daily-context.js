import { readFile, writeFile } from "node:fs/promises";

function titleCase(value) {
  return value.replace(/(^|_)([a-z])/g, (_, prefix, letter) => `${prefix ? " " : ""}${letter.toUpperCase()}`);
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} is required.`);
  }
  return value;
}

function formatMetric(name, metric) {
  if (metric.availability !== "observed") {
    return `${name}: unavailable`;
  }

  return `${name}: ${metric.value}${metric.unit ? ` ${metric.unit}` : ""}`;
}

function overallStatus(domains) {
  return Object.values(domains).every(
    ({ coverage, freshness, gaps }) =>
      coverage?.status === "complete" && freshness?.status === "current" && gaps?.length === 0,
  )
    ? "complete"
    : "partial";
}

export function buildDailyContextMarkdown(context) {
  if (!context || typeof context !== "object") {
    throw new Error("Input must be a JSON object.");
  }

  const generatedAt = requireString(context.generatedAt, "generatedAt");
  const coveredThrough = requireString(context.coveredThrough, "coveredThrough");
  const reportDate = requireString(context.window?.to, "window.to");
  const domains = context.domains;

  if (!domains || typeof domains !== "object" || Array.isArray(domains)) {
    throw new Error("domains must be an object.");
  }

  const lines = [
    `# Health context — ${reportDate}`,
    "",
    `- Synthetic data: ${context.synthetic === true ? "yes" : "no"}`,
    `- Generated at: ${generatedAt}`,
    `- Data covered through: ${coveredThrough}`,
    `- Overall status: ${overallStatus(domains)}`,
  ];

  for (const [name, domain] of Object.entries(domains)) {
    const coverage = domain.coverage ?? {};
    const freshness = domain.freshness ?? {};
    const provenance = domain.provenance ?? [];
    const gaps = domain.gaps ?? [];
    const observations = domain.observations ?? [];

    lines.push("", `## ${titleCase(name)}`);
    lines.push(`- Coverage: ${coverage.status ?? "unavailable"}`);
    lines.push(`- Freshness: ${freshness.status ?? "unavailable"}`);
    lines.push(`- Domain data covered through: ${freshness.collectedThrough ?? "unavailable"}`);
    lines.push("- Sources:");

    if (provenance.length === 0) {
      lines.push("  - unavailable");
    } else {
      for (const { source, recordType } of provenance) {
        lines.push(`  - ${source ?? "unknown"} (${recordType ?? "unknown"})`);
      }
    }

    lines.push("- Observations:");
    if (observations.length === 0) {
      lines.push("  - unavailable");
    } else {
      for (const observation of observations) {
        const metrics = Object.entries(observation.metrics ?? {})
          .map(([metricName, metric]) => formatMetric(metricName, metric))
          .join("; ");
        lines.push(`  - ${observation.occurredAt ?? "unknown time"}: ${metrics || "unavailable"}`);
      }
    }

    lines.push("- Known gaps:");
    if (gaps.length === 0) {
      lines.push("  - none reported");
    } else {
      for (const gap of gaps) {
        lines.push(`  - ${gap}`);
      }
    }
  }

  return `${lines.join("\n")}\n`;
}

function parseArguments(argumentsList) {
  const parsed = {};
  for (let index = 0; index < argumentsList.length; index += 2) {
    const flag = argumentsList[index];
    const value = argumentsList[index + 1];
    if ((flag !== "--input" && flag !== "--output") || !value) {
      throw new Error("Usage: build-daily-context --input <file.json> --output <file.md>");
    }
    parsed[flag.slice(2)] = value;
  }
  if (!parsed.input || !parsed.output) {
    throw new Error("Usage: build-daily-context --input <file.json> --output <file.md>");
  }
  return parsed;
}

async function main() {
  const { input, output } = parseArguments(process.argv.slice(2));
  const source = await readFile(input, "utf8");
  let context;
  try {
    context = JSON.parse(source);
  } catch {
    throw new Error("Input must be valid JSON.");
  }
  await writeFile(output, buildDailyContextMarkdown(context), "utf8");
}

if (import.meta.main) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
