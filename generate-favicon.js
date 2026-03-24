const fs = require('fs');

const b64 = fs.readFileSync('./public/fonts/MonumentExtended-Regular.b64', 'utf-8').trim();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <style>
      @font-face {
        font-family: 'MonumentExtended';
        src: url(data:font/woff2;charset=utf-8;base64,${b64}) format('woff2');
      }
    </style>
  </defs>
  <rect width="512" height="512" fill="#1A1818" />
  <text x="50%" y="54%" font-family="MonumentExtended, Arial, sans-serif" font-weight="900" font-size="280" fill="#E8E3DA" text-anchor="middle" dominant-baseline="middle" letter-spacing="-5">GM</text>
</svg>`;

fs.writeFileSync('./src/app/icon.svg', svg);

if (fs.existsSync('./src/app/icon.png')) fs.unlinkSync('./src/app/icon.png');
if (fs.existsSync('./src/app/favicon.ico')) fs.unlinkSync('./src/app/favicon.ico');

console.log('Successfully generated the perfect MonumentExtended favicon at src/app/icon.svg!');
