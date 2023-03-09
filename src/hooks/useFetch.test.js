import { describe, test } from 'vitest';
import { rest } from 'msw';
import 'whatwg-fetch';
import { setupServer } from 'msw/node';
import { renderHook } from '@testing-library/react-hooks';

import useFetch from './useFetch';

const server = setupServer(
  rest.get('https://api.nasa.gov/neo/rest/v1/neo/browse', (req, res, ctx) => {
    return res(ctx.json({ near_earth_objects: ['object1', 'object2'] }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useFetch', () => {
    test('should fetch data from a mock API', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
          useFetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=test-key', 'test-data')
        );
      
        expect(result.current).toEqual({
          loading: true,
          data: null,
          error: null,
        });
      
        await waitForNextUpdate();
      
        expect(result.current).toEqual({
          loading: false,
          data: { near_earth_objects: ['object1', 'object2'] },
          error: null,
        });
    });
      
  
});

