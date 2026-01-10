# 🚀 INSTALLATION RAPIDE METABASE

## ✅ Script copié dans le presse-papier !

### Méthode 1: Copier-Coller Direct

```bash
# 1. Connectez-vous au VPS
ssh root@193.203.169.19

# 2. Collez le script (Ctrl+V ou clic droit)
# Le script va automatiquement:
#   ✅ Installer Docker
#   ✅ Créer docker-compose.yml
#   ✅ Configurer le firewall
#   ✅ Démarrer Metabase
```

### Méthode 2: Commande One-Liner

Si le copier-coller ne fonctionne pas, tapez ceci dans le VPS:

```bash
ssh root@193.203.169.19

# Puis:
curl -fsSL https://raw.githubusercontent.com/votre-user/powalyze/main/deploy/install-oneliner.sh | bash
```

**OU** créez le fichier manuellement:

```bash
ssh root@193.203.169.19

# Créez le script
nano /root/install.sh

# Collez le contenu de deploy/install-oneliner.sh
# Sauvegardez: Ctrl+X, Y, Enter

# Lancez
chmod +x /root/install.sh
/root/install.sh
```

---

## 📋 Après l'installation (2 minutes)

### 1. Accédez à Metabase

🌐 **http://193.203.169.19:3000**

### 2. Configuration Initiale

**Créer compte admin:**
- Email: votre@email.com
- Mot de passe: (sécurisé)
- Organisation: Powalyze

### 3. Activer Embedding

```
Admin → Settings → Embedding in other applications
→ Enable embedding
→ Copiez METABASE_SECRET_KEY
```

### 4. Connecter Supabase

```
Admin → Databases → Add database

Type: PostgreSQL
Name: Powalyze DB
Host: db.xxxxx.supabase.co (depuis Supabase dashboard)
Port: 5432
Database: postgres
Username: postgres
Password: [votre password Supabase]

→ Save → Test connection
```

### 5. Créer Dashboards

```
New → Dashboard
→ Créez 3 dashboards:
  - "Dashboard Commercial"
  - "Analyse Financière"  
  - "KPIs PMO"

Pour chaque dashboard:
→ Settings → Sharing → Enable embedding
→ Notez le Dashboard ID (URL: /dashboard/1 → ID=1)
```

---

## 🔧 Donnez-moi ces valeurs

Une fois que vous avez tout configuré, collez ici:

```
METABASE_SECRET_KEY=___________________________
DASHBOARD_COMMERCIAL_ID=___
DASHBOARD_FINANCE_ID=___
DASHBOARD_PMO_ID=___

SUPABASE_HOST=db._____.supabase.co
SUPABASE_PASSWORD=_______________
```

**Je vais alors générer automatiquement:**
- ✅ Fichier `.env` complet
- ✅ Configuration Vercel
- ✅ Build + Deploy production
- ✅ Test de l'intégration

---

## 🆘 En cas de problème

### Vérifier si Metabase tourne

```bash
ssh root@193.203.169.19
docker ps
```

### Voir les logs

```bash
docker logs metabase -f
```

### Redémarrer

```bash
cd /opt/metabase
docker-compose restart
```

### Réinstaller complètement

```bash
cd /opt/metabase
docker-compose down -v
rm -rf data/*
docker-compose up -d
```

---

## ⚡ Vous êtes bloqué ?

Dites-moi où vous en êtes et je vous guide étape par étape !
