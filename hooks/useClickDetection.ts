import { RefObject, useEffect, useRef, useState } from 'react';

interface UseClickDetectionReturn {
  isTargetClicked: boolean;
  ref: RefObject<HTMLDivElement>;
}

export const useClickDetection = (): UseClickDetectionReturn => {
  const [isTargetClicked, setIsTargetClicked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | Event): void => {
      if (!(event.target instanceof Node)) return;
      setIsTargetClicked(!!ref.current?.contains(event.target));
    };

    document.addEventListener('mousedown', handleClick as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClick as EventListener);
    };
  }, []);

  return { isTargetClicked, ref };
};
