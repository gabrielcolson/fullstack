import { useEffect, useState } from 'react';

function useMounted() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return loaded;
}

export default useMounted;
