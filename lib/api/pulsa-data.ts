import { Operator, PulsaProduct, PulsaDataType } from "../types/pulsa-data";
import {
  MOCK_OPERATORS,
  MOCK_PULSA_PRODUCTS,
  MOCK_DATA_PRODUCTS,
} from "../mocks/pulsa-data";

export async function getOperators(delayMs: number = 300): Promise<Operator[]> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return [...MOCK_OPERATORS];
}

export interface GetProductsOptions {
  operatorId?: string;
  type?: PulsaDataType;
  delayMs?: number;
}

export async function getPulsaProducts(
  options: GetProductsOptions = {}
): Promise<PulsaProduct[]> {
  const { operatorId, type = "pulsa", delayMs = 350 } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const all = type === "pulsa" ? MOCK_PULSA_PRODUCTS : MOCK_DATA_PRODUCTS;
  if (!operatorId) return all;
  return all.filter((pkg) => pkg.operatorId === operatorId);
}

// Alias for backwards compatibility
export const getPulsaDataPackages = getPulsaProducts;
