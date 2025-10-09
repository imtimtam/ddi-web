import { ResultsResponse } from "../../components/ResultsResponse";
import type { ResultsType } from "../../types/Results";
import "./Results.css";

interface ResultsProp {
  results: ResultsType | null;
}

export function Results({ results }: ResultsProp) {
  if (!results) return null;
  if ("error" in results)
    return (
      <div className="library__results">
        <div className="library__results-headline red">{results.error}</div>
      </div>
    );
  const interaction = results.interaction;
  const count = results.conditions_and_prr
    ? Object.keys(results.conditions_and_prr).length
    : 0;

  return (
    <div className="library__results">
      <div
        className={`library__results-headline ${interaction ? "red" : "green"}`}
      >
        {interaction
          ? `⚠ CAUTION: ${count} INTERACTIONS FOUND`
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
            <b>proportional reporting ratio (PRR) over 2.0</b>, indicating the
            event was reported about <b>atleast twice</b> as often for these
            drugs compared to others in the database; this signals a{" "}
            <b>potential risk, not confirmed causation</b>.
          </div>
          <div className="library__results-description-value" id="conditions">
            {results.conditions_and_prr ? (
              Object.entries(results.conditions_and_prr).map(
                ([condition, prr]) => (
                  <ResultsResponse
                    key={condition}
                    result={condition}
                    note={prr}
                  />
                )
              )
            ) : (
              <ResultsResponse result={"No significant reports"} />
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
            {results.targets ? (
              results.targets.map((target) => (
                <ResultsResponse key={target} result={target} />
              ))
            ) : (
              <ResultsResponse result={"Not recorded"} />
            )}
          </div>
        </dd>
      </dl>
    </div>
  );
}
