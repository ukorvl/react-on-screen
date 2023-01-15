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
   * Triggers visibility detection only once. Works like appear on screen trigger.
   * @default false
   */
  once?: boolean;
  /**
   * Root margin. This set of values serves to grow or shrink each side of the element's bounding box
   * before computing visibility.
   * @example ```50px 0 0 | 50px | 2rem 3rem```
   */
  margin?: string;
};

/**
 * Hook detects wether element is on screen or not.
 * @example ```tsx
 * const ref = useRef<T>(null);
 * const isOnScreen = useOnScreen({ref});
 *
 * return (<div ref={ref}>{isOnScreen ? 'On screen!' : 'Not on screen'}</div>);
 * ```
 * @param {UseOnScreenSettings} useOnScreenProps - Props.
 * @returns - Is element on screen.
 */
export const useOnScreen = <T extends HTMLElement>({
  ref,
  threshold = 0,
  once = false,
  margin,
}: UseOnScreenSettings<T>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        once && entry.isIntersecting && observer.disconnect();
      },
      {
        threshold,
        rootMargin: margin,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, once, margin]);

  return isIntersecting;
};
