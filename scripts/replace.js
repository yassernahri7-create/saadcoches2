const fs = require('fs');
const files = ['src/NourCoches.tsx', 'src/Blog.tsx', 'src/Admin.tsx'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/نوركوشيس/g, 'سعدكوشيس');
    content = content.replace(/Norcoches/g, 'Saadcoches');
    content = content.replace(/NORCOCHES/g, 'SAADCOCHES');
    fs.writeFileSync(f, content, 'utf8');
});
console.log('Replaced successfully!');
