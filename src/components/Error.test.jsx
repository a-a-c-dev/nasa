import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Error from './Error';

describe('Error test', () => {
  test('should render error  props ', () => {
  
    const wrapper = render(<Error error="error" />);
    const div = wrapper.container.querySelector('div');
    expect(div?.textContent).toBe('something went wrong ! please try later  error');
  });
});