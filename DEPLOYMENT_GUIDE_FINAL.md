# 🚀 GUIDE DE DÉPLOIEMENT POWALYZE SUR HOSTINGER

## 📋 Prérequis

✅ VPS Hostinger: **193.203.169.19** (Ubuntu 24.04)
✅ Build Local: npm run build (déjà complété)
✅ SSH disponible sur votre PC Windows

## 🎯 Étapes Rapides

### Étape 1: Vérifier SSH est disponible

```powershell
# Dans PowerShell, vérifier que SSH fonctionne
ssh -V
```

Si "ssh: command not found", SSH est déjà intégré dans Windows 10+.

### Étape 2: Lancer le déploiement

**Option A: Avec le script PowerShell automatisé**

```powershell
cd "C:\Users\fabri\OneDrive\Bureau\POWALYZE FINAL"
.\deploy-to-vps.ps1 "93oibong"
```

**Option B: Commandes manuelles (expliquées ci-dessous)**

---

## 📋 Déploiement Manuel - Étape par Étape

### Étape 1: Connexion SSH

```powershell
ssh root@193.203.169.19
# Mot de passe: 93oibong
```

### Étape 2: Créer le répertoire

```bash
mkdir -p /var/www/powalyze.com
cd /var/www/powalyze.com
```

### Étape 3: Transférer les fichiers (depuis PowerShell LOCAL)

```powershell
# Ouvrir PowerShell LOCAL (pas SSH)
cd "C:\Users\fabri\OneDrive\Bureau\POWALYZE FINAL"

# Transférer le contenu de dist/
scp -r "dist\*" root@193.203.169.19:/var/www/powalyze.com/
# Mot de passe: 93oibong
```

### Étape 4: Configurer NGINX (dans SSH)

```bash
# Installer NGINX
apt-get update
apt-get install -y nginx

# Créer la configuration
cat > /etc/nginx/sites-available/powalyze.com << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name powalyze.com www.powalyze.com 193.203.169.19;
    
    root /var/www/powalyze.com;
    index index.html;
    
    # Compression gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache assets pour 1 an
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing - tous les chemins → index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Headers sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Activer le site
ln -sf /etc/nginx/sites-available/powalyze.com /etc/nginx/sites-enabled/

# Supprimer la config par défaut
rm -f /etc/nginx/sites-enabled/default

# Tester la config
nginx -t
# Vous devez voir: "syntax is ok" et "test is successful"

# Redémarrer NGINX
systemctl restart nginx
```

### Étape 5: Vérifier les permissions

```bash
chown -R www-data:www-data /var/www/powalyze.com
chmod -R 755 /var/www/powalyze.com
ls -la /var/www/powalyze.com/
# Vous devez voir: index.html et assets/
```

### Étape 6: Vérifier NGINX tourne

```bash
systemctl status nginx
# Vous devez voir: active (running) en vert

# Ou check direct
curl http://localhost/
```

---

## ✅ Vérification du Déploiement

### Test 1: Depuis votre PC

Ouvrez un navigateur et allez à:

```
http://193.203.169.19
```

Vous devez voir:
- ✅ Page d'accueil POWALYZE
- ✅ Logo et navigation clairs
- ✅ Aucune erreur 404 ou 500

### Test 2: Tester les routes

```
http://193.203.169.19/services/pmo-strategique
http://193.203.169.19/pmo-360-demo
http://193.203.169.19/power-bi-advanced
```

Toutes les pages doivent charger correctement.

### Test 3: Vérifier les assets

Ouvrez la console du navigateur (F12):
- ✅ Aucune erreur rouge
- ✅ CSS et JS chargent correctement
- ✅ Images s'affichent

---

## 🌐 Configuration du Domaine (Après)

### Pointer powalyze.com vers votre VPS

Allez dans les paramètres DNS du registrar (ex: Namecheap):

```
A record: powalyze.com     → 193.203.169.19
A record: www.powalyze.com → 193.203.169.19
```

Attendez 2-5 minutes pour la propagation.

---

## 🔒 Configuration SSL/HTTPS (Recommandé)

Une fois le site fonctionnel:

```bash
ssh root@193.203.169.19

# Installer certbot
apt-get install -y certbot python3-certbot-nginx

# Obtenir le certificat (Let's Encrypt gratuit)
certbot --nginx -d powalyze.com -d www.powalyze.com

# Suivez les instructions interactives
# Choisissez: "Redirect HTTP to HTTPS"
```

Après cela, votre site sera en HTTPS!

---

## 🐛 Troubleshooting

### "Connection refused"
```bash
# VPS pas joignable
# Vérifier l'IP: 193.203.169.19
# Vérifier le mot de passe SSH
```

### "Permission denied"
```bash
# Exécuter avec sudo
sudo systemctl restart nginx
sudo chown -R www-data:www-data /var/www/powalyze.com
```

### "NGINX syntax error"
```bash
# Revoir la config NGINX
sudo nano /etc/nginx/sites-available/powalyze.com
# Vérifier les guillemets et la syntaxe

# Tester à nouveau
sudo nginx -t
```

### "404 Not Found"
```bash
# Vérifier que les fichiers sont transférés
ls -la /var/www/powalyze.com/
# Doit montrer: index.html, assets/, images/

# Vérifier les permissions
ls -la /var/www/powalyze.com/index.html
# Doit montrer: -rw-r--r-- root:www-data (ou similaire)
```

### "Blank white page"
```bash
# Vérifier la console (F12 → Console)
# Vérifier les logs NGINX
sudo tail -20 /var/log/nginx/error.log
```

---

## 📊 Structure Finale Attendue

```
193.203.169.19
├── / (accueil)
├── /services/pmo-strategique (services PMO)
├── /pmo-360-demo (démo interactive)
├── /power-bi-advanced (tableau financier)
├── /contact (formulaire contact)
└── /assets/ (CSS, JS, images)
```

---

## 📞 Support Hostinger

Si vous avez des problèmes:

1. **Console Web Hostinger**: https://hpanel.hostinger.com/
2. **Chat Support Hostinger**: Disponible 24/7
3. **Terminal SSH Web**: Utiliser le terminal intégré au lieu de votre PC

---

## ✨ Commandes Utiles Post-Déploiement

```bash
# Vérifier que NGINX tourne
systemctl status nginx

# Redémarrer NGINX
systemctl restart nginx

# Voir les logs NGINX
tail -50 /var/log/nginx/error.log
tail -50 /var/log/nginx/access.log

# Vérifier l'espace disque
df -h /var/www/powalyze.com

# Vérifier les permissions
ls -la /var/www/powalyze.com/
```

---

**Status**: 🚀 Prêt pour déploiement!
