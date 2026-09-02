import { Bank } from "../types/bank";

export const MOCK_BANKS_DATA: Bank[] = [
  {
    id: "bank_bca",
    name: "Bank Central Asia (BCA)",
    code: "BCA",
    accountNumber: "8801-2345-6789",
    accountName: "Sendy Pratama",
  },
  {
    id: "bank_mandiri",
    name: "Bank Mandiri",
    code: "MANDIRI",
    accountNumber: "137-00-1234567-8",
    accountName: "Sendy Pratama",
  },
  {
    id: "bank_bni",
    name: "Bank Negara Indonesia (BNI)",
    code: "BNI",
    accountNumber: "0123-456-789",
    accountName: "Sendy Pratama",
  },
  {
    id: "bank_bri",
    name: "Bank Rakyat Indonesia (BRI)",
    code: "BRI",
    accountNumber: "0012-01-234567-50-1",
    accountName: "Sendy Pratama",
  },
  {
    id: "bank_jago",
    name: "Bank Jago",
    code: "JAGO",
    accountNumber: "1098-7654-3210",
    accountName: "Sendy Pratama",
  },
  {
    id: "bank_cimb",
    name: "CIMB Niaga",
    code: "CIMB",
    accountNumber: "7012-3456-7800",
    accountName: "Sendy Pratama",
  },
  {
    id: "bank_permata",
    name: "Permata Bank",
    code: "PERMATA",
    accountNumber: "9876-5432-10",
    accountName: "Sendy Pratama",
  },
];

export function findBankByIdOrCode(query: string): Bank | undefined {
  if (!query) return undefined;
  const clean = query.toLowerCase().trim();
  return MOCK_BANKS_DATA.find(
    (b) => b.id.toLowerCase() === clean || b.code.toLowerCase() === clean || b.name.toLowerCase().includes(clean)
  );
}
