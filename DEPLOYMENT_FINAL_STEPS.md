# 🚀 GUIDE DE DÉPLOIEMENT FINAL - HOSTINGER VPS

## ✅ Ce qui est fait

- ✅ **Build production**: `npm run build` complété (3MB, 104 fichiers)
- ✅ **Fichiers transférés**: `dist/` copié vers `/var/www/powalyze.com` sur le VPS
- ✅ **Serveur vérifié**: Ubuntu 24.04, 96GB disque disponible
- ✅ **NGINX installé**: Version 1.24.0
- ✅ **Configuration NGINX**: `nginx-powalyze.conf` prête

## 📋 ÉTAPES RESTANTES (3 étapes simples)

### ÉTAPE 1: Ouvrir SSH Terminal Hostinger

1. Allez à: **https://hpanel.hostinger.com/**
2. Login avec votre compte Hostinger
3. Sélectionnez: **Dedicated Servers** → **srv1196525** (ou votre serveur)
4. Cliquez: **Terminal Web** (icône terminal noir)
5. Vous êtes maintenant connecté en SSH dans le navigateur

### ÉTAPE 2: Nettoyer les configurations NGINX existantes

Copie-colle ce bloc complètement dans le terminal web Hostinger:

```bash
rm -f /etc/nginx/sites-enabled/*
rm -f /etc/nginx/sites-available/powalyze*
echo "✅ Configurations supprimées"
```

### ÉTAPE 3: Créer la nouvelle configuration NGINX

Copie-colle ce bloc complètement dans le terminal web:

```bash
cat > /etc/nginx/sites-available/powalyze.com << 'CONF'
server {
    listen 80;
    server_name powalyze.com www.powalyze.com 193.203.169.19;
    root /var/www/powalyze.com;
    index index.html;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
CONF

ln -sf /etc/nginx/sites-available/powalyze.com /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
echo "✅ Configuration appliquée et NGINX redémarré"
```

### ÉTAPE 4: Vérifier les fichiers

```bash
ls -lh /var/www/powalyze.com/
```

Vous devez voir:
```
index.html
assets/      (dossier)
images/      (dossier)
llms.txt
robots.txt
sitemap.xml
```

### ÉTAPE 5: Vérifier NGINX

```bash
systemctl status nginx
```

Vous devez voir: `active (running)` en vert

---

## 🌐 TESTER LE SITE

Une fois les 5 étapes complétées, ouvrez dans votre navigateur:

```
http://193.203.169.19
```

Vous devez voir:
- ✅ La page d'accueil POWALYZE
- ✅ Logo et navigation
- ✅ Pas d'erreur 404 ou 500

### Tester les pages principales:

```
http://193.203.169.19/power-bi-advanced
  → Doit afficher le tableau Financial Core avec KPIs

http://193.203.169.19/pmo-360-demo
  → Démo interactive PMO 360

http://193.203.169.19/services/pmo-strategique
  → Page services PMO
```

---

## 🔒 Configuration SSL/HTTPS (Optionnel après)

Une fois le site accessible, vous pouvez ajouter HTTPS:

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d powalyze.com -d www.powalyze.com
```

Suivez les instructions interactives.

---

## 📞 Si erreur NGINX

Vérifier les erreurs:
```bash
nginx -t      # Affiche les erreurs de config
systemctl status nginx -l  # Affiche les logs complets
tail -20 /var/log/nginx/error.log
```

---

## ✅ Checklist finale

- [ ] SSH Terminal Web ouvert
- [ ] Configurations orphelines supprimées
- [ ] Nouvelle config NGINX créée
- [ ] Fichiers vérifiés dans `/var/www/powalyze.com`
- [ ] NGINX actif et en running
- [ ] Site accessible via `http://193.203.169.19`
- [ ] Pages de démo chargeant correctement
- [ ] Pas d'erreur dans la console (F12)

---

## 📊 Info VPS

```
IP: 193.203.169.19
User: root
Password: 93oibong ou A@pple2026A@pple2026
OS: Ubuntu 24.04
Web Root: /var/www/powalyze.com
Web Server: NGINX 1.24.0
```

---

**Une fois les 5 étapes complétées, votre site sera EN LIGNE! 🎉**
