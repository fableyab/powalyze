# 📱 Guide Application Mobile Powalyze

## ✅ Configuration terminée

Votre application mobile est prête ! Capacitor a été configuré avec :

### 🎯 Plateformes installées
- ✅ **Android** (dossier `android/`)
- ✅ **iOS** (dossier `ios/`)

### 🔌 Plugins Capacitor installés
- `@capacitor/app` - Gestion lifecycle app
- `@capacitor/status-bar` - Barre d'état (noire)
- `@capacitor/splash-screen` - Écran de démarrage
- `@capacitor/keyboard` - Clavier mobile

### 📦 Configuration
- **App ID**: `com.powalyze.app`
- **App Name**: Powalyze
- **Theme**: Noir (#000000) + Bleu (#3B82F6)

---

## 🚀 Prochaines étapes

### 1. **Tester sur Android** 📱

```powershell
# Ouvrir dans Android Studio
npx cap open android

# Ou build directement
npx cap run android
```

Dans Android Studio :
- Connecter un téléphone Android (USB debugging activé)
- Ou utiliser un émulateur Android
- Cliquer sur ▶️ Run

### 2. **Tester sur iOS** 🍎

```powershell
# Ouvrir dans Xcode (Mac uniquement)
npx cap open ios
```

Dans Xcode :
- Connecter un iPhone/iPad
- Ou utiliser le simulateur iOS
- Sélectionner l'appareil
- Cliquer sur ▶️ Run

### 3. **Workflow de développement** 🔄

Quand tu modifies le code React :

```powershell
# 1. Build l'app web
npm run build

# 2. Sync avec les plateformes mobiles
npx cap sync

# 3. Ouvrir dans l'IDE natif
npx cap open android
# ou
npx cap open ios
```

### 4. **Live Reload (facultatif)** ⚡

Pour développer plus rapidement :

```powershell
# 1. Lance le serveur de dev
npm run dev

# 2. Note l'adresse IP locale (ex: 192.168.1.X:5173)

# 3. Modifie capacitor.config.ts :
```

```typescript
server: {
  url: 'http://192.168.1.X:5173',  // Ton IP locale
  cleartext: true
}
```

```powershell
# 4. Sync et ouvre
npx cap sync
npx cap open android
```

L'app se connectera à ton serveur local → modifications en direct !

---

## 🎨 Créer les icônes

Tu as un script `generate-icons.ps1` prêt, mais il nécessite **ImageMagick**.

### Option A : Installer ImageMagick
1. Télécharge : https://imagemagick.org/script/download.php
2. Installe avec option "Add to PATH"
3. Lance : `.\generate-icons.ps1`

### Option B : Utiliser un outil en ligne
1. Va sur https://icon.kitchen/
2. Upload `public/icon-512.svg`
3. Génère toutes les tailles
4. Place dans `android/` et `ios/` selon les paths

### Option C : Je peux créer les icônes PNG maintenant
Dis-moi et je génère les PNG de base avec Node.js.

---

## 📋 Commandes utiles

```powershell
# Sync après un build
npx cap sync

# Ouvrir Android Studio
npx cap open android

# Ouvrir Xcode
npx cap open ios

# Ajouter un plugin
npm install @capacitor/camera
npx cap sync

# Voir les logs de l'app
npx cap run android -l
npx cap run ios -l

# Build production
npm run build
npx cap copy
```

---

## 🔧 Prochaines fonctionnalités mobiles

Tu peux ajouter :

### Plugins natifs populaires
```powershell
# Caméra & Photos
npm install @capacitor/camera

# Notifications Push
npm install @capacitor/push-notifications

# Stockage sécurisé
npm install @capacitor/preferences

# Partage
npm install @capacitor/share

# Géolocalisation
npm install @capacitor/geolocation

# Biométrie (Face ID / Fingerprint)
npm install @capacitor-community/biometric-auth
```

### Features à implémenter
- 📸 Scan de documents pour l'upload
- 🔔 Notifications push pour les alertes de risque
- 💾 Cache offline des dashboards
- 🔐 Authentification biométrique
- 📊 Export et partage de rapports
- 🌐 Détection réseau (online/offline)

---

## ⚠️ Notes importantes

1. **iOS** : Nécessite un Mac avec Xcode
2. **Android** : Fonctionne sur Windows/Mac/Linux
3. **Code signing** : Pour publier sur les stores, tu auras besoin de :
   - Compte Apple Developer ($99/an) pour iOS
   - Compte Google Play Console ($25 unique) pour Android
4. **Tests** : L'app utilise exactement ton code React actuel
5. **Updates** : Les mises à jour se font via les stores OU tu peux utiliser Capacitor Live Updates

---

## 🎯 État actuel

✅ Capacitor configuré
✅ Plateformes iOS/Android ajoutées
✅ Plugins de base installés
✅ Status bar configurée (noir)
✅ Splash screen configuré
✅ Manifest PWA créé
✅ Build synchronisé

**Prêt pour le test !** 🚀

Lance `npx cap open android` pour voir ton app sur Android !
