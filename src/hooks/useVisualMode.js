import { useState } from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(toMode, replace = false) {
    //transition to the next mode
    setMode(toMode);
    if (replace) {
      //if replace is true, replace the current mode with the given mode instead
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
    //reverts the current mode to the previous one
    if (history.length > 1) {
      setHistory((prev) => {
        let removeLast = [...prev];
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
