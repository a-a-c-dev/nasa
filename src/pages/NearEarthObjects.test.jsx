import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import NearEarthObjects from './NearEarthObjects';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

describe('Near Earth Objects test', () => {
  let wrapper;

  beforeAll(async () => {
    wrapper = await render(
      <BrowserRouter>
        <NearEarthObjects />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() => wrapper.container.querySelector(".loader"), { timeout: 5000, onError: (error) => console.error(error) });

  });

  test('should render elements', async () => { 
            const nearEarthObjectsElements = await waitFor(()=>wrapper.container.querySelectorAll('.list-container'));
            expect(nearEarthObjectsElements.length).toBe(20);
  });
});