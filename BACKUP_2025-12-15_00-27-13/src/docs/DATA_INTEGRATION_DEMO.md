
# Documentation de la Démo d'Intégration de Données

## Vue d'Ensemble
La page `DataIntegrationDemoPage.jsx` présente les capacités de Powalyze à s'intégrer avec divers écosystèmes de données (SQL, CRM, ERP, Fichiers). Elle sert de démonstration interactive pour les prospects, leur permettant de simuler la configuration de connecteurs et l'analyse de fichiers.

## 1. Fonctionnalités Clés

### 1.1 Tableau de Bord des Intégrations
- **Affichage des cartes** : Grille responsive de cartes d'intégration (SQL Server, SharePoint, Salesforce, etc.).
- **Badges de Statut** : Couleurs distinctives pour chaque état (Connecté/Vert, Syncing/Orange, Erreur/Rouge, Déconnecté/Gris).
- **Mode Démo** : Un switch permet de basculer entre les données de démonstration (pré-remplies) et l'accès aux données réelles (verrouillé pour les non-clients).

### 1.2 Configuration Interactive
- **Modal de Configuration** : Accessible via le bouton "Configurer".
- **Champs** : Host, Username, Password, Fréquence de Sync.
- **Simulation** : Le bouton "Sauvegarder" simule une mise à jour du statut vers "Syncing" puis "Success" après 2 secondes.

### 1.3 Analyseur de Fichiers
- **Modal d'Analyse** : Accessible via le bouton "Analyser" (sur la carte Excel/CSV).
- **Processus** : 
    1. Upload simulé (fichier `Q3_Financial_Data.csv`).
    2. Animation de chargement ("Analyse en cours...").
    3. Résultats détaillés (Lignes, Score Qualité, Colonnes).

## 2. Architecture Technique

### 2.1 Composants
- `src/pages/DataIntegrationDemoPage.jsx` : Composant principal.
- Utilise `radix-ui` (Dialog, Switch, Input) pour l'interface.
- Utilise `framer-motion` pour les transitions fluides entre les états.

### 2.2 Routing
- Accessible via `/data-integration-demo`.
- Alias `/espace-demo`.

### 2.3 Gestion d'État
- `integrations` : Array d'objets contenant l'état de chaque connecteur.
- `isDemoMode` : Booléen contrôlant l'accès et l'apparence.
- `analysisStep` : Machine à états simple ('idle' -> 'analyzing' -> 'complete').

## 3. Guide d'Utilisation

1. **Accès** : Naviguez vers `/data-integration-demo` ou cliquez sur le lien approprié (si ajouté au menu).
2. **Configurer une Source** :
    - Cliquez sur "Configurer" sur une carte (ex: SQL Server).
    - Entrez des valeurs factices ou laissez les défauts.
    - Cliquez sur "Sauvegarder" et observez le changement de statut.
3. **Analyser un Fichier** :
    - Cliquez sur "Analyser" sur la carte Excel/CSV.
    - Cliquez sur "Lancer l'Analyse".
    - Attendez que les résultats (lignes, qualité) s'affichent.
4. **Mode Réel** : Désactivez le switch "Demo Mode" pour voir l'état verrouillé incitant à la connexion.

## 4. Maintenance
Pour ajouter une nouvelle intégration, ajoutez simplement un objet au tableau `initialIntegrations` dans `DataIntegrationDemoPage.jsx`.
