import { getSearchPrices, stopSearchPrices } from './api-adapter';
import type { PriceOffer, ErrorResponse } from './api-adapter';

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

export async function pollPrices(
  token: string,
  signal: AbortSignal,
): Promise<Record<string, PriceOffer>> {
  while (true) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

    try {
      const { prices } = await getSearchPrices(token);
      return prices;
    } catch (err) {
      const apiErr = err as ErrorResponse;

      if (apiErr.code === 425 && apiErr.waitUntil) {
        const delay = Math.max(0, new Date(apiErr.waitUntil).getTime() - Date.now());
        await sleep(delay, signal);
        continue;
      }

      throw err;
    }
  }
}

export async function cancelSearch(token: string): Promise<void> {
  try {
    await stopSearchPrices(token);
  } catch {
    // token may have already expired — not an error from the user's perspective
  }
}
