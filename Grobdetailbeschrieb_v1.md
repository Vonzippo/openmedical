# Grobdetailbeschrieb

**Dokumentname:** Grobdetailbeschrieb
**Version:** 1.0
**Vertraulichkeitsstufe:** Intern

---

## 1. Anmeldeformular für Praxen und Ärzte

Das Anmeldeformular ist eine interaktive Benutzerkomponente, die vollständig clientseitig mit React gerendert wird.

- Jedes Eingabefeld besitzt einen eigenen Zustand (State), der in Echtzeit überprüft und verarbeitet wird
- Die Validierung erfolgt im Browser, wodurch Fehler sofort erkannt werden, bevor Daten an den Server gesendet werden
- Beim Absenden wird eine HTTP-Anfrage an den Server geschickt

### Client-Server-Kommunikation

- Klassische Client-Server-Kommunikation nach dem **Request-Response-Prinzip**
- Umgesetzt über **Axios** als HTTP-Client
- Die Anfrage enthält ein Datenobjekt (JSON), das vom Server empfangen, validiert und in strukturierter Form in der Datenbank gespeichert wird
- Diese Kommunikation läuft asynchron (AJAX), da die Datenverarbeitung im Hintergrund stattfindet

### Datenspeicherung

- **MySQL-Datenbank**, verwaltet über HeidiSQL
- Jede Praxis wird als Datensatz mit eindeutiger **UUID** erfasst
- Beziehungen zwischen Tabellen (z.B. Praxis und Benutzer) werden über Primär- und Fremdschlüssel definiert

### Backend

- Umgesetzt mit **Node.js** und **Express**
- Verantwortlich für Server, Datenvalidierung und Datenbankzugriff
- Verification über Backend API Calls

---

## 2. Formularvalidierung

Die Validierung sichert die Datenqualität und schützt das System vor Manipulationen. Sie ist zweistufig aufgebaut:

### Clientseitig (React + Yup + react-hook-form)

- Eingaben werden direkt im Browser geprüft
- **Yup** validiert Felder wie Pflichtangaben oder Formate
- **react-hook-form** verwaltet den Zustand und liefert sofortiges Feedback ohne Seitenneuladen

### Serverseitig (Express + express-validator)

- Nach dem Absenden prüft das Backend die Daten erneut
- Manipulierte oder automatisierte Requests werden blockiert, bevor sie in die Datenbank gelangen

> Dieses Zusammenspiel von Echtzeitprüfung im Client und Integritätsprüfung im Server stellt sicher, dass nur korrekte und sichere Daten gespeichert werden.

---

## 3. Dashboard & Benutzeroberfläche

Die Benutzeroberfläche ist als komponentenbasierte Webanwendung mit **ReactJS** entwickelt.

### Performance-Optimierung

- Nur notwendige Inhalte werden geladen und gerendert
- Browser baut nur die Bereiche neu auf, die sich tatsächlich ändern
- Spart Ladezeit und sorgt für flüssige Übergänge

### Datenaustausch

- Dashboard tauscht Daten mit dem Server über **Axios** aus
- **HTTPS-Anfragen (REST)** mit Daten im JSON-Format
- Daten werden direkt in der UI verarbeitet ohne Seitenneuladen

### Zustandsverwaltung

- Zentrale Verwaltung mit **Redux** (JavaScript-Bibliothek zur globalen Zustandsverwaltung)
- Eingeloggter Benutzer, Formularänderungen etc. bleiben konsistent
- Auch bei gleichzeitiger Interaktion mehrerer Komponenten

### UI-Framework

- Visuelles Layout basiert auf **Material UI**
- Standardisierte UI-Komponenten: Buttons, Tabellen, Dialoge

---

## 4. Inhaltsverwaltung (CMS-System)

Das integrierte CMS-Modul ermöglicht Administratoren, Inhalte direkt im Browser zu verwalten.

### Technische Basis

- **CRUD-Prinzip** (Create, Read, Update, Delete)
- REST-ähnliche Endpunkte in Express
- Strukturierte Datennachrichten als Axios-Request an das Backend
- Backend verarbeitet Eingabe, speichert in MySQL-Datenbank, gibt JSON-Bestätigung zurück

### Rendering

- **Virtual DOM** von React für dynamisches Rendering
- Änderungen im Backend werden sofort sichtbar ohne Reload
- Reaktivitätsprinzip als zentraler Bestandteil moderner Webarchitekturen

