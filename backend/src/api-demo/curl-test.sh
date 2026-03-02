#!/bin/bash
# ============================================
# CURL TEST SCRIPT - Auth API Demo
# ============================================
#
# Dieses Script testet die Auth-API mit curl.
# Starte zuerst den Server: npx tsx src/api-demo/auth-server.ts
#
# Verwendung: bash src/api-demo/curl-test.sh
# ============================================

BASE_URL="http://localhost:3003"

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${YELLOW}========================================"
echo "🧪 AUTH API TEST MIT CURL"
echo -e "========================================${NC}"
echo ""

# ============================================
# TEST 1: API Info abrufen
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "📋 TEST 1: API Info abrufen"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl $BASE_URL/api/auth/info${NC}"
echo ""
curl -s $BASE_URL/api/auth/info | python3 -m json.tool 2>/dev/null || curl -s $BASE_URL/api/auth/info
echo ""

# ============================================
# TEST 2: Login OHNE Credentials (Fehler erwartet)
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "❌ TEST 2: Login ohne Daten (Fehler 400 erwartet)"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl -X POST $BASE_URL/api/auth/login${NC}"
echo ""
curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  | python3 -m json.tool 2>/dev/null || curl -s -X POST $BASE_URL/api/auth/login
echo ""

# ============================================
# TEST 3: Login mit FALSCHEM Passwort
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "❌ TEST 3: Login mit falschem Passwort (Fehler 401 erwartet)"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl -X POST $BASE_URL/api/auth/login"
echo -e "     -d '{\"username\": \"admin\", \"password\": \"falsch\"}'${NC}"
echo ""
curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "falsch"}' \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 4: Erfolgreicher Login als BENUTZER
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "✅ TEST 4: Login als normaler Benutzer"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl -X POST $BASE_URL/api/auth/login"
echo -e "     -d '{\"username\": \"benutzer\", \"password\": \"pass123\"}'${NC}"
echo ""
USER_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "benutzer", "password": "pass123"}')
echo $USER_RESPONSE | python3 -m json.tool 2>/dev/null
USER_TOKEN=$(echo $USER_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['data']['token'])" 2>/dev/null)
echo ""
echo -e "${GREEN}📌 User-Token gespeichert: $USER_TOKEN${NC}"
echo ""

# ============================================
# TEST 5: Geschützte Route OHNE Token
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "❌ TEST 5: Profil abrufen OHNE Token (Fehler 401 erwartet)"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl $BASE_URL/api/auth/me${NC}"
echo ""
curl -s $BASE_URL/api/auth/me | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 6: Geschützte Route MIT Token
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "✅ TEST 6: Profil abrufen MIT Token"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl $BASE_URL/api/auth/me"
echo -e "     -H 'Authorization: Bearer $USER_TOKEN'${NC}"
echo ""
curl -s $BASE_URL/api/auth/me \
  -H "Authorization: Bearer $USER_TOKEN" \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 7: User versucht Admin-Route (Fehler 403)
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "❌ TEST 7: User versucht Admin-Route (Fehler 403 erwartet)"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl $BASE_URL/api/users"
echo -e "     -H 'Authorization: Bearer $USER_TOKEN'${NC}"
echo ""
curl -s $BASE_URL/api/users \
  -H "Authorization: Bearer $USER_TOKEN" \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 8: Login als ADMIN
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "✅ TEST 8: Login als Admin"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl -X POST $BASE_URL/api/auth/login"
echo -e "     -d '{\"username\": \"admin\", \"password\": \"admin123\"}'${NC}"
echo ""
ADMIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}')
echo $ADMIN_RESPONSE | python3 -m json.tool 2>/dev/null
ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['data']['token'])" 2>/dev/null)
echo ""
echo -e "${GREEN}📌 Admin-Token gespeichert: $ADMIN_TOKEN${NC}"
echo ""

# ============================================
# TEST 9: Admin ruft alle User ab
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "✅ TEST 9: Admin ruft alle Benutzer ab"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl $BASE_URL/api/users"
echo -e "     -H 'Authorization: Bearer $ADMIN_TOKEN'${NC}"
echo ""
curl -s $BASE_URL/api/users \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 10: Neuen Benutzer registrieren
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "✅ TEST 10: Neuen Benutzer registrieren"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl -X POST $BASE_URL/api/auth/register"
echo -e "     -d '{\"username\": \"neuuser\", \"password\": \"neu123\", \"email\": \"neu@test.ch\"}'${NC}"
echo ""
curl -s -X POST $BASE_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "neuuser", "password": "neu123", "email": "neu@test.ch"}' \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 11: Logout
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "✅ TEST 11: Benutzer ausloggen"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl -X POST $BASE_URL/api/auth/logout"
echo -e "     -H 'Authorization: Bearer $USER_TOKEN'${NC}"
echo ""
curl -s -X POST $BASE_URL/api/auth/logout \
  -H "Authorization: Bearer $USER_TOKEN" \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# TEST 12: Nach Logout Token ungültig
# ============================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "❌ TEST 12: Token nach Logout ungültig (Fehler 401 erwartet)"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}curl $BASE_URL/api/auth/me"
echo -e "     -H 'Authorization: Bearer $USER_TOKEN'${NC}"
echo ""
curl -s $BASE_URL/api/auth/me \
  -H "Authorization: Bearer $USER_TOKEN" \
  | python3 -m json.tool 2>/dev/null
echo ""

# ============================================
# ZUSAMMENFASSUNG
# ============================================
echo -e "${YELLOW}========================================"
echo "✅ ALLE TESTS ABGESCHLOSSEN!"
echo -e "========================================${NC}"
echo ""
echo "Zusammenfassung der getesteten Szenarien:"
echo "  1. API Info abrufen"
echo "  2. Login ohne Daten → 400 Bad Request"
echo "  3. Login falsches Passwort → 401 Unauthorized"
echo "  4. Login erfolgreich → Token erhalten"
echo "  5. Geschützte Route ohne Token → 401"
echo "  6. Geschützte Route mit Token → OK"
echo "  7. User auf Admin-Route → 403 Forbidden"
echo "  8. Admin Login → Token erhalten"
echo "  9. Admin ruft User-Liste ab → OK"
echo "  10. Registrierung → 201 Created"
echo "  11. Logout → Session gelöscht"
echo "  12. Alter Token ungültig → 401"
echo ""
