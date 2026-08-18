const GENERATED_AT = "2099-04-08T06:00:00Z";

const DOMAIN_BUILDERS = {
  activity: ({ from, to }) => ({
    provenance: [
      { source: "synthetic_phone", recordType: "steps" },
      { source: "synthetic_wearable", recordType: "steps" },
    ],
    freshness: {
      status: "current",
      collectedThrough: `${to}T21:00:00Z`,
      generatedAt: GENERATED_AT,
    },
    coverage: { from, to, status: "partial" },
    gaps: ["Overlapping step observations require source-policy resolution."],
    observations: [
      {
        id: "sample-steps-phone-001",
        occurredAt: `${from}T18:00:00Z`,
        source: "synthetic_phone",
        metrics: {
          steps: { availability: "observed", value: 2400, unit: "count" },
        },
      },
      {
        id: "sample-steps-wearable-001",
        occurredAt: `${from}T18:00:00Z`,
        source: "synthetic_wearable",
        metrics: {
          steps: { availability: "observed", value: 3100, unit: "count" },
        },
      },
    ],
  }),
  sleep: ({ from, to }) => ({
    provenance: [
      {
        source: "synthetic_wearable",
        recordType: "sleep_session",
      },
    ],
    freshness: {
      status: "current",
      collectedThrough: `${to}T06:00:00Z`,
      generatedAt: GENERATED_AT,
    },
    coverage: {
      from,
      to,
      status: "complete",
    },
    gaps: [],
    observations: [
      {
        id: "sample-sleep-001",
        occurredAt: `${from}T22:45:00Z`,
        metrics: {
          durationMinutes: {
            availability: "observed",
            value: 451,
            unit: "min",
          },
        },
      },
    ],
  }),
  indicators: ({ from, to }) => ({
    provenance: [
      {
        source: "synthetic_wearable",
        recordType: "resting_heart_rate",
      },
    ],
    freshness: {
      status: "stale",
      collectedThrough: "2099-03-30T08:00:00Z",
      generatedAt: GENERATED_AT,
    },
    coverage: { from, to, status: "partial" },
    gaps: ["No indicator observation is available after 2099-03-30."],
    observations: [
      {
        id: "sample-resting-heart-rate-001",
        occurredAt: "2099-03-30T08:00:00Z",
        metrics: {
          beatsPerMinute: {
            availability: "observed",
            value: 61,
            unit: "bpm",
          },
        },
      },
    ],
  }),
  body: ({ from, to }) => ({
    provenance: [
      {
        source: "synthetic_zepp",
        recordType: "body_measurement",
      },
    ],
    freshness: {
      status: "stale",
      collectedThrough: "2099-03-28T07:00:00Z",
      generatedAt: GENERATED_AT,
    },
    coverage: { from, to, status: "unavailable" },
    gaps: ["No body observation is available in the requested window."],
    observations: [],
  }),
  nutrition: ({ from, to }) => ({
    provenance: [
      {
        source: "synthetic_zepp",
        recordType: "nutrition",
      },
    ],
    freshness: {
      status: "current",
      collectedThrough: `${to}T20:00:00Z`,
      generatedAt: GENERATED_AT,
    },
    coverage: {
      from,
      to,
      status: "partial",
    },
    gaps: ["Carbohydrate observation unavailable for sample-nutrition-002."],
    observations: [
      {
        id: "sample-nutrition-001",
        occurredAt: `${from}T12:30:00Z`,
        metrics: {
          energyKilocalories: {
            availability: "observed",
            value: 420,
            unit: "kcal",
          },
          carbohydrateGrams: {
            availability: "observed",
            value: 52,
            unit: "g",
          },
        },
      },
      {
        id: "sample-nutrition-002",
        occurredAt: `${from}T12:30:00Z`,
        metrics: {
          energyKilocalories: {
            availability: "observed",
            value: 180,
            unit: "kcal",
          },
          carbohydrateGrams: {
            availability: "unavailable",
          },
        },
      },
    ],
  }),
};

export function getSyntheticHealthContext({ from, to, domains }) {
  return {
    schemaVersion: "1.0.0",
    synthetic: true,
    window: { from, to },
    domains: Object.fromEntries(
      domains.map((domain) => [domain, DOMAIN_BUILDERS[domain]({ from, to })]),
    ),
  };
}
