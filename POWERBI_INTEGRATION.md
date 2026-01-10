# Guide Power BI Integration - Powalyze

## 📊 Présentation

Les pages **Integrations** et **Reports** ont été complètement refaites pour intégrer **Power BI Embedded** dans Powalyze.

### Ce qui a été fait ✅

1. **Page Integrations** (`/app/integrations`)
   - ✅ Simplifiée et épurée (150 lignes au lieu de 379)
   - ✅ Cartes cliquables avec navigation vers `/app/reports`
   - ✅ Suppression des duplications (plusieurs boutons "Déconnecter")
   - ✅ Design premium avec gradients et animations
   - ✅ 6 intégrations affichées (Power BI connecté, 5 à venir)

2. **Page Reports** (`/app/reports`)
   - ✅ Complètement reconstruite avec Power BI Embedded
   - ✅ Installation de `powerbi-client-react` + `powerbi-client`
   - ✅ Interface avec sidebar (5 rapports) + zone d'affichage principale
   - ✅ Filtres par catégorie (Tous, Financiers, Stratégiques, Risques, etc.)
   - ✅ État vide élégant quand aucun rapport n'est sélectionné
   - ✅ Message de configuration si les variables d'environnement manquent

3. **Configuration Power BI**
   - ✅ Variables d'environnement ajoutées au `.env.example`
   - ✅ Support des tokens d'accès Azure AD
   - ✅ RLS (Row Level Security) mentionnée dans l'interface

4. **Déploiement**
   - ✅ Build réussi (sans erreurs)
   - ✅ Déployé en production : https://www.powalyze.com
   - ✅ Compatible desktop, mobile, tablet

---

## 🔧 Configuration Power BI

### Étape 1 : Obtenir les identifiants Power BI

