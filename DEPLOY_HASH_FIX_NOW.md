# 🚀 DÉPLOIEMENT URGENT - Correction des hash URLs

## ⚠️ PROBLÈME IDENTIFIÉ
Les URLs contiennent des hash (#) : `https://www.powalyze.com/#for-who`

## ✅ SOLUTION IMPLÉMENTÉE
Remplacement des ancres `<a href="#section">` par des boutons avec smooth scroll

---

## 📋 DÉPLOIEMENT MANUEL (Compte GitHub autorisé requis)

### Étape 1 : Aller sur GitHub
https://github.com/Powalyze/powalyzeV2/blob/main/src/pages/LandingPage.jsx

### Étape 2 : Cliquer sur "Edit this file" (icône crayon)

### Étape 3 : Trouver la ligne ~45 et REMPLACER

**ANCIEN CODE (lignes 45-70) :**
```jsx
export default function LandingPage() {
  const { dictionary, locale, setLocale } = useDictionary();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
```

**PAR CE NOUVEAU CODE :**
```jsx
export default function LandingPage() {
  const { dictionary, locale, setLocale } = useDictionary();
  const navigate = useNavigate();

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
```

### Étape 4 : Trouver TOUS les liens avec # et remplacer

**Ligne ~55 - ANCIEN :**
```jsx
<a 
  href="#for-who"
  className="block py-3 px-6 text-center bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
>
  {dictionary.hero.ctaPrimary}
</a>
```

**NOUVEAU :**
```jsx
<button 
  onClick={(e) => scrollToSection(e, 'for-who')}
  className="block py-3 px-6 text-center bg-gradient-to-r from-[#D4AF37] to-[#4A9EFF] text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer bg-transparent border-none w-full"
>
  {dictionary.hero.ctaPrimary}
</button>
```

**Ligne ~58 - ANCIEN :**
```jsx
<a 
  href="#product"
  className="block py-3 px-6 text-center border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
>
  {dictionary.hero.ctaSecondary}
</a>
```

**NOUVEAU :**
```jsx
<button 
  onClick={(e) => scrollToSection(e, 'product')}
  className="block py-3 px-6 text-center border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer bg-transparent w-full"
>
  {dictionary.hero.ctaSecondary}
</button>
```

**Ligne ~61 - ANCIEN :**
```jsx
<a 
  href="#scenarios"
  className="block py-3 px-6 text-center bg-white/10 backdrop-blur-lg text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
>
  {dictionary.hero.ctaTertiary || "Découvrir les scénarios"}
</a>
```

**NOUVEAU :**
```jsx
<button 
  onClick={(e) => scrollToSection(e, 'scenarios')}
  className="block py-3 px-6 text-center bg-white/10 backdrop-blur-lg text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20 cursor-pointer w-full"
>
  {dictionary.hero.ctaTertiary || "Découvrir les scénarios"}
</button>
```

### Étape 5 : Commit
- Message : `fix: Suppression hash dans URLs navigation`
- Branch : `main` (ou créer une Pull Request si préféré)
- Cliquer "Commit changes"

---

## ⏱️ DÉLAI DE PROPAGATION
- **Vercel redéploie automatiquement** dès le commit sur `main`
- **Durée**: 2-3 minutes pour build + CDN propagation
- **Vérification**: https://www.powalyze.com

---

## 🔍 VÉRIFICATIONS POST-DÉPLOIEMENT

### URLs attendues (SANS hash) :
- ✅ `https://www.powalyze.com/` (page principale)
- ✅ Navigation smooth scroll vers sections (aucun # dans URL)

### URLs à NE PLUS VOIR :
- ❌ `https://www.powalyze.com/#for-who`
- ❌ `https://www.powalyze.com/#product`
- ❌ `https://www.powalyze.com/#scenarios`

---

## 📦 AUTRES CORRECTIONS INCLUSES DANS LE COMMIT

Ce commit `ebb8abd8` inclut également :

1. **Langue française par défaut** (6 fichiers modifiés)
   - `src/lib/i18n.js` : hardcoded `lng: 'fr'`
   - `src/main.jsx` : force localStorage français
   
2. **Restructuration ProjectNew.jsx** (378→540 lignes)
   - 6 sections premium
   - 5 composants réutilisables
   - Validation complète

3. **132 fichiers** au total dans le commit

---

## 🆘 SI PROBLÈME GITHUB PERMISSIONS

**Compte requis :** Propriétaire du repo `Powalyze/powalyzeV2`

**Alternative 1 :** Donner accès write à `fableyab`
https://github.com/Powalyze/powalyzeV2/settings/access

**Alternative 2 :** Pull Request
1. Fork le repo avec compte autorisé
2. Appliquer les changements
3. Créer PR vers `main`

---

## 📞 CONTACT TECHNIQUE
Commit local prêt : `ebb8abd8`
Fichier modifié : `src/pages/LandingPage.jsx`
Changements : Fonction `scrollToSection` + 3 boutons remplacés
