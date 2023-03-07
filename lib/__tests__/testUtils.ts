/*global expect*/
import { act, render } from '@testing-library/react';
import { mockIntersectionObserver } from 'jsdom-testing-mocks';
import { ReactElement } from 'react';
import { UseOnScreenParameters } from '../useOnScreen';

/**
 * Renders component.
 */
export type ComponentRenderer = (
  settings?: Pick<UseOnScreenParameters, 'once'>,
) => ReactElement;

const targetTestId = 'target';
const targetIsOnScreenTestId = 'target-isOnScreen';

const io = mockIntersectionObserver();

/**
 * Creates test to ensure component renders.
 * @param renderComponent Renders component.
 * @returns Test function.
 */
export const createRenderTest = (renderComponent: ComponentRenderer) => () => {
  const { container } = render(renderComponent());

  expect(container).toBeInTheDocument();
};

/**
 * Creates test to ensure isOnScreen value changes.
 * @param renderComponent Renders component.
 * @returns Test function.
 */
export const createIsOnScreenValueTest =
  (renderComponent: ComponentRenderer) => () => {
    const { getByTestId, queryByTestId } = render(renderComponent());

    expect(getByTestId(targetTestId)).toBeInTheDocument();
    expect(queryByTestId(targetIsOnScreenTestId)).toBeNull();

    act(() => {
      io.enterNode(getByTestId(targetTestId));
    });

    expect(queryByTestId(targetIsOnScreenTestId)).toBeInTheDocument();
  };

/**
 * Creates test to ensure once parameter is working.
 * @param renderComponent Renders component.
 * @returns Test function.
 */
export const createOnceParameterTest =
  (renderComponent: ComponentRenderer) => () => {
    const { queryByTestId, getByTestId } = render(
      renderComponent({ once: true }),
    );

    act(() => {
      io.enterNode(getByTestId(targetTestId));
    });

    expect(queryByTestId(targetIsOnScreenTestId)).toBeInTheDocument();

    act(() => {
      io.leaveNode(getByTestId(targetIsOnScreenTestId));
    });

    expect(getByTestId(targetIsOnScreenTestId)).toBeInTheDocument();
  };
