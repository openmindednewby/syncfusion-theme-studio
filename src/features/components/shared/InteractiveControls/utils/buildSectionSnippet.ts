/**
 * Builds a JSX code snippet string for a section's current configuration.
 * Used by ControlGroup's code-hint tooltip to show the full component usage.
 *
 * @example
 * buildSectionSnippet('TableNative', [
 *   { name: 'density', value: 'Compact' },
 *   { name: 'striped', value: true },
 *   { name: 'hoverable', value: false },
 * ])
 * // => '<TableNative\n  density="Compact"\n  striped\n  hoverable={false}\n/>'
 */

type SnippetProp =
  | { name: string; value: boolean }
  | { name: string; value: string };

const INDENT = '  ';

function formatProp(prop: SnippetProp): string {
  if (typeof prop.value === 'boolean')
    return prop.value ? `${INDENT}${prop.name}` : `${INDENT}${prop.name}={false}`;

  return `${INDENT}${prop.name}="${prop.value}"`;
}

export function buildSectionSnippet(component: string, props: SnippetProp[]): string {
  const lines = props.map(formatProp);
  return `<${component}\n${lines.join('\n')}\n/>`;
}

