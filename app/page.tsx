"use client";
import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setDisplay(display + " " + op + " ");
  };

  const handleEqual = () => {
    try {
      const result = eval(display);
      setHistory([...history, `${display} = ${result}`]);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => setDisplay("0");

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl">
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="text-right text-3xl font-mono text-white overflow-x-auto">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={handleClear}
              className="col-span-2 py-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
            >
              Clear
            </button>
            <button
              onClick={() => setDisplay(display.slice(0, -1) || "0")}
              className="col-span-2 py-4 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600"
            >
              ←
            </button>
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === "=") handleEqual();
                  else if (["+", "-", "*", "/"].includes(btn)) handleOperator(btn);
                  else handleNumber(btn);
                }}
                className={`py-4 rounded-lg font-bold text-xl transition ${
                  ["+", "-", "*", "/", "="].includes(btn)
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-4 bg-gray-800 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">History</h3>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {history.map((h, i) => (
                <div key={i} className="text-gray-400 text-sm font-mono">{h}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}