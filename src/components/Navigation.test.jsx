import {  describe,test, vi } from 'vitest';
import { render, screen ,fireEvent} from '@testing-library/react';
import { BrowserRouter,MemoryRouter  } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation test', () => {
  test('should switch className when clicking a button', () => {
    render(
      <BrowserRouter >
        <Navigation />
      </BrowserRouter >
    );

    const ul = screen.getByRole('list');
    const btn = screen.getByRole('button');
    
    expect(ul.className).toContain('nav-menu');

    expect(btn.className).toContain('hamburger');

    fireEvent.click(btn);

    expect(ul.className).toContain('nav-menu');
    expect(ul.className).toContain('active');

    expect(btn.className).toContain('hamburger');
    expect(btn.className).toContain('active');
  });
  test('should render links and navigate to the correct pages', async () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const pictureOfTheDayLink = screen.getByRole('link', { name: 'Picture Of The Day' });
    const marsRoverLink = screen.getByRole('link', { name: 'Mars Rover' });
    const apolloLaunchLink = screen.getByRole('link', { name: 'Apollo Launch' });
    const nearEarthObjectsLink = screen.getByRole('link', { name: 'Near Earth Objects' });
    const nasaProjectsLink = screen.getByRole('link', { name: 'Nasa Projects' });
    expect(pictureOfTheDayLink.getAttribute('href')).toEqual('/');
    expect(marsRoverLink.getAttribute('href')).toEqual('/MarsRover');
    expect(apolloLaunchLink.getAttribute('href')).toEqual('/ApolloLaunch');
    expect(nearEarthObjectsLink.getAttribute('href')).toEqual('/NearEarthObjects');
    expect(nasaProjectsLink.getAttribute('href')).toEqual('/projects');


    // Navigate to a page by clicking on the link
    
     fireEvent.click(marsRoverLink);
      expect(window.location.pathname).toEqual('/MarsRover');
     fireEvent.click(apolloLaunchLink);
     expect(window.location.pathname).toEqual('/ApolloLaunch');
     fireEvent.click(nearEarthObjectsLink);
     expect(window.location.pathname).toEqual('/NearEarthObjects');
     fireEvent.click(nasaProjectsLink);
     expect(window.location.pathname).toEqual('/projects');
     fireEvent.click(pictureOfTheDayLink);
     expect(window.location.pathname).toEqual('/');
  });
});
