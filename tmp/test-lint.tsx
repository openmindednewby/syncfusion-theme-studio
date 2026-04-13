const Comp = (): JSX.Element => {
  const headerTextAlign = true
    ? 'left'
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- test
    : 'right' as React.CSSProperties['textAlign'];
  return (
    <th
      scope="col"
      style={{
        textTransform: 'uppercase',
        textAlign: headerTextAlign,
      }}
      onClick={() => {}}
      onDragStart={() => {}}
    >
      <span className="foo">test</span>
    </th>
  );
};
export default Comp;
