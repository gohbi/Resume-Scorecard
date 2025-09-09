import React from "react";

interface ResultPaneProps {
  percent: number;
  children?: React.ReactNode;
}

/** Export as a named export */
export const ResultPane: React.FC<ResultPaneProps> = ({
  percent,
  children,
}) => (
  <div className="mt-6 text-center">
    <h2 className="text-xl font-semibold mb-2">
      Your match score: {percent}%
    </h2>
    {children}
  </div>
);