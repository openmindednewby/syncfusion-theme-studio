import type { CSSProperties } from 'react';

export const CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '6px 12px',
  fontFamily: "'Fira Sans', sans-serif",
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '14px',
  background: 'var(--component-pagination-bg)',
  border: '1px solid var(--component-pagination-border)',
  borderRadius: '4px',
  minHeight: '40px',
};

export const NAV_BTN_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'var(--component-pagination-btn-size, 28px)',
  height: 'var(--component-pagination-btn-size, 28px)',
  minWidth: 'var(--component-pagination-btn-size, 28px)',
  minHeight: 'var(--component-pagination-btn-size, 28px)',
  borderRadius: 'var(--component-pagination-btn-radius)',
  border: 'var(--component-pagination-btn-border-width) solid var(--component-pagination-btn-border-color)',
  background: 'var(--component-pagination-btn-bg)',
  color: 'var(--component-pagination-btn-text)',
  cursor: 'pointer',
  padding: 0,
  fontSize: 'var(--component-pagination-btn-font-size)',
  lineHeight: 1,
};

export const NAV_BTN_DISABLED_STYLE: CSSProperties = {
  ...NAV_BTN_STYLE,
  color: 'var(--component-pagination-nav-disabled)',
  cursor: 'default',
  opacity: 0.5,
};

export const SEPARATOR_STYLE: CSSProperties = {
  width: '1px',
  height: '20px',
  background: 'var(--component-pagination-border)',
  flexShrink: 0,
};

export const LABEL_STYLE: CSSProperties = {
  color: 'var(--component-pagination-text)',
  whiteSpace: 'nowrap',
};

export const INPUT_STYLE: CSSProperties = {
  width: '60px',
  height: '30px',
  borderRadius: '4px',
  border: '1px solid var(--component-pagination-select-border)',
  background: 'var(--component-pagination-select-bg)',
  color: 'var(--component-pagination-select-text)',
  textAlign: 'center',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  padding: '0 4px',
  outline: 'none',
};

export const SELECT_WRAPPER_STYLE: CSSProperties = {
  position: 'relative',
};

export const SELECT_TRIGGER_STYLE: CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '80px',
  height: '30px',
  minWidth: '80px',
  minHeight: '30px',
  borderRadius: '4px',
  border: '1px solid var(--component-pagination-select-border)',
  background: 'var(--component-pagination-select-bg)',
  color: 'var(--component-pagination-select-text)',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  padding: '0 8px',
  cursor: 'pointer',
};

export const SELECT_DROPDOWN_STYLE: CSSProperties = {
  position: 'absolute',
  bottom: '100%',
  left: 0,
  width: '100%',
  marginBottom: '4px',
  borderRadius: '4px',
  border: '1px solid var(--component-pagination-select-border)',
  background: 'var(--component-pagination-select-bg)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  zIndex: 10,
  overflow: 'hidden',
};

export const SELECT_OPTION_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px 8px',
  cursor: 'pointer',
  color: 'var(--component-pagination-select-text)',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  transition: 'background 150ms',
};

export const SELECT_OPTION_ACTIVE_STYLE: CSSProperties = {
  ...SELECT_OPTION_STYLE,
  fontWeight: 500,
};

export const INFO_STYLE: CSSProperties = {
  color: 'var(--component-pagination-info-text)',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
};
