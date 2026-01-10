#!/bin/bash
# Metabase Auto-Configuration Script
# Run on VPS after Metabase installation

set -e

echo "🔧 Configuration automatique Metabase"
echo "======================================"
echo ""

METABASE_URL="http://193.203.169.19:3000"

echo "⏳ Attente démarrage complet Metabase..."
until curl -s "$METABASE_URL/api/health" > /dev/null 2>&1; do
    echo "   Metabase pas encore prêt, attente 5s..."
    sleep 5
done

echo "✅ Metabase opérationnel!"
echo ""

# Setup token (will be generated after first login)
echo "📋 CONFIGURATION MANUELLE REQUISE:"
echo ""
echo "1. Ouvrez: $METABASE_URL"
echo "2. Créez le compte admin avec:"
echo "   Email: fabrice.fays@outlook.fr"
echo "   Password: (votre mot de passe)"
echo "   Organization: Powalyze"
echo ""
echo "3. Activez l'embedding:"
echo "   Admin → Settings → Embedding → Enable"
echo "   Copiez le SECRET_KEY"
echo ""
echo "4. Connectez Supabase:"
echo "   Admin → Databases → Add PostgreSQL"
echo ""
echo "5. Créez 3 dashboards et notez les IDs"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Ensuite, donnez ces valeurs à l'agent AI:"
echo ""
echo "METABASE_SECRET_KEY=___________"
echo "DASHBOARD_ID_1=___"
echo "DASHBOARD_ID_2=___"
echo "DASHBOARD_ID_3=___"
echo ""
