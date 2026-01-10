import fs from 'fs';
import path from 'path';

// Créer des icônes PNG simples avec canvas (Node.js)
// Pour une vraie app, utilise ImageMagick ou un service en ligne

const createSimpleIcon = (size, outputPath) => {
  // SVG simple avec le logo Powalyze
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000" rx="${size * 0.225}"/>
  <defs>
    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3B82F6" stroke-width="0.5" opacity="0.2"/>
    </pattern>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grid)"/>
  <text x="${size/2}" y="${size/2}" font-family="Arial, sans-serif" font-size="${size/8}" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="url(#grad)">P</text>
  <text x="${size/2}" y="${size/2 + size/6}" font-family="Arial, sans-serif" font-size="${size/15}" font-weight="bold" text-anchor="middle" fill="url(#grad)">Powalyze</text>
</svg>`;
  
  fs.writeFileSync(outputPath, svg);
  console.log(`✅ Créé: ${outputPath}`);
};

// Créer les icônes dans public/
createSimpleIcon(192, 'public/icon-192.svg');
createSimpleIcon(512, 'public/icon-512.svg');

console.log('\n📱 Icônes SVG créées !');
console.log('Pour convertir en PNG, utilise: https://convertio.co/fr/svg-png/');
console.log('Ou installe ImageMagick et lance: magick convert icon-512.svg icon-512.png');
