/**
 * RichTextSection - Full rich text editor with formatting toolbar.
 * Uses contentEditable with execCommand for toolbar actions.
 */
import { memo, useRef, useCallback, useState } from 'react';

import { CopyableCodeSnippet } from '@/components/common';
import { InputNative } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

interface ToolbarButton {
  readonly cmd: string;
  readonly label: string;
  readonly css: React.CSSProperties | undefined;
}

const TOOLBAR_BUTTONS: readonly ToolbarButton[] = [
  { cmd: 'bold', label: 'B', css: { fontWeight: 'bold' } },
  { cmd: 'italic', label: 'I', css: { fontStyle: 'italic' } },
  { cmd: 'underline', label: 'U', css: { textDecoration: 'underline' } },
  { cmd: 'insertOrderedList', label: '1.', css: undefined },
  { cmd: 'insertUnorderedList', label: '\u2022', css: undefined },
];

export const RichTextSection = memo((): JSX.Element => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const execCmd = useCallback((cmd: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false);
  }, []);

  const toggleLinkInput = useCallback(() => {
    setShowLinkInput((prev) => !prev);
  }, []);

  const applyLink = useCallback(() => {
    if (linkUrl !== '') {
      editorRef.current?.focus();
      document.execCommand('createLink', false, linkUrl);
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }, [linkUrl]);

  return (
    <section className="card space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">
          {FM('components.inputShowcase.sections.richText')}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('components.inputShowcase.sections.richTextDesc')}
        </p>
      </div>
      <div className="max-w-lg" data-testid="native-showcase-richtext">
        <label className="native-input-label">{FM('components.inputs.richTextLabel')}</label>
        <div className="mt-1">
          <div className="native-richtext-toolbar">
            {TOOLBAR_BUTTONS.map(({ cmd, label, css }) => (
              <button key={cmd} style={css} title={cmd} type="button" onClick={() => execCmd(cmd)}>
                {label}
              </button>
            ))}
            <button title="link" type="button" onClick={toggleLinkInput}>
              <svg
                aria-hidden="true"
                fill="none"
                height="14"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                width="14"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {showLinkInput ? <div className="flex gap-2 border border-border bg-surface p-2" style={{ borderRadius: '0' }}>
              <InputNative
                fullWidth
                placeholder="https://example.com"
                testId="native-richtext-link-input"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <button
                className="native-input shrink-0"
                style={{ width: 'auto' }}
                type="button"
                onClick={applyLink}
              >
                {FM('components.inputs.applyLink')}
              </button>
            </div> : null}
          <div
            ref={editorRef}
            contentEditable
            aria-label={FM('components.inputs.richTextLabel')}
            className="native-richtext-content"
            data-testid="native-richtext-editor"
            role="textbox"
          />
        </div>
      </div>
      <CopyableCodeSnippet code='<div className="native-richtext-toolbar">...</div><div contentEditable className="native-richtext-content" />' />
    </section>
  );
});

RichTextSection.displayName = 'RichTextSection';
