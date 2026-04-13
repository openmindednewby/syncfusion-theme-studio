import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent } from '@/test/utils';

import FormDialogNative from './index';

// Mock DialogNative to avoid native <dialog> complexity in jsdom
vi.mock('@/components/ui/native/DialogNative', () => ({
  default: ({
    children,
    isOpen,
    testId,
    title,
    onClose: _onClose,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
    testId?: string;
    title: string;
    onClose: () => void;
    width?: string | number;
  }) =>
    isOpen ? (
      <div data-testid={testId}>
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

describe('FormDialogNative', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Form',
    onSave: vi.fn(),
    onCancel: vi.fn(),
    testId: 'form-dialog',
  };

  describe('form submission', () => {
    it('calls onSave when form is submitted', () => {
      const onSave = vi.fn();
      render(
        <FormDialogNative {...defaultProps} onSave={onSave}>
          <input data-testid="field" type="text" />
        </FormDialogNative>,
      );

      fireEvent.submit(screen.getByTestId('form-dialog').querySelector('form')!);
      expect(onSave).toHaveBeenCalledOnce();
    });

    it('does not call onSave when saveDisabled is true', () => {
      const onSave = vi.fn();
      render(
        <FormDialogNative {...defaultProps} saveDisabled onSave={onSave}>
          <input type="text" />
        </FormDialogNative>,
      );

      fireEvent.submit(screen.getByTestId('form-dialog').querySelector('form')!);
      expect(onSave).not.toHaveBeenCalled();
    });
  });

  describe('cancel behavior', () => {
    it('calls onCancel when cancel button is clicked', () => {
      const onCancel = vi.fn();
      render(
        <FormDialogNative {...defaultProps} cancelTestId="cancel-btn" onCancel={onCancel}>
          <input type="text" />
        </FormDialogNative>,
      );

      fireEvent.click(screen.getByTestId('cancel-btn'));
      expect(onCancel).toHaveBeenCalledOnce();
    });
  });

  describe('button text customization', () => {
    it('uses custom save text when provided', () => {
      render(
        <FormDialogNative {...defaultProps} saveTestId="save-btn" saveText="Create">
          <input type="text" />
        </FormDialogNative>,
      );

      expect(screen.getByTestId('save-btn').textContent).toBe('Create');
    });

    it('uses custom cancel text when provided', () => {
      render(
        <FormDialogNative {...defaultProps} cancelTestId="cancel-btn" cancelText="Discard">
          <input type="text" />
        </FormDialogNative>,
      );

      expect(screen.getByTestId('cancel-btn').textContent).toBe('Discard');
    });
  });

  describe('disabled state', () => {
    it('disables save button when saveDisabled is true', () => {
      render(
        <FormDialogNative {...defaultProps} saveDisabled saveTestId="save-btn">
          <input type="text" />
        </FormDialogNative>,
      );

      const saveBtn = screen.getByTestId('save-btn');
      expect(saveBtn).toHaveProperty('disabled', true);
    });
  });

  describe('visibility', () => {
    it('returns null when isOpen is false', () => {
      render(
        <FormDialogNative {...defaultProps} isOpen={false}>
          <input type="text" />
        </FormDialogNative>,
      );

      expect(screen.queryByTestId('form-dialog')).toBeNull();
    });
  });
});
