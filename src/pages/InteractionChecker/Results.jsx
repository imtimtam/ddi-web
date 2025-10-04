import "./Results.css";

export function Results({ results, error }) {
  if (error) {
    return <div className="library__results red">{error}</div>;
  }

  if (!results) return null;
  const interaction = results.interaction;

  return (
    <div className="library__results">
      <div
        className={`library__results-headline ${interaction ? "red" : "green"}`}
      >
        {interaction
          ? "⚠ CAUTION: INTERACTIONS FOUND"
          : "✔ SAFE: NO INTERACTIONS FOUND"}
      </div>
      <div className="library__results-subheader"></div>
      <dl className="library__results-description">
        <dt className="library__results-description-term underline">
          REPORTED EVENTS
        </dt>
        <dd className="library__results-description-box">
          <div className="library__results-description-context">
            Events listed here had a{" "}
            <b>proportional reporting ratio (PRR) over 2.0</b>, indicating a
            higher-than-expected reporting rate; this signals a{" "}
            <b>potential risk, not confirmed causation</b>.
          </div>
          <div className="library__results-description-value" id="conditions">
            {results.conditions_and_prr ? (
              Object.entries(results.conditions_and_prr).map(
                ([condition, prr]) => (
                  <div key={condition}>
                    {condition} : {prr.toFixed(2)}
                  </div>
                )
              )
            ) : (
              <div>No significant reports</div>
            )}
          </div>
        </dd>
        <dt className="library__results-description-term underline">
          SHARED TARGETS
        </dt>
        <dd className="library__results-description-box">
          <div className="library__results-description-context">
            This lists <b>biological targets</b> affected by both drugs. Shared
            targets may help explain why certain adverse events are reported
            when the drugs are <b>taken together</b>.
          </div>
          <div className="library__results-description-value" id="target">
            {results.targets ? results.targets.join(", ") : "Not recorded"}
          </div>
        </dd>
      </dl>
    </div>
  );
}
