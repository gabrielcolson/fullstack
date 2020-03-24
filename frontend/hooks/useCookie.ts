import { useState } from 'react';
import Cookie from 'js-cookie';

function tryParseCookie<T>(key: string, initialValue: T): T {
  if (typeof window !== 'undefined') {
    const cookie = Cookie.get(key);
    if (cookie) {
      return JSON.parse(cookie) as T;
    }
    Cookie.set(key, initialValue);
  }
  return initialValue;
}

function useCookie<T>(key, initialValue: T): [T, (value: T) => void] {
  const initialValueOrCookie = tryParseCookie<T>(key, initialValue);
  const [value, setInnerValue] = useState(initialValueOrCookie);

  function setValue(value: T) {
    console.log('setting cookie');
    setInnerValue(value);

    if (typeof window !== 'undefined') {
      Cookie.set(key, value)
    }
  }

  return [value, setValue];
}

export default useCookie;
