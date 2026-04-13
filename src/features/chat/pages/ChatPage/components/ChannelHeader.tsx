import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import type { ChatChannel } from '../../../types';

interface ChannelHeaderProps {
  channel: ChatChannel | undefined;
}

const ChannelHeader = memo(({ channel }: ChannelHeaderProps): JSX.Element => {
  if (!isValueDefined(channel)) return <div className="h-16 border-b border-border-primary" />;

  return (
    <div
      className="flex h-16 items-center gap-3 border-b border-border-primary px-6"
      data-testid={TestIds.CHAT_CHANNEL_HEADER}
    >
      <span className="text-2xl">{channel.icon}</span>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-lg font-semibold text-text-primary">
          {channel.name}
        </h2>
        <p className="truncate text-sm text-text-muted">{channel.description}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="text-sm text-text-muted">{FM('chat.online')}</span>
      </div>
    </div>
  );
});

ChannelHeader.displayName = 'ChannelHeader';

export { ChannelHeader };
