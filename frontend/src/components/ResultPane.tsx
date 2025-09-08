// frontend/src/components/ResultPane.tsx
import { HeatMap } from './HeatMap';

interface Props {
  percent: number | null;
  matchedWords: string[];
  loading: boolean;
  error: string | null;
}

export const ResultPane: React.FC<Props> = ({
  percent,
  matchedWords,
  loading,
  error,
}) => {
  return (
    <div className="border-l pl-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Score</h2>

      {loading && <p>Calculating…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {percent !== null && !loading && !error && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-48 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-4"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="font-medium">{percent}%</span>
          </div>

          <h3 className="mt-4 font-medium">Matched Keywords (heat‑map)</h3>
          <HeatMap words={matchedWords} />
        </>
      )}
    </div>
  );
};