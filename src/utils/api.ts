import axios from "axios";
import { APIResults } from "../types/Results";

export const API_URL = "http://127.0.0.1:8000";

export async function fetchInteraction(drug1: string, drug2: string): Promise<APIResults | void> {
  try {
    const url = `${API_URL}/full_interactions/`;
    const response = await axios.get<APIResults>(url, { params: { drug1, drug2 } });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDrugs(): Promise<string[] | void>  {
  try {
    const url = `${API_URL}/drugs/`;
    const response = await axios.get<{drugs: string[]}>(url);
    return response.data.drugs;
  } catch (error) {
    console.error(error);
  }
}
