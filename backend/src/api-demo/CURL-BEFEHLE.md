# CURL Befehle für Auth API - Einzeln zum Testen

## Server starten
```bash
cd backend
npx tsx src/api-demo/auth-server.ts
```

---

## 1. API Info abrufen
```bash
curl http://localhost:3003/api/auth/info
```

---

## 2. Registrieren (Neuen Account erstellen)
```bash
curl -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "test123", "email": "test@example.com"}'
```

**Erklärung:**
- `-X POST` = HTTP-Methode POST
- `-H "Content-Type: application/json"` = Wir senden JSON-Daten
- `-d '{...}'` = Die Daten (Body)

---

## 3. Login (Einloggen)
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**Antwort enthält einen Token:**
```json
{
  "success": true,
  "data": {
    "token": "token_abc123xyz...",  ← Diesen Token kopieren!
    "user": { ... }
  }
}
```

---

## 4. Eigenes Profil abrufen (MIT Token)
```bash
curl http://localhost:3003/api/auth/me \
  -H "Authorization: Bearer DEIN_TOKEN_HIER"
```

**Beispiel mit echtem Token:**
```bash
curl http://localhost:3003/api/auth/me \
  -H "Authorization: Bearer token_abc123xyz"
```

---

## 5. Profil aktualisieren
```bash
curl -X PUT http://localhost:3003/api/auth/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer DEIN_TOKEN_HIER" \
  -d '{"email": "neue-email@test.ch"}'
```

---

## 6. Alle Benutzer auflisten (NUR ADMIN)
```bash
curl http://localhost:3003/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HIER"
```

---

## 7. Benutzer löschen (NUR ADMIN)
```bash
curl -X DELETE http://localhost:3003/api/users/2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HIER"
```

---

## 8. Logout (Ausloggen)
```bash
curl -X POST http://localhost:3003/api/auth/logout \
  -H "Authorization: Bearer DEIN_TOKEN_HIER"
```

---

## Fehlerszenarien testen

### Login ohne Passwort (Fehler 400)
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin"}'
```

### Login mit falschem Passwort (Fehler 401)
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "falsch"}'
```

### Geschützte Route ohne Token (Fehler 401)
```bash
curl http://localhost:3003/api/auth/me
```

### User versucht Admin-Route (Fehler 403)
```bash
# Erst als normaler User einloggen, dann:
curl http://localhost:3003/api/users \
  -H "Authorization: Bearer USER_TOKEN_HIER"
```

---

## HTTP Status Codes Übersicht

| Code | Bedeutung | Wann? |
|------|-----------|-------|
| 200 | OK | Anfrage erfolgreich |
| 201 | Created | Neuer Eintrag erstellt |
| 400 | Bad Request | Fehlende/falsche Daten |
| 401 | Unauthorized | Nicht eingeloggt oder Token ungültig |
| 403 | Forbidden | Eingeloggt, aber keine Berechtigung |
| 404 | Not Found | Endpunkt/Ressource existiert nicht |
| 409 | Conflict | z.B. Benutzername bereits vergeben |

---

## Automatisches Test-Script ausführen

```bash
cd backend
bash src/api-demo/curl-test.sh
```
