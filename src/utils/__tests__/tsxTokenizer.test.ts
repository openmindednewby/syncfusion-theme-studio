import { describe, expect, it } from 'vitest';

import { tokenizeTsx } from '../tsxTokenizer';
import { TsxTokenType } from '../tsxTokenType';

describe('tokenizeTsx', () => {
  it('returns empty array for empty input', () => {
    expect(tokenizeTsx('')).toEqual([]);
  });

  it('returns single text token for plain text', () => {
    expect(tokenizeTsx('Hello world')).toEqual([
      { type: TsxTokenType.Text, value: 'Hello world' },
    ]);
  });

  it('tokenizes a simple self-closing tag', () => {
    const tokens = tokenizeTsx('<Button />');
    expect(tokens).toEqual([
      { type: TsxTokenType.Punctuation, value: '<' },
      { type: TsxTokenType.Tag, value: 'Button' },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.Punctuation, value: '/' },
      { type: TsxTokenType.Punctuation, value: '>' },
    ]);
  });

  it('tokenizes opening and closing tags with text content', () => {
    const tokens = tokenizeTsx('<div>Hello</div>');
    expect(tokens).toEqual([
      { type: TsxTokenType.Punctuation, value: '<' },
      { type: TsxTokenType.Tag, value: 'div' },
      { type: TsxTokenType.Punctuation, value: '>' },
      { type: TsxTokenType.Text, value: 'Hello' },
      { type: TsxTokenType.Punctuation, value: '<' },
      { type: TsxTokenType.Punctuation, value: '/' },
      { type: TsxTokenType.Tag, value: 'div' },
      { type: TsxTokenType.Punctuation, value: '>' },
    ]);
  });

  it('tokenizes string attributes with double quotes', () => {
    const tokens = tokenizeTsx('<Input type="text" />');
    expect(tokens).toEqual([
      { type: TsxTokenType.Punctuation, value: '<' },
      { type: TsxTokenType.Tag, value: 'Input' },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.AttrName, value: 'type' },
      { type: TsxTokenType.Punctuation, value: '=' },
      { type: TsxTokenType.AttrValue, value: '"text"' },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.Punctuation, value: '/' },
      { type: TsxTokenType.Punctuation, value: '>' },
    ]);
  });

  it('tokenizes string attributes with single quotes', () => {
    const tokens = tokenizeTsx("<Tag name='hello' />");
    expect(tokens).toEqual([
      { type: TsxTokenType.Punctuation, value: '<' },
      { type: TsxTokenType.Tag, value: 'Tag' },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.AttrName, value: 'name' },
      { type: TsxTokenType.Punctuation, value: '=' },
      { type: TsxTokenType.AttrValue, value: "'hello'" },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.Punctuation, value: '/' },
      { type: TsxTokenType.Punctuation, value: '>' },
    ]);
  });

  it('tokenizes expression attributes', () => {
    const tokens = tokenizeTsx('<Btn variant={ButtonVariant.Primary} />');
    expect(tokens).toEqual([
      { type: TsxTokenType.Punctuation, value: '<' },
      { type: TsxTokenType.Tag, value: 'Btn' },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.AttrName, value: 'variant' },
      { type: TsxTokenType.Punctuation, value: '=' },
      { type: TsxTokenType.Punctuation, value: '{' },
      { type: TsxTokenType.Expression, value: 'ButtonVariant.Primary' },
      { type: TsxTokenType.Punctuation, value: '}' },
      { type: TsxTokenType.Text, value: ' ' },
      { type: TsxTokenType.Punctuation, value: '/' },
      { type: TsxTokenType.Punctuation, value: '>' },
    ]);
  });

  it('handles nested braces in expressions', () => {
    const tokens = tokenizeTsx('<List data={[{ id: "1" }]} />');
    const exprToken = tokens.find((t) => t.type === TsxTokenType.Expression);
    expect(exprToken).toBeDefined();
    expect(exprToken?.value).toBe('[{ id: "1" }]');
  });

  it('tokenizes multiple attributes', () => {
    const tokens = tokenizeTsx(
      '<Button variant="primary" size="lg" onClick={handleClick} />',
    );

    const attrNames = tokens
      .filter((t) => t.type === TsxTokenType.AttrName)
      .map((t) => t.value);
    expect(attrNames).toEqual(['variant', 'size', 'onClick']);

    const attrValues = tokens
      .filter((t) => t.type === TsxTokenType.AttrValue)
      .map((t) => t.value);
    expect(attrValues).toEqual(['"primary"', '"lg"']);

    const expressions = tokens
      .filter((t) => t.type === TsxTokenType.Expression)
      .map((t) => t.value);
    expect(expressions).toEqual(['handleClick']);
  });

  it('tokenizes expression children in text', () => {
    const tokens = tokenizeTsx('<p>{count} items</p>');
    expect(tokens).toContainEqual({
      type: TsxTokenType.Expression,
      value: 'count',
    });
    expect(tokens).toContainEqual({
      type: TsxTokenType.Text,
      value: ' items',
    });
  });

  it('handles deeply nested braces', () => {
    const tokens = tokenizeTsx('<C x={fn({ a: { b: 1 } })} />');
    const expr = tokens.find((t) => t.type === TsxTokenType.Expression);
    expect(expr?.value).toBe('fn({ a: { b: 1 } })');
  });

  it('handles component names with dots', () => {
    const tokens = tokenizeTsx('<Form.Input />');
    const tag = tokens.find((t) => t.type === TsxTokenType.Tag);
    expect(tag?.value).toBe('Form.Input');
  });

  it('handles boolean attributes (no value)', () => {
    const tokens = tokenizeTsx('<Input disabled />');
    expect(tokens).toContainEqual({
      type: TsxTokenType.AttrName,
      value: 'disabled',
    });
  });
});
