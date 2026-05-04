const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
};

const c = (p) => path.join(__dirname, 'components', p);

// Hero.tsx
replaceInFile(c('Hero.tsx'), [
    [/ನಮ್ಮ ಕುಟುಂಬಗಳೊಂದಿಗೆ/g, 'Together With Our Families'],
    [/ನಮ್ಮ ಹೊಸ ಜೀವನದ ಆರಂಭವನ್ನು ಆಚರಿಸಲು<br \/>ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ/g, 'Invite you to celebrate the beginning<br />of their forever'],
    [/ದಿನಾಂಕವನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ/g, 'Save The Date'],
    [/ಕೆರೆದು ನೋಡಿ/g, 'Scratch & Reveal'],
    [/✦ Scratch & Reveal ✦/g, '✦ Scratch to Reveal ✦'], // Catching double replace issue
    [/✦ ಕೆರೆದು ನೋಡಿ ✦/g, '✦ Scratch to Reveal ✦'],
    [/ಗುರುವಾರ · 12:32 PM/g, 'Thursday · 12:32 PM'],
    [/ವೈಭವ ಹಾಲ್, ಬೆಳಗಾವಿ/g, 'Vaibhav Hall, Belagavi']
]);

// Ceremonies.tsx
replaceInFile(c('Ceremonies.tsx'), [
    [/ಪವಿತ್ರ ಸಮಾರಂಭಗಳು/g, 'Sacred Ceremonies']
]);

// Venue.tsx
replaceInFile(c('Venue.tsx'), [
    [/ವಿವಾಹ ಸ್ಥಳ/g, 'The Venue'],
    [/ಮದುವೆ/g, 'Wedding'],
    [/ಗೂಗಲ್ ಮ್ಯಾಪ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ/g, 'Open in Google Maps'],
    [/ಮುಖ್ಯ ಸಮಾರಂಭ/g, 'Main Ceremonies']
]);

// Story.tsx
replaceInFile(c('Story.tsx'), [
    [/ನಮ್ಮ ಕಥೆ/g, 'Our Story'],
    [/ಮೊದಲ ಭೇಟಿ/g, 'First Met'],
    [/ವಿವಾಹ ಪ್ರಸ್ತಾಪ/g, 'The Proposal'],
    [/ನಿಶ್ಚಿತಾರ್ಥ/g, 'Engaged']
]);

// Blessings.tsx
replaceInFile(c('Blessings.tsx'), [
    [/export default function ಆಶೀರ್ವಾದಗಳು\(\)/g, 'export default function Blessings()'],
    [/aria-label="ಆಶೀರ್ವಾದಗಳು"/g, 'aria-label="Blessings"'],
    [/ಆಶೀರ್ವಾದಗಳು From/g, 'Blessings From'],
    [/ಶುಭಾಶಯಗಳು/g, 'ಆಶೀರ್ವಾದಗಳು'], // change subtitle back to "Blessings" in Kannada
    [/ವರನ ಪೋಷಕರು/g, "Groom's Parents"],
    [/ವಧುವಿನ ಪೋಷಕರು/g, "Bride's Parents"],
    [/ವರನ ಅಜ್ಜ-ಅಜ್ಜಿ/g, "Groom's Grandparents"],
    [/ವಧುವಿನ ಅಜ್ಜ-ಅಜ್ಜಿ/g, "Bride's Grandparents"]
]);

// Footer.tsx
replaceInFile(c('Footer.tsx'), [
    [/ಪ್ರೀತಿಯಿಂದ,/g, 'With love,']
]);

// ActionButtons.tsx
replaceInFile(c('ActionButtons.tsx'), [
    [/ಕ್ಯಾಲೆಂಡರ್‌ಗೆ/g, 'Save'],
    [/ಸೇರಿಸಿ/g, 'the Date'],
    [/ಸ್ಥಳ/g, 'Get'],
    [/ವೀಕ್ಷಿಸಿ/g, 'Directions']
]);

// Countdown.tsx
replaceInFile(c('Countdown.tsx'), [
    [/ಸಪ್ತಪದಿ ಕಡೆಗೆ ನಮ್ಮ ಹೆಜ್ಜೆಗಳು…/g, 'Steps toward our Saptapadi…'],
    [/label="ದಿನ"/g, 'label="Days"'],
    [/label="ಗಂಟೆ"/g, 'label="Hours"'],
    [/label="ನಿಮಿಷ"/g, 'label="Min"'],
    [/label="ಸೆಕೆಂಡ್"/g, 'label="Sec"']
]);

console.log("Fix complete");
