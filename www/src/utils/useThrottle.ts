import { useCallback, useEffect, useRef, useState } from "react";

export default function useThrottle<T extends any[]>(callback: (...args: T) => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isThrottled, setIsThrottled] = useState(false);

  const throttledCallback = useCallback(
    (...args: T) => {
      if (!isThrottled) {
        setIsThrottled(true);
        callback(...args);
        timeoutRef.current = setTimeout(() => {
          setIsThrottled(false);
        }, delay);
      }
    },
    [callback, delay, isThrottled]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}
