import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const isBrowser = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState(() => {
    if (isBrowser) {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
