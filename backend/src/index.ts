// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { analyseText, computeScore } from './scorer';

const app = express();
const PORT = process.env.PORT || 4000;

// ---------- Middleware ----------
app.use(cors({ origin: '*' }));               // tighten in prod (only your domain)
app.use(bodyParser.json({ limit: '500kb' })); // protect against huge payloads

// ---------- Routes ----------
app.post('/api/score', (req, res) => {
  const { jobDescription, resume } = req.body;

  if (typeof jobDescription !== 'string' || typeof resume !== 'string') {
    return res.status(400).json({ error: 'Both fields must be strings.' });
  }

  const jobMap = analyseText(jobDescription);
  const resumeMap = analyseText(resume);
  const { percent, matchedWords } = computeScore(jobMap, resumeMap);

  res.json({ percent, matchedWords });
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
