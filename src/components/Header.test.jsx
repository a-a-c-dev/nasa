import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header test', () => {
  test('should render text props ', () => {
    const wrapper = render(<Header text="text..." />);
    const h1 = wrapper.container.querySelector('h1');
    expect(h1?.textContent).toBe('text...');
  });
});