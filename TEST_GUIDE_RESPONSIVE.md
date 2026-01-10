# 🧪 Guide de Test Responsive - Powalyze

## ✅ Déployé sur Production
🔗 **URL** : https://www.powalyze.com
📅 **Date** : 20 Janvier 2025
🚀 **Version** : 1.1.0 - Responsive Edition

---

## 📱 Tests Mobile (Prioritaire)

### iPhone / Android Portrait (320px - 428px)

#### Dashboard (/app/dashboard)
1. ✅ **Header**
   - [ ] Titre "Bienvenue [Nom]" visible sans troncature
   - [ ] Période Q1 2026 affichée correctement
   - [ ] Boutons Save/Export/Share empilés ou wrappés
   
2. ✅ **Stats Cards**
   - [ ] 4 cartes en 1 colonne verticale
   - [ ] Chaque carte lisible entièrement
   - [ ] Icons et valeurs alignés correctement
   - [ ] Badge trending visible avec %
   - [ ] "Voir le détail" visible
   - [ ] Tap sur carte → navigation fonctionnelle

3. ✅ **Power BI Cards (NOUVEAU)**
   - [ ] Section "Power BI Reports" visible
   - [ ] 6 cartes en 1 colonne
   - [ ] Gradients colorés visibles
   - [ ] Badge "Connected" présent
   - [ ] Tap sur carte → navigation vers `/app/powerbi?report=[type]`
   - [ ] Feedback visuel au tap (scale-95)

4. ✅ **Charts**
   - [ ] Pie chart "Project Status" redimensionné
   - [ ] Line chart "Financial" lisible
   - [ ] Axes et légendes visibles
   - [ ] Pas de débordement horizontal

#### Power BI (/app/powerbi)
1. ✅ **Gallery View**
   - [ ] Header avec icon Power BI visible
   - [ ] Bouton "Importer" full-width
   - [ ] Stats cards en 2 colonnes (2x2)
   - [ ] Search bar full-width
   - [ ] Toggle view visible
   - [ ] 6 cartes rapports en 1 colonne
   - [ ] Tap sur rapport → chargement

2. ✅ **Embedded View** (après sélection)
   - [ ] Bouton retour galerie visible
   - [ ] Titre rapport tronqué si long
   - [ ] Boutons Actualiser/Filtres avec icons
   - [ ] Labels boutons cachés, icons visibles
   - [ ] Container Power BI height=60vh
   - [ ] Scroll vertical si nécessaire
   - [ ] Loading spinner centré

#### Navigation ?report=
1. ✅ **Depuis Dashboard**
   - [ ] Tap "Dashboard Commercial" → `/app/powerbi?report=commercial`
   - [ ] Tap "Analyse Financière" → `/app/powerbi?report=finance`
   - [ ] Tap "KPIs PMO" → `/app/powerbi?report=pmo`
   - [ ] Tap "Prédictive" → `/app/powerbi?report=predictive`
   - [ ] Tap "Opérationnelle" → `/app/powerbi?report=operational`
   - [ ] Tap "Stratégique" → `/app/powerbi?report=strategic`

2. ✅ **Chargement Auto**
   - [ ] URL avec ?report= charge le bon rapport
   - [ ] Loading spinner affiché
   - [ ] Rapport embedded correctement
   - [ ] Boutons navigation fonctionnels

---

## 📱 Tests Tablette (768px - 1024px)

### iPad Portrait / Landscape

#### Dashboard
1. ✅ **Layout**
   - [ ] Stats cards en 2 colonnes (2x2)
   - [ ] Power BI cards en 2 colonnes (3x2)
   - [ ] Header buttons sur 1 ligne
   - [ ] Charts côte à côte
   - [ ] Hover effects fonctionnels

#### Power BI
1. ✅ **Gallery**
   - [ ] Stats en 4 colonnes (1 ligne)
   - [ ] Rapports en 2 colonnes
   - [ ] Search bar largeur médium
   
2. ✅ **Embedded**
   - [ ] Header sur 1 ligne
   - [ ] Boutons avec labels visibles
   - [ ] Container height=70vh
   - [ ] Bonne utilisation espace

---

## 💻 Tests Desktop (> 1024px)

### Laptop / Desktop

#### Dashboard
1. ✅ **Full Layout**
   - [ ] Stats cards en 4 colonnes (1 ligne)
   - [ ] Power BI cards en 3 colonnes (2 lignes)
   - [ ] Hover scale-105 animation smooth
   - [ ] Tous les textes visibles (pas de troncature)
   - [ ] Charts full size

#### Power BI
1. ✅ **Gallery**
   - [ ] Rapports en 3 colonnes
   - [ ] Hover effects élégants
   - [ ] Search bar largeur optimale

2. ✅ **Embedded**
   - [ ] Container height=calc(100vh-220px)
   - [ ] Full screen experience
   - [ ] Navigation fluide

