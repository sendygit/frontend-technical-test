import { Bank } from "../types/bank";
import { MOCK_BANKS_DATA } from "../mocks/bank";

interface GetBanksOptions {
  shouldFail?: boolean;
  delayMs?: number;
}

export async function getBanks(options: GetBanksOptions = {}): Promise<Bank[]> {
  const { shouldFail = false, delayMs = 400 } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (shouldFail) {
    throw new Error("Unable to load banks. Please try again.");
  }

  return [...MOCK_BANKS_DATA];
}
