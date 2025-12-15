# 🚀 POWALYZE - PACKAGE DÉPLOIEMENT HOSTINGER

## 📦 Contenu du Package

Ce package contient **tout ce qu'il faut** pour déployer POWALYZE sur un VPS Hostinger en 30 minutes.

### Fichiers Inclus

```
📁 POWALYZE FINAL/
├── deploy.sh                           ← Script principal (automatise tout)
├── nginx.conf                          ← Config web server
├── verify-deployment.sh                ← Script de vérification (12 tests)
├── .env.production                     ← Variables d'environnement
├── HOSTINGER_DEPLOYMENT_GUIDE.md       ← Guide détaillé (6 sections)
├── PROJECT_MEMORY.md                   ← Mémoire du projet
└── [Rest of project files...]
```

---

## ⚡ DÉMARRAGE RAPIDE (3 étapes)

### 1️⃣ Commande du VPS (5 min)

**Sur**: https://www.hostinger.fr/vps

1. Commander un **VPS Linux** (minimum: 2GB RAM)
2. Choisir **Ubuntu 20.04** ou 22.04
3. Récupérer par email:
   - 🔑 **IP du VPS** (ex: `123.45.67.89`)
   - 🔑 **Mot de passe SSH**

### 2️⃣ Configuration DNS (10 min)

**Dans Panel Hostinger**:

1. Aller à: **Domaines → powalyze.ch → Manage DNS**
2. **Ajouter** 2 entrées A:
   ```
   @ (root)     A    123.45.67.89    TTL: 300
   www          A    123.45.67.89    TTL: 300
   ```
3. **Sauvegarder** et **attendre 10 minutes**

### 3️⃣ Déploiement Automatique (10 min)

**Sur ton ordi (PowerShell/Terminal)**:

```bash
# 1. Se connecter au VPS
ssh root@123.45.67.89
# [Entrer le mot de passe]

# 2. Cloner le projet
cd /home
git clone https://github.com/TON_USERNAME/powalyze.git
cd powalyze

# 3. Exécuter le déploiement
chmod +x deploy.sh
sudo bash deploy.sh

# ✅ Le script fera automatiquement:
#    - Installer Node.js, Nginx, certbot
#    - Configurer le web server
#    - Builder l'app React
#    - Mettre en place SSL (Let's Encrypt)
#    - Activez HTTPS avec auto-renouvelment
```

**Attendre la fin du script** (5-10 min)

---

## ✅ Vérifier le Déploiement

Après le script, sur le VPS:

```bash
chmod +x verify-deployment.sh
bash verify-deployment.sh powalyze.ch

# Résultat: Affiche 12 tests
# ✓ DNS Resolution
# ✓ HTTP → HTTPS Redirect
# ✓ HTTPS Connection
# ✓ SSL Certificate
# ... etc
```

**Si tous les tests passent**: ✅ C'est prêt!

---

## 🌐 Accès au Site

```
https://powalyze.ch
```

### Vérifications Rapides:
- [ ] Ouvre le lien dans le navigateur
- [ ] Cadenas vert (SSL valide) ✓
- [ ] Page charge sans erreurs
- [ ] Tourne sur téléphone (mobile responsive)
- [ ] Boutons/liens fonctionnent

---

## 📋 Structure du Script `deploy.sh`

Le script exécute **automatiquement** ces 8 étapes:

```
[1/7] Mise à jour système
[2/7] Installation dépendances (Node, Nginx, certbot)
[3/7] Création utilisateur application
[4/7] Setup application (clone/build)
[5/7] Configuration Nginx
[6/7] Déploiement des fichiers
[7/7] Configuration SSL (Let's Encrypt)
```

---

## 🔄 Mettre à Jour le Site

```bash
# Sur le VPS
cd /home/powalyze

# 1. Récupérer les modifications
git pull

# 2. Installer/mettre à jour dépendances
npm install --production

# 3. Rebuilder l'app
npm run build

# 4. Copier le build
sudo cp -r dist/* /var/www/powalyze.ch/

# 5. Recharger Nginx
sudo systemctl reload nginx
```

---

## 🐛 Troubleshooting Rapide

### Site ne s'affiche pas

```bash
# Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t

# Vérifier DNS
nslookup powalyze.ch

# Vérifier les fichiers
ls -la /var/www/powalyze.ch/
```

### SSL ne fonctionne pas

```bash
# Vérifier certificat
sudo certbot certificates

# Renouveler
sudo certbot renew --dry-run

# Redémarrer Nginx
sudo systemctl restart nginx
```