---

## 🔄 Tests Orientation

### Landscape Mobile (< 768px)
- [ ] Dashboard lisible en paysage
- [ ] Power BI embedded remplit écran
- [ ] Pas de scrolling horizontal involontaire
- [ ] Charts s'adaptent à la largeur

---

## 🎯 Tests Fonctionnels

### Navigation Power BI
```
Test URLs directes :
- https://www.powalyze.com/app/powerbi?report=commercial
- https://www.powalyze.com/app/powerbi?report=finance
- https://www.powalyze.com/app/powerbi?report=pmo
- https://www.powalyze.com/app/powerbi?report=predictive
- https://www.powalyze.com/app/powerbi?report=operational
- https://www.powalyze.com/app/powerbi?report=strategic
```

### Mapping Validation
| Card Dashboard | URL Generated | Expected Report |
|----------------|---------------|-----------------|
| Dashboard Commercial | ?report=commercial | report-1 (Commercial) |
| Analyse Financière | ?report=finance | report-2 (Finance Q4) |
| KPIs PMO | ?report=pmo | report-3 (PMO) |
| Prédictive | ?report=predictive | report-4 (Prédictive Q2) |
| Opérationnelle | ?report=operational | report-5 (Opérationnelle) |
| Stratégique | ?report=strategic | report-6 (Stratégique 2026) |

---

## 🐛 Problèmes Potentiels à Vérifier

### Mobile
- [ ] Overflow horizontal (scroll involontaire)
- [ ] Texte coupé ou illisible
- [ ] Boutons trop petits (< 44px)
- [ ] Charts débordent du container
- [ ] Loading spinner invisible

### Tablette
- [ ] Layout cassé entre portrait/landscape
- [ ] Gap trop grand ou trop petit
- [ ] Hover effects manquants
- [ ] Cards mal alignées

### Desktop
- [ ] Espace vide inutile
- [ ] Texte trop petit
- [ ] Animations trop rapides/lentes
- [ ] Charts pixelisés

---

## ✨ Points d'Attention Spéciaux

### Touch Targets
**Minimum 44x44px requis par Apple/Google**
- Vérifier boutons Save/Export/Share
- Vérifier cards Power BI
- Vérifier stats cards
- Vérifier boutons navigation

### Text Truncation
**Vérifier pas de débordement**
- Titres longs dans Power BI cards
- Noms utilisateur dans header
- Descriptions rapports
- Labels boutons

### Chart Responsiveness
**ResponsiveContainer fonctionne**
- Pie chart redimensionne
- Line chart s'adapte
- Axes lisibles
- Légendes visibles

---

## 📊 DevTools Browser Testing

### Chrome DevTools
```
Toggle Device Toolbar: Ctrl + Shift + M (Windows) / Cmd + Shift + M (Mac)

Presets à tester :
- iPhone SE (375x667)
- iPhone 14 Pro (393x852)
- Pixel 7 (412x915)
- iPad Mini (768x1024)
- iPad Pro (1024x1366)
- Laptop (1280x720)
- Desktop (1920x1080)
```

### Firefox Responsive Design Mode
```
Toggle: Ctrl + Shift + M (Windows) / Cmd + Option + M (Mac)

Tester orientations :
- Portrait
- Landscape
- Auto-rotate
```

---

## ✅ Checklist Finale

### Dashboard
- [ ] Mobile : tout visible, pas de scroll horizontal
- [ ] Tablette : 2 colonnes équilibrées
- [ ] Desktop : 4 colonnes optimales
- [ ] Power BI cards cliquables toutes tailles
- [ ] Navigation ?report= fonctionne

### Power BI Page
- [ ] Gallery responsive 1/2/3 colonnes
- [ ] Embedded adapte height selon device
- [ ] Boutons mobile avec icons uniquement
- [ ] Desktop avec labels complets
- [ ] Auto-load ?report= et ?reportId=

### Performance
- [ ] Pas de lag au scroll
- [ ] Transitions smooth
- [ ] Images load rapidement
- [ ] Charts render sans freeze

### UX
- [ ] Touch feedback visible (active states)
- [ ] Hover states desktop uniquement
- [ ] Texte lisible toutes tailles
- [ ] Colors contrastés suffisants

---

## 🚨 Bugs à Reporter

Si vous trouvez un problème, documentez :
1. **Device** : Modèle exact + résolution
2. **Browser** : Version exacte
3. **Page** : URL complète
4. **Action** : Étapes pour reproduire
5. **Attendu** : Comportement souhaité
6. **Réel** : Ce qui se passe vraiment
7. **Screenshot** : Capture d'écran du bug

---

## 📞 Support

**Email** : contact@powalyze.ch
**Phone** : +33 (0) 6 15 76 70 67

---

**Version** : 1.1.0
**Test Date** : 2025-01-20
**Status** : ✅ Prêt pour tests utilisateurs
