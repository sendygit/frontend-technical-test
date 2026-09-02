import { Bank } from "../types/bank";
import { MOCK_BANKS_DATA } from "../mocks/bank";

export async function getBanks(delayMs: number = 300): Promise<Bank[]> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return [...MOCK_BANKS_DATA];
}
