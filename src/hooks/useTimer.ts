import { useEffect, useRef, useState } from "react";

export const useTimer = (initTime: number, onTimeout: () => void) => {
  const [time, setTime] = useState(initTime);
  const [isRunning, setIsRunning] = useState(true);

  const startTimeRef = useRef<number>(Date.now());
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) countRef.current = requestAnimationFrame(update);

    return () => {
      if (countRef.current !== null) cancelAnimationFrame(countRef.current);
    };
  });

  const update = () => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const timeLeft = Math.max(0, initTime - Math.floor(elapsed));
    setTime(timeLeft);

    if (timeLeft > 0 && isRunning) {
      countRef.current = requestAnimationFrame(update);
    } else {
      setIsRunning(false);
      onTimeout();
    }
  };

  const resetTimer = () => {
    if (countRef.current !== null) cancelAnimationFrame(countRef.current);

    startTimeRef.current = Date.now();
    setTime(initTime);
    setIsRunning(true);

    countRef.current = requestAnimationFrame(update);
  };

  const stopTimer = () => {
    if (countRef.current !== null) cancelAnimationFrame(countRef.current);
    setIsRunning(false);
  };

  return { time, resetTimer, stopTimer };
};
