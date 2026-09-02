import { Operator, PulsaDataPackage, PulsaDataType } from "../types/pulsa-data";
import { MOCK_OPERATORS, MOCK_PULSA_PACKAGES, MOCK_DATA_PACKAGES } from "../mocks/pulsa-data";

export async function getOperators(delayMs: number = 300): Promise<Operator[]> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return [...MOCK_OPERATORS];
}

export interface GetPackagesOptions {
  operatorId?: string;
  type?: PulsaDataType;
  delayMs?: number;
}

export async function getPulsaDataPackages(
  options: GetPackagesOptions = {}
): Promise<PulsaDataPackage[]> {
  const { operatorId, type = "pulsa", delayMs = 400 } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const all = type === "pulsa" ? MOCK_PULSA_PACKAGES : MOCK_DATA_PACKAGES;
  if (!operatorId) return all;
  return all.filter((pkg) => pkg.operatorId === operatorId);
}
