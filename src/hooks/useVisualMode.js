import { useState } from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  function transition(toMode) {
    setMode(toMode);
    setHistory([...history, toMode]);
  }
  function back() {
    const removeLast = [...history];
    removeLast.pop();
    setHistory(removeLast);
    setMode(removeLast[removeLast.length - 1]);
  }
  return {
    mode,
    transition,
    back
  };
}
