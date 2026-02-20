interface EditorTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const EditorTextInput = ({
  label,
  value,
  onChange,
}: EditorTextInputProps): JSX.Element => (
  <div className="space-y-1">
    <label className="text-xs text-text-muted">{label}</label>
    <input
      className="w-full rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
