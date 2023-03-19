import { useEffect, useState } from "react";
export interface Serializable {
  [key: string]: any ;
}

const useLocalStorage = <T extends Serializable>(storageKey: string, prevState: T | '') => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : prevState;
  });
  useEffect(() => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(storageKey, serializedValue);
  }, [storageKey, value]);

  return [value, setValue] as const;
}

export default useLocalStorage