import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { useDialog } from './useDialog';

describe('useDialog', () => {
  let onClose: () => void;

  beforeEach(() => {
    onClose = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('dialogProps', () => {
    it('returns role="dialog" and aria-modal=true', () => {
      const { result } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );

      expect(result.current.dialogProps.role).toBe('dialog');
      expect(result.current.dialogProps['aria-modal']).toBe(true);
    });

    it('returns a titleId matching aria-labelledby', () => {
      const { result } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );

      expect(result.current.titleId).toBeTruthy();
      expect(result.current.dialogProps['aria-labelledby']).toBe(
        result.current.titleId,
      );
    });

    it('generates unique titleIds across instances', () => {
      const { result: result1 } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );
      const { result: result2 } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );

      expect(result1.current.titleId).not.toBe(result2.current.titleId);
    });
  });

  describe('Escape key handling', () => {
    it('calls onClose when Escape is pressed while open', () => {
      renderHook(() => useDialog({ isOpen: true, onClose }));

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape' }),
        );
      });

      expect(onClose).toHaveBeenCalledOnce();
    });

    it('does not call onClose when Escape is pressed while closed', () => {
      renderHook(() => useDialog({ isOpen: false, onClose }));

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape' }),
        );
      });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose for non-Escape keys', () => {
      renderHook(() => useDialog({ isOpen: true, onClose }));

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter' }),
        );
      });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('cleans up keydown listener on unmount', () => {
      const { unmount } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );

      unmount();

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape' }),
        );
      });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('backdrop click handling', () => {
    it('calls onClose when backdrop (currentTarget) is clicked', () => {
      const { result } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );

      const mockEvent = {
        target: document.createElement('div'),
        currentTarget: document.createElement('div'),
      } as unknown as React.MouseEvent;
      // Simulate clicking on the backdrop itself
      Object.defineProperty(mockEvent, 'target', {
        get: () => mockEvent.currentTarget,
      });

      act(() => {
        result.current.backdropProps.onClick(mockEvent);
      });

      expect(onClose).toHaveBeenCalledOnce();
    });

    it('does not call onClose when dialog content is clicked', () => {
      const { result } = renderHook(() =>
        useDialog({ isOpen: true, onClose }),
      );

      const backdrop = document.createElement('div');
      const content = document.createElement('div');
      backdrop.appendChild(content);

      const mockEvent = {
        target: content,
        currentTarget: backdrop,
      } as unknown as React.MouseEvent;

      act(() => {
        result.current.backdropProps.onClick(mockEvent);
      });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('removes keydown listener when dialog transitions to closed', () => {
      const { rerender } = renderHook(
        ({ isOpen }) => useDialog({ isOpen, onClose }),
        { initialProps: { isOpen: true } },
      );

      rerender({ isOpen: false });

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape' }),
        );
      });

      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
