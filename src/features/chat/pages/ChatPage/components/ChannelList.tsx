import { memo, useCallback } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import type { ChatChannel } from '../../../types';

interface ChannelListProps {
  channels: ChatChannel[];
  activeChannelId: number | null;
  onSelectChannel: (id: number) => void;
}

const ChannelList = memo(
  ({ channels, activeChannelId, onSelectChannel }: ChannelListProps): JSX.Element => {
    const handleClick = useCallback(
      (id: number) => () => {
        onSelectChannel(id);
      },
      [onSelectChannel],
    );

    return (
      <div
        className="flex h-full w-72 flex-col border-r border-border-primary bg-surface-secondary"
        data-testid={TestIds.CHAT_CHANNEL_LIST}
      >
        <div className="border-b border-border-primary p-4">
          <h2 className="text-lg font-semibold text-text-primary">
            {FM('chat.channels')}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {channels.map((channel) => {
            const isActive = channel.id === activeChannelId;
            return (
              <button
                key={channel.id}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-text-secondary hover:bg-surface-hover'
                }`}
                data-testid={TestIds.CHAT_CHANNEL_ITEM}
                type="button"
                onClick={handleClick(channel.id)}
              >
                <span className="text-xl">{channel.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{channel.name}</div>
                  <div className="truncate text-xs text-text-muted">
                    {channel.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

ChannelList.displayName = 'ChannelList';

export { ChannelList };
