const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const f of files) {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/#F5EDE0/g, '#FAF3EE')
        .replace(/#FBF6EC/g, '#F5E8E2')
        .replace(/#FFF8F2/g, '#F5E8E2')
        .replace(/#FDF8F2/g, '#F5E8E2');
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated colors in ${f}`);
    }
}
console.log('Color update complete.');
