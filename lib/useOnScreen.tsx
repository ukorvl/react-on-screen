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
   * Visibility threshold.
   * Set 1 to consider visibility only if all element is on screen.
   * If array of thresholds is passed, visibility detection will be triggered every time visibility passes
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
  /**
   * Callback to execute on visibility change.
   */
  onVisibilityChange?: OnVisibilityChangeCb;
};

/**
 * Callback to execute on visibility change
 */
export type OnVisibilityChangeCb = (params: {
  /**
   * Is element on screen.
   */
  isOnScreen: boolean;
  /**
   * Element visibility ratio.
   */
  visibilityRatio: number;
}) => void;

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
  onVisibilityChange,
}: UseOnScreenSettings<T>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, intersectionRatio } = entry;

        setIntersecting(isIntersecting);

        onVisibilityChange &&
          onVisibilityChange({
            isOnScreen: isIntersecting,
            visibilityRatio: intersectionRatio,
          });

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
  }, [ref, threshold, once, margin, onVisibilityChange]);

  return isIntersecting;
};
