/**
 * Utility for conditionally joining class names.
 * A lightweight alternative to clsx/classnames.
 */
export function cn(...classes: Array<string | boolean | undefined | null>): string {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ');
}
