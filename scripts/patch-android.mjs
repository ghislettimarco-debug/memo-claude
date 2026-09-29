// Personalizza il progetto Android generato da "cap add android"
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';

// 1. Permessi per notifiche programmate
const manifestPath = 'android/app/src/main/AndroidManifest.xml';
let manifest = readFileSync(manifestPath, 'utf8');
const perms = ['POST_NOTIFICATIONS', 'SCHEDULE_EXACT_ALARM', 'USE_EXACT_ALARM', 'RECEIVE_BOOT_COMPLETED']
  .filter(p => !manifest.includes(`android.permission.${p}"`))
  .map(p => `    <uses-permission android:name="android.permission.${p}" />`)
  .join('\n');
if (perms) manifest = manifest.replace('</manifest>', perms + '\n</manifest>');
writeFileSync(manifestPath, manifest);

// 2. Icona monocromatica per le notifiche
mkdirSync('android/app/src/main/res/drawable', { recursive: true });
copyFileSync('resources/android/ic_stat_notify.xml', 'android/app/src/main/res/drawable/ic_stat_notify.xml');

// 3. versionCode crescente a ogni build su GitHub (permette l'aggiornamento sopra la versione installata)
const run = process.env.GITHUB_RUN_NUMBER;
if (run) {
  const gradlePath = 'android/app/build.gradle';
  const gradle = readFileSync(gradlePath, 'utf8').replace(/versionCode\s*=?\s*\d+/, `versionCode = ${run}`);
  writeFileSync(gradlePath, gradle);
}
console.log('Progetto Android personalizzato.');
