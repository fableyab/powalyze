# 🚀 GUIDE COMPLET - DÉPLOIEMENT POWALYZE SUR HOSTINGER VPS

**Date**: 15 Décembre 2025  
**Projet**: POWALYZE - PMO/Data/IA Consulting  
**Domaine**: powalyze.ch (À adapter)

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Étape 1: Préparation Hostinger](#étape-1-préparation-hostinger)
3. [Étape 2: Configuration VPS](#étape-2-configuration-vps)
4. [Étape 3: Déploiement Automatisé](#étape-3-déploiement-automatisé)
5. [Étape 4: DNS & Domaine](#étape-4-dns--domaine)
6. [Étape 5: SSL & Sécurité](#étape-5-ssl--sécurité)
7. [Étape 6: Vérification & Tests](#étape-6-vérification--tests)
8. [Maintenance](#maintenance)

---

## 📋 Prérequis

Avant de commencer, tu dois avoir:

- ✅ Compte Hostinger VPS activé
- ✅ Accès SSH au VPS
- ✅ Domaine powalyze.ch (ou ton domaine)
- ✅ Email pour certificat SSL
- ✅ Fichiers du projet POWALYZE localement

### Infos à Récupérer de Hostinger

1. **IP du VPS**: Dans le panel Hostinger → VPS → IP Address
   ```
   Exemple: 123.45.67.89
   ```

2. **Identifiants SSH**:
   ```
   Username: root (ou ton utilisateur)
   Password: [de l'email Hostinger]
   Port: 22 (par défaut)
   ```

3. **Panel Hostinger**: Pour gérer le domaine & DNS

---

## 🔧 ÉTAPE 1: Préparation Hostinger

### 1.1 Pointer le Domaine vers le VPS

**Où**: Panel Hostinger → Domaines → Manage DNS

1. Ajoute 2 entrées DNS A:
   ```
   Type: A
   Name: @
   Value: 123.45.67.89 (IP du VPS)
   TTL: 300
   
   Type: A
   Name: www
   Value: 123.45.67.89
   TTL: 300
   ```

2. **Attendre 5-15 minutes** pour la propagation DNS

**Vérifier**: 
```bash
nslookup powalyze.ch
# Doit afficher l'IP du VPS
```

---

## 💻 ÉTAPE 2: Configuration VPS

### 2.1 Connexion SSH

**Depuis Windows (PowerShell)**:
```powershell
ssh root@123.45.67.89
# Ou: ssh -p 22 root@123.45.67.89
```

**Depuis Mac/Linux**:
```bash
ssh root@123.45.67.89
```

Entrer le mot de passe reçu par email.

### 2.2 Sécuriser le VPS (Recommandé)

```bash
# Changer le mot de passe root
passwd

# Mettre à jour le système
apt-get update && apt-get upgrade -y

# Installer firewall basique
apt-get install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 2.3 Préparer le VPS pour le Déploiement

```bash
# Installer Git & Node.js
apt-get install -y curl wget git

# Installer Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Vérifier installations
node --version
npm --version
git --version
```

---

## 🚀 ÉTAPE 3: Déploiement Automatisé

### 3.1 Uploader le Projet

**Option A: Via Git (Recommandé)**

```bash
# Sur le VPS
cd /home
git clone https://github.com/TON_USERNAME/powalyze.git
cd powalyze
```

**Option B: Via SCP (Upload manuel)**

```bash
# Depuis ton ordi (Windows PowerShell)
scp -r "C:\Users\fabri\OneDrive\Bureau\POWALYZE FINAL\*" root@123.45.67.89:/home/powalyze/

# Ou Mac/Linux
scp -r ~/POWALYZE\ FINAL/* root@123.45.67.89:/home/powalyze/
```

### 3.2 Exécuter le Script de Déploiement

```bash
# Sur le VPS
cd /home/powalyze

# Copier le script deploy.sh (s'il n'est pas là)
# Ou créer un nouveau: nano deploy.sh
# (Copier le contenu de deploy.sh)

# Rendre executable
chmod +x deploy.sh

# Adapter pour ton domaine (éditer le script)
nano deploy.sh
# Changer: DOMAIN="powalyze.ch" → ton domaine
#         EMAIL="fabrice@powalyze.ch" → ton email

# Exécuter le déploiement
sudo bash deploy.sh
```

**Le script fera automatiquement**:
- ✅ Installer toutes les dépendances
- ✅ Configurer Nginx
- ✅ Builder l'application
- ✅ Déployer le build
- ✅ Configurer SSL (Let's Encrypt)
- ✅ Activer HTTPS avec auto-renouvelment

**Durée estimée**: 5-10 minutes

---

## 🌐 ÉTAPE 4: DNS & Domaine

### 4.1 Vérifier la Propagation DNS

```bash
# Attendre 10-15 minutes après modification DNS

# Vérifier avec nslookup
nslookup powalyze.ch

# Ou avec dig
dig powalyze.ch

# Doit retourner l'IP du VPS
```

### 4.2 Rediriger www vers non-www (Optionnel)

Ajouter entrée DNS CNAME:
```
Type: CNAME
Name: www
Value: powalyze.ch
```

---

## 🔒 ÉTAPE 5: SSL & Sécurité

### 5.1 Certificat SSL (Automatique)

Le script `deploy.sh` configure automatiquement:
- ✅ Let's Encrypt Certificate
- ✅ Auto-renewal tous les 60 jours
- ✅ Redirection HTTP → HTTPS

**Vérifier**:
```bash
sudo certbot certificates

# Ou
curl -I https://powalyze.ch
# Chercher "SSL certificate"
```

### 5.2 Headers de Sécurité

Déjà configurés dans `nginx.conf`:
- ✅ HSTS (force HTTPS)
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ Permissions-Policy

---

## ✅ ÉTAPE 6: Vérification & Tests

### 6.1 Tester le Site

```bash
# Sur le VPS

# 1. Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t  # Doit dire "OK"

# 2. Tester HTTP → HTTPS redirect
curl -I http://powalyze.ch
# Doit avoir: 301 / 308 location: https://

# 3. Tester HTTPS
curl -I https://powalyze.ch
# Doit avoir: 200 OK et SSL certificate

# 4. Vérifier les fichiers
ls -la /var/www/powalyze.ch/
# Doit avoir: index.html, assets/, etc.
```

### 6.2 Tester depuis le Navigateur

1. Ouvre: **https://powalyze.ch**
2. Vérifie:
   - ✅ Page charge sans erreurs
   - ✅ Cadenas vert (SSL valide)
   - ✅ Pas de warnings CORS
   - ✅ Tous les assets chargent

3. Test les pages:
   - `/` (Home)
   - `/about`
   - `/services/pmo-strategique`
   - `/espace-client/documents`
   - Etc.

### 6.3 Vérifier les Logs

```bash
# Logs Nginx
tail -f /var/log/nginx/powalyze.ch.access.log
tail -f /var/log/nginx/powalyze.ch.error.log

# Logs système
journalctl -u nginx -f
```

---

## 🔄 Maintenance

### Mettre à Jour le Site

```bash
# Sur le VPS
cd /home/powalyze

# 1. Récupérer les changements
git pull

# 2. Réinstaller dépendances (si needed)
npm install --production

# 3. Rebuilder
npm run build

# 4. Déployer
sudo cp -r dist/* /var/www/powalyze.ch/

# 5. Recharger Nginx
sudo systemctl reload nginx
```

### Auto-Update (CI/CD Avancé)

Pour déploiement auto après git push (utiliser GitHub Actions):

```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/powalyze.ch
            git pull
            npm install
            npm run build
            sudo systemctl reload nginx
```

### Monitoring & Alertes

**Installer Monitoring**:
```bash
# Option 1: Htop (simple)
apt-get install htop
htop

# Option 2: Netdata (avancé)
apt-get install netdata
# Puis: http://IP:19999
```

### Backups Automatiques

```bash
# Créer backup du site
cd /var/www
tar -czf backup-powalyze-$(date +%Y%m%d).tar.gz powalyze.ch

# Uploader vers cloud (Google Drive, OneDrive, etc.)
# Ou utiliser: Hostinger Backups (dans panel)
```

---

## 🐛 Troubleshooting

### Site ne s'affiche pas

```bash
# 1. Vérifier DNS
nslookup powalyze.ch

# 2. Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t

# 3. Vérifier les fichiers
ls -la /var/www/powalyze.ch/

# 4. Vérifier logs
tail -50 /var/log/nginx/powalyze.ch.error.log
```

### Certificat SSL ne fonctionne pas

```bash
# 1. Vérifier certificat
sudo certbot certificates

# 2. Renouveler manuellement
sudo certbot renew --dry-run

# 3. Redémarrer Nginx
sudo systemctl restart nginx
```

### Erreur 404 sur refresh

✅ **Déjà résolu** dans `nginx.conf`:
```nginx
location / {
    try_files $uri $uri/ /index.html =404;
}
```

### Problème de Performance

```bash
# Vérifier CPU/RAM
free -h
df -h
top

# Optimiser Nginx cache
# Éditer: /etc/nginx/sites-available/powalyze.ch
# Augmenter: gzip_comp_level 6 → 9
# Ajouter: client_max_body_size 20M

# Recharger
sudo nginx -t && sudo systemctl reload nginx
```

---

## 📊 Checklist Final

- [ ] Domain pointé vers IP VPS
- [ ] Accès SSH au VPS vérifié
- [ ] Script deploy.sh exécuté
- [ ] Site accessible via HTTPS
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Multilingue (FR/EN/DE) fonctionne
- [ ] PDFs téléchargeables
- [ ] Mobile responsive OK
- [ ] Pas d'erreurs console
- [ ] Analytics tracké (si applicable)

---

## 📞 Support Hostinger

- **Panel**: https://hpanel.hostinger.com
- **Chat Support**: 24/7 disponible
- **Docs**: https://support.hostinger.com/

---

## 🎉 C'est Prêt!

Ton site POWALYZE est maintenant en ligne sur:

```
🌐 https://powalyze.ch
```

**Prochaines étapes**:
1. Tester tous les features
2. Configurer analytics (Google Analytics, Mixpanel)
3. Mettre en place monitoring
4. Ajouter backups automatiques
5. Optimiser SEO

---

**Document créé**: 15 Décembre 2025  
**Responsable**: Fabrice Fays (POWALYZE)  
**Support**: Via Hostinger + Documentation GitHub
