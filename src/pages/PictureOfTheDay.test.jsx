import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import PictureOfTheDay from './PictureOfTheDay';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

describe('Picture Of The Day test', () => {
  let wrapper;

  beforeAll(async () => {
    wrapper = await render(
      <BrowserRouter>
        <PictureOfTheDay />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() => wrapper.container.querySelector(".loader"), { timeout: 5000, onError: (error) => console.error(error) });

  });

  test('should render elements ', async () => { 
            const cards = await waitFor(()=>wrapper.container.querySelectorAll('.card'));
            expect(cards.length).toBe(9);
  });
});