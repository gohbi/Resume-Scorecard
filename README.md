# Resume Scorecard

A **free, open‑source web app** that compares a job description with your résumé and returns a similarity **percentage** plus a **heat‑map** of matching keywords.

- **Live demo** (GitHub Pages): https://\<your‑username\>.github.io/resume-scorecard/
- **Backend** (Railway): https://\<your‑backend\>.railway.app/api/score

## ✨ Features

- Paste any job posting on the left, paste your résumé on the right.
- Keyword‑density analysis (stop‑words removed, lemmatized).
- Scoring rules:
  - 2 pts for a word that appears at least once in **both** texts.
  - 5 pts for a word that appears **twice or more** in **both** texts.
  - Score capped at **100 %**.
- Heat‑map view of all matched keywords.
- Fully client‑server architecture, hosted for free.

## 📦 Project Layout

    resume-scorecard/
    │
    ├─ .gitignore
    ├─ README.md
    │
    ├─ frontend/                # React app (Vite)
    │   ├─ index.html
    │   ├─ vite.config.ts
    │   ├─ package.json
    │   └─ src/
    │       ├─ main.tsx
    │       ├─ App.tsx
    │       ├─ components/
    │       │   ├─ InputPane.tsx
    │       │   ├─ ResultPane.tsx
    │       │   └─ HeatMap.tsx
    │       └─ utils/
    │           └─ api.ts
    │
    └─ backend/                 # Express API
        ├─ package.json
        ├─ tsconfig.json
        └─ src/
            ├─ index.ts
            └─ scorer.ts


## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Front‑end | React + Vite + TypeScript + Tailwind CSS |
| Back‑end | Node + Express + TypeScript |
| NLP | `natural` (
