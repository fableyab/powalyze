# 🎯 GUIDE COMPLET - Installation Finale

## ⚡ Installation VPS (5 minutes)

### Étape 1: Connectez-vous au VPS

```bash
ssh root@193.203.169.19
```

**Mot de passe:** (entrez le mot de passe root de votre VPS)

### Étape 2: Installez Metabase

Copiez-collez ce script complet (Ctrl+V ou clic droit):

```bash
#!/bin/bash
set -e
apt-get update && apt-get upgrade -y
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
fi
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi
mkdir -p /opt/metabase/data && cd /opt/metabase
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
  metabase-net:
    driver: bridge
EOF
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw allow 3000/tcp && ufw --force enable
fi
docker-compose up -d
echo "✅ Installation terminée! Ouvrez: http://193.203.169.19:3000"
```

Attendez 30 secondes que Metabase démarre.

---

## 🔧 Configuration Metabase (3 minutes)

### Étape 1: Accédez à Metabase

Ouvrez dans votre navigateur: **http://193.203.169.19:3000**

### Étape 2: Créez votre compte admin

```
Email: fabrice.fays@outlook.fr
Mot de passe: (choisissez un mot de passe sécurisé)
First name: Fabrice
Last name: Fays
Organization: Powalyze
```

Cliquez "Next" → Skip les questions suivantes

### Étape 3: Activez l'Embedding

```
Cliquez sur l'icône ⚙️ (Settings) en haut à droite
→ Admin settings
→ Dans le menu de gauche: "Embedding"
→ Cliquez "Enable"
→ COPIEZ le "Embedding secret key" (longue chaîne de caractères)
```

**📋 IMPORTANT: Sauvegardez cette clé quelque part!**

### Étape 4: Connectez Supabase

```
Admin settings → Databases → Add database

Type: PostgreSQL
Name: Powalyze Production DB
Host: db.gdgpxrbzgtzmbedqhzev.supabase.co (votre host Supabase)
Port: 5432
Database name: postgres
Username: postgres
Password: (votre mot de passe Supabase)

→ Save
→ Testez la connexion
```

### Étape 5: Créez 3 Dashboards de Test

**Dashboard 1:**
```
New → Dashboard
Name: Dashboard Commercial
Description: Analyses commerciales et KPIs ventes
→ Create

Settings → Sharing
→ Enable embedding for this dashboard
→ Notez l'ID dans l'URL: /dashboard/1 (ID = 1)
```

**Dashboard 2:**
```
New → Dashboard
Name: Analyse Financière
Description: Indicateurs financiers Q4
→ Create

Settings → Sharing → Enable embedding
→ Notez l'ID: /dashboard/2 (ID = 2)
```

**Dashboard 3:**
```
New → Dashboard  
Name: KPIs Projet PMO
Description: Suivi portefeuille projets
→ Create

Settings → Sharing → Enable embedding
→ Notez l'ID: /dashboard/3 (ID = 3)
```

---

## 🚀 Déploiement Final (2 minutes)

### Sur votre machine Windows:

```powershell
cd c:\powalyze

# Lancez le script de finalisation avec VOS valeurs:
.\deploy\finalize-setup.ps1 `
  -MetabaseSecretKey "VOTRE_SECRET_KEY_ICI" `
  -DashboardCommercial "1" `
  -DashboardFinance "2" `
  -DashboardPMO "3" `
  -SupabaseHost "db.gdgpxrbzgtzmbedqhzev.supabase.co" `
  -SupabasePassword "VOTRE_PASSWORD_SUPABASE"
```

Ce script va automatiquement:
- ✅ Créer le fichier `.env`
- ✅ Configurer Vercel avec toutes les variables
- ✅ Build le projet
- ✅ Déployer en production

---

## ✅ Vérification Finale

### 1. Testez localement (optionnel)

```powershell
npm run dev
```

Ouvrez: http://localhost:5173/powerbi-hub

Les 3 dashboards Metabase devraient s'afficher!

### 2. Testez en production

Ouvrez: **https://www.powalyze.com/powerbi-hub**

- Cliquez sur chaque rapport dans la sidebar
- Le dashboard Metabase doit se charger dans l'iframe droite
- Design black/gold avec les données réelles de Supabase

---

## 📋 Résumé des valeurs dont vous avez besoin

Avant de lancer `finalize-setup.ps1`, collectez:

```
✅ METABASE_SECRET_KEY = __________________ (depuis Metabase → Admin → Embedding)
✅ DASHBOARD_ID_1 = ___ (depuis URL /dashboard/1)
✅ DASHBOARD_ID_2 = ___ (depuis URL /dashboard/2)
✅ DASHBOARD_ID_3 = ___ (depuis URL /dashboard/3)
✅ SUPABASE_HOST = db.xxxxx.supabase.co (depuis Supabase dashboard)
✅ SUPABASE_PASSWORD = __________ (votre password Supabase)
```

---

## 🆘 Problèmes courants

### "docker: command not found"

```bash
curl -fsSL https://get.docker.com | sh
```

### Metabase ne démarre pas

```bash
docker logs metabase --tail 50
```

### "Port 3000 already in use"

```bash
docker ps
docker stop $(docker ps -q)
cd /opt/metabase && docker-compose up -d
```

### Dashboard ne s'affiche pas dans Powalyze

1. Vérifiez que l'embedding est activé pour CE dashboard (Settings → Sharing)
2. Vérifiez le SECRET_KEY identique dans Metabase et .env
3. Console navigateur (F12) pour voir les erreurs

---

## 🎯 Vous êtes prêt !

Suivez les étapes dans l'ordre et vous aurez:
- ✅ Metabase opérationnel sur VPS
- ✅ Connexion Supabase fonctionnelle
- ✅ 3 dashboards créés et embedés
- ✅ PowerBIHub déployé en production
- ✅ www.powalyze.com avec analytics temps réel

**Bonne chance ! 🚀**
