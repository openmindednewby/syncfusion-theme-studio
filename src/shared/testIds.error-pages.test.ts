import { describe, it, expect } from 'vitest';

import { TestIds } from './testIds';

describe('Error page testIds', () => {
  it('defines unique testIds for each error page go-home button', () => {
    expect(TestIds.ERROR_401_GO_HOME).toBe('error-401-go-home');
    expect(TestIds.ERROR_403_GO_HOME).toBe('error-403-go-home');
    expect(TestIds.ERROR_404_GO_HOME).toBe('error-404-go-home');
    expect(TestIds.ERROR_500_GO_HOME).toBe('error-500-go-home');
  });

  it('all error testIds are distinct from each other', () => {
    const ids = [
      TestIds.ERROR_401_GO_HOME,
      TestIds.ERROR_403_GO_HOME,
      TestIds.ERROR_404_GO_HOME,
      TestIds.ERROR_500_GO_HOME,
    ];
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('retains the generic ERROR_GO_HOME for backward compatibility', () => {
    expect(TestIds.ERROR_GO_HOME).toBe('error-go-home');
  });
});
