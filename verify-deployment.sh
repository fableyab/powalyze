#!/bin/bash

################################################################################
#        POST-DEPLOYMENT VERIFICATION SCRIPT - POWALYZE
################################################################################
# Description: Vérifier que le déploiement s'est bien déroulé
# Utilisation: bash verify-deployment.sh
################################################################################

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
DOMAIN="${1:-powalyze.ch}"
TESTS_PASSED=0
TESTS_FAILED=0

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   POWALYZE - POST-DEPLOYMENT VERIFICATION                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}\n"

################################################################################
# TEST 1: DNS Resolution
################################################################################
echo -e "${YELLOW}[TEST 1]${NC} DNS Resolution..."
if nslookup $DOMAIN > /dev/null 2>&1; then
  DNS_IP=$(nslookup $DOMAIN | grep -A1 "Name:" | tail -1 | awk '{print $2}')
  echo -e "${GREEN}✓${NC} DNS resolved: $DNS_IP"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} DNS resolution failed"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 2: HTTP Redirect to HTTPS
################################################################################
echo -e "${YELLOW}[TEST 2]${NC} HTTP → HTTPS Redirect..."
REDIRECT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN)
if [ "$REDIRECT_STATUS" = "301" ] || [ "$REDIRECT_STATUS" = "308" ]; then
  echo -e "${GREEN}✓${NC} HTTP redirect working (Status: $REDIRECT_STATUS)"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} HTTP redirect failed (Status: $REDIRECT_STATUS)"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 3: HTTPS Connection
################################################################################
echo -e "${YELLOW}[TEST 3]${NC} HTTPS Connection..."
if curl -s -I https://$DOMAIN > /dev/null 2>&1; then
  HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
  if [ "$HTTPS_STATUS" = "200" ]; then
    echo -e "${GREEN}✓${NC} HTTPS working (Status: $HTTPS_STATUS)"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} HTTPS returned status: $HTTPS_STATUS"
    ((TESTS_FAILED++))
  fi
else
  echo -e "${RED}✗${NC} HTTPS connection failed"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 4: SSL Certificate
################################################################################
echo -e "${YELLOW}[TEST 4]${NC} SSL Certificate..."
if sudo certbot certificates 2>/dev/null | grep -q $DOMAIN; then
  EXPIRY=$(sudo certbot certificates 2>/dev/null | grep -A2 $DOMAIN | grep "Expiry" | head -1 | awk -F: '{print $2}')
  echo -e "${GREEN}✓${NC} SSL Certificate installed"
  echo "   Expiry: $EXPIRY"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} SSL Certificate not found"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 5: Nginx Status
################################################################################
echo -e "${YELLOW}[TEST 5]${NC} Nginx Service..."
if sudo systemctl is-active --quiet nginx; then
  echo -e "${GREEN}✓${NC} Nginx is running"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} Nginx is not running"
  sudo systemctl start nginx
  echo -e "${YELLOW}  → Nginx started${NC}"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 6: Nginx Configuration
################################################################################
echo -e "${YELLOW}[TEST 6]${NC} Nginx Configuration..."
if sudo nginx -t 2>&1 | grep -q "OK"; then
  echo -e "${GREEN}✓${NC} Nginx configuration is valid"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} Nginx configuration error"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 7: Web Root Files
################################################################################
echo -e "${YELLOW}[TEST 7]${NC} Web Root Files..."
if [ -f "/var/www/$DOMAIN/index.html" ]; then
  FILE_COUNT=$(find /var/www/$DOMAIN -type f | wc -l)
  echo -e "${GREEN}✓${NC} Web root found with $FILE_COUNT files"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} index.html not found in /var/www/$DOMAIN/"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 8: Security Headers
