interface ProceedTransferButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export function ProceedTransferButton({
  disabled = false,
  onClick,
  isLoading = false,
}: ProceedTransferButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-4 rounded-full inline-flex justify-center items-center text-xl font-bold transition-all select-none ${
        disabled || isLoading
          ? "bg-zinc-300 text-white cursor-not-allowed shadow-none"
          : "bg-[#662AB2] text-white hover:bg-[#5C26A1] active:scale-[0.99] shadow-lg shadow-purple-950/20 cursor-pointer"
      }`}
    >
      {isLoading ? "Processing..." : "Proceed to Transfer"}
    </button>
  );
}
