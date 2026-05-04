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
  // Primary background: Ivory / Off-white (#FFF8F2)
  { from: /#FAF9F6/gi, to: '#FFF8F2' },
  
  // Secondary accents: Soft Peach (#FAD4C0)
  { from: /#FF9EB5/gi, to: '#FAD4C0' }, // For the curtain Envelope background
  
  // Highlight accents: Sage Green (#CFE3D8)
  { from: /#4AA98F/gi, to: '#CFE3D8' }, // Mint Green -> Sage Green
  { from: /#3D8F78/gi, to: '#B0CDBE' }, // Hover state
  { from: /#60C2A5/gi, to: '#DFECE5' }, // Gradient state
  
  // Decorative accents: Muted Gold (#D4AF37)
  { from: /#B76E79/gi, to: '#D4AF37' }, // Rose Gold -> Muted Gold
  
  // Also need to fix RGBA shadows/glows from Rose Gold (183, 110, 121) to Muted Gold (212, 175, 55)
  { from: /183,110,121/gi, to: '212,175,55' },
  { from: /183, 110, 121/gi, to: '212, 175, 55' },
];

let changedCount = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.from, r.to);
  });
  
  // Fix button text contrast on light Sage Green button
  if (file.includes('Envelope.tsx') || file.includes('Ceremonies.tsx') || file.includes('Venue.tsx')) {
    content = content.replace(/text-\[\#FFF8F2\] font-serif/g, 'text-[#D4AF37] font-serif');
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
  }
});

console.log(`Successfully updated ${changedCount} files to the new Peach & Sage Green theme.`);
