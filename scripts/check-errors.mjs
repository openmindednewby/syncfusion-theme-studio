import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(0, 'utf8'));
let total = 0;
const cwd = process.cwd().replace(/\\/g, '/');
for (const f of data) {
  for (const m of f.messages) {
    if (m.severity === 2) {
      total++;
      const rel = f.filePath.replace(/\\/g, '/').replace(cwd + '/', '');
      if (total <= 20) console.log(`${rel}:${m.line} ${m.ruleId}: ${m.message.slice(0, 100)}`);
    }
  }
}
console.log(`\nTotal errors: ${total}`);
