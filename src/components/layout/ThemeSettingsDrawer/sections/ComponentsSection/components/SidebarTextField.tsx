const TEXT_INPUT_CLASS = 'w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary';

interface SidebarTextFieldProps {
  disabled?: boolean;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SidebarTextField = ({ disabled, label, onChange, placeholder, value }: SidebarTextFieldProps): JSX.Element => (
  <div className="space-y-1">
    <label className="text-xs text-text-muted">{label}</label>
    <input
      className={TEXT_INPUT_CLASS}
      disabled={disabled}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
