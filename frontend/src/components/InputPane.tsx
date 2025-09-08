// frontend/src/components/InputPane.tsx
import { useState } from 'react';

interface Props {
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
}

export const InputPane: React.FC<Props> = ({
  label,
  value,
  setValue,
  placeholder,
}) => {
  return (
    <div className="flex flex-col h-full">
      <label className="font-medium mb-1">{label}</label>
      <textarea
        className="flex-grow p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};