import { memo, useCallback, useMemo, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import { DEFAULT_CHANNEL_ID } from '../../constants';
import { ChannelHeader } from './components/ChannelHeader';
import { ChannelList } from './components/ChannelList';
import { MessageInput } from './components/MessageInput';
import { MessageList } from './components/MessageList';
import { useChatMessages } from './hooks/useChatMessages';
import { useChatSignalR } from './hooks/useChatSignalR';

const ChatPage = memo((): JSX.Element => {
  const [activeChannelId, setActiveChannelId] = useState<number | null>(
    DEFAULT_CHANNEL_ID,
  );

  const { channels, messages, isLoadingMessages, send } =
    useChatMessages(activeChannelId);

  useChatSignalR(activeChannelId);

  const activeChannel = useMemo(
    () => channels.find((c) => c.id === activeChannelId),
    [channels, activeChannelId],
  );

  const handleSend = useCallback(
    (content: string) => {
      if (!isValueDefined(activeChannelId)) return;
      send.mutate({ channelId: activeChannelId, content });
    },
    [activeChannelId, send],
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden" data-testid={TestIds.CHAT_PAGE}>
      <ChannelList
        activeChannelId={activeChannelId}
        channels={channels}
        onSelectChannel={setActiveChannelId}
      />
      <div className="flex flex-1 flex-col">
        <ChannelHeader channel={activeChannel} />
        {!isValueDefined(activeChannelId) ? (
          <div className="flex flex-1 items-center justify-center text-text-muted">
            {FM('chat.noChannelSelected')}
          </div>
        ) : (
          <>
            <MessageList isLoading={isLoadingMessages} messages={messages} />
            <MessageInput disabled={send.isPending} onSend={handleSend} />
          </>
        )}
      </div>
    </div>
  );
});

ChatPage.displayName = 'ChatPage';

export default ChatPage;
