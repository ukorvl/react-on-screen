import React, { useCallback } from 'react';
import {
  Children,
  useRef,
  RefObject,
  ReactElement,
  ElementType,
  HTMLAttributes,
} from 'react';
import { UseOnScreenSettings, useOnScreen } from './useOnScreen';

/**
 * OnScreen component props.
 */
type OnScreenProps<
  T extends HTMLElement,
  AS extends ElementType = ElementType,
> = {
  /**
   * Render function.
   */
  children: (props: { isOnScreen: boolean; ref: RefObject<T> }) => ReactElement;
  /**
   * Element to render.
   */
  as?: AS;
} & Omit<UseOnScreenSettings<T>, 'ref'> &
  Omit<HTMLAttributes<AS>, 'children'>;

/**
 * Wrapper component to detect react element visibility.
 * It's headless, but using 'as' prop can render an element.
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
  as: As,
  ...rest
}: OnScreenProps<T>): ReactElement => {
  const ref = useRef<T>(null);
  const isOnScreen = useOnScreen({ ref, ...rest });
  const renderer = useCallback(
    () => Children.only(children({ ref, isOnScreen })),
    [isOnScreen],
  );

  if (As !== undefined) {
    return <As>{renderer()}</As>;
  }

  return renderer();
};
