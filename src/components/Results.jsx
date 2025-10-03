import "./Results.css"

export function Results({conditions, targets}) {
  return (
    <div className="library__results hidden">
      <div className="library__results-headline">Caution: Interaction(s) Found</div>
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
          <div className="library__results-description-value" id="conditions">{conditions}</div>
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
          <div className="library__results-description-value" id="target">{targets}</div>
        </dd>
      </dl>
    </div>
  );
}
