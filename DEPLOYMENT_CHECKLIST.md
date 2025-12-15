# ✅ CHECKLIST DÉPLOIEMENT HOSTINGER - POWALYZE

**Date Cible**: 15 Décembre 2025  
**Durée Estimée**: 30 minutes  
**Complexité**: ⭐⭐ (Facile - Automatisé)

---

## 📋 AVANT LE DÉPLOIEMENT

### Préparation Locale
- [ ] Tester le build localement: `npm run build`
- [ ] Vérifier les fichiers `dist/` existent
- [ ] Lire [DEPLOYMENT_README.md](./DEPLOYMENT_README.md)
- [ ] Lire [HOSTINGER_DEPLOYMENT_GUIDE.md](./HOSTINGER_DEPLOYMENT_GUIDE.md)
- [ ] Noter l'IP du VPS qu'on va recevoir
- [ ] Préparer le mot de passe SSH

### Informations à Rassembler
- [ ] **Domaine**: powalyze.ch (ou ton domaine)
- [ ] **Email SSL**: fabrice@powalyze.ch (ou ton email)
- [ ] **Repo GitHub**: https://github.com/[USERNAME]/powalyze
- [ ] **IP VPS**: (sera fourni par Hostinger)
- [ ] **Mot de passe SSH**: (sera envoyé par email)

### Configuration Fichiers
- [ ] Éditer `deploy.sh` ligne 22-26 (DOMAIN, EMAIL, GITHUB_REPO)
- [ ] Éditer `.env.production` avec tes valeurs
- [ ] Éditer `nginx.conf` si besoin personnalisé

---

## 🛒 ÉTAPE 1: COMMANDER LE VPS (5 min)

### Sur Hostinger
- [ ] Aller à: https://www.hostinger.fr/vps
- [ ] Cliquer: **Commander VPS**
- [ ] Choisir Plan:
  - [ ] Minimum: 2GB RAM + 50GB SSD
  - [ ] OS: Ubuntu 20.04 LTS ou 22.04 LTS
  - [ ] Localisation: Eu (Europe)
- [ ] Compléter Paiement
- [ ] Attendre email de confirmation avec:
  - [ ] ✉️ IP du VPS
  - [ ] ✉️ Utilisateur root
  - [ ] ✉️ Mot de passe SSH
  - [ ] ✉️ Accès panel

### Sauvegarder Info
```
IP VPS: _______________
Username: _______________
Password: _______________
Panel: _______________
```

---

## 🌐 ÉTAPE 2: CONFIGURER DOMAINE (10 min)

### Dans Panel Hostinger
- [ ] Aller à: **Domaines**
- [ ] Choisir: **powalyze.ch**
- [ ] Cliquer: **Manage DNS**

### Ajouter Entrées DNS
- [ ] Ajouter entrée 1:
  - Type: **A**
  - Name: **@** (root)
  - Value: **123.45.67.89** (IP du VPS)
  - TTL: **300**
  - Cliquer: **Save**

- [ ] Ajouter entrée 2:
  - Type: **A**
  - Name: **www**
  - Value: **123.45.67.89**
  - TTL: **300**
  - Cliquer: **Save**

### Vérifier Propagation
- [ ] Attendre **10-15 minutes**
- [ ] Vérifier DNS (CMD/Terminal):
  ```
  nslookup powalyze.ch
  # Doit afficher: 123.45.67.89
  ```

---

## 💻 ÉTAPE 3: DÉPLOIEMENT VPS (10 min)

### Connexion SSH
- [ ] Ouvrir **PowerShell** (Windows) ou **Terminal** (Mac/Linux)
- [ ] Exécuter:
  ```
  ssh root@123.45.67.89
  # [Entrer le mot de passe]
  ```
- [ ] Vérifier prompt change à: `root@vps:~#`

### Clone du Projet
- [ ] Exécuter sur VPS:
  ```
  cd /home
  git clone https://github.com/USERNAME/powalyze.git
  cd powalyze
  ```
  (Remplacer USERNAME par ton username GitHub)

### Exécuter Deploy Script
- [ ] Rendre exécutable:
  ```
  chmod +x deploy.sh
  ```
- [ ] Adapter le script (si besoin):
  ```
  nano deploy.sh
  # Modifier: DOMAIN, EMAIL, GITHUB_REPO
  # Ctrl+X, Y, Enter pour sauvegarder
  ```
- [ ] Lancer le déploiement:
  ```
  sudo bash deploy.sh
  ```
- [ ] **Attendre fin du script** (5-10 min)
  - [ ] Système mis à jour
  - [ ] Dépendances installées
  - [ ] Nginx configuré
  - [ ] App buildée
  - [ ] SSL créé
  - [ ] HTTPS activé

### Vérifier Résultat
- [ ] Script affiche:
  ```
  ✅ DÉPLOIEMENT RÉUSSI!
  Domaine: powalyze.ch
  URL: https://powalyze.ch
  ```
- [ ] Pas d'erreurs critiques dans les logs

---

## ✅ ÉTAPE 4: VÉRIFICATION (5 min)

### Test Automatisé
- [ ] Sur le VPS, exécuter:
  ```
  chmod +x verify-deployment.sh
  bash verify-deployment.sh powalyze.ch
  ```
- [ ] Vérifier résultats:
  ```
  ✅ DEPLOYMENT SUCCESSFUL!
  Score: 100%
  ```

