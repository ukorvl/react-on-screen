import { ReactNode, Children, useRef, RefObject } from 'react';
import { UseOnScreenSettings, useOnScreen } from './useOnScreen';

/**
 * OnScreen component props.
 */
type OnScreenProps<T extends HTMLElement> = {
  /**
   * Render function.
   */
  children: ({
    isOnScreen,
    ref,
  }: {
    isOnScreen: boolean,
    ref: RefObject<T>
  }) => ReactNode;
} & Omit<UseOnScreenSettings<T>, 'ref'>;

/**
 * Headless wrapper component to detect react element visibility.
 * @example ```tsx
 * <OnScreen>
 *   {({isOnScreen, ref}) => (
 *     <div ref={ref}>
*        {isOnScreen && 'I am visible!'}
 *     </div>
 *   )}
 * </OnScreen>
 * ```
 */
export const OnScreen = <T extends HTMLElement>({children, ...rest}: OnScreenProps<T>) => {
  const ref = useRef<T>(null);
  const isOnScreen = useOnScreen({ref, ...rest});

  return Children.only(children({ref, isOnScreen}));
};
