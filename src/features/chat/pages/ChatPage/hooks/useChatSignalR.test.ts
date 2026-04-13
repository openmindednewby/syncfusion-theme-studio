import { describe, it, expect, vi } from 'vitest';

import { startConnection } from './useChatSignalR';

import type { HubConnection } from '@microsoft/signalr';

describe('startConnection', () => {
  it('resolves to undefined when start succeeds', async () => {
    const mockConnection = {
      start: vi.fn().mockResolvedValue(undefined),
    } as unknown as HubConnection;

    await expect(startConnection(mockConnection)).resolves.toBeUndefined();
    expect(mockConnection.start).toHaveBeenCalledOnce();
  });

  it('suppresses errors and resolves to undefined when start fails', async () => {
    const mockConnection = {
      start: vi.fn().mockRejectedValue(
        new Error('The connection was stopped during negotiation.'),
      ),
    } as unknown as HubConnection;

    // Should NOT throw — errors are gracefully swallowed
    await expect(startConnection(mockConnection)).resolves.toBeUndefined();
    expect(mockConnection.start).toHaveBeenCalledOnce();
  });

  it('suppresses network errors when hub is unavailable', async () => {
    const mockConnection = {
      start: vi.fn().mockRejectedValue(new Error('Failed to fetch')),
    } as unknown as HubConnection;

    await expect(startConnection(mockConnection)).resolves.toBeUndefined();
  });
});
