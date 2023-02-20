import React, { useRef } from 'react';
import { useOnScreen, UseOnScreenSettings } from '../useOnScreen';
import {
  ComponentRenderer,
  createIsOnScreenValueTest,
  createOnceParameterTest,
  createRenderTest,
} from './testUtils';

const ComponentTemplate = (props: Pick<UseOnScreenSettings, 'once'>) => {
  const ref = useRef(null);
  const { isOnScreen } = useOnScreen({ ref, ...props });

  return (
    <div
      ref={ref}
      data-testid={`target${isOnScreen ? '-isOnScreen' : ''}`}
    />
  );
};

const renderComponent: ComponentRenderer = settings => (
  <ComponentTemplate {...settings} />
);

describe('useOnScreen', () => {
  it('useOnScreen component renders', createRenderTest(renderComponent));

  it('isOnScreen value changes', createIsOnScreenValueTest(renderComponent));

  it(
    'Once prop is working as expected',
    createOnceParameterTest(renderComponent),
  );
});
