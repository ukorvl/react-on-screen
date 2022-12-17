import { RefObject, useEffect, useState } from 'react';

/**
 * UseOnScreen hook settings.
 */
export type UseOnScreenSettings<T extends HTMLElement> = {
  /**
   * Target React element ref.
   */
  ref: RefObject<T>;
  /**
   * Visibility threshold. Set 1 to consider visibility only if all element is on screen.
   * @default 0
   */
  threshold?: number;
  /**
   * Trigger visibility detection only once.
   */
  once?: boolean;
}

/**
 * Hook detects wether element is on screen or not.
 * @example ```tsx
 * const ref = useRef<T>(null);
 * const isOnScreen = useOnScreen({ref});
 *
 * return (<div>{isOnScreen && 'I am on the screen!'}</div>);
 * ```
 * @returns - Is element on screen.
 */
export const useOnScreen = <T extends HTMLElement>({
  ref,
  threshold = 0,
  once,
}: UseOnScreenSettings<T>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        once && observer.disconnect();
      },
      {
        threshold,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, once]);

  return isIntersecting;
};
