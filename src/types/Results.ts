export enum Errors {
  FETCH_INTERACTIONS = "⚠ ERROR: FAIL TO FETCH INTERACTIONS",
  FETCH_DRUGS = "⚠ ERROR: FAIL TO FETCH DRUGS",
  INVALID_DRUGS = "⚠ ERROR: ENTER TWO VALID DRUGS",
  MISSING_DRUGS = "⚠ ERROR: ENTER BOTH DRUGS",
}

export interface APIResults {
  interaction: boolean;
  targets: string[];
  conditions_and_prr: Record<string, number>;
}

export interface ErrorResults {
  error: Errors;
}

export type ResultsType = APIResults | ErrorResults;
