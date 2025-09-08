// frontend/src/App.tsx
import { useState } from 'react';
import { InputPane } from './components/InputPane';
import { ResultPane } from './components/ResultPane';
import { getScore } from './utils/api';

function App() {
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [percent, setPercent] = useState<number | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const { percent, matchedWords } = await getScore(jobDesc, resume);
      setPercent(percent);
      setMatched(matchedWords);
    } catch (e: any) {
      setError(e?.response?.data?.error ?? 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Resume Scorecard</h1>
        <p className="text-gray-600">
          Paste a job description on the left and your resume on the right –
          get a similarity % and a heat‑map of matching keywords.
        </p>
      </header>

      <div className="flex flex-1 gap-6">
        {/* Left pane */}
        <div className="flex-1 flex flex-col">
          <InputPane
            label="Job Description"
            value={jobDesc}
            setValue={setJobDesc}
            placeholder="Paste the full job posting here..."
          />
        </div>

        {/* Right pane */}
        <div className="flex-1 flex flex-col">
          <InputPane
            label="Your Resume"
            value={resume}
            setValue={setResume}
            placeholder="Paste your resume text (or copy‑paste from a PDF)…"
          />
        </div>
      </div>

      <div className="my-4 flex justify-center">
        <button
          onClick={handleCalculate}
          disabled={loading || !jobDesc || !resume}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Calculate Score
        </button>
      </div>

      {/* Result panel */}
      <ResultPane
        percent={percent}
        matchedWords={matched}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;