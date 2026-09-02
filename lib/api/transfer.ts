import { TransferTransaction } from "../types/transfer";
import { MOCK_LATEST_TRANSFERS } from "../mocks/transfer";

interface GetLatestTransfersOptions {
  shouldFail?: boolean;
  empty?: boolean;
  delayMs?: number;
}

export async function getLatestTransfers(
  options: GetLatestTransfersOptions = {}
): Promise<TransferTransaction[]> {
  const { shouldFail = false, empty = false, delayMs = 600 } = options;

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (shouldFail) {
    throw new Error("Gagal mengambil riwayat transfer terakhir. Silakan coba lagi.");
  }

  if (empty) {
    return [];
  }

  return [...MOCK_LATEST_TRANSFERS];
}
