import { ChangeEvent } from "react";

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesInput({ value, onChange }: NotesInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <div className="inline-flex justify-start items-center gap-2">
        <label htmlFor="transfer-notes" className="text-black text-lg font-medium cursor-pointer">
          Notes
        </label>
        <span className="text-neutral-400 text-sm font-light">(Optional)</span>
      </div>

      <div className="w-full h-28 p-4 bg-neutral-100/80 rounded-xl outline-1 outline-neutral-200 focus-within:outline-[#662AB2] focus-within:bg-white transition-all">
        <textarea
          id="transfer-notes"
          rows={3}
          value={value}
          onChange={handleChange}
          placeholder="Write your notes here"
          className="w-full h-full resize-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
