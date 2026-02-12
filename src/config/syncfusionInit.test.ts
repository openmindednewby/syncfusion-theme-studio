import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRegisterLicense = vi.fn();

vi.mock('@syncfusion/ej2-base', () => ({
  registerLicense: mockRegisterLicense,
}));

describe('syncfusionInit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('calls registerLicense when VITE_SYNCFUSION_LICENSE_KEY is set', async () => {
    vi.stubEnv('VITE_SYNCFUSION_LICENSE_KEY', 'test-key-123');

    await import('./syncfusionInit');

    expect(mockRegisterLicense).toHaveBeenCalledOnce();
    expect(mockRegisterLicense).toHaveBeenCalledWith('test-key-123');

    vi.unstubAllEnvs();
  });

  it('does not call registerLicense when VITE_SYNCFUSION_LICENSE_KEY is empty', async () => {
    vi.stubEnv('VITE_SYNCFUSION_LICENSE_KEY', '');

    await import('./syncfusionInit');

    expect(mockRegisterLicense).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });

  it('does not call registerLicense when VITE_SYNCFUSION_LICENSE_KEY is undefined', async () => {
    vi.stubEnv('VITE_SYNCFUSION_LICENSE_KEY', undefined as unknown as string);

    await import('./syncfusionInit');

    expect(mockRegisterLicense).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });
});
