/**
 * FileInputNative - Styled file input with hidden native input.
 *
 * Uses .native-file-trigger CSS class with --component-input-* CSS variables.
 */
import { memo, useId, useRef, useCallback, useState } from 'react';

import type { BaseInputProps } from '@/components/ui/shared/inputTypes';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

interface Props extends Omit<BaseInputProps, 'className'> {
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

const FileInputNative = memo((
  {
    label, helperText, error, testId, fullWidth = false, required = false,
    accept, multiple, onChange, placeholder = 'Choose a file...', disabled,
  }: Props,
): JSX.Element => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const hasError = isValueDefined(error);
  const helperId = `${id}-helper`;
  const hasHelperOrError = isValueDefined(helperText) || hasError;
  const hasFile = fileName !== '';

  const handleClick = useCallback(() => {
    if (disabled === true) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (isValueDefined(files) && files.length > 0)
      setFileName(files.length === 1 ? files[0]?.name ?? '' : `${files.length} files`);
    else
      setFileName('');

    onChange?.(files);
  }, [onChange]);

  return (
    <div
      className={cn('relative flex flex-col gap-1', fullWidth && 'w-full')}
      data-testid={testId}
    >
      {isValueDefined(label) && (
        <label className="native-input-label" htmlFor={id}>
          {label}
          {required ? <span className="ml-0.5 text-error-500">*</span> : null}
        </label>
      )}
      <input
        ref={inputRef}
        accept={accept}
        className="sr-only"
        id={id}
        multiple={multiple}
        type="file"
        onChange={handleChange}
      />
      <button
        aria-describedby={hasHelperOrError ? helperId : undefined}
        className={cn('native-file-trigger', fullWidth && 'w-full')}
        data-has-file={hasFile}
        disabled={disabled}
        type="button"
        onClick={handleClick}
      >
        {hasFile ? fileName : placeholder}
      </button>
      {hasHelperOrError ? (
        <span className={hasError ? 'native-input-error' : 'native-input-helper'} id={helperId}>
          {hasError ? error : helperText}
        </span>
      ) : null}
    </div>
  );
});

FileInputNative.displayName = 'FileInputNative';

export default FileInputNative;
export type { Props as FileInputNativeProps };
