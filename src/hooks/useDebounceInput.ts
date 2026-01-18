import { useState, useEffect } from "react";
import { DEBOUNCE_DELAY_MS } from "@/constants";

/**
 * Custom hook to debounce input values
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (defaults to DEBOUNCE_DELAY_MS)
 * @returns Debounced value
 */
export const useDebounceInput = (
  value: string,
  delay: number = DEBOUNCE_DELAY_MS
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};
