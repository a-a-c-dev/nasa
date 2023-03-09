import { describe, expect, test ,vi} from 'vitest';
import { render,screen,fireEvent} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import InputText from './InputText';

describe('InputText test', () => {
  test('should preform handle change', () => {
    const handleChange = vi.fn();
    const wrapper = render(<InputText autoSearch="text..." handleChange={handleChange}/>);
    const inputElement =screen.getByPlaceholderText(/filter by title/i)
    fireEvent.change(inputElement, { target: { value: 'nebula' } });
    expect(handleChange).toHaveBeenCalledWith('nebula');
  });
});