const fs = require('fs');
const files = ['src/NourCoches.tsx', 'src/Blog.tsx', 'src/Admin.tsx', 'src/LuxuryCollection.tsx'];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let content = fs.readFileSync(f, 'utf8');
    // Replace reds with silvers/whites
    content = content.replace(/#e60000/g, '#A6A6A6'); // primary
    content = content.replace(/#b30000/g, '#666666'); // primary-dark
    content = content.replace(/#ff4d4d/g, '#CCCCCC'); // primary-light
    content = content.replace(/#ff0000/g, '#A6A6A6'); // primary
    content = content.replace(/#ff3b3b/g, '#CCCCCC'); // primary-light

    // Also replace RGBA equivalent for red (e.g. rgba(230,0,0,0.4))
    content = content.replace(/179,\s*0,\s*0/g, '102, 102, 102'); // #b30000 rgba
    content = content.replace(/230,\s*0,\s*0/g, '166, 166, 166'); // #e60000 rgba
    content = content.replace(/255,\s*0,\s*0/g, '166, 166, 166'); // #ff0000 rgba
    content = content.replace(/255,\s*77,\s*77/g, '204, 204, 204'); // #ff4d4d rgba

    fs.writeFileSync(f, content, 'utf8');
});
console.log('Colors replaced successfully!');
