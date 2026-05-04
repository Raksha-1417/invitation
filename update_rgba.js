const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const libDir = path.join(__dirname, 'lib');

function replaceColorsInDir(targetDir) {
    if (!fs.existsSync(targetDir)) return;
    const files = fs.readdirSync(targetDir);
    
    for (const f of files) {
        const filePath = path.join(targetDir, f);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            replaceColorsInDir(filePath);
        } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let newContent = content
                .replace(/rgba\(209,0,86/g, 'rgba(122,47,78') // Pink to Deep Wine
                .replace(/rgba\(0,128,128/g, 'rgba(201,164,106') // Teal to Gold
                .replace(/#D10056/g, '#7A2F4E') // Pink hex to Deep Wine
                .replace(/#008080/g, '#C9A46A'); // Teal hex to Gold
                
            // Also replace RSVP button colors if it has #006666
            newContent = newContent.replace(/to-\[\#006666\]/g, 'to-[#A8576A]');
                
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated colors in ${f}`);
            }
        }
    }
}

replaceColorsInDir(dir);
replaceColorsInDir(libDir);
console.log('Color update complete.');
