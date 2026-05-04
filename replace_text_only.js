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

files.push('./package.json');
files.push('./idea.md');
files.push('./Claude.md');

const replacements = [
  // Names
  { from: /Rohit/g, to: 'Naveen' },
  { from: /Nandini/g, to: 'Shreya' },
  { from: /ROHIT/g, to: 'NAVEEN' },
  { from: /NANDINI/g, to: 'SHREYA' },
  { from: /rohit/g, to: 'naveen' },
  { from: /nandini/g, to: 'shreya' },
  
  // Dates & Times
  { from: /26 April 2026/gi, to: '14 May 2026' },
  { from: /April 26, 2026/gi, to: 'May 14, 2026' },
  { from: /April 26/gi, to: 'May 14' },
  { from: /26th April/gi, to: '14th May' },
  { from: /APRIL/g, to: 'MAY' },
  { from: />26</g, to: '>14<' }, 
  { from: /12:43 PM/gi, to: '12:32 PM' },
  { from: /12:43/gi, to: '12:32' },
  { from: /Sunday/gi, to: 'Thursday' }, 
  
  // Venue
  { from: /The Source at Sula/gi, to: 'Vaibhav Hall' },
  { from: /Sula Vineyards/gi, to: 'Vaibhav Hall' },
  { from: /Gangapur-Savargaon Road/gi, to: 'Vaibhav Nagar' },
  { from: /Nashik, Maharashtra 422222/gi, to: 'Belagavi, 590010' },
  { from: /Nashik 422222/gi, to: 'Belagavi 590010' },
  { from: /Nashik/gi, to: 'Belagavi' }
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

console.log(`Successfully updated ${changedCount} files with names and dates.`);
