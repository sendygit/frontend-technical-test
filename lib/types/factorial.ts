export interface FactorialCalculation {
  input: number;
  result: number;
  steps?: string[];
  executionTimeMs?: number;
  timestamp: string;
}

export interface FactorialState {
  currentInput: string;
  result: number | null;
  history: FactorialCalculation[];
  error: string | null;
}
