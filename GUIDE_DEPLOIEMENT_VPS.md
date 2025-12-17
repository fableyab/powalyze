# 🚀 GUIDE COMPLET - DÉPLOIEMENT VPS EN 3 ÉTAPES

**Date**: 15 Décembre 2025  
**Projet**: POWALYZE  
**VPS**: Hostinger - 193.203.169.19

---

## ⚡ MÉTHODE RAPIDE (RECOMMANDÉE)

### 📋 Prérequis
1. Vous avez votre **nom d'utilisateur SSH** (généralement `root`)
2. Vous avez le **mot de passe SSH** de votre VPS Hostinger
3. Le projet est **buildé** (dossier `deploy_staging/powalyze.com` existe)

### 🎯 Commande Unique

Ouvrez PowerShell dans le dossier du projet et exécutez:

```powershell
.\deploy-vps.ps1 -SshUser root
```

**C'EST TOUT !** Le script fait automatiquement:
- ✅ Vérifie la connexion SSH
- ✅ Installe NGINX + Certbot
- ✅ Crée les dossiers nécessaires
- ✅ Upload tous les fichiers
- ✅ Configure NGINX
- ✅ Installe le SSL (Let's Encrypt)
- ✅ Active HTTPS automatique

---

## 📝 MÉTHODE DÉTAILLÉE (ÉTAPE PAR ÉTAPE)

Si vous préférez comprendre chaque étape ou si le script automatique échoue:

### ÉTAPE 1: Trouver votre nom d'utilisateur SSH

#### Option A: Email Hostinger
Cherchez l'email avec "VPS Credentials" → Il contient votre Username

#### Option B: Panel Hostinger
1. Allez sur https://hpanel.hostinger.com/
2. VPS → Votre VPS → "Access Details"
3. Notez le **SSH Username** (généralement `root`)

#### Test rapide:
```powershell
ssh root@193.203.169.19
```
Si ça demande un mot de passe → **le nom d'utilisateur est bon** ✅

---

### ÉTAPE 2: Préparer les fichiers localement

#### Si pas encore fait:
```powershell
# 1. Build du projet
npm run build

# 2. Créer le package de déploiement
.\tools\package-deploy.ps1
```

Vérifiez que `deploy_staging\powalyze.com\` contient:
- index.html
- assets/ (CSS, JS)
- images/
- etc.

---

### ÉTAPE 3: Déployer sur le VPS

#### Option A: Script automatique (RECOMMANDÉ)
```powershell
.\deploy-vps.ps1 -SshUser root
```

#### Option B: Commandes manuelles

**1. Connexion et installation NGINX:**
```bash
ssh root@193.203.169.19

# Une fois connecté au VPS:
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

**2. Créer le dossier web:**
```bash
sudo mkdir -p /var/www/powalyze.com
sudo chown -R $USER:$USER /var/www/powalyze.com
exit  # Retour sur votre PC
```

**3. Upload des fichiers depuis votre PC:**
```powershell
scp -r ".\deploy_staging\powalyze.com\*" root@193.203.169.19:/var/www/powalyze.com/
```

**4. Configuration NGINX sur le VPS:**
```bash
ssh root@193.203.169.19

# Créer la config NGINX
sudo nano /etc/nginx/sites-available/powalyze.com
```

**Copiez cette configuration:**
```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name powalyze.com www.powalyze.com;
    
    root /var/www/powalyze.com;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Enregistrez** (Ctrl+X, Y, Enter) puis:

```bash
# Activer le site
sudo ln -sf /etc/nginx/sites-available/powalyze.com /etc/nginx/sites-enabled/

# Tester la config
sudo nginx -t

# Redémarrer NGINX
sudo systemctl reload nginx
```

**5. Test initial:**
```bash
# Sur votre PC, testez l'IP:
curl http://193.203.169.19
```
Vous devriez voir le HTML de votre site ✅

---

### ÉTAPE 4: Configuration DNS (Important!)

#### Dans votre panel Hostinger (DNS):

1. Allez sur https://hpanel.hostinger.com/
2. Domaines → powalyze.com → DNS / Nameservers
3. Ajoutez ces enregistrements:

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 193.203.169.19 | 3600 |
| A | www | 193.203.169.19 | 3600 |

4. Attendez 5-30 minutes (propagation DNS)

#### Vérifier la propagation:
```powershell
nslookup powalyze.com
# Doit retourner: 193.203.169.19
```

---

### ÉTAPE 5: Installation SSL (HTTPS)

**Une fois le DNS propagé:**

```bash
ssh root@193.203.169.19

# Installation automatique du certificat SSL
sudo certbot --nginx -d powalyze.com -d www.powalyze.com --agree-tos --email fabri@powalyze.com

# Redirection HTTPS automatique activée ✅
```

**Renouvellement automatique** (Let's Encrypt renouvelle automatiquement tous les 60 jours)

Test du renouvellement:
```bash
sudo certbot renew --dry-run
```

---

## ✅ VÉRIFICATION FINALE

### Tests à faire:

1. **Test IP directe:**
   ```
   http://193.203.169.19
   ```
   → Doit afficher votre site ✅

2. **Test domaine HTTP:**
   ```
   http://powalyze.com
   ```
   → Doit rediriger vers HTTPS et afficher votre site ✅

3. **Test domaine HTTPS:**
   ```
   https://powalyze.com
   ```
   → Doit afficher le cadenas SSL vert ✅

4. **Test www:**
   ```
   https://www.powalyze.com
   ```
   → Doit fonctionner ✅

---

## 🔄 MISES À JOUR FUTURES

Quand vous modifiez le code:

```powershell
# 1. Build
npm run build

# 2. Package
.\tools\package-deploy.ps1

# 3. Deploy
.\deploy-vps.ps1 -SshUser root
```

**Ou en une commande:**
```powershell
npm run build; .\tools\package-deploy.ps1; .\deploy-vps.ps1 -SshUser root
```

---

## 🛠️ COMMANDES UTILES

### Logs NGINX:
```bash
ssh root@193.203.169.19
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Redémarrer NGINX:
```bash
ssh root@193.203.169.19
sudo systemctl restart nginx
```

### Voir statut NGINX:
```bash
ssh root@193.203.169.19
sudo systemctl status nginx
```

### Test config NGINX:
```bash
ssh root@193.203.169.19
sudo nginx -t
```

### Voir les certificats SSL:
```bash
ssh root@193.203.169.19
sudo certbot certificates
```

### Renouveler SSL manuellement:
```bash
ssh root@193.203.169.19
sudo certbot renew
sudo systemctl reload nginx
```

---

## ❓ DÉPANNAGE

### Problème: "Connection refused"
```bash
# Vérifier que NGINX tourne
ssh root@193.203.169.19
sudo systemctl status nginx

# Si arrêté, le démarrer
sudo systemctl start nginx
```

### Problème: "403 Forbidden"
```bash
# Vérifier les permissions
ssh root@193.203.169.19
sudo chown -R www-data:www-data /var/www/powalyze.com
sudo chmod -R 755 /var/www/powalyze.com
```

### Problème: "SSL certificate problem"
```bash
# Réinstaller le certificat
ssh root@193.203.169.19
sudo certbot --nginx -d powalyze.com -d www.powalyze.com --force-renewal
```

### Problème: Le site ne se met pas à jour
```bash
# Vider le cache du navigateur: Ctrl + Shift + R
# Ou vérifier les fichiers sur le VPS:
ssh root@193.203.169.19
ls -la /var/www/powalyze.com/
```

---

## 📞 SUPPORT

Si problème, vérifiez dans cet ordre:
1. ✅ Connexion SSH fonctionne
2. ✅ NGINX installé et démarré
3. ✅ Fichiers uploadés dans `/var/www/powalyze.com/`
4. ✅ Configuration NGINX valide (`sudo nginx -t`)
5. ✅ DNS configuré et propagé
6. ✅ Firewall autorise port 80 et 443

---

**🎉 Voilà ! Votre site POWALYZE est maintenant en ligne !**
