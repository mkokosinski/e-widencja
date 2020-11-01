import { useCallback, useEffect } from 'react';

const useDetectOutsideClick = (ref, handler) => {
  const detectExit = useCallback((e) => {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    handler();
  }, [handler, ref]);

  useEffect(() => {
    document.addEventListener('mousedown', detectExit);
    return () => {
      document.removeEventListener('mousedown', detectExit);
    };
  }, [detectExit]);
};

export default useDetectOutsideClick;
