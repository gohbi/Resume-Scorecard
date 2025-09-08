// backend/src/scorer.ts
import natural from 'natural';

// Simple stop‑word list – extend as you like
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','if','so','because','as','at','by',
  'for','from','in','into','of','on','onto','out','over','to','up',
  'with','without','not','be','is','are','was','were','has','have',
  // add any custom “common” words here
]);

/**
 * Tokenises, lower‑cases, removes stop‑words and returns a map:
 *   word -> { count: number, density: number }
 */
export function analyseText(text: string) {
  const tokenizer = new natural.WordTokenizer();
  const rawTokens = tokenizer.tokenize(text.toLowerCase());

  const filtered = rawTokens.filter(tok => !STOP_WORDS.has(tok));
  const total = filtered.length;

  const freq: Record<string, number> = {};
  filtered.forEach(tok => {
    freq[tok] = (freq[tok] ?? 0) + 1;
  });

  const result: Record<string, { count: number; density: number }> = {};
  Object.entries(freq).forEach(([word, cnt]) => {
    result[word] = { count: cnt, density: cnt / total };
  });
  return result;
}

/**
 * Compute the percentage score according to the rule‑set you described.
 */
export function computeScore(
  jobMap: ReturnType<typeof analyseText>,
  resumeMap: ReturnType<typeof analyseText>
) {
  let points = 0;
  const matchedWords: string[] = [];

  for (const [word, jobInfo] of Object.entries(jobMap)) {
    const resumeInfo = resumeMap[word];
    if (!resumeInfo) continue; // no match

    // Apply the point rules
    if (jobInfo.count >= 2 && resumeInfo.count >= 2) {
      points += 5;
    } else if (jobInfo.count >= 1 && resumeInfo.count >= 1) {
      points += 2;
    }

    // Keep track of which words contributed points
    if (
      (jobInfo.count >= 2 && resumeInfo.count >= 2) ||
      (jobInfo.count >= 1 && resumeInfo.count >= 1)
    ) {
      matchedWords.push(word);
    }
  }

  // Very generous upper bound – enough to cap at 100%
  const maxPossible = Object.keys(jobMap).length * 5;
  const percent = Math.min(100, (points / maxPossible) * 100);
  return { percent: Math.round(percent), matchedWords };
}
