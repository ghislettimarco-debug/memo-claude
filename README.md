# Memo Corsi – app Android con Capacitor

L'app è `src/index.html`: è l'unico file da modificare. Il resto (compilazione, notifiche native, icone, APK) è automatico.

## Come ottenere l'APK
1. Crea un repository su GitHub e carica **tutto** il contenuto di questa cartella (compresa `.github`), branch `main`.
2. Prima del primo build cambia `appId` in `capacitor.config.json` (es. `it.tuonome.memocorsi`). Dopo l'installazione non va più cambiato.
3. Vai su **Actions → Build Android APK → Run workflow** (parte anche a ogni push su `main`).
4. A build finita (circa 5–8 minuti) apri l'esecuzione e scarica l'artifact **memo-corsi-apk** (zip con `app-debug.apk`).
5. Copia l'APK sul telefono e installalo (consenti l'installazione da origini sconosciute).
6. Al primo avvio tocca la campanella e consenti le notifiche.

## Cosa cambia rispetto alla pagina web
- Tailwind e Lucide sono inclusi nell'app (niente CDN): funziona offline, grafica identica.
- Le scadenze diventano notifiche pianificate dal sistema Android: arrivano anche con l'app chiusa. Si aggiornano da sole se completi un'azione o modifichi/elimini un corso.
- Barra di stato e barra gesti rispettano il tema chiaro/scuro scelto nell'app; il tasto indietro chiude le finestre aperte.
- Nel browser l'app si comporta come prima.

## Note
- I dati restano sul dispositivo (localStorage) e sopravvivono agli aggiornamenti finché `appId` e `keystore/debug.keystore` non cambiano.
- `keystore/debug.keystore` è una chiave di debug pubblica: va bene per uso personale, non per la pubblicazione sul Play Store (serve un build firmato in release; `USE_EXACT_ALARM` è soggetto alle policy di Google Play).
- Prova in locale (Node 22+): `npm install`, `npm run build:web`, apri `www/index.html`. Per Android Studio: `npm run android:setup`, poi `npx cap open android`.
- iOS non è incluso (servono un runner macOS e un account Apple Developer).
