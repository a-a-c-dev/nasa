import { describe, expect, test ,vi } from 'vitest';
import { render,screen,fireEvent ,getByText} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Calendar from './Calendar';
import { useRef } from 'react';


describe('Calendar component', () => {
  const mockDate = new Date('2023-03-07T00:00:00Z')
  
  beforeAll(() => {
    vi.useFakeTimers(mockDate.getTime())
  })
  
  afterAll(() => {
    vi.useRealTimers()
  })

  test('should render with default props', () => {
    const handleChange = vi.fn()

    const { container } = render(
      <Calendar
        startDate=""
        min=""
        max="30-01-2023"
        handleChange={handleChange}
      />
    )

    const input = container.querySelector('input[type="date"]')
    fireEvent.change(input, { target: { value: '2023-03-10' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('2023-03-10')
  })
})

