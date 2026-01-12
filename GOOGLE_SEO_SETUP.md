# Google Search Console - Guide de Soumission

## 🎯 Étape 1 : Soumettre votre site à Google Search Console

### 1.1 Se connecter à Google Search Console
1. Allez sur https://search.google.com/search-console/
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Ajouter une propriété"
4. Choisissez "Préfixe de l'URL" et entrez : `https://www.powalyze.com`

### 1.2 Vérifier la propriété
Méthode recommandée : **Balise HTML**
1. Copiez la balise meta de vérification
2. Ajoutez-la dans `index.html` entre `<head>` et `</head>` :
```html
<meta name="google-site-verification" content="VOTRE_CODE_ICI" />
```
3. Redéployez sur Vercel : `vercel --prod`
4. Retournez sur Search Console et cliquez sur "Vérifier"

---

## 📄 Étape 2 : Soumettre le sitemap.xml

### 2.1 Via Google Search Console
1. Une fois votre site vérifié, allez dans le menu de gauche
2. Cliquez sur "Sitemaps" (sous "Indexation")
3. Dans le champ "Ajouter un sitemap", entrez : `sitemap.xml`
4. Cliquez sur "Envoyer"

✅ Votre sitemap est maintenant soumis !

### 2.2 Vérifier le statut
- Attendez 24-48h pour que Google crawle votre site
- Le statut passera de "En attente" à "Réussite"
- Nombre d'URLs découvertes : **~25 pages**

---

## 🔍 Étape 3 : Demander l'indexation immédiate

### 3.1 Indexation manuelle (pages prioritaires)
1. Allez dans "Inspection de l'URL" (menu de gauche)
2. Entrez chaque URL prioritaire :
   - `https://www.powalyze.com/`
   - `https://www.powalyze.com/blog`
   - `https://www.powalyze.com/blog/pmo-suisse-guide-complet`
   - `https://www.powalyze.com/blog/power-bi-gouvernance-executive`
   - `https://www.powalyze.com/blog/ia-automatisation-gouvernance`
3. Cliquez sur "Demander une indexation"
4. Attendez 1-7 jours pour l'indexation effective

### 3.2 Vérifier l'indexation
Dans Google, tapez :
```
site:www.powalyze.com
```
Vous verrez toutes les pages indexées.

---

## 📊 Étape 4 : Configurer Google Analytics 4

### 4.1 Créer une propriété GA4
1. Allez sur https://analytics.google.com/
2. Cliquez sur "Créer une propriété"
3. Nom : "Powalyze"
4. Fuseau horaire : Europe/Zurich (Suisse) ou Europe/Paris (France)
5. Créez un flux de données "Web"
6. URL : `https://www.powalyze.com`

### 4.2 Récupérer l'ID de mesure
- Format : `G-XXXXXXXXXX`
- Copiez cet ID

