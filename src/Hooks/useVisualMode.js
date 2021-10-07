import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])
  function transition(mode, replace = false) {
    setMode(mode)
    setHistory((prev => [mode, ...prev]))
    if (replace) {
      history.shift()
      setMode(mode)
    }
  }
  function back() {
    if (history.length < 2) {
      return
    }
    setMode(history[1])
    history.shift()
  }
  return { mode, transition, back };
}