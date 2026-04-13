/** Token types produced by the TSX syntax tokenizer. */
const enum TsxTokenType {
  Tag = 'tag',
  AttrName = 'attrName',
  AttrValue = 'attrValue',
  Expression = 'expression',
  Punctuation = 'punctuation',
  Text = 'text',
}

export { TsxTokenType };