1. Aller sur [Power BI Service](https://app.powerbi.com/)
2. Ouvrir votre rapport
3. Cliquer sur **Fichier** > **Incorporer le rapport** > **Site web ou portail**
4. Copier l'**URL d'incorporation** (Embed URL)

### Étape 2 : Générer un token d'accès

**Option A : Via Azure AD (recommandé)**
```bash
# 1. Créer une App Registration dans Azure AD
# 2. Ajouter les permissions Power BI (Report.Read.All)
# 3. Générer un Bearer token avec l'API Azure AD
```

**Option B : Via Power BI API**
```javascript
// Utiliser l'API Power BI pour générer un embed token
POST https://api.powerbi.com/v1.0/myorg/GenerateToken
```

### Étape 3 : Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Power BI Embedded Configuration
VITE_POWERBI_EMBED_URL=https://app.powerbi.com/reportEmbed?reportId=VOTRE_REPORT_ID&groupId=VOTRE_GROUP_ID
VITE_POWERBI_ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI...
VITE_POWERBI_REPORT_ID=votre-report-id-principal
```

⚠️ **Important** : 
- Les tokens Power BI ont une durée de vie limitée (généralement 1h)
- Il faut les renouveler régulièrement
- Ne JAMAIS commit le `.env.local` dans Git

### Étape 4 : Configurer Vercel (production)

1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet `powalyze-v2`
3. **Settings** > **Environment Variables**
4. Ajouter :
   - `VITE_POWERBI_EMBED_URL`
   - `VITE_POWERBI_ACCESS_TOKEN`
   - `VITE_POWERBI_REPORT_ID`
5. Redéployer l'application

---

## 🎨 Utilisation

### Page Integrations

```
URL: https://www.powalyze.com/app/integrations
```

**Fonctionnalités :**
- Affiche 6 cartes d'intégrations
- Power BI et Rapports dynamiques sont **connectés** (badge vert)
- Cliquer sur une carte connectée → redirige vers `/app/reports`
- Les intégrations "Bientôt" (Salesforce, Jira, Slack, SharePoint) sont en lecture seule
- Footer avec liste des intégrations futures

### Page Reports

```
URL: https://www.powalyze.com/app/reports
```

**Fonctionnalités :**

1. **Filtres par catégorie** (en haut)
   - Tous les rapports
   - Financiers
   - Stratégiques
   - Risques
   - Opérationnels
   - Prédictifs

2. **Sidebar gauche** (1/4 de la largeur)
   - Liste des rapports filtrés
   - Cliquer pour afficher le rapport

3. **Zone principale** (3/4 de la largeur)
   - **Sans sélection** : Message "Sélectionnez un rapport"
   - **Avec sélection** : Power BI Embed en plein écran
   - Boutons d'actions (Plein écran, Filtres)

4. **Bannière RLS** (en bas)
   - Information sur la sécurité Row Level Security
   - Filtrage automatique par client/projet

---

## 📝 Rapports disponibles

| ID | Titre | Catégorie | Power BI Report ID |
|----|-------|-----------|-------------------|
| `cockpit-exec` | Cockpit Exécutif | strategic | `executive-dashboard` |
| `portfolio-fin` | Portfolio Financier | financial | `financial-portfolio` |
| `risk-matrix` | Matrice des Risques | risk | `risk-analysis` |
| `performance` | Performance Opérationnelle | operational | `operational-performance` |
| `predictive` | Prédictions IA | predictive | `ai-predictions` |

**Note :** Les `powerBiReportId` sont actuellement des valeurs de démo. Remplacez-les par vos vrais IDs Power BI dans [Reports.jsx](./src/pages/Reports.jsx).

---

## 🔐 Sécurité RLS (Row Level Security)

Pour activer le filtrage par utilisateur dans Power BI :

1. **Dans Power BI Desktop :**
   ```dax
   [Email] = USERPRINCIPALNAME()
   ```

2. **Dans Power BI Service :**
   - Aller dans **Sécurité au niveau des lignes**
   - Définir les rôles (`tenant_admin`, `project_owner`, etc.)
   - Mapper les utilisateurs aux rôles

3. **Dans l'embed token :**
   ```javascript
   // Passer l'email de l'utilisateur connecté
   const embedConfig = {
     ...powerBiConfig,
     settings: {
       filterPaneEnabled: true,
       navContentPaneEnabled: true
     },
     filters: [
       {
         $schema: "http://powerbi.com/product/schema#basic",
         target: {
           table: "Projects",
           column: "tenant_id"
         },
         operator: "In",
         values: [user.tenant_id]
       }
     ]
   };
   ```

---

## 🐛 Dépannage

### Erreur : "Configuration Power BI requise"

**Cause :** Variables d'environnement manquantes

**Solution :**
1. Vérifier que `.env.local` existe
2. Vérifier les noms des variables (`VITE_` préfixe obligatoire)
3. Redémarrer le serveur de développement : `npm run dev`

### Erreur : "Embed token expired"

**Cause :** Le token Power BI a expiré (durée de vie ~1h)

**Solution :**
1. Générer un nouveau token via Azure AD
2. Mettre à jour `VITE_POWERBI_ACCESS_TOKEN`
3. Recharger la page

### Erreur : "Report not found"

**Cause :** Mauvais `powerBiReportId` ou permissions insuffisantes

**Solution :**
1. Vérifier l'ID du rapport dans Power BI Service
2. Vérifier que le Service Principal a accès au rapport
3. Vérifier la configuration RLS

### Le rapport ne s'affiche pas

**Cause :** Problème de dimensions CSS ou iframe bloqué

**Solution :**
1. Vérifier que le CSS `.powerbi-report-container` existe
2. Vérifier les CSP (Content Security Policy) headers
3. Ouvrir la console navigateur pour voir les erreurs

---

## 🚀 Améliorations futures

- [ ] **Token refresh automatique** : Renouveler le token avant expiration
- [ ] **Bookmarks Power BI** : Sauvegarder les vues personnalisées
- [ ] **Export PDF/Excel** : Boutons d'export dans l'interface
- [ ] **Partage de rapports** : Générer des liens publics temporaires
- [ ] **Historique de consultation** : Tracker les rapports consultés
- [ ] **Favoris** : Marquer des rapports en favoris
- [ ] **Alertes basées sur données** : Notifications si KPI < seuil

---

## 📦 Packages installés

```json
{
  "powerbi-client-react": "^1.x.x",
  "powerbi-client": "^2.x.x"
}
```

---

## 🔗 Liens utiles

- [Power BI Embedded Documentation](https://learn.microsoft.com/en-us/power-bi/developer/embedded/)
- [Power BI REST API](https://learn.microsoft.com/en-us/rest/api/power-bi/)
- [Azure AD App Registration](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps)
- [Powalyze Production](https://www.powalyze.com)

---

## 📧 Support

Pour toute question sur l'intégration Power BI, consulter :
- Documentation interne Powalyze
- Support Microsoft Power BI
- Équipe DevOps Powalyze

---

**Version :** 1.0.0  
**Date :** 06/01/2026  
**Auteur :** Équipe Powalyze
