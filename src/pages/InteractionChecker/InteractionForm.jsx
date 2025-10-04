import { useState, useEffect } from "react";
import { fetchDrugs, fetchInteraction } from "../../utils/api.js";
import searchIcon from "../../assets/search_icon.png";
import "./InteractionForm.css";

export function InteractionForm({ setResults }) {
  const API_URL = "http://127.0.0.1:8000";
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [drugList, setDrugList] = useState([]);
  const [suggestion1, setSuggestion1] = useState([]);
  const [suggestion2, setSuggestion2] = useState([]);

  useEffect(() => {
    async function getDrugs() {
      const drugs = await fetchDrugs();
      setDrugList(drugs);
    }
    getDrugs();
  }, []);

  function handleInput(e, setDrug, setSuggestions) {
    const input = e.target.value.trim().toLowerCase();
    setDrug(input);

    if (!input) {
      setSuggestions([]);
      return;
    }

    const matches = drugList.filter((d) => d.startsWith(input)).slice(0, 10);
    setSuggestions(matches);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!drug1 || !drug2) {
      setResults({error: "⚠ ERROR: ENTER BOTH DRUGS"});
      return;
    }

    try {
      const interactions = await fetchInteraction(drug1, drug2);
      setResults(interactions);
    } catch (error) {
      console.error(error);
      setResults({error: "⚠ ERROR: FAIL TO FETCH INTERACTIONS"});
    }
  }

  function createSuggestions(suggestions, setSuggestions, setDrug) {
    if (!suggestions.length) return null;

    return (
      <div className="library__search-suggestions">
        {suggestions.map((suggestion) => (
          <div
            className="library__search-suggestion-item"
            key={suggestion}
            onClick={() => {
              setDrug(suggestion);
              setSuggestions([]);
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <form className="library__search" onSubmit={handleSubmit}>
        <div className="library__search-box">
          <div className="library__search-div">
            <div className="library__search-container">
              <input
                className="library__search-bar"
                type="text"
                id="drug1Input"
                placeholder="Enter a drug"
                autoComplete="off"
                value={drug1}
                onChange={(e) => handleInput(e, setDrug1, setSuggestion1)}
                onBlur={() => {setTimeout(() => setSuggestion1([]), 100)}}
              />
              <img className="library__search-icon" src={searchIcon} />
            </div>
            {createSuggestions(suggestion1, setSuggestion1, setDrug1)}
          </div>
        </div>
        <div className="library__search-box">
          <div className="library__search-div">
            <div className="library__search-container">
              <input
                className="library__search-bar"
                type="text"
                id="drug2Input"
                placeholder="Enter a drug"
                autoComplete="off"
                value={drug2}
                onChange={(e) => handleInput(e, setDrug2, setSuggestion2)}
                onBlur={() => {setTimeout(() => setSuggestion2([]), 100)}}
              />
              <img className="library__search-icon" src={searchIcon} />
            </div>
            {createSuggestions(suggestion2, setSuggestion2, setDrug2)}
          </div>
        </div>
        <button type="submit" className="library__search-button">
          Check
        </button>
      </form>
      <p className="library__main-disclaimer">
        <b>DISCLAIMER</b>: While this is a project that uses real drug data from{" "}
        <b>
          <a href="https://www.guidetopharmacology.org/">
            IUPHAR Guide to Pharmacology
          </a>
        </b>{" "}
        and{" "}
        <b>
          <a href="https://nsides.io/">nSIDES' TWOSIDES</a>
        </b>{" "}
        database, this should NOT be used as a sole or legitimate source over
        any qualified and licensed practitioner or health care provider.
      </p>
    </>
  );
}
