import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import NasaProjects from './NasaProjects';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch';

describe('Nasa Projects test', () => {
  let wrapper;

  beforeAll(async () => {
    wrapper = await render(
      <BrowserRouter>
        <NasaProjects />
      </BrowserRouter>
    );
    await waitForElementToBeRemoved(() => wrapper.container.querySelector(".loader"), { timeout: 5000, onError: (error) => console.error(error) });

  });

  test('should render elements ', async () => { 
            const projects = await waitFor(()=>wrapper.container.querySelectorAll('.project'));
            expect(projects.length).toBe(10);
  });
});