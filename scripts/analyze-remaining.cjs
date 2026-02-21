const fs = require('fs');
const data = JSON.parse(fs.readFileSync('eslint_remaining.json', 'utf8'));
const files = [];
for (let i = 0; i < data.length; i++) {
  const f = data[i];
  let cnt = 0;
  const msgs = [];
  for (let j = 0; j < f.messages.length; j++) {
    if (f.messages[j].ruleId === 'enforce-function-style/enforce-function-style') {
      cnt++;
      if (msgs.length < 5) msgs.push(f.messages[j].message.substring(0, 120));
    }
  }
  if (cnt > 0) files.push({ p: f.filePath, c: cnt, m: msgs });
}
files.sort(function(a,b) { return b.c - a.c; });
console.log('Files with warnings:', files.length);
for (let k = 0; k < Math.min(15, files.length); k++) {
  const shortPath = files[k].p.split('SyncfusionThemeStudio')[1] || files[k].p;
  console.log(files[k].c + ' ' + shortPath);
  for (let l = 0; l < files[k].m.length; l++) console.log('  ' + files[k].m[l]);
}
