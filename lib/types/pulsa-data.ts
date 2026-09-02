export type PulsaDataType = "pulsa" | "data";

export interface Operator {
  id: string;
  name: string;
  phonePrefixes: string[];
  logo: string;
}

export interface PulsaDataPackage {
  id: string;
  operatorId: string;
  type: PulsaDataType;
  name: string;
  price: number;
  description?: string;
  quota?: string;
  validity?: string;
}
