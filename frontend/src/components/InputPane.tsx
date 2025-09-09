import React from "react";

interface InputPaneProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

/** Export as a named export */
export const InputPane: React.FC<InputPaneProps> = ({
  label,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-2">
    <label className="font-medium">{label}</label>
    <textarea
      className="border rounded p-2 h-40 resize-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);