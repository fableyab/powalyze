# Guide d'intégration Power BI Embedded & Multilingue

## 🔌 Power BI Embedded - Intégration complète

### ✅ Ce qui a été intégré :

1. **SDK Power BI Client** (`powerbi-client`)
   - Installation : `npm install powerbi-client`
   - Importé dans `/src/pages/PowerBI.jsx`

2. **API Token Backend** (`/src/api/powerbiToken.js`)
   - Mock pour développement
   - À remplacer par votre vrai backend Azure AD

3. **Conteneur HTML Power BI**
   - Ref React : `reportContainerRef`
   - Remplace l'ancien iframe

4. **Code d'intégration Power BI**
   - Configuration complète avec `powerbi.service.Service`
   - Gestion des événements : `loaded`, `error`, `rendered`
   - Settings personnalisés : filtres, navigation, layout

### 🔄 Pour activer Power BI en production :

**Backend API** - Créez `/api/powerbi/token` (Node.js/Express exemple) :

```javascript
const express = require('express');
const msal = require('@azure/msal-node');
const router = express.Router();

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  }
};

const msalClient = new msal.ConfidentialClientApplication(msalConfig);

router.post('/api/powerbi/token', async (req, res) => {
  try {
    const { reportId } = req.body;
    
    // Get Azure AD token
    const tokenResponse = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default']
    });

    // Get embed token from Power BI
    const embedResponse = await fetch(
      `https://api.powerbi.com/v1.0/myorg/reports/${reportId}`,
      {
        headers: {
          'Authorization': `Bearer ${tokenResponse.accessToken}`
        }
      }
    );

    const embedData = await embedResponse.json();

    res.json({
      embedUrl: embedData.embedUrl,
      accessToken: tokenResponse.accessToken,
      reportId: reportId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

**Variables d'environnement** (`.env`) :
```
AZURE_CLIENT_ID=your-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret
POWERBI_WORKSPACE_ID=your-workspace-id
```

---

## 🌍 Système Multilingue - React i18next

### ✅ Ce qui a été intégré :

1. **Packages installés :**
   - `react-i18next`
   - `i18next`
   - `i18next-browser-languagedetector`
   - `i18next-http-backend`

2. **Configuration** (`/src/lib/i18n.js`)
   - 6 langues : 🇫🇷 FR, 🇬🇧 EN, 🇩🇪 DE, 🇳🇴 NO, 🇮🇹 IT, 🇪🇸 ES
   - Détection automatique de la langue
   - Stockage dans localStorage

3. **Fichiers de traduction** (`/public/locales/[langue]/common.json`)
   - Français (langue primaire)
   - Anglais
   - Allemand
   - Norvégien
   - Italien
   - Espagnol

4. **Sélecteur de langue mis à jour**
   - Dans `/src/components/LanguageSwitcher.jsx`
   - Icône globe + drapeaux
   - Stockage de la préférence

### 📝 Comment utiliser les traductions dans vos pages :

**Exemple 1 - Page simple :**

```jsx
import { useTranslation } from 'react-i18next';

function ContactPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('contact_email')}</h2>
      <p>contact@powalyze.ch</p>
      
      <h2>{t('contact_phone')}</h2>
      <p>{t('contact_delay')}</p>
    </div>
  );
}
```

**Exemple 2 - Avec interpolation :**

Ajoutez dans `/public/locales/fr/common.json` :
```json
{
  "welcome_message": "Bonjour {{name}}, bienvenue !"
}
```

Utilisez :
```jsx
{t('welcome_message', { name: user.firstName })}
```

**Exemple 3 - Pluriel :**

```json
{
  "items_count": "{{count}} élément",
  "items_count_plural": "{{count}} éléments"
}
```

```jsx
{t('items_count', { count: reports.length })}
```

### 🎨 Pages à traduire prioritaires :

✅ **Footer** - Déjà traduit
✅ **Integrations** - Clés créées
✅ **Contact** - Clés créées

🔄 **À faire** :
- Landing Page
- Reports Page
- Power BI Page
- Dashboard
- Projects
- Portfolio

### 🚀 Ajouter une nouvelle traduction :

1. Ajoutez la clé dans `/public/locales/fr/common.json`
2. Traduisez dans les 5 autres fichiers
3. Utilisez avec `{t('votre_cle')}`

### 🤖 Traduction automatique AI :

Pour traduire automatiquement toutes vos pages, demandez :
> "Traduis toutes les pages de Powalyze en [langue]"

L'IA générera les fichiers JSON complets.

---

## 📦 Déploiement

Après ces modifications, buildez et déployez :

```bash
npm run build
vercel --prod
```

---

## 📞 Support

Pour toute question sur l'intégration :
- **Power BI** : Consultez [docs.microsoft.com/power-bi](https://docs.microsoft.com/en-us/power-bi/developer/embedded/)
- **i18next** : [react.i18next.com](https://react.i18next.com/)

---

**Statut actuel :**
✅ Power BI SDK intégré
✅ Système multilingue fonctionnel (6 langues)
✅ LanguageSwitcher mis à jour
✅ Fichiers de traduction créés
⏳ Backend Power BI Token à créer en production
⏳ Pages à traduire progressivement
