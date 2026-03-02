# openmedical - Webplattform

## Projektübersicht

Moderne Webplattform für openmedical mit React Frontend, Node.js Backend und MySQL Datenbank.

### Technologie-Stack

- **Frontend**: React 18, TypeScript, Material UI, Redux Toolkit, Vite
- **Backend**: Node.js, Express, TypeScript
- **Datenbank**: MySQL 8.0 (Docker)
- **Authentifizierung**: JWT, bcrypt

---

## Installation

### Voraussetzungen

- Node.js (Version 18 oder höher)
- Docker Desktop
- Git

### 1. Repository klonen

```bash
git clone <repository-url>
cd openmedical
```

### 2. Datenbank starten

```bash
docker-compose up -d
```

Dies startet einen MySQL-Container mit folgenden Zugangsdaten:
- Host: localhost
- Port: 3306
- Datenbank: openmedical
- Benutzer: openmedical
- Passwort: openmedical123
- Root-Passwort: root

### 3. Datenbank-Tabellen erstellen

```bash
docker exec -i openmedical-db mysql -u root -proot openmedical << 'EOF'

-- Benutzer-Tabelle
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'practice') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Praxen-Tabelle
CREATE TABLE IF NOT EXISTS practices (
  id CHAR(36) PRIMARY KEY,
  praxisname VARCHAR(255) NOT NULL,
  anrede VARCHAR(50),
  vorname VARCHAR(100),
  nachname VARCHAR(100),
  strasse VARCHAR(255),
  plz VARCHAR(10),
  ort VARCHAR(100),
  telefon VARCHAR(50),
  email VARCHAR(255),
  software VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS-Inhalte-Tabelle
CREATE TABLE IF NOT EXISTS contents (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT,
  page VARCHAR(100),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Partner-Tabelle
CREATE TABLE IF NOT EXISTS partners (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  website VARCHAR(500),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter-Tabelle
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin-Benutzer erstellen (Passwort: admin123)
INSERT INTO users (id, email, password, role) VALUES (
  UUID(),
  'admin@openmedical.ch',
  '$2b$10$8K1p/a0dL1LXMIgoEDFrwOeH0MkZn1YvBK8HK8HbK8HK8HK8HK8HK',
  'admin'
) ON DUPLICATE KEY UPDATE email=email;

EOF
```

### 4. Backend installieren und starten

```bash
cd backend
npm install
npm run dev
```

Das Backend läuft auf `http://localhost:3001`

### 5. Frontend installieren und starten

In einem neuen Terminal:

```bash
cd frontend
npm install
npm run dev
```

Das Frontend läuft auf `http://localhost:5173`

---

## Projektstruktur

```
openmedical/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # Wiederverwendbare Komponenten
│   │   ├── pages/            # Seiten-Komponenten
│   │   ├── store/            # Redux Store
│   │   │   └── slices/       # Redux Slices
│   │   ├── services/         # API-Services
│   │   └── main.tsx          # Einstiegspunkt
│   └── package.json
│
├── backend/                  # Node.js Backend
│   ├── src/
│   │   ├── routes/           # API-Routen
│   │   ├── middleware/       # Express Middleware
│   │   ├── config/           # Konfiguration
│   │   └── index.ts          # Einstiegspunkt
│   └── package.json
│
├── docker-compose.yml        # Docker-Konfiguration
└── README.md
```

---

## API-Endpunkte

### Authentifizierung
- `POST /api/auth/register` - Benutzer registrieren
- `POST /api/auth/login` - Benutzer anmelden
- `POST /api/auth/logout` - Benutzer abmelden
- `GET /api/auth/me` - Aktueller Benutzer

### Praxen
- `GET /api/practices` - Alle Praxen abrufen
- `POST /api/practices` - Neue Praxis erstellen

### CMS-Inhalte
- `GET /api/contents` - Alle Inhalte abrufen
- `POST /api/contents` - Neuen Inhalt erstellen
- `PUT /api/contents/:id` - Inhalt bearbeiten
- `DELETE /api/contents/:id` - Inhalt löschen

### Partner
- `GET /api/partners` - Alle Partner abrufen
- `GET /api/partners/categories` - Kategorien abrufen
- `POST /api/partners` - Neuen Partner erstellen
- `PUT /api/partners/:id` - Partner bearbeiten
- `DELETE /api/partners/:id` - Partner löschen

### Suche
- `GET /api/search?q=suchbegriff` - Globale Suche

### Newsletter
- `POST /api/newsletter/subscribe` - Newsletter-Anmeldung

---

## Funktionale Module

### Modul 1: Anmeldeformular
Formular zur Registrierung von Praxen und Ärzten mit Echtzeit-Validierung.

### Modul 2: Formularvalidierung
Clientseitige Validierung aller Eingabefelder mit visueller Rückmeldung.

### Modul 3: Dashboard
Benutzeroberfläche für authentifizierte Benutzer zur Verwaltung von Stammdaten.

### Modul 4: CMS-System
Content-Management-System mit CRUD-Operationen für Administratoren.

### Modul 5: Partnerseite
Dynamische Darstellung von Partnern mit Filterung nach Kategorien.

### Modul 6: Suchfunktion
Globale Suche über Partner, Inhalte und Praxen.

### Modul 7: Architektur & Sicherheit
- Three-Tier-Architektur (Frontend, Backend, Datenbank)
- JWT-Authentifizierung
- Passwort-Hashing mit bcrypt
- Sicherheits-Header mit Helmet
- CORS-Konfiguration

---

## Befehle

### Docker

```bash
# Container starten
docker-compose up -d

# Container stoppen
docker-compose down

# Container-Status prüfen
docker ps

# MySQL-Shell öffnen
docker exec -it openmedical-db mysql -u root -proot openmedical
```

### Backend

```bash
cd backend

# Entwicklungsserver starten
npm run dev

# TypeScript kompilieren
npm run build

# Produktionsserver starten
npm start
```

### Frontend

```bash
cd frontend

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Build-Vorschau
npm run preview
```

---

## Umgebungsvariablen

### Backend (.env)

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=openmedical
DB_PASSWORD=openmedical123
DB_NAME=openmedical
JWT_SECRET=your-secret-key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Fehlerbehebung

### Port bereits belegt

```bash
# Port 3001 (Backend) freigeben
lsof -ti:3001 | xargs kill -9

# Port 5173 (Frontend) freigeben
lsof -ti:5173 | xargs kill -9
```

### Datenbank-Verbindung fehlgeschlagen

1. Prüfen ob Docker läuft: `docker ps`
2. Container neu starten: `docker-compose restart`
3. Logs prüfen: `docker logs openmedical-db`

### Frontend zeigt weisse Seite

1. Browser-Konsole auf Fehler prüfen (F12)
2. Frontend neu starten: `npm run dev`
3. Cache leeren: Hard Refresh (Ctrl+Shift+R)