### 4.3 Remplacer dans index.html
Dans `c:\powalyze\index.html`, ligne ~25 :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VOTRE_ID_ICI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VOTRE_ID_ICI', {
```

Remplacez `G-XXXXXXXXXX` par votre véritable ID de mesure.

### 4.4 Redéployer
```bash
npm run build
vercel --prod
```

---

## 🎯 Événements GA4 configurés automatiquement

Les événements suivants sont trackés automatiquement :

### 1. CTA Clicks
- Nom de l'événement : `cta_click`
- Paramètres :
  - `event_category` : "engagement"
  - `event_label` : "hero_cta"
  - `value` : texte du bouton

**Déclenché quand** : Utilisateur clique sur "Voir la démo" ou "Réserver une consultation"

### 2. Video Play
- Nom de l'événement : `video_play`
- Paramètres :
  - `event_category` : "engagement"
  - `event_label` : "manifeste_video"
  - `video_title` : "Le Manifeste Powalyze"

**Déclenché quand** : Utilisateur lance la vidéo manifeste

### 3. Video Complete
- Nom de l'événement : `video_complete`
- Paramètres :
  - `event_category` : "engagement"
  - `event_label` : "manifeste_video"
  - `video_title` : "Le Manifeste Powalyze"

**Déclenché quand** : Utilisateur regarde la vidéo jusqu'à la fin

### 4. Page Views (automatique)
- Nom de l'événement : `page_view`
- Paramètres :
  - `page_title` : titre de la page
  - `page_location` : URL complète
  - `page_path` : chemin relatif

**Déclenché quand** : Chaque changement de page

### 5. Blog Article Views
- Nom de l'événement : `page_view`
- Paramètres supplémentaires :
  - `article_category` : PMO, Power BI, IA
  - `article_tags` : tags de l'article

**Déclenché quand** : Utilisateur ouvre un article de blog

---

## 📈 Étape 5 : Vérifier les événements dans GA4

### 5.1 Vue en temps réel
1. Allez sur Google Analytics 4
2. Cliquez sur "Temps réel" (menu de gauche)
3. Ouvrez votre site dans un autre onglet : https://www.powalyze.com
4. Cliquez sur les CTAs, lancez la vidéo
5. Vous devriez voir les événements s'afficher en temps réel

### 5.2 Rapports personnalisés
Créez des rapports pour suivre :
- **Engagement vidéo** : video_play vs. video_complete (taux de complétion)
- **Conversion CTAs** : nombre de clics sur "Voir la démo"
- **Articles populaires** : pages /blog/* les plus visitées
- **Provenance trafic** : Suisse vs. France

---

## 📝 Étape 6 : Contenu marketing (Blog + LinkedIn)

### 6.1 Blog créé ✅
- Route : https://www.powalyze.com/blog
- 3 articles publiés :
  1. **PMO en Suisse** : Guide complet conformité FINMA
  2. **Power BI Gouvernance** : 5 dashboards indispensables
  3. **IA & Automatisation** : Comment l'IA révolutionne la gouvernance

### 6.2 Publication LinkedIn (3 posts prêts)
Fichier : `src/data/linkedinPosts.js`

**Post 1 - Suisse** (semaine 1)
- Sujet : PMO en Suisse + conformité FINMA
- CTA : Lien vers article blog PMO

**Post 2 - France** (semaine 2)
- Sujet : Power BI pour COMEX
- CTA : Lien vers article blog Power BI

**Post 3 - Suisse + France** (semaine 3)
- Sujet : IA appliquée à la gouvernance
- CTA : Lien vers article blog IA

---

## 🎯 Résumé des mots-clés ciblés

### Priorité 1 (Suisse)
- PMO Suisse
- PMO Genève
- PMO Lausanne
- Conformité FINMA
- Power BI Expert Suisse

### Priorité 2 (France)
- PMO France
- Power BI Expert
- Gouvernance projet IA
- Consultant PMO indépendant

### Priorité 3 (Long-tail)
- Tableau de bord Power BI exécutif
- Cockpit de gouvernance
- IA appliquée au PMO
- Automatisation gouvernance

---

## ✅ Checklist finale

- [x] Sitemap.xml créé et accessible : https://www.powalyze.com/sitemap.xml
- [x] Robots.txt créé : https://www.powalyze.com/robots.txt
- [x] Meta tags SEO ajoutés (title, description, keywords, Open Graph)
- [x] Structured data (JSON-LD) ajouté
- [x] Google Analytics 4 installé (remplacer G-XXXXXXXXXX par votre ID)
- [x] Tracking events configurés (CTA, video, blog)
- [x] Blog créé avec 3 articles SEO-optimisés
- [x] LinkedIn posts prêts (3 semaines de contenu)
- [ ] Google Search Console : Vérifier la propriété
- [ ] Google Search Console : Soumettre sitemap.xml
- [ ] Google Search Console : Demander indexation des 5 URLs prioritaires
- [ ] Google Analytics 4 : Remplacer G-XXXXXXXXXX par votre ID réel
- [ ] LinkedIn : Publier 1 post/semaine (voir linkedinPosts.js)

---

## 🚀 Prochaines étapes (post-lancement)

1. **Semaine 1-2** : Google indexe les pages
2. **Semaine 3-4** : Premiers résultats dans Search Console
3. **Mois 2** : Analyse GA4 → Optimisation des CTAs
4. **Mois 3** : Publication régulière blog (1 article/semaine)
5. **Mois 6** : Objectif → Top 3 pour "PMO Suisse" sur Google

---

**Votre SEO premium est maintenant prêt** 🎖️

Questions ? contact@powalyze.com
