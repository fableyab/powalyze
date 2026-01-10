# 🚀 DÉPLOIEMENT PRÊT!

## Status
✅ Build réussi (dist/ créé - 1.5 MB)
✅ Configuration Vercel prête
✅ Scripts de déploiement créés

## Déployer MAINTENANT

### Option 1: PowerShell (Recommandé)
```powershell
.\deploy.ps1                 # Preview
.\deploy.ps1 -Production     # Production
```

### Option 2: Commande directe
```bash
vercel              # Preview
vercel --prod       # Production
```

### Option 3: Via npm
```bash
npm run deploy           # Preview
npm run deploy:prod      # Production
```

## Première fois?

Si c'est votre premier déploiement, Vercel vous demandera:
1. **Login**: Connectez-vous via navigateur
2. **Setup project**: Confirmez le nom et les paramètres
3. **Deploy**: Le déploiement commence automatiquement

## Variables d'environnement

⚠️ **IMPORTANT**: Après le premier déploiement, ajoutez ces variables dans le dashboard Vercel:

```
VITE_SUPABASE_URL=https://xqwcpewngbxnkcytztzk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Ajouter les variables:
1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Settings → Environment Variables
4. Ajoutez chaque variable
5. Redéployez: `vercel --prod`

## Fichiers créés

📁 Configuration:
- `vercel.json` - Config Vercel
- `.vercelignore` - Fichiers à ignorer
- `.env.example` - Template variables
- `deploy.ps1` - Script PowerShell
- `deploy.bat` - Script Windows
- `scripts/deploy.js` - Script Node.js

📚 Documentation:
- `DEPLOYMENT.md` - Guide complet
- `QUICK-DEPLOY.md` - Guide rapide
- `DEPLOY-NOW.md` - Ce fichier

## URLs après déploiement

Preview: `https://powalyze-{random-id}.vercel.app`
Production: `https://powalyze.vercel.app` (personnalisable)

## Prochaines étapes

1. ✅ Déployer → `vercel --prod`
2. ⚙️ Configurer les variables d'environnement
3. 🌐 Tester l'application déployée
4. 🔒 Configurer un domaine custom (optionnel)
5. 🔄 Setup CI/CD avec GitHub (voir DEPLOYMENT.md)

## Besoin d'aide?

- 📖 Guide complet: `DEPLOYMENT.md`
- 🔍 Logs Vercel: `vercel logs`
- 💬 Vercel Docs: https://vercel.com/docs

---

**PRÊT À DÉPLOYER? Lancez simplement:**
```bash
vercel --prod
```
