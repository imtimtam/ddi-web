import { useState } from "react";
import { InteractionForm } from "./InteractionForm";
import { Results } from "./Results";
import { ResultsType } from "../../types/Results";
import "./InteractionPage.css";

export function InteractionPage() {
  const [results, setResults] = useState<ResultsType | null>(null);

  return (
    <>
      <title>Drug Interaction Checker</title>
      <main className="library__main">
        <h2 className="library__main-title">Drug Interaction Checker</h2>
        <span className="library__main-subtitle">
          Check for potential interactions between any drugs.
        </span>
        <div className="library__main-content">
          <InteractionForm setResults={setResults} />
          <Results results={results} />
        </div>
      </main>
    </>
  );
}
