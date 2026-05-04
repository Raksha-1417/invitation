const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'components');
const appPath = path.join(__dirname, 'app');

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/#008080/gi, '#C9A46A');
    content = content.replace(/#D10056/gi, '#7A2F4E');
    content = content.replace(/#7A1142/gi, '#8B3A4A');
    content = content.replace(/#0A5C4A/gi, '#8B3A4A');
    content = content.replace(/#B8601A/gi, '#C9A46A');
    
    // Add hashtag to Footer if not present
    if (filePath.includes('Footer.tsx') && !content.includes('#ShreVeen')) {
        content = content.replace(
            /Naveen &amp; Shreya<\/p>/,
            'Naveen &amp; Shreya</p>\n\n      <motion.p\n        className="font-script text-[#C9A46A] text-4xl mt-4"\n        variants={scrollReveal}\n        initial={prefersReduced ? \'show\' : \'hidden\'}\n        whileInView="show"\n        viewport={{ once: true, amount: 0.2 }}\n      >\n        #ShreVeen\n      </motion.p>'
        );
    }
    
    // Add hashtag to Hero if not present
    if (filePath.includes('Hero.tsx') && !content.includes('#ShreVeen')) {
        content = content.replace(
            /<h1 className="font-display font-medium tracking-\[0.12em\] leading-tight text-\[#6E2A36\] text-\[38px\] uppercase">\n            Shreya\n          <\/h1>/,
            '<h1 className="font-display font-medium tracking-[0.12em] leading-tight text-[#6E2A36] text-[38px] uppercase">\n            Shreya\n          </h1>\n          <p className="font-script text-[#C9A46A] text-4xl mt-6 opacity-90 drop-shadow-sm">#ShreVeen</p>'
        );
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
};

const processDir = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            replaceInFile(fullPath);
        }
    }
};

processDir(dirPath);
processDir(appPath);

