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
const app = (p) => path.join(__dirname, 'app', p);

// Hero.tsx
replaceInFile(c('Hero.tsx'), [
    [/Together With Our Families/g, 'ನಮ್ಮ ಕುಟುಂಬಗಳೊಂದಿಗೆ'],
    [/Invite you to celebrate the beginning<br \/>of their forever/g, 'ನಮ್ಮ ಹೊಸ ಜೀವನದ ಆರಂಭವನ್ನು ಆಚರಿಸಲು<br />ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ'],
    [/Save The Date/g, 'ದಿನಾಂಕವನ್ನು ನೆನಪಿನಲ್ಲಿಡಿ'],
    [/Scratch &amp; Reveal/g, 'ಕೆರೆದು ನೋಡಿ'],
    [/✦ Scratch to Reveal ✦/g, '✦ ಕೆರೆದು ನೋಡಿ ✦'],
    [/Thursday · 12:32 PM/g, 'ಗುರುವಾರ · 12:32 PM'],
    [
        /<Image\s+src="https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/b\/b7\/Om_symbol\.svg\/250px-Om_symbol\.svg\.png"[\s\S]*?\/>/,
        '<Image src="/photos/shreya wedding/ganpati1.png" alt="Ganapati" fill className="object-contain drop-shadow-md" style={{ filter: \'brightness(0) invert(25%) sepia(40%) saturate(600%) hue-rotate(300deg)\' }} />'
    ],
    [/Vaibhav Hall, Belagavi/g, 'ವೈಭವ ಹಾಲ್, ಬೆಳಗಾವಿ']
]);

// Ceremonies.tsx
const ceremoniesReplace = [
    [/Sacred Ceremonies/g, 'ಪವಿತ್ರ ಸಮಾರಂಭಗಳು'],
    [/पवित्र सोहळे/g, 'ಮದುವೆ ಸಮಾರಂಭಗಳು'],
    [
        /function WeddingCard\(\) \{[\s\S]*?return \([\s\S]*?<\/motion\.article>\n  \)\n\}/,
        `function WeddingCard() {
  return (
    <motion.div 
      variants={cardReveal} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.1 }} 
      className="rounded-xl overflow-hidden relative shadow-2xl mt-4 w-full cursor-pointer border-2 border-[#C9A46A]/30"
    >
      <Image src="/photos/shreya wedding/wedding day.png" alt="Wedding Day" width={800} height={1200} className="w-full h-auto object-cover" priority />
    </motion.div>
  )
}`
    ]
];
replaceInFile(c('Ceremonies.tsx'), ceremoniesReplace);

// Venue.tsx
replaceInFile(c('Venue.tsx'), [
    [/The Venue/g, 'ವಿವಾಹ ಸ್ಥಳ'],
    [/ठिकाण/g, 'ಸ್ಥಳ'],
    [/Open in Google Maps/g, 'ಗೂಗಲ್ ಮ್ಯಾಪ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ'],
    [/Wedding/g, 'ಮದುವೆ'],
    [/Swapnapurti Lawns/g, 'ವೈಭವ ಹಾಲ್ (Vaibhav Hall)'],
    [/Opp Shell Petrol Pump, <br\/>\s*Near Mirchi Hotel, Nandur Naka, <br\/>\s*Belagavi, Karnataka/g, 'Belagavi, Karnataka'],
    [/Main Ceremonies/g, 'ಮುಖ್ಯ ಸಮಾರಂಭ'],
    [/https:\/\/maps\.app\.goo\.gl\/xDXkPKzS7PEKkJ9y5/g, 'https://maps.app.goo.gl/AuPnnaKxYAEvKPCw5?g_st=iw'],
    [/linear-gradient\(135deg, #C9A46A, #006666\)/g, 'linear-gradient(135deg, #8B3A4A, #7A2F4E)']
]);

// Blessings.tsx
replaceInFile(c('Blessings.tsx'), [
    [/Blessings/g, 'ಆಶೀರ್ವಾದಗಳು'],
    [/आशीर्वाद/g, 'ಶುಭಾಶಯಗಳು'],
    [/Groom's Parents/g, 'ವರನ ಪೋಷಕರು'],
    [/Bride's Parents/g, 'ವಧುವಿನ ಪೋಷಕರು'],
    [/Groom's Grandparents/g, 'ವರನ ಅಜ್ಜ-ಅಜ್ಜಿ'],
    [/Bride's Grandparents/g, 'ವಧುವಿನ ಅಜ್ಜ-ಅಜ್ಜಿ']
]);

// Story.tsx
replaceInFile(c('Story.tsx'), [
    [/Our Story/g, 'ನಮ್ಮ ಕಥೆ'],
    [/आमची गोष्ट/g, 'ನಮ್ಮ ಪ್ರೇಮ ಕಥೆ'],
    [/First Met/g, 'ಮೊದಲ ಭೇಟಿ'],
    [/The Proposal/g, 'ವಿವಾಹ ಪ್ರಸ್ತಾಪ'],
    [/Engaged/g, 'ನಿಶ್ಚಿತಾರ್ಥ']
]);

// Footer.tsx
replaceInFile(c('Footer.tsx'), [
    [/With love,/g, 'ಪ್ರೀತಿಯಿಂದ,'],
    [
        /<div className="relative w-40 h-40 flex items-center justify-center">[\s\S]*?<\/div>/,
        `<div className="relative w-32 h-32 flex items-center justify-center">
            <Image src="/photos/shreya wedding/logos&n.png" alt="Couple Logo" fill className="object-contain drop-shadow-md brightness-0" style={{ filter: 'brightness(0) invert(25%) sepia(40%) saturate(600%) hue-rotate(300deg)' }} />
        </div>`
    ]
]);

// app/page.tsx
replaceInFile(app('page.tsx'), [
    [/import RSVP from '@\/components\/RSVP'\n/g, ''],
    [/<SectionDivider \/>\n\s*<RSVP \/>\n/g, '']
]);

// ActionButtons.tsx
replaceInFile(c('ActionButtons.tsx'), [
    [/Save to Calendar/g, 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ'],
    [/View Location/g, 'ಸ್ಥಳ ವೀಕ್ಷಿಸಿ'],
    [/bg-\[#C9A46A\]/g, 'bg-[#7A2F4E]']
]);

// Countdown.tsx
replaceInFile(c('Countdown.tsx'), [
    [/The big day is almost here.../g, 'ಮದುವೆ ದಿನ ಹತ್ತಿರವಾಗುತ್ತಿದೆ...'],
    [/DAYS/g, 'ದಿನಗಳು'],
    [/HOURS/g, 'ಗಂಟೆಗಳು'],
    [/MINUTES/g, 'ನಿಮಿಷಗಳು'],
    [/SECONDS/g, 'ಸೆಕೆಂಡುಗಳು']
]);

console.log("Translation complete");
