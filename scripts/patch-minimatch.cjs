/**
 * Patches minimatch@10's CJS export to be backward-compatible with v3.
 *
 * minimatch@3: module.exports = minimatch (function)
 * minimatch@10: exports.minimatch = minimatch (object with named exports)
 *
 * eslint-plugin-jsx-a11y and eslint-plugin-react use Babel-compiled code
 * that calls `(0, _minimatch.default)(...)` which expects the function
 * as the default export. This patch makes both calling conventions work.
 */
const fs = require('fs');
const path = require('path');

const PATCH_MARKER = '// [patch-minimatch] backward compat';

const file = path.join(
  __dirname,
  '..',
  'node_modules',
  'minimatch',
  'dist',
  'commonjs',
  'index.js',
);

try {
  const content = fs.readFileSync(file, 'utf8');

  if (content.includes(PATCH_MARKER)) return;

  const patch = [
    '',
    PATCH_MARKER,
    'exports.default = exports.minimatch;',
    '',
  ].join('\n');

  fs.appendFileSync(file, patch);
} catch (_e) {
  // Silently skip if minimatch is not installed (e.g. CI cache)
}
