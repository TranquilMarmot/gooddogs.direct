import { useRef, useEffect, useCallback } from "react";

/**
 * Returns a random number that lies within the given range
 * @param min Minimum number in range
 * @param max Maximum number in range
 */
export const getRandomNumberInRange = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

/**
 * Gets a random number and then, with a 50/50 chance, negates it
 * @param min Minimum rotation
 * @param max Maximum rotation
 */
export const getRandomRotation = (min: number, max: number): number => {
  const rotate = getRandomNumberInRange(min, max);

  return Math.random() >= 0.5 ? rotate : -rotate;
};

/**
 * Hook that calls the given callback randomly between minDelay and maxDelay milliseconds
 *
 * Adapted from https://joshwcomeau.com/snippets/react-hooks/use-random-interval
 *
 * @param callback Callback to call
 * @param minDelay Minimum delay between calls
 * @param maxDelay Maximum delay between calls
 * @returns A callback that can be used to cancel the current interval, if there is one
 */
export const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
) => {
  // current timeout (NOTE: Can this be `useState` instead?)
  const timeoutId = useRef<number>(null);

  // save a reference to the callback
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // only actually do anything if minDelay and maxDelay are real
    if (minDelay === null || maxDelay === null) {
      return;
    }

    const handleTick = () => {
      const nextTickAt = getRandomNumberInRange(minDelay, maxDelay);

      // TypeScript (rightfully) things that setting `current` on a `ref` isn't allowed...
      // but we can totally do it anyway 🤷
      // @ts-ignore
      timeoutId.current = window.setTimeout(() => {
        savedCallback.current();
        handleTick();
      }, nextTickAt);
    };

    handleTick();

    return () => window.clearTimeout(timeoutId.current!);
  }, [minDelay, maxDelay]);

  // return a callback that can be used to cancel the current timeout
  const cancel = useCallback(() => {
    window.clearTimeout(timeoutId.current!);
  }, []);

  return cancel;
};
