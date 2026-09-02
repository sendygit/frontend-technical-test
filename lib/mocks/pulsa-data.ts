import { Operator, PulsaDataPackage } from "../types/pulsa-data";

export const MOCK_OPERATORS: Operator[] = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    phonePrefixes: ["0811", "0812", "0813", "0821", "0822", "0823", "0852", "0853", "0851"],
    logo: "/wallet/icons/icon-phone.svg",
  },
  {
    id: "indosat",
    name: "Indosat Ooredoo",
    phonePrefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
    logo: "/wallet/icons/icon-phone.svg",
  },
  {
    id: "xl",
    name: "XL Axiata",
    phonePrefixes: ["0817", "0818", "0819", "0859", "0877", "0878"],
    logo: "/wallet/icons/icon-phone.svg",
  },
  {
    id: "tri",
    name: "Tri (3)",
    phonePrefixes: ["0895", "0896", "0897", "0898", "0899"],
    logo: "/wallet/icons/icon-phone.svg",
  },
  {
    id: "smartfren",
    name: "Smartfren",
    phonePrefixes: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"],
    logo: "/wallet/icons/icon-phone.svg",
  },
];

export const MOCK_PULSA_PACKAGES: PulsaDataPackage[] = [
  { id: "p_10k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 10.000", price: 11000 },
  { id: "p_25k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 25.000", price: 26000 },
  { id: "p_50k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 50.000", price: 51000 },
  { id: "p_100k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 100.000", price: 101000 },
];

export const MOCK_DATA_PACKAGES: PulsaDataPackage[] = [
  { id: "d_5gb", operatorId: "telkomsel", type: "data", name: "Internet Max 5 GB", price: 25000, quota: "5 GB", validity: "30 Hari" },
  { id: "d_10gb", operatorId: "telkomsel", type: "data", name: "Internet Max 10 GB", price: 45000, quota: "10 GB", validity: "30 Hari" },
  { id: "d_25gb", operatorId: "telkomsel", type: "data", name: "Internet Max 25 GB", price: 85000, quota: "25 GB", validity: "30 Hari" },
];

export function findOperatorByPhoneNumber(phone: string): Operator | undefined {
  if (!phone) return undefined;
  const clean = phone.replace(/[^0-9]/g, "").replace(/^62/, "0");
  if (clean.length < 4) return undefined;
  const prefix = clean.substring(0, 4);
  return MOCK_OPERATORS.find((op) => op.phonePrefixes.includes(prefix));
}
