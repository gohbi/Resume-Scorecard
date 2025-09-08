// frontend/src/components/HeatMap.tsx
import React from "react";

interface HeatMapProps {
  /** List of matched keywords returned from the backend */
  words: string[];
}

/**
 * Very simple heat‑map: each word is rendered as a pill.
 * You can later replace this with a real grid / colour‑scale.
 */
const HeatMap: React.FC<HeatMapProps> = ({ words }) => {
  if (!words || words.length === 0) {
    return <p className="text-center text-gray-500">No matches found.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {words.map((w, idx) => (
        <span
          key={idx}
          className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm"
        >
          {w}
        </span>
      ))}
    </div>
  );
};

export default HeatMap;