import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('has the correct text', () => {
    render(<App />);
    expect(screen.getByText('Weather Forecast & Traffic Cam Website')).toBeTruthy();
  });
});