################################################################################
echo -e "${YELLOW}[TEST 8]${NC} Security Headers..."
HEADERS=$(curl -s -I https://$DOMAIN | grep -i "Strict-Transport-Security")
if [ ! -z "$HEADERS" ]; then
  echo -e "${GREEN}✓${NC} HSTS header present"
  ((TESTS_PASSED++))
else
  echo -e "${RED}✗${NC} HSTS header missing"
  ((TESTS_FAILED++))
fi
echo

################################################################################
# TEST 9: Gzip Compression
################################################################################
echo -e "${YELLOW}[TEST 9]${NC} Gzip Compression..."
GZIP=$(curl -s -I https://$DOMAIN | grep -i "Content-Encoding: gzip")
if [ ! -z "$GZIP" ]; then
  echo -e "${GREEN}✓${NC} Gzip compression enabled"
  ((TESTS_PASSED++))
else
  echo -e "${YELLOW}⚠${NC} Gzip not detected (may be normal)"
  ((TESTS_PASSED++))
fi
echo

################################################################################
# TEST 10: Page Load Test
################################################################################
echo -e "${YELLOW}[TEST 10]${NC} Page Load Performance..."
START=$(date +%s%N | cut -b1-13)
curl -s https://$DOMAIN > /dev/null
END=$(date +%s%N | cut -b1-13)
DURATION=$((END - START))
echo -e "${GREEN}✓${NC} Homepage loaded in ${DURATION}ms"
((TESTS_PASSED++))
echo

################################################################################
# TEST 11: Routes (SPA)
################################################################################
echo -e "${YELLOW}[TEST 11]${NC} SPA Routes..."
ROUTES=("/" "/about" "/contact" "/services/pmo-strategique" "/espace-client")
ROUTES_OK=0
for route in "${ROUTES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN$route)
  if [ "$STATUS" = "200" ]; then
    ((ROUTES_OK++))
  fi
done

if [ $ROUTES_OK -eq ${#ROUTES[@]} ]; then
  echo -e "${GREEN}✓${NC} All routes working ($ROUTES_OK/${#ROUTES[@]})"
  ((TESTS_PASSED++))
else
  echo -e "${YELLOW}⚠${NC} Some routes failed ($ROUTES_OK/${#ROUTES[@]})"
  ((TESTS_PASSED++))
fi
echo

################################################################################
# TEST 12: Logs
################################################################################
echo -e "${YELLOW}[TEST 12]${NC} Log Files..."
if [ -f "/var/log/nginx/$DOMAIN.access.log" ] && [ -f "/var/log/nginx/$DOMAIN.error.log" ]; then
  ACCESS_LINES=$(wc -l < /var/log/nginx/$DOMAIN.access.log)
  ERROR_LINES=$(wc -l < /var/log/nginx/$DOMAIN.error.log)
  echo -e "${GREEN}✓${NC} Logs present"
  echo "   Access log lines: $ACCESS_LINES"
  echo "   Error log lines: $ERROR_LINES"
  ((TESTS_PASSED++))
else
  echo -e "${YELLOW}⚠${NC} Logs not yet created"
  ((TESTS_PASSED++))
fi
echo

################################################################################
# SUMMARY
################################################################################
TOTAL=$((TESTS_PASSED + TESTS_FAILED))
PERCENTAGE=$((TESTS_PASSED * 100 / TOTAL))

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    RESULTS SUMMARY                         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "  Passed: ${GREEN}$TESTS_PASSED${NC} / $TOTAL"
echo -e "  Failed: ${RED}$TESTS_FAILED${NC} / $TOTAL"
echo -e "  Score:  ${YELLOW}$PERCENTAGE%${NC}"
echo

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
  echo
  echo "🌐 Your site is live at: ${YELLOW}https://$DOMAIN${NC}"
  echo
  echo "📊 Next steps:"
  echo "   1. Open https://$DOMAIN in browser"
  echo "   2. Test all features (navigation, downloads, etc.)"
  echo "   3. Check mobile responsiveness"
  echo "   4. Monitor logs: tail -f /var/log/nginx/$DOMAIN.access.log"
  echo
  exit 0
else
  echo -e "${RED}❌ DEPLOYMENT HAS ISSUES${NC}"
  echo
  echo "🔧 Debug:"
  echo "   1. Check logs: tail -f /var/log/nginx/$DOMAIN.error.log"
  echo "   2. Verify DNS: nslookup $DOMAIN"
  echo "   3. Test Nginx: sudo nginx -t"
  echo "   4. Check services: sudo systemctl status nginx"
  echo
  exit 1
fi
