# 🔐 Configuration Authentification GitHub

## ⚠️ Problème Détecté

**Erreur** : `Permission denied to fableyab`  
**Cause** : L'utilisateur Git local n'a pas accès au repository `Powalyze/powalyzeV2`

---

## ✅ Solution : Personal Access Token (PAT)

J'ai ouvert la page de création de token : **https://github.com/settings/tokens/new**

### Étapes à Suivre

#### 1. Créer le Token

Sur la page ouverte :

1. **Note** : `Powalyze V2 Deployment` (déjà pré-rempli)
2. **Expiration** : Choisir `90 days` ou `No expiration` (selon préférence)
3. **Select scopes** : ✅ Cocher **`repo`** (Full control of private repositories)
4. **Cliquer** : "Generate token" (en bas de page)

#### 2. Copier le Token

⚠️ **IMPORTANT** : Le token ne s'affiche qu'une seule fois !

- GitHub affichera : `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Copiez-le** (bouton copie à côté)

#### 3. Configurer Git avec le Token

**Revenez dans VS Code** et collez le token ici.

Je l'utiliserai pour configurer l'authentification automatiquement.

---

## 🔄 Alternative : Ajouter Collaborateur

Si vous préférez ne pas utiliser de token :

1. Allez sur : https://github.com/Powalyze/powalyzeV2/settings/access
2. Cliquez : "Add people"
3. Ajoutez : `fableyab` (l'utilisateur actuel)
4. Donnez : "Write" access

Puis réessayez le push.

---

## 📋 Commandes qui Seront Exécutées

Une fois le token fourni :

```powershell
# 1. Configurer le credential helper avec le token
git config --global credential.helper store

# 2. Push avec authentification
git push -u origin main
# (Windows demandera username + token comme mot de passe)

# 3. Le credential helper sauvegardera le token pour les futurs push
```

---

## 🆘 Si Problèmes Persistent

### Option 1 : Utiliser GitHub Desktop

1. Télécharger : https://desktop.github.com/
2. Se connecter avec votre compte GitHub
3. File → Add Local Repository → Sélectionner `c:\powalyze`
4. Publish repository

### Option 2 : Utiliser VS Code GitHub Extension

1. Installer extension : "GitHub Pull Requests and Issues"
2. Se connecter via la commande `GitHub: Sign In`
3. Utiliser la command palette pour push

---

**👉 Prochaine Étape** : 

Copiez votre Personal Access Token ici, je configurerai Git automatiquement !

Ou dites-moi si vous préférez utiliser GitHub Desktop ou l'extension VS Code.
