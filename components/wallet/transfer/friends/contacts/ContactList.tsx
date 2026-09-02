import { Contact } from "@/lib/types/contact";
import { ContactItem } from "./ContactItem";
import { AlertCircle, RefreshCw, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactListProps {
  contacts: Contact[];
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({
  contacts,
  isLoading = false,
  errorMessage = null,
  onRetry,
  onSelectContact,
}: ContactListProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h2 className="text-xl font-bold text-[#121212] tracking-tight">
        All Contact
      </h2>

      {isLoading ? (
        <div className="space-y-4 pt-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-between py-1 animate-pulse">
              <div className="flex items-center gap-3.5 flex-1">
                <div className="size-[50px] rounded-full bg-slate-100 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4.5 w-36 rounded bg-slate-200" />
                  <div className="h-4 w-28 rounded bg-slate-100" />
                </div>
              </div>
              <div className="size-6 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      ) : errorMessage ? (
        <div className="p-6 text-center bg-red-50/70 rounded-2xl border border-red-100 space-y-3">
          <div className="flex justify-center text-red-500">
            <AlertCircle className="size-8" />
          </div>
          <p className="text-sm font-medium text-red-700">{errorMessage}</p>
          {onRetry && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onRetry}
              className="border-red-200 text-red-700 hover:bg-red-100 cursor-pointer"
            >
              <RefreshCw className="size-3.5 mr-1.5" />
              Coba Lagi
            </Button>
          )}
        </div>
      ) : contacts.length === 0 ? (
        <div className="p-8 text-center bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex justify-center text-slate-300">
            <UserX className="size-10" />
          </div>
          <p className="text-sm font-semibold text-slate-600">Kontak tidak ditemukan</p>
          <p className="text-xs text-slate-400">
            Coba masukkan nama atau nomor telepon yang berbeda.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onSelect={onSelectContact}
            />
          ))}
        </div>
      )}
    </div>
  );
}
