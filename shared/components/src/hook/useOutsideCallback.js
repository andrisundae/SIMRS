import { useEffect } from 'react';

export default function useOutsideCallback(ref, callback) {
  function clickOutside(e) {
    if (undefined !== ref.current) {
      if (null !== ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    } else {
      const refs = Object.values(ref);
      refs.find((ref) => {
        if (null !== ref.current && !ref.current.contains(e.target)) {
          callback();
          return true;
        }
        return false;
      });
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [true]);
}
