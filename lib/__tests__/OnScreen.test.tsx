import React from 'react';
import { render } from '@testing-library/react';
import { OnScreen } from '../OnScreen';

describe('OnScreen', () => {
  it('Component renders', () => {
    const { container } = render(<OnScreen>{() => <p></p>}</OnScreen>);

    expect(container).toBeInTheDocument();
  });
});
