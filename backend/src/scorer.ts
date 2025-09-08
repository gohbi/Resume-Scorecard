// backend/src/scorer.ts
import natural from 'natural';

/* --------------------------------------------------------------
   Simple stop‑word list – feel free to extend it later.
   -------------------------------------------------------------- */
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','if','so','because','as','at','by',
  'for','from','in','into','of','on','onto','out','over','to','up',
  'with','without','not','be','is','are','was','were','has','have',
  // add any custom “common” words here
]);

/**
 * Analyse a piece of text:
 *  - tokenises (lower‑cased)
 *  - removes stop‑words
 *  - returns a map: word → { count, density }
 *
 * The function is deliberately defensive: if the tokenizer ever
 * returns `null` (which can happen when the input is `undefined`
 * or an empty string in older versions of `natural`), we fall back
 * to an empty array so the rest of the pipeline continues safely.
 */
export function analyseText(text: string) {
  const tokenizer = new natural.WordTokenizer();

  // `tokenizer.tokenize` returns `string[]` but TypeScript’s
  // lib definition marks it as possibly `null`. We coerce it safely.
  const rawTokens: string[] = (tokenizer.tokenize(text.toLowerCase()) ?? []) as string[];

  // Filter out stop‑words
  const filtered = rawTokens.filter(tok => !STOP_WORDS.has(tok));

  const total = filtered.length === 0 ? 1 : filtered.length; // avoid division‑by‑zero

  // Frequency map
  const freq: Record<string, number> = {};
  filtered.forEach(tok => {
    freq[tok] = (freq[tok] ?? 0) + 1;
  });

  // Convert to the shape the rest of the code expects
  const result: Record<
    string,
    { count: number; density: number }
  > = {};

  Object.entries(freq).forEach(([word, cnt]) => {
    result[word] = {
      count: cnt,
      density: cnt / total,
    };
  });

  return result;
}

/**
 * Compute the similarity score according to the rule‑set you described:
 *   - 2 pts for a word that appears at least once in **both** texts.
 *   - 5 pts for a word that appears twice or more in **both** texts.
 *   - Score capped at 100 %.
 *
 * Returns both the numeric percentage and the list of words that
 * contributed points (useful for the heat‑map on the front‑end).
 */
export function computeScore(
  jobMap: ReturnType<typeof analyseText>,
  resumeMap: ReturnType<typeof analyseText>
) {
  let points = 0;
  const matchedWords: string[] = [];

  for (const [word, jobInfo] of Object.entries(jobMap)) {
    const resumeInfo = resumeMap[word];
    if (!resumeInfo) continue; // no match, skip

    // Apply the point rules
    if (jobInfo.count >= 2 && resumeInfo.count >= 2) {
      points += 5;
    } else if (jobInfo.count >= 1 && resumeInfo.count >= 1) {
      points += 2;
    }

    // Record the word if it earned any points
    if (
      (jobInfo.count >= 2 && resumeInfo.count >= 2) ||
      (jobInfo.count >= 1 && resumeInfo.count >= 1)
    ) {
      matchedWords.push(word);
    }
  }

  // Upper bound: each distinct job‑keyword could earn max 5 pts
  const maxPossible = Object.keys(jobMap).length * 5;
  const percent = Math.min(100, (points / maxPossible) * 100);

  return {
    percent: Math.round(percent),
    matchedWords,
  };
}