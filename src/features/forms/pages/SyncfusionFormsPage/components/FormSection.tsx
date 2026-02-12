/**
 * FormSection Component
 *
 * Wrapper component for form sections with title and description.
 */
import type { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export const FormSection = ({ title, description, children }: Props): JSX.Element => {
  return (
    <section className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      {children}
    </section>
  );
}
