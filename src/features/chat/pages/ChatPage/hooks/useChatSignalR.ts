import { useCallback, useEffect, useRef } from 'react';

import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';

import { useQueryClient } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';

import { isValueDefined } from '@/utils';

import { CHAT_HUB_URL, CHAT_QUERY_KEYS } from '../../../constants';

import type { ChatMessage } from '../../../types';
import type { HubConnection } from '@microsoft/signalr';

/**
 * Hook managing the SignalR connection for real-time chat messages.
 * Joins/leaves channel groups and invalidates query cache on new messages.
 */
export function useChatSignalR(activeChannelId: number | null): void {
  const queryClient = useQueryClient();
  const connectionRef = useRef<HubConnection | null>(null);
  const activeChannelRef = useRef<number | null>(null);

  useEffect(() => {
    const connection = buildConnection(queryClient);
    connectionRef.current = connection;
    startConnection(connection).catch(() => undefined);
    return () => { connection.stop().catch(() => undefined); };
  }, [queryClient]);

  const joinChannel = useCallback(async (channelId: number) => {
    const conn = connectionRef.current;
    if (isValueDefined(conn) && conn.state === HubConnectionState.Connected)
      await conn.invoke('JoinChannel', channelId);
  }, []);

  const leaveChannel = useCallback(async (channelId: number) => {
    const conn = connectionRef.current;
    if (isValueDefined(conn) && conn.state === HubConnectionState.Connected)
      await conn.invoke('LeaveChannel', channelId);
  }, []);

  useEffect(() => {
    const previousChannel = activeChannelRef.current;
    if (isValueDefined(previousChannel))
      leaveChannel(previousChannel).catch(() => undefined);
    if (isValueDefined(activeChannelId))
      joinChannel(activeChannelId).catch(() => undefined);
    activeChannelRef.current = activeChannelId;
  }, [activeChannelId, joinChannel, leaveChannel]);
}

/** Starts a connection, suppressing errors when the hub is unavailable. */
export async function startConnection(connection: HubConnection): Promise<void> {
  await connection.start().catch(() => undefined);
}

/** Creates a SignalR connection and registers the message handler. */
function buildConnection(queryClient: QueryClient): HubConnection {
  const connection = new HubConnectionBuilder()
    .withUrl(CHAT_HUB_URL)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.None)
    .build();

  connection.on('ReceiveChatMessage', (message: ChatMessage) => {
    queryClient
      .invalidateQueries({ queryKey: CHAT_QUERY_KEYS.messages(message.channelId) })
      .catch(() => undefined);
  });

  connection.onclose(() => undefined);

  return connection;
}
