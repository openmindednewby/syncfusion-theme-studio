import { AI_SUGGESTIONS_URL } from '../constants';

import type { AiSuggestion } from '../types';

/** Fetches AI suggestion chips from the mock server. */
export async function fetchSuggestions(): Promise<AiSuggestion[]> {
  const response = await fetch(AI_SUGGESTIONS_URL);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- response.json() returns Promise<unknown>, server contract guarantees AiSuggestion[]
  return response.json() as Promise<AiSuggestion[]>;
}
