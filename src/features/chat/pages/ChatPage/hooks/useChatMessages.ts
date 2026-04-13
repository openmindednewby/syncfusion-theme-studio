import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/axiosInstance';
import { isValueDefined } from '@/utils';

import {
  CHAT_CHANNELS_URL,
  CHAT_QUERY_KEYS,
  CURRENT_USER,
} from '../../../constants';

import type { ChatChannel, ChatMessage } from '../../../types';

async function fetchChannels(): Promise<ChatChannel[]> {
  const response = await apiClient.get<ChatChannel[]>(CHAT_CHANNELS_URL);
  return response.data;
}

async function fetchMessages(channelId: number): Promise<ChatMessage[]> {
  const url = `${CHAT_CHANNELS_URL}/${String(channelId)}/messages`;
  const response = await apiClient.get<ChatMessage[]>(url);
  return response.data;
}

interface SendMessagePayload {
  channelId: number;
  content: string;
}

async function sendMessage(payload: SendMessagePayload): Promise<ChatMessage> {
  const url = `${CHAT_CHANNELS_URL}/${String(payload.channelId)}/messages`;
  const response = await apiClient.post<ChatMessage>(url, {
    channelId: payload.channelId,
    senderName: CURRENT_USER.name,
    senderAvatar: CURRENT_USER.avatar,
    content: payload.content,
  });
  return response.data;
}

interface UseChatMessagesResult {
  channels: ChatChannel[];
  isLoadingChannels: boolean;
  messages: ChatMessage[];
  isLoadingMessages: boolean;
  send: ReturnType<typeof useMutation<ChatMessage, Error, SendMessagePayload>>;
}

/** Hook providing chat channel listing and message CRUD. */
export function useChatMessages(activeChannelId: number | null): UseChatMessagesResult {
  const queryClient = useQueryClient();

  const { data: channels, isLoading: isLoadingChannels } = useQuery({
    queryKey: CHAT_QUERY_KEYS.channels,
    queryFn: fetchChannels,
  });

  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(activeChannelId ?? 0),
    queryFn: async () => fetchMessages(activeChannelId ?? 0),
    enabled: isValueDefined(activeChannelId),
  });

  const send = useMutation({
    mutationFn: sendMessage,
    onSuccess: (_data, variables) => {
      queryClient
        .invalidateQueries({
          queryKey: CHAT_QUERY_KEYS.messages(variables.channelId),
        })
        .catch(() => undefined);
    },
  });

  return {
    channels: channels ?? [],
    isLoadingChannels,
    messages: messages ?? [],
    isLoadingMessages,
    send,
  };
}
