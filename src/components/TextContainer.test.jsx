import { describe, expect, test } from 'vitest';
import { render, screen,fireEvent } from '@testing-library/react';
import TextContainer from './TextContainer';

describe('TextContainer test', () => {
  test('should render text props and preform button click', () => {
  
    const wrapper = render(<TextContainer text="text..." />);
    const p = wrapper.container.querySelector('p');
    expect(p?.textContent).toBe('text...');
    const btn = screen.getByRole('button', { name: /Read more/i});
    fireEvent.click(btn);
    expect(btn.textContent).toBe('Read less');
    fireEvent.click(btn);
    expect(btn.textContent).toBe('Read more');
  });
});