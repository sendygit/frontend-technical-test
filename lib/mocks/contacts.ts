import { Contact } from "@/lib/types/contact";

export const MOCK_CONTACTS_DATA: Contact[] = [
  {
    id: "cnt_001",
    name: "Abdul Mustakim",
    phoneNumber: "+62 812-3456-7890",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_002",
    name: "Akiko Minami",
    phoneNumber: "+62 857-1928-3746",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_003",
    name: "Alexandria Putri",
    phoneNumber: "+62 821-9988-7766",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_004",
    name: "Ali Hakim",
    phoneNumber: "+62 813-8822-4411",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_005",
    name: "Bagas Budi",
    phoneNumber: "+62 878-5544-3322",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_006",
    name: "Bagus Ramadhan",
    phoneNumber: "+62 896-1234-5678",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_007",
    name: "Bambang Ikhsan",
    phoneNumber: "+62 852-7711-9900",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_008",
    name: "Berliana Sarah",
    phoneNumber: "+62 811-4567-8901",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "cnt_009",
    name: "Chelsea Tanjung",
    phoneNumber: "+62 859-6633-2211",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
];

export function findContactByPhoneOrName(query: string): Contact | undefined {
  if (!query) return undefined;
  const cleanDigits = query.replace(/[^0-9]/g, "").trim();
  const cleanText = query.toLowerCase().trim();

  return MOCK_CONTACTS_DATA.find((c) => {
    if (cleanDigits && c.phoneNumber.replace(/[^0-9]/g, "").includes(cleanDigits)) {
      return true;
    }
    if (c.name.toLowerCase().includes(cleanText)) {
      return true;
    }
    return false;
  });
}
