import { Bank } from "../types/bank";

export const MOCK_BANKS_DATA: Bank[] = [
  {
    id: "bank_bca",
    name: "Bank Central Asia (BCA)",
    code: "BCA",
    accountNumber: "8801-2345-6789",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-bca.svg",
  },
  {
    id: "bank_bni",
    name: "Bank Negara Indonesia (BNI)",
    code: "BNI",
    accountNumber: "0123-456-789",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-bni.svg",
  },
  {
    id: "bank_bri",
    name: "Bank Rakyat Indonesia (BRI)",
    code: "BRI",
    accountNumber: "0012-01-234567-50-1",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-bri.svg",
  },
  {
    id: "bank_btn",
    name: "Bank Tabungan Negara (BTN)",
    code: "BTN",
    accountNumber: "0001-2345-6789-0",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-btn.svg",
  },
  {
    id: "bank_mandiri",
    name: "Bank Mandiri",
    code: "MANDIRI",
    accountNumber: "137-00-1234567-8",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-mandiri.svg",
  },
  {
    id: "bank_artha_graha",
    name: "Bank Artha Graha Internasional",
    code: "BAGI",
    accountNumber: "1098-7654-3210",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-artha.svg",
  },
  {
    id: "bank_cimb",
    name: "Bank CIMB Niaga",
    code: "CIMB",
    accountNumber: "7012-3456-7800",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-cimb.svg",
  },
  {
    id: "bank_danamon",
    name: "Bank Danamon Indonesia",
    code: "DANAMON",
    accountNumber: "0035-1234-5678",
    accountName: "Sendy Pratama",
    logo: "/wallet/logos/logo-danamon.svg",
  },
  {
    id: "bank_maybank",
    name: "Bank Maybank Indonesia",
    code: "MAYBANK",
    accountNumber: "1122-3344-5566",
    accountName: "Sendy Pratama",
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
