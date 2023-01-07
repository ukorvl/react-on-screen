import { Children, useRef, RefObject, ReactElement } from 'react';
import { UseOnScreenSettings, useOnScreen } from './useOnScreen';

/**
 * OnScreen component props.
 */
type OnScreenProps<T extends HTMLElement> = {
  /**
   * Render function.
   */
  children: (props: { isOnScreen: boolean; ref: RefObject<T> }) => ReactElement;
} & Omit<UseOnScreenSettings<T>, 'ref'>;

/**
 * Headless wrapper component to detect react element visibility.
 * @example ```tsx
 * <OnScreen>
 *   {({isOnScreen, ref}) => (
 *     <div ref={ref}>
 *       {isOnScreen ? 'I am on screen!' : 'I'm not on screen'}
 *     </div>
 *   )}
 * </OnScreen>
 * ```
 * @param {OnScreenProps} onScreenComponentProps Props.
 * @returns Children.
 */
export const OnScreen = <T extends HTMLElement>({
  children,
  ...rest
}: OnScreenProps<T>): ReactElement => {
  const ref = useRef<T>(null);
  const isOnScreen = useOnScreen({ ref, ...rest });

  return Children.only(children({ ref, isOnScreen }));
};
