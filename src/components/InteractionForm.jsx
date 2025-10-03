import { useState, useEffect } from "react";
import searchIcon from "../assets/search_icon.png";
import "./InteractionForm.css";

export function InteractionForm() {
  const API_URL = "http://127.0.0.1:8000";
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [drugList, setDrugList] = useState([]);
  const [suggestion1, setSuggestion1] = useState([]);
  const [suggestion2, setSuggestion2] = useState([]);

  useEffect(() => {
    async function fetchDrugs() {
      try {
        let url = `${API_URL}/drugs/`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Invalid network response");

        const data = await response.json();
        setDrugList(data.drugs);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchInteraction(drug1, drug2) {
      try {
        let url = `${API_URL}/full_interactions/?drug1=${encodeURIComponent(
          drug1
        )}&drug2=${encodeURIComponent(drug2)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Invalid network response");

        const interactions = await response.json();
        return interactions;
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  function handleSubmit() {
    e.preventDefault();
  }

  return (
    <form className="library__search" onSubmit={handleSubmit}>
      <div className="library__search-box">
        <div className="library__search-div">
          <div className="library__search-container">
            <input
              className="library__search-bar"
              type="text"
              id="drug1Input"
              placeholder="Enter a drug"
              autocomplete="off"
              onChange={(e) => setDrug1(e.target.value)}
            />
            <img className="library__search-icon" src={searchIcon} />
          </div>
          <div
            className="library__search-suggestions hidden"
            id="suggestions1"
          ></div>
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
              autocomplete="off"
              onChange={(e) => setDrug2(e.target.value)}
            />
            <img className="library__search-icon" src={searchIcon} />
          </div>
          <div
            className="library__search-suggestions hidden"
            id="suggestions2"
          ></div>
        </div>
      </div>
      <button type="submit" className="library__search-button">
        Check
      </button>
    </form>
  );
}
