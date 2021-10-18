import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (!replace) {
      setMode(mode);
      return setHistory((prev => [mode, ...prev]));
    }
    setHistory((prev => [mode, ...prev.slice(1, prev.length)]))
    setMode(mode);
  };

  function back() {
    if (history.length < 2) {
      return;
    }
    setHistory((prev => [...prev.slice(1, history.length)]))
    setMode(history[1]);
  };

  return { mode, transition, back };
}