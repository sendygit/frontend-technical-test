import { Bank } from "../types/bank";

export const MOCK_BANKS_DATA: Bank[] = [
  {
    id: "bank_bca",
    name: "Bank Central Asia (BCA)",
    code: "BCA",
    accountNumber: "12345678980901",
    accountName: "KAROLINA MCMILLAN",
    logo: "/wallet/logos/logo-bca.svg",
  },
  {
    id: "bank_bni",
    name: "Bank Negara Indonesia (BNI)",
    code: "BNI",
    accountNumber: "0123456789",
    accountName: "AHMAD FAUZI",
    logo: "/wallet/logos/logo-bni.svg",
  },
  {
    id: "bank_bri",
    name: "Bank Rakyat Indonesia (BRI)",
    code: "BRI",
    accountNumber: "001201234567501",
    accountName: "SITI NURHALIZA",
    logo: "/wallet/logos/logo-bri.svg",
  },
  {
    id: "bank_btn",
    name: "Bank Tabungan Negara (BTN)",
    code: "BTN",
    accountNumber: "0001234567890",
    accountName: "HENDRA WIJAYA",
    logo: "/wallet/logos/logo-btn.svg",
  },
  {
    id: "bank_mandiri",
    name: "Bank Mandiri",
    code: "MANDIRI",
    accountNumber: "1370012345678",
    accountName: "BUDI SANTOSO",
    logo: "/wallet/logos/logo-mandiri.svg",
  },
  {
    id: "bank_artha_graha",
    name: "Bank Artha Graha Internasional",
    code: "BAGI",
    accountNumber: "109876543210",
    accountName: "DEWI LESTARI",
    logo: "/wallet/logos/logo-artha.svg",
  },
  {
    id: "bank_cimb",
    name: "Bank CIMB Niaga",
    code: "CIMB",
    accountNumber: "701234567800",
    accountName: "RIZKY RAMADHAN",
    logo: "/wallet/logos/logo-cimb.svg",
  },
  {
    id: "bank_danamon",
    name: "Bank Danamon Indonesia",
    code: "DANAMON",
    accountNumber: "003512345678",
    accountName: "MAYA PUTRI",
    logo: "/wallet/logos/logo-danamon.svg",
  },
  {
    id: "bank_maybank",
    name: "Bank Maybank Indonesia",
    code: "MAYBANK",
    accountNumber: "112233445566",
    accountName: "AGUS PRATAMA",
    logo: "/wallet/logos/logo-maybank.svg",
  },
];

export function findBankByIdOrCode(query: string): Bank | undefined {
  if (!query) return undefined;
  const clean = query.toLowerCase().trim();
  return MOCK_BANKS_DATA.find(
    (b) =>
      b.id.toLowerCase() === clean ||
      b.code.toLowerCase() === clean ||
      b.name.toLowerCase().includes(clean)
  );
}
