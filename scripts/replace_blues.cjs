const fs = require('fs');
const files = ['src/NourCoches.tsx', 'src/Blog.tsx', 'src/Admin.tsx', 'src/LuxuryCollection.tsx'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');

    // Replace silvers with blues
    content = content.replace(/#A6A6A6/gi, '#0055FF'); // primary
    content = content.replace(/#666666/gi, '#0033A0'); // primary-dark
    content = content.replace(/#CCCCCC/gi, '#4D88FF'); // primary-light

    // Also replace RGBA equivalent for silver (e.g. rgba(166,166,166,0.4))
    content = content.replace(/102,\s*102,\s*102/g, '0, 51, 160'); // #0033A0
    content = content.replace(/166,\s*166,\s*166/g, '0, 85, 255'); // #0055FF
    content = content.replace(/204,\s*204,\s*204/g, '77, 136, 255'); // #4D88FF

    // Fix the accidentally deleted wrapper div in NourCoches.tsx
    if (f === 'src/NourCoches.tsx') {
        const targetString = '            {/* Removed dbError banner */}';
        const replacementString = "        <div dir={t('dir')} style={{ background: '#020814', color: '#fff', fontFamily: t('font'), overflowX: 'hidden' }}>\n            {/* Removed dbError banner */}";

        if (content.includes(targetString) && !content.includes("<div dir={t('dir')}")) {
            content = content.replace(targetString, replacementString);
            console.log('Fixed NourCoches.tsx wrapper div!');
        }
    }

    fs.writeFileSync(f, content, 'utf8');
});
console.log('Colors replaced successfully!');