---

## 5. Partnerseite & dynamische Darstellung

Die Landing Page verwendet ein **datengetriebenes Rendering-Modell**.

### Datenfluss

- Partnerdaten werden über das Backend als JSON abgerufen
- Clientseitige Darstellung durch React-Komponenten
- Datenbank-Tabelle `partners` mit Feldern: `id`, `name`, `logo_path`, `category`

### Animationen

- Logo-Bewegung über **CSS-Keyframe-Animationen** oder React-Animationslibrary
- Nutzung der **GPU-Beschleunigung** des Browsers für flüssige Übergänge

### Filterung

- Lokale Filterfunktion basiert auf React-State
- Interaktive Sortierungen ohne erneute Serveranfrage

---

## 6. Suchfunktion

Die Suchfunktion ist ein Beispiel für **reaktive Benutzerinteraktion** in React.

### Funktionsweise

- Jede Benutzereingabe löst eine State-Änderung aus
- Direkte Filterung des angezeigten Datenbestands
- Logik läuft vollständig im Browser über Reacts **Virtual-DOM-Mechanismus**
- Inhalte aktualisieren sich ohne Neuladen

### Skalierbarkeit

- Architektur ermöglicht spätere Ergänzung durch serverseitige SQL-Suche
- **LIKE-** oder **Fulltext-Abfragen** für größere Datenmengen
- System bleibt skalierbar und performant

---

## 7. Architektur & Sicherheit

Die Anwendung folgt dem **Three-Tier-Modell**:

### Schichten

| Schicht | Technologie | Funktion |
|---------|-------------|----------|
| **Frontend** | React | Präsentationsschicht – Darstellung, Rendering, Benutzerinteraktion |
| **Backend** | Node.js / Express | Logikschicht – verarbeitet Requests, validiert Daten, steuert Authentifizierung |
| **Datenbank** | MySQL | Persistente Speicherung von strukturierten Datensätzen |

### Sicherheitsmechanismen

| Mechanismus | Beschreibung |
|-------------|--------------|
| **HTTPS** | Verschlüsselte Datenübertragung zwischen Client und Server |
| **JWT** | Token-basierte Authentifizierung, verwaltet Benutzersitzungen sicher |
| **bcrypt** | Einweg-Hashing von Passwörtern vor Speicherung |
| **Middleware** | Schützt sensible Endpunkte durch Berechtigungsprüfung |
| **Express Error-Handling** | Einheitliche Fehlercodes (200, 400, 401, 404, 500) für präzise Rückmeldungen |
| **Serverlogging** | Überwachung und Protokollierung ungewöhnlicher Aktivitäten |

---

## 8. Barrierefreiheit

Die Webseite wird gemäß den **WCAG 2.1 AA-Richtlinien** entwickelt, um die Zugänglichkeit für alle Benutzergruppen zu gewährleisten.

### Technische Maßnahmen

| Maßnahme | Beschreibung |
|----------|--------------|
| **Semantische React Components** | Logische Dokumentstruktur für Screenreader (`<header>`, `<main>`, `<button>`) |
| **ARIA-Attribute** | Definieren Rollen, Zustände und Beschreibungen für dynamische Elemente |
| **Tastaturnavigation** | Vollständige Steuerung über Tab-Index, visuelle Fokusanzeige und Event-Listener |
| **Farbanalyse** | Kontraste und Schriftgrößen entsprechen WCAG-Standards (mind. 4.5:1) |
| **aria-live-Regionen** | Automatische Ankündigung dynamischer Inhalte für Screenreader |

> Barrierefreiheit ist technisch in alle Schichten integriert – von der DOM-Struktur über das Event-Handling bis zur CSS-Logik.

---

## Technologie-Stack Übersicht

### Frontend
- React (mit Virtual DOM)
- Redux (Zustandsverwaltung)
- Material UI (UI-Komponenten)
- Yup + react-hook-form (Validierung)
- Axios (HTTP-Client)
- CSS-Keyframe-Animationen

### Backend
- Node.js
- Express
- express-validator
- JWT (Authentifizierung)
- bcrypt (Passwort-Hashing)

### Datenbank
- MySQL
- HeidiSQL (Verwaltung)
- UUID für eindeutige Identifikation

### Sicherheit & Standards
- HTTPS
- WCAG 2.1 AA
- ARIA-Attribute

---

*Seite 5 von 5*
