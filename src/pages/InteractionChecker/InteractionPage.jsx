import { useState } from "react";
import { Header } from "../Header/Header.jsx";
import { Nav } from "../Nav/Nav.jsx";
import { InteractionForm } from "./InteractionForm.jsx";
import { Results } from "./Results.jsx";

export function InteractionPage() {
  const [results, setResults] = useState(null);
  const [headline, setHeadline] = useState("");

  return(
    <>
        <Header/>
        <Nav/>
        <InteractionForm setResults={setResults} setHeadline={setHeadline}/>
        <Results results={results} headline={headline}/>
    </>
  );
}
