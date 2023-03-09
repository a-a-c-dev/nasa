import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import ApolloLaunch from './ApolloLaunch';
import userEvent from '@testing-library/user-event'

import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

describe('Apollo Launch test', () => {
  let wrapper;

  beforeAll(async () => {
    wrapper = await render(
      <BrowserRouter>
        <ApolloLaunch />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() => wrapper.container.querySelector(".loader"), { timeout: 5000, onError: (error) => console.error(error) });

  });

  test('should render elements ', async () => { 
            const cards = await waitFor(()=>wrapper.container.querySelectorAll('.card'));
            expect(cards.length).toBe(19);
            userEvent.dblClick(cards[0]);
            const modalOverlay = await waitFor(()=>wrapper.container.querySelectorAll('.modal-overlay'));
            expect(modalOverlay).toBeDefined()
            await waitFor(()=>console.log(modalOverlay))
  });
});