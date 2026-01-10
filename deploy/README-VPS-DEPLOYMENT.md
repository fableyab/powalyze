# 🚀 Déploiement Metabase sur VPS

## Configuration VPS

```
IP: 193.203.169.19
SSH: ssh root@193.203.169.19
OS: Ubuntu/Debian (recommended)
```

## 📦 Installation Complète (5 minutes)

### Méthode 1: Installation Automatique (Recommandé)

```bash
# 1. Connectez-vous au VPS
ssh root@193.203.169.19

# 2. Téléchargez les scripts
wget https://raw.githubusercontent.com/votre-repo/powalyze/main/deploy/metabase-vps-install.sh
wget https://raw.githubusercontent.com/votre-repo/powalyze/main/deploy/nginx-metabase.conf
wget https://raw.githubusercontent.com/votre-repo/powalyze/main/deploy/install-nginx.sh

# 3. Rendez les scripts exécutables
chmod +x metabase-vps-install.sh install-nginx.sh

# 4. Lancez l'installation Metabase
./metabase-vps-install.sh

# 5. (Optionnel) Installez Nginx comme reverse proxy
./install-nginx.sh
```

### Méthode 2: Installation Manuelle

#### Étape 1: Installer Docker

```bash
ssh root@193.203.169.19

# Mise à jour système
apt-get update && apt-get upgrade -y

# Installation Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Installation Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Vérification
docker --version
docker-compose --version
```

#### Étape 2: Déployer Metabase

```bash
# Créer répertoire
mkdir -p /opt/metabase/data
cd /opt/metabase

# Créer docker-compose.yml
cat > docker-compose.yml <<'EOF'
version: '3.8'

services:
  metabase:
    image: metabase/metabase:latest
    container_name: metabase
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - ./data:/metabase-data
    environment:
      - MB_DB_FILE=/metabase-data/metabase.db
      - MB_SITE_URL=http://193.203.169.19:3000
    networks:
      - metabase-net

networks:
  metabase-net:
    driver: bridge
EOF

# Démarrer Metabase
docker-compose up -d

# Vérifier les logs
docker logs metabase -f
```

#### Étape 3: Configurer le Firewall

```bash
# Ouvrir les ports nécessaires
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw allow 3000/tcp # Metabase
ufw enable
ufw status
```

## 🔧 Configuration Metabase

### 1. Accéder à Metabase

Ouvrez dans votre navigateur: **http://193.203.169.19:3000**

### 2. Créer Compte Admin

- Email: votre.email@exemple.com
- Mot de passe: (choisissez un mot de passe fort)
- Nom de l'organisation: Powalyze

### 3. Connecter Supabase

```
Admin → Databases → Add database

Type: PostgreSQL
Name: Powalyze DB
Host: db.xxxxx.supabase.co
Port: 5432
Database name: postgres
Username: postgres
Password: [votre password Supabase]
```

Cliquez "Save" puis "Test connection"

### 4. Activer l'Embedding

```
Admin → Settings → Embedding in other applications
→ Cliquez sur "Enable"
→ Copiez le METABASE_SECRET_KEY
```

**⚠️ IMPORTANT: Sauvegardez cette clé, vous en aurez besoin !**

### 5. Créer des Dashboards de Test

```
New → Dashboard
→ Nommez: "Dashboard Commercial", "Analyse Financière", "KPIs PMO"
→ Ajoutez des questions/visualisations
→ Pour chaque dashboard:
  - Settings → Sharing → Enable embedding
  - Notez le Dashboard ID depuis l'URL: /dashboard/1 → ID = 1
```

## 🌐 Configuration Nginx (Optionnel mais recommandé)

### Installation Nginx + SSL

```bash
# Installer Nginx
apt-get install -y nginx

# Générer certificat auto-signé (temporaire)
mkdir -p /etc/ssl/private
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt \
  -subj "/C=CH/ST=Vaud/L=Lausanne/O=Powalyze/CN=193.203.169.19"

# Copier la configuration
nano /etc/nginx/sites-available/metabase
# Collez le contenu de nginx-metabase.conf

# Activer le site
ln -s /etc/nginx/sites-available/metabase /etc/nginx/sites-enabled/

# Tester et redémarrer
nginx -t
systemctl restart nginx
systemctl enable nginx
```

### Avec Domaine + Let's Encrypt (Recommandé pour Production)

```bash
# 1. Pointez votre domaine vers 193.203.169.19
#    Exemple: metabase.powalyze.com → 193.203.169.19

# 2. Installer Certbot
apt-get install -y certbot python3-certbot-nginx

# 3. Obtenir certificat SSL
certbot --nginx -d metabase.powalyze.com

# 4. Certificat auto-renouvelé automatiquement
certbot renew --dry-run
```

## 📋 Configuration Powalyze

