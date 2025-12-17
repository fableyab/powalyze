# 🚀 DÉPLOIEMENT POWALYZE - GUIDE ULTRA-SIMPLE

## 📋 VOS INFORMATIONS

```
Serveur Hostinger : srv1196525.hstgr.cloud
IP                : 193.203.169.19
Utilisateur SSH   : root
Domaine           : powalyze.com
Email             : fabri@powalyze.com
```

---

## ⚡ DÉPLOIEMENT EN 1 COMMANDE

Ouvrez PowerShell dans le dossier de votre projet et tapez :

```powershell
.\deploy-vps.ps1
```

**C'EST TOUT !** Le script va :
1. Se connecter à votre VPS (il demandera le mot de passe)
2. Installer NGINX automatiquement
3. Uploader tous vos fichiers
4. Configurer le site
5. Installer le SSL (HTTPS)

Le mot de passe SSH sera demandé plusieurs fois pendant le processus (c'est normal).

---

## 📝 CE QUI VA SE PASSER

### Étape 1 : Connexion SSH
```
🔐 ÉTAPE 2: Test de connexion SSH
🔍 Test de connexion à root@srv1196525.hstgr.cloud...
root@srv1196525.hstgr.cloud's password: [TAPEZ VOTRE MOT DE PASSE]
✅ Connexion SSH réussie!
```

### Étape 2 : Installation
```
📥 ÉTAPE 3: Installation NGINX et Certbot sur le VPS
📦 Installation de NGINX...
✅ NGINX installé
```

### Étape 3 : Upload des fichiers
```
📤 ÉTAPE 5: Upload des fichiers vers le VPS
📤 Upload en cours (cela peut prendre 1-2 minutes)...
✅ Fichiers uploadés avec succès!
```

### Étape 4 : Configuration NGINX
```
⚙️  ÉTAPE 6: Configuration NGINX
📝 Création de la configuration NGINX...
✅ Configuration NGINX créée
✅ NGINX redémarré
```

### Étape 5 : SSL (HTTPS)
```
🔒 ÉTAPE 7: Installation du certificat SSL (Let's Encrypt)
Le DNS est-il configuré? (o/N): o
🔐 Installation du certificat SSL...
✅ Certificat SSL installé avec succès!
```

---

## 🌐 APRÈS LE DÉPLOIEMENT

Votre site sera accessible sur :

- **http://193.203.169.19** ← Disponible immédiatement
- **http://powalyze.com** ← Après configuration DNS
- **https://powalyze.com** ← Après SSL (avec cadenas vert)

---

## ⚙️ CONFIGURATION DNS (IMPORTANT)

Pour que `powalyze.com` fonctionne, configurez le DNS :

### Dans votre panel Hostinger :

1. Allez sur **https://hpanel.hostinger.com/**
2. Cliquez sur **Domaines** → **powalyze.com**
3. Allez dans **DNS / Zones DNS**
4. Ajoutez ces 2 enregistrements :

```
Type : A
Nom  : @
Valeur : 193.203.169.19
TTL : 3600

Type : A
Nom  : www
Valeur : 193.203.169.19
TTL : 3600
```

5. Cliquez sur **Enregistrer**

**Attendez 10-30 minutes** pour que le DNS se propage.

---

## ✅ VÉRIFIER QUE ÇA MARCHE

### Test 1 : IP directe (dispo immédiatement)
Dans votre navigateur : **http://193.203.169.19**
→ Vous devez voir votre site ✅

### Test 2 : Domaine (après DNS configuré)
Dans votre navigateur : **http://powalyze.com**
→ Vous devez voir votre site ✅

### Test 3 : HTTPS (après SSL installé)
Dans votre navigateur : **https://powalyze.com**
→ Vous devez voir le cadenas vert ✅

---

## 🔄 METTRE À JOUR LE SITE

Quand vous modifiez le code :

```powershell
# 1. Rebuild le projet
npm run build

# 2. Préparer le déploiement
.\tools\package-deploy.ps1

# 3. Déployer
.\deploy-vps.ps1
```

**Ou en une seule ligne :**
```powershell
npm run build; .\tools\package-deploy.ps1; .\deploy-vps.ps1
```

---

## ❓ SI ÇA NE MARCHE PAS

### Le script demande le mot de passe plusieurs fois
→ **C'est normal !** SSH demande le mot de passe pour chaque commande. Tapez-le à chaque fois.

### "Connection refused" ou "Permission denied"
```powershell
# Testez la connexion SSH manuellement :
ssh root@srv1196525.hstgr.cloud
```
→ Si ça demande un mot de passe = votre mot de passe Hostinger
→ Si ça refuse = vérifiez le nom d'utilisateur dans Hostinger panel

### Le site ne s'affiche pas sur l'IP
```powershell
# Connectez-vous au VPS et vérifiez NGINX :
ssh root@srv1196525.hstgr.cloud
sudo systemctl status nginx
```
→ Si "inactive" : `sudo systemctl start nginx`

### Le domaine ne fonctionne pas
→ Vérifiez le DNS dans Hostinger panel
→ Attendez 30 minutes pour la propagation
```powershell
# Testez la résolution DNS :
nslookup powalyze.com
```
→ Doit retourner `193.203.169.19`

---

## 📞 COMMANDES UTILES

### Se connecter au VPS
```powershell
ssh root@srv1196525.hstgr.cloud
```

### Voir les logs du site
```bash
# Une fois connecté au VPS :
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Redémarrer NGINX
```bash
# Une fois connecté au VPS :
sudo systemctl restart nginx
```

### Voir l'état de NGINX
```bash
# Une fois connecté au VPS :
sudo systemctl status nginx
```

### Tester la configuration NGINX
```bash
# Une fois connecté au VPS :
sudo nginx -t
```

---

## 🎯 RÉSUMÉ RAPIDE

1. **Tapez** : `.\deploy-vps.ps1`
2. **Entrez votre mot de passe SSH** quand demandé (plusieurs fois)
3. **Configurez le DNS** dans Hostinger panel
4. **Attendez 10-30 min** pour la propagation DNS
5. **Visitez** : https://powalyze.com

**🎉 C'EST EN LIGNE !**
