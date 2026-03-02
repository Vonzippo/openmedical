#!/bin/bash
# ============================================
# EINFACHER LOGIN MIT CURL
# ============================================
#
# Verwendung: bash src/api-demo/login.sh
# ============================================

BASE_URL="http://localhost:3003"

echo ""
echo "========================================"
echo "LOGIN REQUEST"
echo "========================================"
echo ""

# Login-Daten
USERNAME="admin"
PASSWORD="admin123"

echo "Sende Login-Request..."
echo ""
echo "curl -X POST $BASE_URL/api/auth/login"
echo "     -H 'Content-Type: application/json'"
echo "     -d '{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}'"
echo ""
echo "----------------------------------------"
echo "ANTWORT:"
echo "----------------------------------------"

# Der eigentliche curl-Befehl
curl -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}" \
  | python3 -m json.tool 2>/dev/null

echo ""
echo "========================================"
echo "LOGIN ABGESCHLOSSEN"
echo "========================================"
