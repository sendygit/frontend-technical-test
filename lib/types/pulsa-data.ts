export type PulsaDataType = "pulsa" | "data";

export interface Operator {
  id: string;
  name: string;
  phonePrefixes: string[];
  logo: string;
}

export interface PulsaProduct {
  id: string;
  operatorId: string;
  type: PulsaDataType;
  name: string;
  nominal: number;
  price: number;
  description?: string;
  quota?: string;
  validity?: string;
}

// Alias for backwards compatibility
export type PulsaDataPackage = PulsaProduct;
