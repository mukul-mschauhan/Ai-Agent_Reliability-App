import { createContext, useContext, useState, ReactNode } from "react";

export type DemoState = "initial" | "ran_initial" | "feedback_submitted" | "reran";

interface DemoContextType {
  state: DemoState;
  runInitialAgent: () => void;
  submitFeedback: () => void;
  rerunAgent: () => void;
  resetDemo: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>("initial");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const runInitialAgent = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setState("ran_initial");
    }, 2200);
  };

  const submitFeedback = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setState("feedback_submitted");
    }, 1500);
  };

  const rerunAgent = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setState("reran");
    }, 2000);
  };

  const resetDemo = () => {
    setState("initial");
  };

  return (
    <DemoContext.Provider value={{ state, runInitialAgent, submitFeedback, rerunAgent, resetDemo, isRunning, isSubmitting }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
