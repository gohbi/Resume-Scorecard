// frontend/src/utils/api.ts
import axios from 'axios';

export interface ScoreResponse {
  percent: number;
  matchedWords: string[];
}

export async function getScore(
  jobDescription: string,
  resume: string
): Promise<ScoreResponse> {
  const resp = await axios.post<ScoreResponse>(
    // Change the URL when you deploy the backend
    `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/score`,
    { jobDescription, resume }
  );
  return resp.data;
}