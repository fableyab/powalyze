# Configuration des Domaines Vercel

## Statut Actuel

Le déploiement est effectué mais les domaines ne sont pas encore vérifiés dans Vercel.

**Déploiement actuel**: https://powalyze-gyzli95xl-powalyzes-projects.vercel.app

## Domaines à Configurer

1. **www.powalyze.com** (principal)
2. **powalyze.com** (redirection vers www)
3. **www.powalyze.ch** (secondaire)
4. **powalyze.ch** (redirection vers www)

## Étapes de Configuration

### 1. Ajouter les Domaines dans Vercel Dashboard

1. Allez sur https://vercel.com/powalyzes-projects/powalyze/settings/domains
2. Cliquez sur **"Add Domain"**
3. Ajoutez chaque domaine un par un:
   - `www.powalyze.com`
   - `powalyze.com`
   - `www.powalyze.ch`
   - `powalyze.ch`

### 2. Configurer les DNS

Pour chaque domaine, Vercel vous donnera des enregistrements DNS à configurer chez votre registrar:

#### Pour powalyze.com:
```
Type: A
Name: @ (ou laisser vide)
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Pour powalyze.ch:
```
Type: A
Name: @ (ou laisser vide)
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Vérification Automatique

Une fois les enregistrements DNS ajoutés:
- Vercel vérifie automatiquement (peut prendre jusqu'à 48h)
- Les domaines deviennent **"Verified"**
- Les alias sont automatiquement appliqués

### 4. Redéployer Après Vérification

Une fois tous les domaines vérifiés, redéployez:

```powershell
vercel --prod --yes
```

## Configuration Actuelle de vercel.json

```json
{
  "alias": [
    "www.powalyze.com",
    "powalyze.com",
    "www.powalyze.ch",
    "powalyze.ch"
  ]
}
```

Cette configuration assure que **chaque déploiement production** sera automatiquement accessible sur les 4 domaines.

## Accès Temporaire

En attendant la vérification DNS, l'application est accessible via:
- https://powalyze-gyzli95xl-powalyzes-projects.vercel.app

## Variables d'Environnement Vercel

⚠️ **IMPORTANT**: Configurer les variables d'environnement dans Vercel Dashboard:

1. Allez sur https://vercel.com/powalyzes-projects/powalyze/settings/environment-variables
2. Ajoutez:
   ```
   VITE_SUPABASE_URL=https://phfeteiholkfiredgero.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Vérification du Déploiement

Une fois les domaines configurés, testez:
- ✅ https://www.powalyze.com
- ✅ https://powalyze.com (redirection vers www)
- ✅ https://www.powalyze.ch
- ✅ https://powalyze.ch (redirection vers www)

## Troubleshooting

### Erreur: "Domain not verified"
- **Solution**: Attendre que les DNS se propagent (24-48h max)
- **Vérification DNS**: Utiliser https://dnschecker.org

### Erreur: "You don't have access to the domain"
- **Solution**: Le domaine doit être ajouté ET vérifié dans Vercel Dashboard d'abord

### SSL/HTTPS ne fonctionne pas
- **Solution**: Vercel génère automatiquement le certificat SSL après vérification DNS
- Peut prendre quelques minutes après la vérification

## Notes

- Le fichier `vercel.json` est déjà configuré avec tous les domaines
- Chaque `vercel --prod --yes` déploiera automatiquement sur tous les domaines vérifiés
- Les domaines non vérifiés seront ignorés (avec avertissement) mais ne bloqueront pas le déploiement