### 1. Créer fichier .env local

```bash
# Sur votre machine Windows (PowerShell)
cd c:\powalyze
cp .env.example .env
notepad .env
```

### 2. Ajouter les variables

```env
# Supabase (existant)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Metabase (nouveau)
VITE_METABASE_URL=http://193.203.169.19:3000
VITE_METABASE_SECRET_KEY=votre_secret_key_copié_depuis_metabase

# Dashboard IDs (depuis Metabase)
VITE_METABASE_DASHBOARD_COMMERCIAL=1
VITE_METABASE_DASHBOARD_FINANCE=2
VITE_METABASE_DASHBOARD_PMO=3
```

### 3. Tester localement

```bash
npm run dev
# Ouvrir: http://localhost:5173/powerbi-hub
```

### 4. Configurer Vercel

```bash
# Ajouter variables d'environnement sur Vercel
vercel env add VITE_METABASE_URL production
# Entrez: http://193.203.169.19:3000

vercel env add VITE_METABASE_SECRET_KEY production
# Entrez: votre_secret_key

vercel env add VITE_METABASE_DASHBOARD_COMMERCIAL production
# Entrez: 1

vercel env add VITE_METABASE_DASHBOARD_FINANCE production
# Entrez: 2

vercel env add VITE_METABASE_DASHBOARD_PMO production
# Entrez: 3

# Déployer
npm run build
vercel --prod
```

## 🔍 Vérifications

### Santé du Container

```bash
# Status
docker ps

# Logs temps réel
docker logs metabase -f

# Logs des 100 dernières lignes
docker logs metabase --tail 100

# Redémarrer
docker-compose restart

# Arrêter
docker-compose down

# Arrêter + supprimer données
docker-compose down -v
```

### Test API Embed

```bash
# Depuis votre machine locale
curl http://193.203.169.19:3000/api/health
```

### Test depuis Powalyze

1. Ouvrir: https://www.powalyze.com/powerbi-hub
2. Les 3 dashboards devraient s'afficher
3. Cliquer sur chaque rapport pour charger l'iframe

## 🛡️ Sécurité Production

### 1. Firewall Restrictif

```bash
# Bloquer accès direct Metabase depuis Internet
ufw delete allow 3000/tcp

# Autoriser seulement depuis localhost (Nginx en proxy)
# Metabase reste accessible via Nginx (port 443)
```

### 2. Authorized Domains (Metabase)

```
Admin → Settings → Embedding
→ Authorized domains: www.powalyze.com
```

### 3. HTTPS Obligatoire

```bash
# Avec Let's Encrypt + domaine
certbot --nginx -d metabase.yourdomain.com

# Rediriger tout HTTP vers HTTPS (déjà dans nginx-metabase.conf)
```

### 4. Backup Régulier

```bash
# Script backup automatique
cat > /opt/metabase/backup.sh <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/metabase/backups"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)
cp -r /opt/metabase/data $BACKUP_DIR/metabase-backup-$DATE
find $BACKUP_DIR -mtime +7 -delete  # Garder 7 jours
EOF

chmod +x /opt/metabase/backup.sh

# Cron quotidien (2h du matin)
crontab -e
# Ajouter: 0 2 * * * /opt/metabase/backup.sh
```

## 🆘 Dépannage

### Metabase ne démarre pas

```bash
docker logs metabase --tail 50
# Chercher erreurs Java/Clojure

# Réinitialiser complètement
docker-compose down -v
rm -rf /opt/metabase/data/*
docker-compose up -d
```

### Dashboard ne charge pas dans Powalyze

1. **Console navigateur (F12)**: Chercher erreurs CORS
2. **Vérifier SECRET_KEY**: Doit être identique dans Metabase et .env
3. **Dashboard ID**: Vérifier depuis URL Metabase
4. **Embedding activé**: Settings → Sharing (par dashboard)

### Certificat SSL auto-signé rejeté

```bash
# Navigateur moderne bloque certificats auto-signés
# Solutions:
# 1. Utiliser domaine + Let's Encrypt (production)
# 2. Accepter exception dans navigateur (dev only)
# 3. Utiliser HTTP pour dev: http://193.203.169.19:3000
```

## 📊 URLs Finales

| Service | URL | Usage |
|---------|-----|-------|
| Metabase Admin | http://193.203.169.19:3000 | Configuration |
| Metabase (Nginx) | https://193.203.169.19 | Production (si Nginx installé) |
| PowerBIHub | https://www.powalyze.com/powerbi-hub | Frontend utilisateurs |

## 📞 Support

Documentation complète: `METABASE_SETUP.md`

En cas de problème, fournir:
- Logs Docker: `docker logs metabase --tail 100`
- Configuration: `cat /opt/metabase/docker-compose.yml`
- Navigateur console (F12)
