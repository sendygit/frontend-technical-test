import { Operator, PulsaProduct } from "../types/pulsa-data";

export const MOCK_OPERATORS: Operator[] = [
  {
    id: "indosat",
    name: "Indosat Ooredoo",
    phonePrefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"],
    logo: "/wallet/logos/logo-indosat.svg",
  },
  {
    id: "telkomsel",
    name: "Telkomsel",
    phonePrefixes: ["0811", "0812", "0813", "0821", "0822", "0823", "0852", "0853", "0851"],
    logo: "/wallet/logos/logo-telkomsel.svg",
  },
  {
    id: "xl",
    name: "XL Axiata",
    phonePrefixes: ["0817", "0818", "0819", "0859", "0877", "0878"],
    logo: "/wallet/logos/logo-xl.svg",
  },
  {
    id: "tri",
    name: "Tri (3)",
    phonePrefixes: ["0895", "0896", "0897", "0898", "0899"],
    logo: "/wallet/logos/logo-tri.svg",

  },
  {
    id: "smartfren",
    name: "Smartfren",
    phonePrefixes: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"],
    logo: "/wallet/logos/logo-smartfren.svg",
  },
];

export const MOCK_PULSA_PRODUCTS: PulsaProduct[] = [
  // Indosat Pulsa
  { id: "indosat_p_10k", operatorId: "indosat", type: "pulsa", name: "Pulsa 10.000", nominal: 10000, price: 11000 },
  { id: "indosat_p_15k", operatorId: "indosat", type: "pulsa", name: "Pulsa 15.000", nominal: 15000, price: 16000 },
  { id: "indosat_p_20k", operatorId: "indosat", type: "pulsa", name: "Pulsa 20.000", nominal: 20000, price: 21000 },
  { id: "indosat_p_25k", operatorId: "indosat", type: "pulsa", name: "Pulsa 25.000", nominal: 25000, price: 26000 },
  { id: "indosat_p_30k", operatorId: "indosat", type: "pulsa", name: "Pulsa 30.000", nominal: 30000, price: 31000 },
  { id: "indosat_p_50k", operatorId: "indosat", type: "pulsa", name: "Pulsa 50.000", nominal: 50000, price: 51000 },
  { id: "indosat_p_100k", operatorId: "indosat", type: "pulsa", name: "Pulsa 100.000", nominal: 100000, price: 101000 },
  { id: "indosat_p_150k", operatorId: "indosat", type: "pulsa", name: "Pulsa 150.000", nominal: 150000, price: 151000 },
  { id: "indosat_p_200k", operatorId: "indosat", type: "pulsa", name: "Pulsa 200.000", nominal: 200000, price: 201000 },

  // Telkomsel Pulsa
  { id: "telk_p_10k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 10.000", nominal: 10000, price: 11000 },
  { id: "telk_p_25k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 25.000", nominal: 25000, price: 26000 },
  { id: "telk_p_50k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 50.000", nominal: 50000, price: 51000 },
  { id: "telk_p_100k", operatorId: "telkomsel", type: "pulsa", name: "Pulsa 100.000", nominal: 100000, price: 101000 },

  // XL Pulsa
  { id: "xl_p_10k", operatorId: "xl", type: "pulsa", name: "Pulsa 10.000", nominal: 10000, price: 11000 },
  { id: "xl_p_25k", operatorId: "xl", type: "pulsa", name: "Pulsa 25.000", nominal: 25000, price: 26000 },
  { id: "xl_p_50k", operatorId: "xl", type: "pulsa", name: "Pulsa 50.000", nominal: 50000, price: 51000 },
  { id: "xl_p_100k", operatorId: "xl", type: "pulsa", name: "Pulsa 100.000", nominal: 100000, price: 101000 },
];

export const MOCK_DATA_PRODUCTS: PulsaProduct[] = [
  // Indosat Data
  { id: "indosat_d_3gb", operatorId: "indosat", type: "data", name: "Freedom Internet 3 GB", nominal: 3000, price: 15000, quota: "3 GB", validity: "30 Hari" },
  { id: "indosat_d_5gb", operatorId: "indosat", type: "data", name: "Freedom Internet 5 GB", nominal: 5000, price: 25000, quota: "5 GB", validity: "30 Hari" },
  { id: "indosat_d_10gb", operatorId: "indosat", type: "data", name: "Freedom Internet 10 GB", nominal: 10000, price: 40000, quota: "10 GB", validity: "30 Hari" },
  { id: "indosat_d_18gb", operatorId: "indosat", type: "data", name: "Freedom Internet 18 GB", nominal: 18000, price: 60000, quota: "18 GB", validity: "30 Hari" },
  { id: "indosat_d_32gb", operatorId: "indosat", type: "data", name: "Freedom Internet 32 GB", nominal: 32000, price: 90000, quota: "32 GB", validity: "30 Hari" },
  { id: "indosat_d_50gb", operatorId: "indosat", type: "data", name: "Freedom Internet 50 GB", nominal: 50000, price: 125000, quota: "50 GB", validity: "30 Hari" },

  // Telkomsel Data
  { id: "telk_d_5gb", operatorId: "telkomsel", type: "data", name: "Internet Max 5 GB", nominal: 5000, price: 25000, quota: "5 GB", validity: "30 Hari" },
  { id: "telk_d_10gb", operatorId: "telkomsel", type: "data", name: "Internet Max 10 GB", nominal: 10000, price: 45000, quota: "10 GB", validity: "30 Hari" },
  { id: "telk_d_25gb", operatorId: "telkomsel", type: "data", name: "Internet Max 25 GB", nominal: 25000, price: 85000, quota: "25 GB", validity: "30 Hari" },
];

export function findOperatorByPhoneNumber(phone: string): Operator | undefined {
  if (!phone) return undefined;
  const clean = phone.replace(/[^0-9]/g, "").replace(/^62/, "0");
  if (clean.length < 4) return undefined;
  const prefix = clean.substring(0, 4);
  return MOCK_OPERATORS.find((op) => op.phonePrefixes.includes(prefix));
}
