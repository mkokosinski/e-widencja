import { useCallback, useEffect } from 'react';

const useDetectOutsideClick = (ref, handler, onlyParentCanClose = false) => {
  const detectExit = useCallback(
    (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler();
    },
    [handler, ref]
  );

  useEffect(() => {
    if (ref.current) {
      const node = onlyParentCanClose ? ref.current.parentNode : document;

      node.addEventListener('mousedown', detectExit);
      return () => {
        node.removeEventListener('mousedown', detectExit);
      };
    }
  }, [detectExit, onlyParentCanClose, ref]);
};

export default useDetectOutsideClick;