### Test Manuel - Navigateur
- [ ] Ouvrir: https://powalyze.ch
- [ ] Vérifier:
  - [ ] Page charge sans erreur
  - [ ] Cadenas vert visible (SSL OK)
  - [ ] Logo + texte s'affichent
  - [ ] Aucune erreur console (F12)

### Test Routes
- [ ] Vérifier pages principales:
  - [ ] https://powalyze.ch (Home)
  - [ ] https://powalyze.ch/about (About)
  - [ ] https://powalyze.ch/contact (Contact)
  - [ ] https://powalyze.ch/services/pmo-strategique (Service)
  - [ ] https://powalyze.ch/espace-client/documents (Documents)

### Test Mobile
- [ ] Ouvrir sur téléphone (ou F12 → Responsive)
- [ ] Vérifier:
  - [ ] Layout responsive
  - [ ] Boutons cliquables
  - [ ] Texte lisible
  - [ ] Images chargent

### Test Features
- [ ] Tester téléchargements PDF (si applicable)
- [ ] Tester formulaire contact
- [ ] Tester language selector (FR/EN/DE)

---

## 🔒 ÉTAPE 5: SÉCURITÉ & MONITORING (5 min)

### Vérifier Sécurité
- [ ] HTTPS activé (cadenas vert)
- [ ] Redirection HTTP → HTTPS:
  ```
  curl -I http://powalyze.ch
  # Doit afficher: 301 ou 308
  ```
- [ ] Headers de sécurité:
  ```
  curl -I https://powalyze.ch | grep -i strict
  # Doit afficher: HSTS header
  ```

### Vérifier Certificat SSL
- [ ] Sur VPS:
  ```
  sudo certbot certificates
  # Doit afficher: powalyze.ch avec date expiry
  ```

### Vérifier Logs
- [ ] Sur VPS:
  ```
  tail -20 /var/log/nginx/powalyze.ch.access.log
  # Doit afficher requêtes HTTP 200
  ```

### Configurer Backups
- [ ] Sur VPS (optionnel):
  ```
  cd /var/www
  tar -czf backup-$(date +%Y%m%d).tar.gz powalyze.ch
  # Ou: upload vers cloud (Google Drive, OneDrive)
  ```

---

## 🎉 APRÈS LE DÉPLOIEMENT

### Communication
- [ ] Tester depuis navigateur externe (pas local)
- [ ] Tester depuis téléphone mobile
- [ ] Partager lien avec équipe: https://powalyze.ch
- [ ] Vérifier les statistiques Hostinger

### Monitoring (Optionnel)
- [ ] Installer monitoring en temps réel:
  ```
  curl https://get.netdata.cloud/kickstart.sh | sh
  # Accéder: http://IP:19999
  ```
- [ ] Configurer alertes email (panel Hostinger)

### Futures Updates
- [ ] Bookmark process pour updates:
  ```
  cd /home/powalyze
  git pull
  npm run build
  sudo cp -r dist/* /var/www/powalyze.ch/
  sudo systemctl reload nginx
  ```

### Analytics (Futur)
- [ ] Ajouter Google Analytics si besoin
- [ ] Tracker conversions (téléchargements, contacts)

---

## 🆘 EN CAS DE PROBLÈME

### Site ne s'affiche pas
- [ ] Attendre 5-10 min propagation DNS
- [ ] Vérifier DNS: `nslookup powalyze.ch`
- [ ] Vérifier Nginx: `sudo systemctl status nginx`
- [ ] Vérifier fichiers: `ls -la /var/www/powalyze.ch/`
- [ ] Lire logs: `tail -50 /var/log/nginx/powalyze.ch.error.log`

### SSL ne fonctionne pas
- [ ] Vérifier certificat: `sudo certbot certificates`
- [ ] Attendre 10 min après DNS
- [ ] Tester: `curl https://powalyze.ch`
- [ ] Redémarrer: `sudo systemctl restart nginx`

### Performance lente
- [ ] Vérifier CPU/RAM: `free -h && df -h`
- [ ] Vérifier logs: `tail -100 /var/log/nginx/powalyze.ch.access.log`
- [ ] Redémarrer Nginx: `sudo systemctl restart nginx`
- [ ] Contacter Hostinger support

---

## 📊 RÉSUMÉ TIMING

```
Commande VPS:        5 min  (immédiat)
Config Domaine:      10 min (+ propagation)
Déploiement:         10 min (script auto)
Vérification:        5 min  (tests)
─────────────────────────────
TOTAL:               30 min
```

---

## 🎯 CHECKLIST FINAL

- [ ] VPS activé et accessible
- [ ] Domaine pointé vers IP
- [ ] Deploy script exécuté avec succès
- [ ] Tous les tests verify passent
- [ ] Site accessible via HTTPS
- [ ] SSL certificat valide
- [ ] Toutes les pages chargent
- [ ] Mobile responsive OK
- [ ] Pas d'erreurs console
- [ ] Équipe notifiée ✨

---

## ✅ STATUS FINAL

```
✅ DÉPLOIEMENT RÉUSSI!

Site: https://powalyze.ch
SSL: ✓ Valid
Perf: ✓ Good
Sécurité: ✓ A+
Mobile: ✓ Responsive

🚀 Ready for Production!
```

---

**Déploiement**: 15 Décembre 2025  
**Responsable**: Fabrice Fays (POWALYZE)  
**Support**: Hostinger 24/7 + Documentation incluse
