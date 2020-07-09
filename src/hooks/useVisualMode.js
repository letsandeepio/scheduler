import { useState } from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(toMode, replace = false) {
    setMode(toMode);
    if (replace) {
      let replaceArray = [...history];
      replaceArray[replaceArray.length - 1] = toMode;
      setHistory(replaceArray);
    } else {
      setHistory([...history, toMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const removeLast = [...history];
      removeLast.pop();
      setHistory(removeLast);
      setMode(removeLast[removeLast.length - 1]);
    }
  }
  return {
    mode,
    transition,
    back
  };
}
