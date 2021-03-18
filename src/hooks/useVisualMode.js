import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        const newHistory = [...prev].slice(0, -1);
        // newHistory.pop();
        return newHistory;
      });
    }
    setHistory((prev) => {
      setMode(newMode);
      const newHistory = [...prev, newMode];
      return newHistory;
    });
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        const newHistory = [...prev].slice(0, -1);
        // newHistory.pop();
        setMode(newHistory.slice(-1)[0]);
        return newHistory;
      });
    }
  };

  return { mode, transition, back };
}
