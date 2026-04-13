import { useState } from 'react';

import { FM } from '@/localization/utils/helpers';

const INPUT_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';
const LABEL_CLASS = 'mb-1 block text-sm font-medium text-text-secondary';
const SAVED_TIMEOUT_MS = 2000;

const AccountSettings = (): JSX.Element => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [language, setLanguage] = useState('en');
  const [saved, setSaved] = useState(false);

  const handleSave = (): void => {
    setSaved(true);
    setTimeout(() => setSaved(false), SAVED_TIMEOUT_MS);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">
        {FM('settings.account.title')}
      </h2>
      <div>
        <label className={LABEL_CLASS} htmlFor="account-display-name">{FM('settings.account.displayName')}</label>
        <input
          className={INPUT_CLASS}
          id="account-display-name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="account-email">{FM('settings.account.email')}</label>
        <input
          className={INPUT_CLASS}
          id="account-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="account-timezone">{FM('settings.account.timezone')}</label>
        <input
          className={INPUT_CLASS}
          id="account-timezone"
          type="text"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        />
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="account-language">{FM('settings.account.language')}</label>
        <input
          className={INPUT_CLASS}
          id="account-language"
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          aria-label={FM('settings.account.saveLabel')}
          className="rounded-md bg-primary-600 px-4 py-2 text-sm text-white hover:bg-primary-700"
          data-testid="settings-save-account"
          type="button"
          onClick={handleSave}
        >
          {FM('common.save')}
        </button>
        {saved ? (
          <span className="text-sm text-success-500">
            {FM('settings.account.saved')}
            <span className="ml-1 text-xs text-text-muted">{FM('settings.demoHint')}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSettings;
