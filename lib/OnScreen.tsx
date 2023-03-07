import React, {
  useCallback,
  Children,
  useRef,
  RefObject,
  ReactElement,
  ElementType,
  ComponentProps,
} from 'react';
import { UseOnScreenParameters, useOnScreen } from './useOnScreen';

/**
 * OnScreen component own props.
 */
type OnScreenOwnProps<
  T extends HTMLElement,
  AS extends ElementType = ElementType,
> = {
  /**
   * Render function.
   */
  children: (
    props: { ref: RefObject<T> } & ReturnType<typeof useOnScreen>,
  ) => ReactElement;
  /**
   * Element to render.
   */
  as?: AS;
} & Omit<UseOnScreenParameters<T>, 'ref'>;

/**
 * OnScreen component props with generic element props.
 */
export type OnScreenProps<
  T extends HTMLElement,
  AS extends ElementType = ElementType,
> = OnScreenOwnProps<T, AS> &
  Omit<ComponentProps<AS>, keyof OnScreenOwnProps<T, AS>>;

/**
 * Wrapper component to detect react element visibility.
 * It's headless, but with 'as' prop custom element can be rendered.
 * @example ```tsx
 * <OnScreen>
 *   {({isOnScreen, ref}) => (
 *     <div ref={ref}>
 *       {isOnScreen ? 'On screen!' : 'Not on screen'}
 *     </div>
 *   )}
 * </OnScreen>
 * ```
 * @param {OnScreenProps} onScreenComponentProps Props.
 * @returns Children elements with on-screen wrapper.
 */
export const OnScreen = <
  T extends HTMLElement,
  AS extends ElementType = ElementType,
>({
  children,
  margin,
  threshold,
  once,
  as,
  ...restProps
}: OnScreenProps<T, AS>): ReactElement => {
  const Component: ElementType | undefined = as;
  const ref = useRef<T>(null);
  const useOnScreenData = useOnScreen({
    ref,
    margin,
    threshold,
    once,
  });

  const renderChildren = useCallback(
    () => Children.only(children({ ref, ...useOnScreenData })),
    [useOnScreenData, children, ref],
  );

  if (Component !== undefined) {
    return <Component {...restProps}>{renderChildren()}</Component>;
  }

  return renderChildren();
};
