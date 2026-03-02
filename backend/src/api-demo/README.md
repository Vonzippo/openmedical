# API Demo - Lernprogramm

Dieses Verzeichnis enthält ein einfaches Test-Programm, um API-Schnittstellen zu erklären.

## Was ist eine API?

**API** = **A**pplication **P**rogramming **I**nterface (Anwendungsprogrammierschnittstelle)

Eine API ermöglicht die Kommunikation zwischen verschiedenen Software-Komponenten.

## HTTP-Methoden

| Methode | Beschreibung | Beispiel |
|---------|--------------|----------|
| GET | Daten abrufen | Alle Benutzer laden |
| POST | Neue Daten erstellen | Neuen Benutzer anlegen |
| PUT | Daten komplett ersetzen | Benutzer aktualisieren |
| PATCH | Daten teilweise ändern | Nur Email ändern |
| DELETE | Daten löschen | Benutzer entfernen |

## Starten

```bash
cd backend
npx tsx src/api-demo/server.ts
```

Der Server läuft dann auf `http://localhost:3002`

## Endpunkte testen

### Mit curl:
```bash
# GET - Alle Produkte abrufen
curl http://localhost:3002/api/produkte

# POST - Neues Produkt erstellen
curl -X POST http://localhost:3002/api/produkte \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "preis": 999.99}'

# GET - Ein Produkt abrufen
curl http://localhost:3002/api/produkte/1

# PUT - Produkt aktualisieren
curl -X PUT http://localhost:3002/api/produkte/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Gaming Laptop", "preis": 1499.99}'

# DELETE - Produkt löschen
curl -X DELETE http://localhost:3002/api/produkte/1
```

### Mit Browser:
- GET-Anfragen können direkt im Browser getestet werden
- Für POST/PUT/DELETE: Verwende Postman, Insomnia oder die Browser-Konsole
