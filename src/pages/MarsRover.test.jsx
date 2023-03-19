import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import MarsRover from './MarsRover';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

describe('Mars rover test', () => {
  let wrapper;

  beforeAll(async () => {
    wrapper = await render(
      <BrowserRouter>
        <MarsRover />
      </BrowserRouter>
    );
  });

  test('should render elements and perform button click', async () => {
    waitForElementToBeRemoved(screen.getByText("Loading...")).then(async () =>{

      const rightBtn = await waitFor(() => wrapper.container.querySelector('.next'));
      const leftBtn = await waitFor(() => wrapper.container.querySelector('.prev'));
  
      const cards = await waitFor(()=>wrapper.container.querySelectorAll('.card'));
      expect(cards.length).toBe(30)
      expect(cards[0].classList.contains('active')).toBe(true);
      fireEvent.click(rightBtn);    
      expect(cards[0].classList.contains('active')).toBe(false);
      expect(cards[1].classList.contains('active')).toBe(true);
      fireEvent.click(rightBtn);          
      expect(cards[2].classList.contains('active')).toBe(true);
      
      fireEvent.click(leftBtn);          
      
      expect(cards[1].classList.contains('active')).toBe(true);
      fireEvent.click(leftBtn);          
      expect(cards[0].classList.contains('active')).toBe(true);
      
      fireEvent.click(leftBtn);          
      
      expect(cards[29].classList.contains('active')).toBe(true);
    }
    
  );

  });
});