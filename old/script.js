const API_URL = "http://127.0.0.1:8000";
const libraryForm = document.querySelector(".library__search");
const results = document.querySelector(".library__results");
const headline = document.querySelector(".library__results-headline");
const subheader = document.querySelector(".library__results-subheader");
const drug1Value = document.getElementById("drug1Display");
const drug2Value = document.getElementById("drug2Display");
const target = document.getElementById("target");
const conditions = document.getElementById("conditions");
let drugList = [];

async function fetchInteraction(drug1, drug2) {
    try{
        let url = `${API_URL}/full_interactions/?drug1=${encodeURIComponent(drug1)}&drug2=${encodeURIComponent(drug2)}`
        const response = await fetch(url);
        if(!response.ok) throw new Error("Invalid network response");

        const interactions = await response.json();
        return interactions;
    }
    catch(error){
        console.error(error);
    }
}

async function fetchDrugs() {
    try{
        let url = `${API_URL}/drugs/`;
        const response = await fetch(url);
        if(!response.ok) throw new Error("Invalid network response");

        const data = await response.json();
        drugList = data.drugs;
    }
    catch(error){
        console.error(error);
    }
}

libraryForm.addEventListener("submit", async e => {
    e.preventDefault();
    const drug1 = document.getElementById("drug1Input").value.trim();
    const drug2 = document.getElementById("drug2Input").value.trim();

    if(!drug1 || !drug2){
        results.classList.remove("hidden");
        headline.textContent = "⚠ ERROR: ENTER BOTH DRUGS";
        headline.classList.add("red");
        return;
    }

    try{
        const data = await fetchInteraction(drug1, drug2);
        results.classList.remove("hidden");
        if(data.interaction != true){
            headline.textContent = "✔ SAFE: NO INTERACTIONS FOUND";
            headline.classList.add("green");
            subheader.textContent = `No significant reports found between ${drug1} and ${drug2}.`

            // drug1Display.textContent = drug1;
            // drug2Display.textContent = drug2;
            target.textContent = "Not recorded";
            conditions.textContent = "No significant reports";
            return;
        }
        else{
            const count = Object.keys(data.conditions_and_prr).length;
            headline.textContent = `⚠ CAUTION: INTERACTIONS FOUND`;
            headline.classList.add("red");
            subheader.textContent = `${count} potential adverse events found between ${drug1} and ${drug2}.`

            // drug1Display.textContent = drug1;
            // drug2Display.textContent = drug2;
            target.innerHTML = data.targets ? data.targets.join(", ") : "Not recorded";
            conditions.innerHTML = data.conditions_and_prr
                                   ? Object.entries(data.conditions_and_prr)
                                    .map(([cond, prr]) => `${cond} : ${prr.toFixed(2)}`)
                                    .join("<br>")
                                   : "No significant reports"; 
        }
    }
    catch(error){
        console.error("Error fetching drug interactions: ", error);
    }
});

function setupAutoComplete(inputID, suggestionsID) {
    const input = document.getElementById(inputID);
    const suggestions = document.getElementById(suggestionsID);

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        suggestions.innerHTML = "";

        if(!query){
            suggestions.classList.add("hidden");
            return;
        }

        const matches = drugList.filter(d => d.startsWith(query)).slice(0, 10);
        matches.forEach(drug => {
            const suggestionsDiv = document.createElement("div");
            suggestionsDiv.textContent = drug;
            suggestionsDiv.addEventListener("click", () => {
                input.value = drug;
                suggestions.classList.add("hidden");
            })
            suggestions.appendChild(suggestionsDiv);
        })
        suggestions.classList.toggle("hidden", matches.length === 0);
    })

    input.addEventListener("blur", () => {
        setTimeout(() => suggestions.classList.add("hidden"), 100);
    })
}

fetchDrugs().then(() => {
    setupAutoComplete("drug1Input", "suggestions1");
    setupAutoComplete("drug2Input", "suggestions2");
});