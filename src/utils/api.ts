import axios from "axios";

export const API_URL = "http://127.0.0.1:8000";

export async function fetchInteraction(drug1: string, drug2: string) {
  try {
    const url = `${API_URL}/full_interactions/`;
    const response = await axios.get(url, { params: { drug1, drug2 } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDrugs() {
  try {
    const url = `${API_URL}/drugs/`;
    const response = await axios.get(url);
    return response.data.drugs;
  } catch (error) {
    console.error(error);
  }
}
