import React, { forwardRef } from 'react';
import { useOnScreen } from '../useOnScreen';
import { withOnScreen } from '../withOnScreen';
import {
  ComponentRenderer,
  createIsOnScreenValueTest,
  createOnceParameterTest,
  createRenderTest,
} from './testUtils';

const ComponentTemplate = forwardRef<
  HTMLDivElement,
  ReturnType<typeof useOnScreen>
>(function ComponentTemplate({ isOnScreen }, ref) {
  return (
    <div
      ref={ref}
      data-testid={`target${isOnScreen ? '-isOnScreen' : ''}`}
    />
  );
});

const renderComponent: ComponentRenderer = settings => {
  const WithOnScreen = withOnScreen(ComponentTemplate, settings);
  return <WithOnScreen />;
};

describe('withOnScreen', () => {
  it('withOnScreen component renders', createRenderTest(renderComponent));

  it('isOnScreen value changes', createIsOnScreenValueTest(renderComponent));

  it(
    'Once prop is working as expected',
    createOnceParameterTest(renderComponent),
  );
});
