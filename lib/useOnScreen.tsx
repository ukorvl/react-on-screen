import { RefObject, useEffect, useState } from 'react';

/**
 * UseOnScreen hook settings.
 */
export type UseOnScreenSettings<T extends HTMLElement = HTMLElement> = {
  /**
   * Target React element ref.
   */
  ref: RefObject<T>;
  /**
   * Visibility threshold.
   * Set 1 to consider visibility only if all element is on screen.
   * If array of thresholds is provided, visibility detection will be triggered every time visibility passes
   * one of provided thresholds.
   * @default 0
   */
  threshold?: number | Array<number>;
  /**
   * Triggers visibility detection only once. Works like appear on screen trigger. Once element
   * becomes vivisble, visibility detection will be disabled.
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
 * const {isOnScreen} = useOnScreen({ref});
 *
 * return (<div ref={ref}>{isOnScreen ? 'On screen!' : 'Not on screen'}</div>);
 * ```
 * @param {UseOnScreenSettings} useOnScreenProps - Props.
 * @returns .
 */
export const useOnScreen = <T extends HTMLElement>({
  ref,
  threshold = 0,
  once = false,
  margin,
}: UseOnScreenSettings<T>) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState<number>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, intersectionRatio } = entry;

        setIntersecting(isIntersecting);
        setIntersectionRatio(intersectionRatio);

        once && isIntersecting && observer.disconnect();
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

  return {
    isOnScreen: isIntersecting,
    visibilityRatio: intersectionRatio,
  };
};
