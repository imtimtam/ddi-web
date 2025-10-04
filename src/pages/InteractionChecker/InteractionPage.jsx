import { useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Nav } from "../../components/Nav.jsx";
import { InteractionForm } from "./InteractionForm.jsx";
import { Results } from "./Results.jsx";
import "./InteractionPage.css";

export function InteractionPage() {
  const [results, setResults] = useState(null);

  return (
    <>
      <title>Drug Interaction Checker</title>
      <Header />
      <Nav />
      <section class="library__main">
        <h2 class="library__main-title">Drug Interaction Checker</h2>
        <span class="library__main-subtitle">
          Check for potential interactions between any drugs.
        </span>
        <div class="library__main-content">
          <InteractionForm setResults={setResults} />
          <Results results={results} />
        </div>
      </section>
    </>
  );
}
