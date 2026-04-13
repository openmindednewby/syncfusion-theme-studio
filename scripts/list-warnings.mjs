import fs from 'node:fs';
import path from 'node:path';

const data = JSON.parse(fs.readFileSync(0, 'utf8'));
const cwd = process.cwd().replace(/\\/g, '/');
for (const f of data) {
  for (const m of f.messages) {
    if (m.ruleId === 'enforce-function-style/enforce-function-style') {
      const rel = f.filePath.replace(/\\/g, '/').replace(cwd + '/', '');
      console.log(`${rel}:${m.line} ${m.message.slice(0, 120)}`);
    }
  }
}
