import type { ReactNode } from 'react';

import '@testing-library/jest-dom/vitest';
import { vi, beforeEach } from 'vitest';

// Helper function to check if value is defined - ignoring no-null-check rule for utility
// eslint-disable-next-line no-null-check/no-null-check
const isValueDefined = (value: unknown): boolean => value !== null && value !== undefined;

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string | undefined>) => {
      if (isValueDefined(options?.['p1'])) return `${key} - ${String(options?.['p1'])}`;
      return key;
    },
    i18n: { language: 'en' },
  }),
  i18nextProvider: ({ children }: { children: ReactNode }) => children,
}));

// Mock i18n module
vi.mock('@/localization/i18n', () => ({
  default: {
    t: (key: string, options?: Record<string, string | undefined>) => {
      if (isValueDefined(options?.['p1'])) return `${key} - ${String(options?.['p1'])}`;
      return key;
    },
    language: 'en',
  },
}));

// Mock react-router-dom navigation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  };
});

// Mock window.matchMedia for theme detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock document.documentElement for CSS variable injection
const mockStyle = {
  setProperty: vi.fn(),
};

const mockClassList = {
  add: vi.fn(),
  remove: vi.fn(),
  contains: vi.fn(() => false),
  toggle: vi.fn(),
};

Object.defineProperty(document.documentElement, 'style', {
  value: mockStyle,
  writable: true,
});

Object.defineProperty(document.documentElement, 'classList', {
  value: mockClassList,
  writable: true,
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
  callback(0);
  return 0;
});

// Clear mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
