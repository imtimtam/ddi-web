import "./ResultsResponse.css";

export const ResultsResponse = ({ result="Not recorded", note="" }) => {
  return (
    <div className="library__results-condition-row">
      <span className="library__results-condition-name">{result}</span>
      <span className="library__results-condition-note">{(typeof note === "number") ? note.toFixed(2) : note}</span>
    </div>
  );
};
