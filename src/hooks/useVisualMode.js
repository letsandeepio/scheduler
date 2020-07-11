import { useState } from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(toMode, replace = false) {
    setMode(toMode);
    if (replace) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[prev.length - 1] = toMode;
        return [...newHistory];
      });
    } else {
      setHistory((prev) => [...prev, toMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        const removeLast = [...prev];
        removeLast.pop();
        let lastMode = removeLast[removeLast.length - 1];
        setMode(lastMode);
        return [...removeLast];
      });
    }
  }
  return {
    mode,
    transition,
    back
  };
}
