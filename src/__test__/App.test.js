import { screen } from '@testing-library/react';
import { render } from 'react-dom';
import { TermsOfService } from '../pages';

test('renders lemox', () => {
  render(<TermsOfService />);
  const displayText = screen.getAllByText(/lemox/);
  expect(displayText).toBeInTheDocument();
});
