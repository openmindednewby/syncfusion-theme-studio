import { describe, it, expect } from 'vitest';

import { getTabCount } from './index';

describe('SettingsPage', () => {
  describe('getTabCount', () => {
    it('has exactly 3 settings tabs', () => {
      expect(getTabCount()).toBe(3);
    });
  });
});
