import {
  useState,
  useEffect,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  type FormEventHandler,
  type FormEvent,
} from "react";
import { fetchDrugs, fetchInteraction } from "../../utils/api.js";
import { type ResultsType, Errors } from "../../types/Results.js";
import searchIcon from "../../assets/search_icon.png";
import "./InteractionForm.css";

interface InteractionFormProps {
  setResults: Dispatch<SetStateAction<ResultsType | null>>;
}

export function InteractionForm({ setResults }: InteractionFormProps) {
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [drugList, setDrugList] = useState<string[]>([]);
  const [suggestion1, setSuggestion1] = useState<string[]>([]);
  const [suggestion2, setSuggestion2] = useState<string[]>([]);

  useEffect(() => {
    async function getDrugs() {
      const drugs = await fetchDrugs();
      setDrugList(drugs);
    }
    getDrugs();
  }, []);

  function handleInput(
    e: ChangeEvent<HTMLInputElement>,
    setDrug: Dispatch<SetStateAction<string>>,
    setSuggestions: Dispatch<SetStateAction<string[]>>
  ) {
    const input = e.target.value.trim().toLowerCase();
    setDrug(input);

    if (!input) {
      setSuggestions([]);
      return;
    }

    const matches = drugList.filter((d) => d.startsWith(input)).slice(0, 10);
    setSuggestions(matches);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!drug1 || !drug2) {
      setResults({ error: Errors.MISSING_DRUGS });
      return;
    }

    const validCheck1 = drugList.includes(drug1);
    const validCheck2 = drugList.includes(drug2);

    if (!validCheck1 || !validCheck2) {
      setResults({ error: Errors.INVALID_DRUGS });
      return;
    }

    try {
      const interactions = await fetchInteraction(drug1, drug2);
      setResults(interactions);
    } catch (error) {
      console.error(error);
      setResults({ error: Errors.FETCH_INTERACTIONS });
    }
  }
  function createSuggestions(
    suggestions: string[],
    setSuggestions: Dispatch<SetStateAction<string[]>>,
    setDrug: Dispatch<SetStateAction<string>>
  ) {
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
                onBlur={() => {
                  setTimeout(() => setSuggestion1([]), 100);
                }}
              />
              <img
                className="library__search-icon"
                src={searchIcon}
                alt="search icon"
              />
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
                onBlur={() => {
                  setTimeout(() => setSuggestion2([]), 100);
                }}
              />
              <img
                className="library__search-icon"
                src={searchIcon}
                alt="search icon"
              />
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
