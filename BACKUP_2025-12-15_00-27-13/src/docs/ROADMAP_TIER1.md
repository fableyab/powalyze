# Tier 1: Démo Intégrée Sécurisée

**Objectif**: Mettre en place un POC rapide pour démontrer la capacité d'intégration de Power BI dans l'application web.

## Étapes Clés

1. **Configuration Workspace Power BI**
   - Créer un workspace dédié "Powalyze_Demo"
   - Uploader le rapport de démonstration `Exec_Dashboard_v1.pbix`
   - Configurer les paramètres de partage (Public pour le test initial, puis Secure Embed)

2. **Développement Frontend**
   - Créer composant `PowerBIEmbed` utilisant `powerbi-client-react`
   - Intégrer la bibliothèque `pbi-client`
   - Configurer le mode 'Embed' basique

3. **Sécurité (Phase 1)**
   - Utilisation d'un token d'application statique (pour démo interne uniquement)
   - Iframe sandboxée pour éviter les conflits CSS/JS

4. **Validation**
   - Le rapport s'affiche dans la page `PowerBIDemoPage`
   - Les filtres basiques fonctionnent (JS -> Report communication)