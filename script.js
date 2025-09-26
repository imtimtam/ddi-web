const API_URL = "http://127.0.0.1:8000/full_interactions/";
async function fetchInteraction(drug1, drug2) {
    try{
        let url = `${API_URL}?drug1=${encodeURIComponent(drug1)}&drug2=${encodeURIComponent(drug2)}`
        const response = await fetch(url);
        if(!response.ok) throw new Error("Invalid network response");

        const interactions = await response.json();
        console.log(interactions);
        return interactions;
    }
    catch(error){
        console.error(error);
    }
}

const libraryForm = document.querySelector(".library__search");
const results = document.querySelector(".library__results");
const headline = document.querySelector(".library__results-headline");
const subheader = document.querySelector(".library__results-subheader");
const drug1Value = document.getElementById("drug1Display");
const drug2Value = document.getElementById("drug2Display");
const target = document.getElementById("target");
const conditions = document.getElementById("conditions");

console.log(drug1Value, drug2Value, target, conditions);

libraryForm.addEventListener("submit", async e => {
    e.preventDefault();
    const drug1 = document.getElementById("drug1Input").value.trim();
    const drug2 = document.getElementById("drug2Input").value.trim();

    if(!drug1 || !drug2){
        results.classList.remove("hidden");
        headline.textContent = "Enter both drugs.";
        return;
    }

    try{
        const data = await fetchInteraction(drug1, drug2);

        results.classList.remove("hidden");
        if(data.interaction != true){
            headline.textContent = "Safe: No Interaction(s) Found";
            subheader.textContent = `0 interactions found between ${drug1} and ${drug2}`

            drug1Display.textContent = drug1;
            drug2Display.textContent = drug2;
            target.textContent = "None";
            conditions.textContent = "None";
            return;
        }
        else{
            const count = Object.keys(data.conditions_and_prr).length;
            headline.textContent = `Caution: ${count} Interactions(s) Found`;
            subheader.textContent = `${count} interactions found between ${drug1} and ${drug2}`

            drug1Display.textContent = drug1;
            drug2Display.textContent = drug2;
            target.innerHTML = data.targets ? data.targets.join(", ") : "None";
            conditions.innerHTML = data.conditions_and_prr
                                   ? Object.entries(data.conditions_and_prr)
                                    .map(([cond, prr]) => `${cond}: ${prr}`)
                                    .join("<br>")
                                   : "None"; 
        }
    }
    catch(error){
        console.error("Error fetching drug interactions: ", error);
    }
});