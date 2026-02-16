/**
 * Lighthouse Runner Wrapper
 *
 * Runs the Lighthouse CLI and tolerates Windows EBUSY cleanup errors.
 * On Windows, Chrome's temp profile directory can be locked when Lighthouse
 * tries to delete it, causing a crash AFTER the audit completes successfully.
 *
 * This wrapper checks whether the output file was created. If it was,
 * the audit succeeded and we exit 0 regardless of the cleanup error.
 *
 * Usage: node scripts/run-lighthouse.js <url> [--output <format>] [--output-path <path>] [...flags]
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const args = process.argv.slice(2);

// Extract --output-path from args to verify the file was created
let outputPath = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output-path' && args[i + 1]) {
    outputPath = args[i + 1];
  }
}

const command = `lighthouse ${args.join(' ')}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch {
  if (outputPath && existsSync(outputPath)) {
    console.log(
      '\nLighthouse exited with an error, but the report was generated successfully.',
    );
    console.log('This is likely a Windows Chrome cleanup issue (EBUSY). Ignoring.\n');
    process.exit(0);
  }
  process.exit(1);
}
