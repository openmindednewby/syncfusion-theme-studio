import { describe, expect, it, vi } from 'vitest';

import { Mode } from '../types';
import { createExportImportActions, createThemeUpdateActions } from './themeActions';
import { DEFAULT_THEME } from '../utils/defaultTheme';


import type { ThemeConfig } from '../types';
import type { GetState, SetState } from './types';

// Mock injectThemeVariables so it does not attempt real DOM manipulation
vi.mock('../utils/themeInjector', () => ({
  injectThemeVariables: vi.fn(),
}));

/** Minimal valid theme JSON that passes isValidThemeConfig */
function makeMinimalTheme(overrides: Partial<ThemeConfig> = {}): ThemeConfig {
  return { ...DEFAULT_THEME, ...overrides };
}

interface MockState {
  theme: ThemeConfig;
  mode: Mode;
}

function createMockStore(theme?: ThemeConfig): { set: SetState; get: GetState; getState: () => MockState } {
  let state: MockState = { theme: theme ?? DEFAULT_THEME, mode: Mode.Light };
  const set: SetState = (partial) => {
    state = { ...state, ...partial };
  };
  const get: GetState = () => state as ReturnType<GetState>;
  return { set, get, getState: () => state };
}

// ── exportTheme ───────────────────────────────────────────────────────

describe('exportTheme', () => {
  it('returns a JSON string of the current theme', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    const json = actions.exportTheme();
    const parsed = JSON.parse(json) as ThemeConfig;
    expect(parsed.id).toBe(DEFAULT_THEME.id);
  });

  it('includes 2-space indentation', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    const json = actions.exportTheme();
    expect(json).toContain('\n  ');
  });
});

// ── importTheme (exercises deepMerge + isValidThemeConfig) ────────────

describe('importTheme', () => {
  it('returns false for invalid JSON', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('not json')).toBe(false);
  });

  it('returns false for null', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('null')).toBe(false);
  });

  it('returns false for an array', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('[]')).toBe(false);
  });

  it('returns false for missing id', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('{"primary":{}}')).toBe(false);
  });

  it('returns false for empty id', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('{"id":"","primary":{}}')).toBe(false);
  });

  it('returns false for missing primary', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('{"id":"test"}')).toBe(false);
  });

  it('returns false when primary is not an object', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    expect(actions.importTheme('{"id":"test","primary":"red"}')).toBe(false);
  });

  it('returns true for a valid theme config', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    const validJson = JSON.stringify(makeMinimalTheme());
    expect(actions.importTheme(validJson)).toBe(true);
  });

  it('deep-merges imported theme with defaults', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    const partial = { id: 'custom', name: 'Custom', primary: { '500': '#ff0000' } };
    const json = JSON.stringify(partial);
    actions.importTheme(json);

    const imported = store.getState().theme;
    expect(imported.id).toBe('custom');
    // Deep merge should preserve default keys not in partial
    expect(imported.layout).toBeDefined();
  });

  it('imported values override defaults at the same key', () => {
    const store = createMockStore();
    const actions = createExportImportActions(store.set, store.get);
    const customName = 'My Custom Theme';
    const json = JSON.stringify(makeMinimalTheme({ name: customName }));
    actions.importTheme(json);
    expect(store.getState().theme.name).toBe(customName);
  });
});

// ── createThemeUpdateActions ──────────────────────────────────────────

describe('createThemeUpdateActions', () => {
  it('updateTheme merges updates into the current theme', () => {
    const store = createMockStore();
    const actions = createThemeUpdateActions(store.set, store.get);
    actions.updateTheme({ name: 'Updated' });
    expect(store.getState().theme.name).toBe('Updated');
    expect(store.getState().theme.id).toBe(DEFAULT_THEME.id);
  });

  it('resetTheme restores the default theme', () => {
    const customTheme = makeMinimalTheme({ name: 'Custom' });
    const store = createMockStore(customTheme);
    const actions = createThemeUpdateActions(store.set, store.get);
    actions.resetTheme();
    expect(store.getState().theme.name).toBe(DEFAULT_THEME.name);
  });
});
