# 🚀 Déploiement Rapide - Powalyze

## Déploiement en Une Commande

### Production (recommandé)
```bash
npm run deploy:prod
```

### Preview/Test
```bash
npm run deploy
```

## Configuration Requise

### Variables d'environnement Vercel
Avant de déployer, configurez ces variables dans le dashboard Vercel:

```
VITE_SUPABASE_URL=https://xqwcpewngbxnkcytztzk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Commandes Disponibles

```bash
# Build local
npm run build

# Preview local du build
npm run preview

# Déploiement preview
npm run deploy

# Déploiement production
npm run deploy:prod

# Déploiement rapide (sans rebuild)
node scripts/deploy.js --skip-build --prod
```

## Première Configuration Vercel

1. **Installer Vercel CLI** (déjà fait ✓)
   ```bash
   npm install -g vercel
   ```

2. **Se connecter**
   ```bash
   vercel login
   ```

3. **Premier déploiement**
   ```bash
   vercel
   ```
   - Suivez les instructions
   - Choisissez votre scope/team
   - Confirmez les paramètres

4. **Variables d'environnement**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

## Déploiement Automatique (CI/CD)

Le projet est configuré pour le déploiement automatique:
- Push sur `main` → Déploiement production
- Pull request → Preview deployment

## Vérification Post-Déploiement

✅ Page d'accueil charge
✅ Authentification fonctionne
✅ Navigation entre pages
✅ Assets chargent correctement
✅ Pas d'erreurs console

## Dépannage

### Le build échoue
```bash
# Nettoyer et rebuilder
rm -rf dist node_modules
npm install
npm run build
```

### Variables d'environnement manquantes
```bash
# Vérifier les variables
vercel env ls

# Ajouter une variable
vercel env add VARIABLE_NAME
```

### Erreur de routing
- Vérifiez que `vercel.json` existe
- Confirmez les rewrites pour SPA

## URLs Utiles

- Dashboard Vercel: https://vercel.com/dashboard
- Documentation: https://vercel.com/docs
- Logs: `vercel logs <deployment-url>`

## Support

En cas de problème:
1. Vérifiez les logs: `vercel logs`
2. Consultez DEPLOYMENT.md pour plus de détails
3. Vérifiez la documentation Vercel
