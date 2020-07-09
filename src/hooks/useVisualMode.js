import { useState } from 'react';

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  function transition(toMode) {
    setMode(toMode);
  }
  return {
    mode,
    transition
  };
}
