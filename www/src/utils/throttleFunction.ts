import { useRef } from "react";

export default function throttleFunction<T extends any[]>(callback: (...args: T) => void, delay: number) {
  let shouldWait = false;

  return (...args: T) => {
    if (shouldWait) {
      return;
    }

    callback(...args);
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

export function useThrottle(callback: () => void, limit: number) {
  let lastRun = useRef(Date.now());

  return function () {
    if (Date.now() - lastRun.current >= limit) {
      callback();
      lastRun.current = Date.now();
    }
  };
}
