// frontend/src/App.tsx
import { useState } from "react";
import { InputPane } from "./components/InputPane";
import { ResultPane } from "./components/ResultPane";
import HeatMap from "./components/HeatMap";
import { getScore, ScoreResponse } from "./utils/api";

function App() {
  const [jobDesc, setJobDesc] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const calculate = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getScore(jobDesc, resume);
      setResult(data);
    } catch (e) {
      setError("Failed to contact the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Resume Scorecard
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <InputPane
          label="Job Description"
          value={jobDesc}
          onChange={setJobDesc}
        />
        <InputPane label="Your Résumé" value={resume} onChange={setResume} />
      </div>

      <div className="my-4 flex justify-center">
        <button
          onClick={calculate}
          disabled={loading || !jobDesc || !resume}
          className={`px-6 py-2 rounded ${
            loading || !jobDesc || !resume
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Calculating…" : "Calculate Score"}
        </button>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {result && (
        <ResultPane percent={result.percent}>
          <HeatMap words={result.matchedWords} />
        </ResultPane>
      )}
    </div>
  );
}

export default App;