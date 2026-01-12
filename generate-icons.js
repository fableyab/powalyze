/**
 * Script pour générer les icônes PWA manquantes
 * Crée icon-192.png et icon-512.png avec le logo Powalyze
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer un SVG avec le logo Powalyze pour l'icône
const createIconSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="#000000"/>
  
  <!-- Gradient definition -->
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4A9EFF;stop-opacity:1" />
    </linearGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Swiss Precision Grid (subtle) -->
  ${size >= 192 ? `
  <g opacity="0.1" stroke="#D4AF37" stroke-width="0.5" fill="none">
    ${Array.from({length: Math.floor(size/40)}, (_, i) => `
      <line x1="${i*40}" y1="0" x2="${i*40}" y2="${size}"/>
      <line x1="0" y1="${i*40}" x2="${size}" y2="${i*40}"/>
    `).join('')}
  </g>` : ''}
  
  <!-- Central Logo: P letter with dashboard element -->
  <g transform="translate(${size/2}, ${size/2})">
    <!-- P Letter -->
    <path 
      d="M ${-size*0.15} ${-size*0.25} 
         L ${-size*0.15} ${size*0.25} 
         M ${-size*0.15} ${-size*0.25} 
         L ${size*0.05} ${-size*0.25} 
         Q ${size*0.15} ${-size*0.25} ${size*0.15} ${-size*0.15}
         Q ${size*0.15} ${-size*0.05} ${size*0.05} ${-size*0.05}
         L ${-size*0.15} ${-size*0.05}"
      stroke="url(#goldGrad)" 
      stroke-width="${size/50}" 
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      filter="url(#glow)"
    />
    
    <!-- Dashboard accent -->
    <circle 
      cx="${size*0.15}" 
      cy="${size*0.1}" 
      r="${size*0.04}" 
      fill="#4A9EFF" 
      opacity="0.8"
    />
    <circle 
      cx="${size*0.15}" 
      cy="${size*0.1}" 
      r="${size*0.02}" 
      fill="#D4AF37"
    />
  </g>
  
  <!-- Corner accent lines -->
  <line x1="20" y1="20" x2="${size*0.15}" y2="20" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
  <line x1="20" y1="20" x2="20" y2="${size*0.15}" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
  
  <line x1="${size-20}" y1="20" x2="${size-size*0.15}" y2="20" stroke="#4A9EFF" stroke-width="2" opacity="0.6"/>
  <line x1="${size-20}" y1="20" x2="${size-20}" y2="${size*0.15}" stroke="#4A9EFF" stroke-width="2" opacity="0.6"/>
</svg>`;

// Écrire les fichiers SVG temporaires
const publicDir = path.join(__dirname, 'public');

console.log('🎨 Génération des icônes PWA...\n');

// Icône 192x192
const svg192 = createIconSVG(192);
fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), svg192);
console.log('✅ icon-192.svg créé');

// Icône 512x512
const svg512 = createIconSVG(512);
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), svg512);
console.log('✅ icon-512.svg créé');

console.log('\n📋 Instructions pour convertir en PNG:');
console.log('1. Ouvrir icon-192.svg dans un navigateur');
console.log('2. Faire "Save as" → "Webpage, Complete" ou capture d\'écran');
console.log('3. Ou utiliser ImageMagick: convert icon-192.svg icon-192.png');
console.log('4. Ou utiliser un outil en ligne: https://svgtopng.com/');
console.log('\n⚠️  Remplacer les fichiers icon-192.png et icon-512.png dans public/');
