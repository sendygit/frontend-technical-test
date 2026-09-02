import { Contact } from "@/lib/types/contact";
import { MOCK_CONTACTS_DATA } from "@/lib/mocks/contacts";

export interface GetContactsOptions {
  query?: string;
  shouldFail?: boolean;
  empty?: boolean;
  delayMs?: number;
}

export async function getContacts(options: GetContactsOptions = {}): Promise<Contact[]> {
  const { query = "", shouldFail = false, empty = false, delayMs = 600 } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (shouldFail) {
    throw new Error("Gagal memuat daftar kontak. Silakan periksa koneksi internet Anda.");
  }

  if (empty) {
    return [];
  }

  if (!query.trim()) {
    return [...MOCK_CONTACTS_DATA];
  }

  const cleanQuery = query.toLowerCase().trim();
  return MOCK_CONTACTS_DATA.filter((contact) => {
    const matchName = contact.name.toLowerCase().includes(cleanQuery);
    const matchPhone = contact.phoneNumber.replace(/[^0-9]/g, "").includes(cleanQuery.replace(/[^0-9]/g, ""));
    return matchName || matchPhone;
  });
}
