const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const version = packageJson.version;
const filePath = path.join(__dirname, 'src/scss/_banner.scss'); // Ubah jika path file berbeda

// Baca isi file
let content = fs.readFileSync(filePath, 'utf8');

// Ganti versi lama dengan versi dari package.json
const updatedContent = content.replace(
    /(Atas Nalar Bootstrap v)([\d.]+)/,
    `$1${version}`
);

// Tulis ulang file
fs.writeFileSync(filePath, updatedContent);

console.log(`✔️  Updated _banner.scss to version v${version}`);
