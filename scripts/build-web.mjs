// Prepara la cartella www/ (contenuto dell'app) a partire da src/
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';

rmSync('www', { recursive: true, force: true });
mkdirSync('www');
cpSync('src/index.html', 'www/index.html');

const lucide = ['node_modules/lucide/dist/umd/lucide.min.js', 'node_modules/lucide/dist/umd/lucide.js'].find(existsSync);
if (!lucide) throw new Error('File UMD di lucide non trovato: esegui prima "npm install".');
cpSync(lucide, 'www/lucide.min.js');
console.log('www/ pronta (il CSS Tailwind viene generato dal comando successivo).');
