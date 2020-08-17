import { useRef, useEffect, useCallback } from "react";

export const getRandomNumberInRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const getRandomRotation = (min: number, max: number): number => {
  const rotate = getRandomNumberInRange(min, max);

  return Math.random() >= 0.5 ? rotate : -rotate;
};

export const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
) => {
  const timeoutId = useRef<number>(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    let isEnabled =
      typeof minDelay === "number" && typeof maxDelay === "number";
    if (isEnabled) {
      const handleTick = () => {
        if (minDelay === null || maxDelay === null) {
          return;
        }

        const nextTickAt = getRandomNumberInRange(minDelay, maxDelay);

        // @ts-ignore
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current!);
  }, [minDelay, maxDelay]);
  const cancel = useCallback(() => {
    window.clearTimeout(timeoutId.current!);
  }, []);
  return cancel;
};
