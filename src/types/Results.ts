export interface APIResults {
    interaction: boolean;
    targets: string[];
    conditions_and_prr: Record<string, number>;
}

export interface ErrorResults {
    error: string;
}

export type ResultsType = APIResults | ErrorResults;