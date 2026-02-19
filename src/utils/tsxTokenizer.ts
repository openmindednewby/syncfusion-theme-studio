import { TsxTokenType } from './tsxTokenType';

export interface TsxToken {
  type: TsxTokenType;
  value: string;
}

const enum State {
  Text = 'text',
  TagOpen = 'tagOpen',
  TagName = 'tagName',
  TagBody = 'tagBody',
  AttrName = 'attrName',
  AttrValueDQ = 'attrValueDQ',
  AttrValueSQ = 'attrValueSQ',
  Expression = 'expression',
}

const isTagChar = (ch: string): boolean =>
  (ch >= 'a' && ch <= 'z') ||
  (ch >= 'A' && ch <= 'Z') ||
  (ch >= '0' && ch <= '9') ||
  ch === '.' ||
  ch === '_';

const isAttrChar = (ch: string): boolean => isTagChar(ch) || ch === '-';

const isWS = (ch: string): boolean =>
  ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';

const FLUSH_TYPE: Partial<Record<State, TsxTokenType>> = {
  [State.Expression]: TsxTokenType.Expression,
  [State.TagName]: TsxTokenType.Tag,
  [State.AttrName]: TsxTokenType.AttrName,
};

class TsxLexer {
  tokens: TsxToken[] = [];
  private buf = '';
  private state: State = State.Text;
  private braceDepth = 0;
  private exprReturn: State = State.Text;

  run(code: string): TsxToken[] {
    for (let i = 0; i < code.length; i++)
      this.step(code.charAt(i));

    this.flushRemaining();
    return this.tokens;
  }

  private step(ch: string): void {
    switch (this.state) {
      case State.Text: this.onText(ch); break;
      case State.TagOpen: this.onTagOpen(ch); break;
      case State.TagName: this.onTagName(ch); break;
      case State.TagBody: this.onTagBody(ch); break;
      case State.AttrName: this.onAttrName(ch); break;
      case State.AttrValueDQ: this.onAttrQuote(ch, '"'); break;
      case State.AttrValueSQ: this.onAttrQuote(ch, "'"); break;
      case State.Expression: this.onExpr(ch); break;
      default: break;
    }
  }

  private flush(type: TsxTokenType): void {
    if (this.buf.length > 0) {
      this.tokens.push({ type, value: this.buf });
      this.buf = '';
    }
  }

  private punct(ch: string): void {
    this.tokens.push({ type: TsxTokenType.Punctuation, value: ch });
  }

  private enterExpr(returnTo: State): void {
    this.punct('{');
    this.braceDepth = 1;
    this.exprReturn = returnTo;
    this.state = State.Expression;
  }

  private onText(ch: string): void {
    if (ch === '<') {
      this.flush(TsxTokenType.Text);
      this.punct('<');
      this.state = State.TagOpen;
    } else if (ch === '{') {
      this.flush(TsxTokenType.Text);
      this.enterExpr(State.Text);
    } else this.buf += ch;
  }

  private onTagOpen(ch: string): void {
    if (ch === '/') this.punct('/');
    else if (ch === '>') {
      this.punct('>');
      this.state = State.Text;
    } else if (isTagChar(ch)) {
      this.buf += ch;
      this.state = State.TagName;
    } else {
      this.buf += ch;
      this.state = State.Text;
    }
  }

  private onTagName(ch: string): void {
    if (isTagChar(ch)) this.buf += ch;
    else {
      this.flush(TsxTokenType.Tag);
      this.afterTagName(ch);
    }
  }

  private afterTagName(ch: string): void {
    if (ch === '>') {
      this.punct('>');
      this.state = State.Text;
    } else if (ch === '/') {
      this.punct('/');
      this.state = State.TagBody;
    } else if (ch === '{') this.enterExpr(State.TagBody);
    else {
      this.buf += ch;
      this.state = State.TagBody;
    }
  }

  private onTagBody(ch: string): void {
    if (isWS(ch)) {
      this.flush(TsxTokenType.Text);
      this.buf += ch;
    } else if (ch === '>') this.tagBodyClose()
    else if (ch === '/') this.tagBodySlash()
    else if (ch === '=') this.tagBodyEquals()
    else if (ch === '"' || ch === "'") this.tagBodyQuote(ch)
    else if (ch === '{') this.tagBodyBrace()
    else if (isAttrChar(ch)) this.tagBodyAttr(ch)
    else this.buf += ch;
  }

  private tagBodyClose(): void {
    this.flush(TsxTokenType.Text);
    this.punct('>');
    this.state = State.Text;
  }

  private tagBodySlash(): void {
    this.flush(TsxTokenType.Text);
    this.punct('/');
  }

  private tagBodyEquals(): void {
    this.flush(TsxTokenType.AttrName);
    this.punct('=');
  }

  private tagBodyQuote(ch: string): void {
    this.flush(TsxTokenType.Text);
    this.buf += ch;
    this.state = ch === '"' ? State.AttrValueDQ : State.AttrValueSQ;
  }

  private tagBodyBrace(): void {
    this.flush(TsxTokenType.Text);
    this.enterExpr(State.TagBody);
  }

  private tagBodyAttr(ch: string): void {
    this.flush(TsxTokenType.Text);
    this.buf += ch;
    this.state = State.AttrName;
  }

  private onAttrName(ch: string): void {
    if (isAttrChar(ch)) this.buf += ch;
    else if (ch === '=') {
      this.flush(TsxTokenType.AttrName);
      this.punct('=');
      this.state = State.TagBody;
    } else if (ch === '>' || ch === '/') {
      this.flush(TsxTokenType.AttrName);
      this.punct(ch);
      this.state = ch === '>' ? State.Text : State.TagBody;
    } else {
      this.flush(TsxTokenType.AttrName);
      this.buf += ch;
      this.state = State.TagBody;
    }
  }

  private onAttrQuote(ch: string, quote: string): void {
    this.buf += ch;
    if (ch === quote && this.buf.length > 1) {
      this.flush(TsxTokenType.AttrValue);
      this.state = State.TagBody;
    }
  }

  private onExpr(ch: string): void {
    if (ch === '{') {
      this.braceDepth++;
      this.buf += ch;
    } else if (ch === '}') {
      this.braceDepth--;
      if (this.braceDepth === 0) {
        this.flush(TsxTokenType.Expression);
        this.punct('}');
        this.state = this.exprReturn;
      } else this.buf += ch;
    } else this.buf += ch;
  }

  private flushRemaining(): void {
    if (this.buf.length > 0) {
      const type = FLUSH_TYPE[this.state] ?? TsxTokenType.Text;
      this.tokens.push({ type, value: this.buf });
    }
  }
}

/**
 * Single-pass character-by-character TSX tokenizer.
 * Splits JSX/TSX source into colored tokens for display.
 * Anything unrecognized falls through as Text.
 */
export function tokenizeTsx(code: string): TsxToken[] {
  return new TsxLexer().run(code);
}
