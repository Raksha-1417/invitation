const fs = require('fs');
const path = require('path');

const directories = ['./components', './app', './lib'];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

let files = [];
directories.forEach(dir => {
  files = getAllFiles(dir, files);
});

files.push('./tailwind.config.ts');
files.push('./package.json');
files.push('./idea.md');
files.push('./Claude.md');

const replacements = [
  { from: /#8FA89B/gi, to: '#4AA98F' }, // update mint green to be more vibrant
];

let changedCount = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
  }
});

console.log(`Successfully updated ${changedCount} files to stronger mint green.`);
