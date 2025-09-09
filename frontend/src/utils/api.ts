// frontend/src/utils/api.ts
import axios from 'axios';

export interface HeatWord {
  word: string;
  score: number;
}


export interface ScoreResponse {
  percent: number;
  matchedWords: string[];
  jobDescHeatmap: HeatWord[];
  resumeHeatmap: HeatWord[];
}

export async function getScore(
  jobDescription: string,
  resume: string
): Promise<ScoreResponse> {
  try {
    const resp = await axios.post<ScoreResponse>(
      `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/score`,
      { jobDescription, resume }
    );
    return resp.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : 'Unknown error occurred'
    );
  }
}