import { memo, type CSSProperties } from 'react';

import { FM } from '@/localization/utils/helpers';

export interface SeeMoreButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

const baseStyle: CSSProperties = {
  display: 'inline-block',
  background: 'none',
  border: 'none',
  minHeight: 'auto',
  minWidth: 'auto',
  height: 'var(--component-text-description-see-more-height)',
  paddingTop: 'var(--component-text-description-see-more-padding-top)',
  paddingRight: 'var(--component-text-description-see-more-padding-right)',
  paddingBottom: 'var(--component-text-description-see-more-padding-bottom)',
  paddingLeft: 'var(--component-text-description-see-more-padding-left)',
  marginTop: 'var(--component-text-description-see-more-margin-top)',
  marginRight: 'var(--component-text-description-see-more-margin-right)',
  marginBottom: 'var(--component-text-description-see-more-margin-bottom)',
  marginLeft: 'var(--component-text-description-see-more-margin-left)',
  cursor: 'pointer',
  fontFamily: 'var(--component-text-description-font-family)',
  fontSize: 'var(--component-text-description-see-more-font-size)',
  fontWeight: 'var(--component-text-description-see-more-font-weight)',
  lineHeight: 'var(--component-text-description-see-more-line-height)',
  letterSpacing: 'var(--component-text-description-letter-spacing)',
  textDecoration: 'none',
  fontStyle: 'normal',
  color: 'var(--component-text-description-see-more-color)',
};

const SeeMoreButton = memo(({
  isExpanded,
  onToggle,
  className,
  style,
  testId = 'see-more-button',
}: SeeMoreButtonProps): JSX.Element => (
  <button
    aria-expanded={isExpanded}
    className={className}
    data-testid={testId}
    style={{ ...baseStyle, ...style }}
    type="button"
    onClick={onToggle}
  >
    {FM(isExpanded
      ? 'components.textDescriptionShowcase.seeLess'
      : 'components.textDescriptionShowcase.seeMore')}
  </button>
));

SeeMoreButton.displayName = 'SeeMoreButton';

export default SeeMoreButton;
