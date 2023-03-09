import {describe, afterEach, expect, test} from "vitest"
import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('should initialize value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('test value'));

    const { result } = renderHook(() => useLocalStorage('testKey', 'initial value'));

    expect(result.current[0]).toEqual('test value');
  });

  test('should update storage when value is set', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial value'));

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.getItem('testKey')).toEqual(JSON.stringify('new value'));
  });
});