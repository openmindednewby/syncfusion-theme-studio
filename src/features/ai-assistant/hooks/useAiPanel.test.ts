import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAiPanel } from './useAiPanel';

describe('useAiPanel', () => {
  it('starts closed', () => {
    const { result } = renderHook(() => useAiPanel());
    expect(result.current.isOpen).toBe(false);
  });

  it('opens the panel', () => {
    const { result } = renderHook(() => useAiPanel());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('closes the panel', () => {
    const { result } = renderHook(() => useAiPanel());
    act(() => result.current.open());
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles the panel state', () => {
    const { result } = renderHook(() => useAiPanel());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
