import React, { useRef, ComponentType, forwardRef, ForwardedRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { UseOnScreenParameters, useOnScreen } from './useOnScreen';
import { assignRefs } from './internal';

/**
 * WithOnScreen wrapped component with injected props.
 */
export type WithOnScreenWrappedComponent<Props extends Record<string, unknown>,> = ComponentType<
  Props & ReturnType<typeof useOnScreen>
>;

/**
 * High order component that takes a component and injects onScreen props into it.
 * @example ```tsx
 * const List = forwardRef(function List({isOnScreen, ...restProps}: ListProps, ref) {
 *   return (
 *     <ul ref={ref} className={isOnScreen ? 'my-class' : ''} {...restProps}>
 *      <li>Something</li>
 *        ...
 *     </ul>
 *   )
 * });
 *
 * export const ListWithOnScreen = WithOnScreen(List, {threshold: 0.5, margin: '4rem'});
 * ```
 * @param WrappedComponent Component to inject props.
 * @param settings Wrapper settings.
 * @returns Wrapped component with onScreen props.
 */
export const withOnScreen = <P extends Record<string, unknown>, T extends HTMLElement>(
  WrappedComponent: WithOnScreenWrappedComponent<P>,
  settings?: Omit<UseOnScreenParameters<T>, 'ref'>,
) => {
  const WithOnScreen = (props: P, forwardedRef: ForwardedRef<T>) => {
    const ref = useRef<T>(null);
    const useOnScreenData = useOnScreen({ ref, ...settings });

    return <WrappedComponent ref={assignRefs(ref, forwardedRef)} {...useOnScreenData} {...props} />;
  };

  hoistNonReactStatics(WithOnScreen, WrappedComponent);

  WithOnScreen.displayName = `WithOnScreen(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return forwardRef(WithOnScreen);
};
