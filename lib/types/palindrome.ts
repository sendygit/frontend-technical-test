export interface PalindromeCheckResult {
  text: string;
  cleanedText: string;
  isPalindrome: boolean;
  timestamp: string;
}

export interface PalindromeState {
  inputText: string;
  lastResult: PalindromeCheckResult | null;
  history: PalindromeCheckResult[];
  caseSensitive: boolean;
  ignoreSpacesAndPunctuation: boolean;
}
