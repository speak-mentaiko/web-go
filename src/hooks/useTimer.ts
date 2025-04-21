import { useEffect, useState } from "react";

export const useTimer = (initTime: number, onTimeout: () => void) => {
  const [time, setTime] = useState(initTime);
  useEffect(() => {
    if (time <= 0) {
      onTimeout();
    } else {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const resetTimer = () => {
    setTime(initTime);
  };

  return { time, resetTimer };
};
