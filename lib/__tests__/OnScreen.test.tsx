import React from 'react';
import { OnScreen } from '../OnScreen';
import {
  ComponentRenderer,
  createIsOnScreenValueTest,
  createOnceParameterTest,
  createRenderTest,
} from './testUtils';

const renderComponent: ComponentRenderer = settings => (
  <OnScreen<HTMLDivElement> {...settings}>
    {({ ref, isOnScreen }) => (
      <div
        ref={ref}
        data-testid={`target${isOnScreen ? '-isOnScreen' : ''}`}
      />
    )}
  </OnScreen>
);

describe('OnScreen', () => {
  it('OnScreen component renders', createRenderTest(renderComponent));

  it('isOnScreen value changes', createIsOnScreenValueTest(renderComponent));

  it(
    'Once prop is working as expected',
    createOnceParameterTest(renderComponent),
  );
});
