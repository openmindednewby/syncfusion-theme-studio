import { useCallback, useEffect, useState } from 'react';

import type { UserDto } from '@/api/generated/mockserver/models';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface ProfileFormProps {
  user: UserDto | undefined;
  isLoading: boolean;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
}

export function toFormState(user: UserDto | undefined): FormState {
  return {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    username: user?.username ?? '',
  };
}

const FIELD_CLASS =
  'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

const ProfileForm = ({ user, isLoading }: ProfileFormProps): JSX.Element => {
  const [form, setForm] = useState<FormState>(toFormState(user));
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setForm(toFormState(user));
    setIsDirty(false);
  }, [user]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
    setIsDirty(true);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setIsDirty(false);
  }, []);

  const handleDiscard = useCallback(() => {
    setForm(toFormState(user));
    setSaved(false);
    setIsDirty(false);
  }, [user]);

  return (
    <form
      className="mx-auto max-w-2xl rounded-lg border border-border bg-surface p-6"
      data-testid={TestIds.PROFILE_FORM}
      onSubmit={handleSubmit}
    >
      <h3 className="mb-4 text-base font-semibold text-text-primary">
        {FM('profile.personalInfo')}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="firstName">
            {FM('common.firstName')}
          </label>
          <input
            className={FIELD_CLASS}
            disabled={isLoading}
            id="firstName"
            name="firstName"
            placeholder={FM('common.firstName')}
            type="text"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="lastName">
            {FM('common.lastName')}
          </label>
          <input
            className={FIELD_CLASS}
            disabled={isLoading}
            id="lastName"
            name="lastName"
            placeholder={FM('common.lastName')}
            type="text"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="email">
            {FM('common.email')}
          </label>
          <input
            className={FIELD_CLASS}
            disabled={isLoading}
            id="email"
            name="email"
            placeholder={FM('common.email')}
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-text-secondary" htmlFor="phone">
            {FM('common.phone')}
          </label>
          <input
            className={FIELD_CLASS}
            disabled={isLoading}
            id="phone"
            name="phone"
            placeholder={FM('common.phone')}
            type="tel"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-medium text-text-secondary" htmlFor="username">
            {FM('common.username')}
          </label>
          <input
            className={FIELD_CLASS}
            disabled={isLoading}
            id="username"
            name="username"
            placeholder={FM('common.username')}
            type="text"
            value={form.username}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
          data-testid={TestIds.PROFILE_SAVE}
          disabled={isLoading || !isDirty}
          type="submit"
        >
          {FM('profile.saveChanges')}
        </button>
        <button
          aria-label={FM('profile.discardChanges')}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary disabled:opacity-50"
          data-testid={TestIds.PROFILE_DISCARD}
          disabled={isLoading || !isDirty}
          type="button"
          onClick={handleDiscard}
        >
          {FM('profile.discardChanges')}
        </button>
        {saved ? (
          <span className="text-sm text-success-500">{FM('profile.saved')}</span>
        ) : null}
      </div>
    </form>
  );
};

export default ProfileForm;
