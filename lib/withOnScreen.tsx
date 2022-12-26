import React, { useRef, ComponentType, forwardRef, ForwardedRef } from 'react';
import { UseOnScreenSettings, useOnScreen } from './useOnScreen';
import { assignRefs } from './internal';

/**
 * Hight order component that takes a component and injects onScreen props into it.
 * @example ```tsx
 * const List = ({isOnScreen, ref, ...restProps}: ListProps) => (
 *   <ul className={isOnScreen ? 'my-class' : ''} {...restProps}>
 *    <li>Something</li>
 *    ...
 *   </ul>
 * )
 * export const ListWithOnScreen = WithOnScreen(List, {threshold: 0.5});
 * ```
 * @param WrappedComponent Component to inject props.
 * @param settings Wrapper settings.
 * @returns Wrapped component with onScreen props.
 */
export const withOnScreen = <P extends Record<string, unknown>, T extends HTMLElement>(
  WrappedComponent: ComponentType<P>,
  settings: Omit<UseOnScreenSettings<T>, 'ref'>
) => {
  const WithOnScreen = (props: P, forwardedRef: ForwardedRef<T>) => {
    const ref = useRef<T>(null);
    const isOnScreen = useOnScreen({ref, ...settings});

    return (
      <WrappedComponent
        isOnScreen={isOnScreen}
        ref={assignRefs(ref, forwardedRef)}
        {...props}
      />
    );
  };

  WithOnScreen.displayName = `WithOnScreen(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return forwardRef(WithOnScreen) ;
};
