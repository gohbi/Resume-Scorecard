// frontend/src/components/HeatMap.tsx
interface Props {
  words: string[];
  // optional: you could pass the raw maps to compute intensity,
  // but for simplicity we treat every word equally.
}

export const HeatMap: React.FC<Props> = ({ words }) => {
  if (!words.length) return <p>No matching keywords.</p>;

  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      {words.map((w) => (
        <div
          key={w}
          className="bg-indigo-200 text-center py-1 px-2 rounded text-sm font-mono"
        >
          {w}
        </div>
      ))}
    </div>
  );
};