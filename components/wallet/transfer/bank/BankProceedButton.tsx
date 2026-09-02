"use client";

interface BankProceedButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export function BankProceedButton({
  disabled = false,
  onClick,
  isLoading = false,
}: BankProceedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full h-14 rounded-full flex justify-center items-center text-xl font-bold font-product-sans transition-all select-none ${
        disabled || isLoading
          ? "bg-[#D6D6D6] text-white cursor-not-allowed shadow-none"
          : "bg-[#662AB2] text-white hover:bg-[#5C26A1] active:scale-[0.99] shadow-lg shadow-purple-950/20 cursor-pointer"
      }`}
      aria-label="Lanjutkan transfer ke rekening bank"
    >
      {isLoading ? "Processing..." : "Proceed to Transfer"}
    </button>
  );
}
