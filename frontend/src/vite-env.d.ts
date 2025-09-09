/// <reference types="vite/client" />

// Extend the default ImportMeta interface with the env property
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string; // example – adjust to whatever you actually use
  // add any other VITE_… variables you reference
}

// Now ImportMeta has the .env field
interface ImportMeta {
  readonly env: ImportMetaEnv;
}