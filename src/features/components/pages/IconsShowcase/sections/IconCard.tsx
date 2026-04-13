import { memo, useCallback, useState } from 'react';

import type { IconProps } from '@/components/icons';
import { FM } from '@/localization/utils/helpers';

const COPIED_FEEDBACK_MS = 1500;

interface IconCardProps {
  name: string;
  icon: (props: IconProps) => JSX.Element;
}

const IconCard = ({ name, icon }: IconCardProps): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const jsxSnippet = `<${name} />`;
  const Render = icon;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(jsxSnippet);
    setCopied(true);
    setTimeout(() => { setCopied(false); }, COPIED_FEEDBACK_MS);
  }, [jsxSnippet]);

  return (
    <button
      className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-surface-sunken"
      title={FM('components.iconsShowcase.clickToCopy')}
      type="button"
      onClick={handleCopy}
    >
      <div className="flex h-10 w-10 items-center justify-center text-text-primary">
        <Render />
      </div>
      <code className={`text-center text-xs ${copied ? 'text-status-success' : 'text-text-secondary'}`}>
        {copied ? FM('components.iconsShowcase.copied') : jsxSnippet}
      </code>
    </button>
  );
};

export default memo(IconCard);
