## Information hierarchy

Each domain card keeps one header with icon, domain name and domain status.
The body is derived directly from `DomainAvailability.metrics`:

1. Available metrics are rendered as compact green-tinted chips containing the
   metric label and observed value. A specific time or interval is appended
   when coverage is not simply a daily total.
2. Unavailable metrics are named in one compact neutral line.
3. Permission-blocked metrics are named separately in red because they require
   action.
4. Legacy domain data without metric-level observations keeps a factual
   fallback instead of disappearing.

Generic counts, source package names and repeated domain-level reasons are not
shown when metric detail is present. Provenance remains in the exported daily
Markdown and will later support source-app navigation.

## Color semantics

- Green: a value was observed; it does not mean medically good.
- Amber: the domain mixes observed metrics and gaps.
- Gray: no record exists for the selected day; absence is neutral.
- Red: permission or another user action is required.
- Blue: navigation and domain iconography, not health status.

Cards remain at full opacity so unavailable information stays readable.

## Compatibility

No model or repository API changes are required. The implementation reads
existing `MetricAvailability.observation`, `coveredThrough`, `status`, `label`
and `reason` values.
