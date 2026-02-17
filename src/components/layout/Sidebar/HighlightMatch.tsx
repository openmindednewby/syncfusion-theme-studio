/**
 * Renders text with the matched search substring emphasized (bold).
 * Returns plain text when there is no query or no match.
 */

interface HighlightMatchProps {
  text: string;
  query: string;
}

export const HighlightMatch = ({
  text,
  query,
}: HighlightMatchProps): JSX.Element => {
  if (query === '') return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  const idx = lowerText.indexOf(lowerQuery);

  if (idx === -1 || lowerQuery === '') return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + lowerQuery.length);
  const after = text.slice(idx + lowerQuery.length);

  return (
    <>
      {before}
      <mark className="sidebar-search-highlight bg-transparent">{match}</mark>
      {after}
    </>
  );
};