### Logs

```bash
# Nginx access log
tail -f /var/log/nginx/powalyze.ch.access.log

# Nginx error log
tail -f /var/log/nginx/powalyze.ch.error.log

# Système
journalctl -u nginx -f
```

---

## 📚 Documentation Complète

Pour plus de détails, lire le guide complet:

👉 **[HOSTINGER_DEPLOYMENT_GUIDE.md](./HOSTINGER_DEPLOYMENT_GUIDE.md)**

Il contient:
1. ✅ Prérequis détaillés
2. ✅ Configuration DNS étape-par-étape
3. ✅ SSH & Sécurité VPS
4. ✅ Déploiement automatisé expliqué
5. ✅ Vérification & tests
6. ✅ Maintenance & updates
7. ✅ Troubleshooting avancé

---

## 🔐 Sécurité

Le script configure automatiquement:

- ✅ **HTTPS** obligatoire (redirection HTTP → HTTPS)
- ✅ **SSL Certificate** (Let's Encrypt, auto-renouvelé)
- ✅ **Security Headers** (HSTS, X-Frame-Options, etc.)
- ✅ **Firewall** (ufw avec ports 22, 80, 443)
- ✅ **Gzip Compression** (réduction bande)
- ✅ **Cache Headers** (assets 1 an)

---

## ⚙️ Configuration Personnalisée

**Avant de déployer**, adapter:

### 1. Variables de Déploiement

Éditer `deploy.sh`:
```bash
DOMAIN="powalyze.ch"              # ← Change ton domaine
APP_USER="powalyze"               # ← User optionnel
EMAIL="fabrice@powalyze.ch"       # ← Email SSL
GITHUB_REPO="https://..."         # ← Ton repo
```

### 2. Variables d'Environnement

Éditer `.env.production`:
```
VITE_APP_URL=https://powalyze.ch  # ← Change
VITE_FORMSPREE_ID=xeoyznlq        # ← Ton ID
VITE_GA_ID=G-XXXXXXXX             # ← Analytics
```

### 3. Nginx Configuration

Si besoin personnalisé, éditer `nginx.conf` avant le déploiement.

---

## 📊 Checklist Final

- [ ] VPS commandé & accès SSH reçu
- [ ] Domaine pointé vers IP VPS
- [ ] Variables d'environnement configurées
- [ ] Script deploy.sh exécuté avec succès
- [ ] Tous les tests de verify-deployment.sh passent
- [ ] Site accessible via HTTPS
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Multilingue (FR/EN/DE) fonctionne
- [ ] PDFs téléchargeables
- [ ] Mobile responsive OK

---

## 🎯 Après le Déploiement

### Monitoring

```bash
# Installer Netdata (monitoring en temps réel)
curl https://get.netdata.cloud/kickstart.sh | sh

# Accéder: http://123.45.67.89:19999
```

### Backups Automatiques

```bash
# Créer backup manuel
cd /var/www
tar -czf backup-$(date +%Y%m%d).tar.gz powalyze.ch

# Ou utiliser Hostinger Backups (panel)
```

### Analytics

```bash
# Ajouter Google Analytics
# Éditer: src/pages/Home.jsx
# import { usePageView } from '@/hooks/usePageView';
```

### Email Notifications

```bash
# Configurer alertes Hostinger
# Panel → Settings → Notifications
```

---

## 💬 Support

### Hostinger Support
- 📧 Chat: 24/7 dans panel
- 🌐 Docs: https://support.hostinger.com/

### Documentation POWALYZE
- 📖 [PROJECT_MEMORY.md](./PROJECT_MEMORY.md) - Mémoire complète du projet
- 📖 [HOSTINGER_DEPLOYMENT_GUIDE.md](./HOSTINGER_DEPLOYMENT_GUIDE.md) - Guide détaillé

---

## 🎉 Succès!

Ton site est maintenant en ligne sur:

```
🌐 https://powalyze.ch
📊 Build: ~1.42 MB (411 kB gzipped)
⚡ Performance: 3 services disponibles
🔒 Sécurité: Grade A+ (SSL/HTTPS)
🌍 Multilingue: FR/EN/DE
📥 Téléchargements: PDFs dynamiques
```

---

**Document**: Packaging de Déploiement Hostinger  
**Date**: 15 Décembre 2025  
**Version**: 1.0  
**Responsable**: Fabrice Fays (POWALYZE)
