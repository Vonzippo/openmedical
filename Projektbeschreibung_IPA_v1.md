# Projektbeschreibung IPA

**Dokumentname:** Projektbeschreibung IPA
**Version:** 1.0
**Vertraulichkeitsstufe:** Intern

---

## Titel der Arbeit

**Neuentwicklung der openmedical-Webseite und funktionale Erweiterung**

---

## Ausgangslage

Die bestehende Webseite von openmedical ist technisch veraltet und nur eingeschränkt erweiterbar. Zentrale Anforderungen wie eine strukturierte Benutzerführung, dynamische Inhalte, klar definierte Zuständigkeiten sowie eine zeitgemässe technische Architektur sind unzureichend umgesetzt.

### Identifizierte Defizite

- Wartbarkeit
- Sicherheit
- Barrierefreiheit

Diese Defizite erschweren die nachhaltige Nutzung und Weiterentwicklung der Plattform.

### Projektauftrag

Aus dieser Situation ergibt sich der Auftrag, die Webseite von openmedical neu zu entwickeln und funktional zu erweitern.

**Ziel:** Aufbau einer modernen, benutzerfreundlichen und barrierefreien Webplattform, welche:
- Den fachlichen und technischen Anforderungen des Gesundheitswesens entspricht
- Eine tragfähige Grundlage für zukünftige Erweiterungen bildet

### Projektmethodik

| Referenz | Beschreibung |
|----------|--------------|
| **G04** | Technische Machbarkeit der geplanten Lösung sowie Einsatz geeigneter Technologien werden frühzeitig überprüft und bewertet |
| **A02, A03** | Relevante Informationen zur bestehenden Lösung sowie zu den fachlichen und technischen Anforderungen werden systematisch recherchiert, analysiert und strukturiert dokumentiert |
| **A13** | Bedürfnisse der relevanten Anspruchsgruppen werden erhoben und nachvollziehbar festgehalten |
| **G01, G02** | Fachliche und technische Anforderungen werden abgeleitet, abgestimmt und priorisiert als Grundlage für strukturierte Planung, Umsetzung und Qualitätssicherung |

---

## Detaillierte Aufgabenstellung

### Projektziel

Vollständige Neuentwicklung sowie funktionale Erweiterung der bestehenden Webseite von openmedical.

### Anforderungen an die neue Webplattform

- Technisch modern
- Benutzerfreundlich
- Barrierefrei
- Langfristig erweiterbar

### Projektstart

Zu Projektbeginn werden die fachlichen und technischen Anforderungen:
- Systematisch erhoben
- Dokumentiert
- Priorisiert

Dabei werden sowohl die Bedürfnisse der relevanten Anspruchsgruppen als auch die technischen Rahmenbedingungen berücksichtigt und nachvollziehbar festgehalten *(A01, A13, G01)*.

### Funktionale Module

Die Webplattform umfasst mehrere funktionale Module, die logisch miteinander verknüpft sind:

| Modul | Beschreibung |
|-------|--------------|
| **Anmeldeformular** | Für Praxen und Ärztinnen bzw. Ärzte |
| **Dashboard** | Für authentifizierte Benutzer zur Verwaltung ihrer Stammdaten |
| **Content-Management-System** | Ermöglicht Administratoren, Inhalte selbstständig zu pflegen |
| **Partnerübersicht** | Dynamische Seite mit Partnerinformationen |
| **Suchfunktion** | Interaktive Suche über Inhalte |
| **Newsletter-Funktion** | Anmeldung und Verwaltung von Newsletter-Abonnements |

### Technische Umsetzung

| Referenz | Beschreibung |
|----------|--------------|
| **C08** | Rollen- und Berechtigungskonzept wird definiert und technisch umgesetzt |
| **C02** | Benötigte Daten werden in einem relationalen Datenmodell abgebildet, vollständig dokumentiert |
| **G04, H01** | Technische Machbarkeit wird überprüft, eingesetzte Technologien sowie Abhängigkeiten werden analysiert, begründet und dokumentiert |

### Architektur

Die Umsetzung erfolgt gemäss einer klaren **Three-Tier-Architektur**:

```
┌─────────────────┐
│    Frontend     │  ← Präsentationsschicht (React)
└────────┬────────┘
         │
┌────────┴────────┐
│    Backend      │  ← Logikschicht (Node.js/Express)
└────────┬────────┘
         │
┌────────┴────────┐
│   Datenbank     │  ← Datenschicht (MySQL)
└─────────────────┘
```

---

## Mittel und Methoden

| Tool | Verwendungszweck |
|------|------------------|
| **Jira** | Strukturierte Projektplanung und Aufgabenverwaltung |
| **Bitbucket** | Versionsverwaltung des Quellcodes |
| **Microsoft Word** | Erstellung der Projektdokumentation |
| **Microsoft PowerPoint** | Aufbereitung von Präsentationsinhalten |

---

## Vorkenntnisse

### Webentwicklung

- Grundlegende theoretische Kenntnisse in HTML und CSS
- Strukturierter Aufbau einfacher Webseiten
- Grundlegende Gestaltungs- und Layoutprinzipien

### Relationale Datenbanken

- Verständnis von Tabellenstrukturen
- Primär- und Fremdschlüssel
- Einfache Abfragen
- Praktische Modellierung bisher nur in vereinfachten Übungsszenarien

### Testing

- Erfahrung im funktionalen Testen von Applikationen (openmedical)
- Ausführen vorgegebener Testszenarien
- Nachstellen gemeldeter Fehler
- *Noch keine Erfahrung in:* Konzeption umfassender Teststrategien oder automatisierter Tests

---

## Vorarbeiten

Vor Beginn der IPA werden konzeptionelle Vorüberlegungen im Bereich der Benutzerverwaltung durchgeführt:

- Auseinandersetzung mit möglichen Abläufen für Anmelde- und Registrierungsfunktion
- Grobe Skizzierung einer Benutzer- und Rollenstruktur

> **Hinweis:** Diese Vorüberlegungen dienen ausschliesslich der Orientierung und werden im Rahmen der IPA überprüft, konkretisiert und vollständig neu umgesetzt.

---

## Neue Lerninhalte

### Webapplikationsentwicklung

Entwicklung von Webapplikationen mit klarer Trennung von:
- Frontend
- Backend
- Datenhaltung

### React-Entwicklung

- Umsetzung einer Weboberfläche mit React
- Aufbau komponentenbasierter Benutzeroberflächen
- Umgang mit dynamischen Zuständen
- Benutzerinteraktionen

### API-Entwicklung

- Definition und Umsetzung von Schnittstellen zwischen Frontend und Backend
- Konzeption REST-basierter Endpunkte
- Definition von Datenstrukturen
- Implementierung von Validierungen
- Datenaustausch im JSON-Format

### Datenmodellierung

- Entwurf relationaler Datenmodelle für benötigte Anwendungsfälle
- Vollständige Dokumentation
- Physische Datenbank wird durch externen Provider bereitgestellt
- Verantwortung für Struktur, Beziehungen und fachliche Konsistenz liegt im Projekt

### Sicherheit & Testing

- Grundlegende Aspekte der Applikationssicherheit
- Strukturierte Tests zur Überprüfung der implementierten Funktionen
- Dokumentation der Tests

---

## Arbeiten in den letzten 6 Monaten

### Haupttätigkeit: Support

- Überwiegender Einsatz im Supportbereich
- Unterstützung von Kundinnen und Kunden bei:
  - Installation
  - Einrichtung
  - Anwendung der Software **mednet**
- Umfasste sowohl webbasierte Anwendung als auch mobile Applikation **mednet patient**

### Tätigkeitsschwerpunkte

- Direkter Kontakt mit Anwendern
- Analyse gemeldeter Probleme
- Strukturierte und lösungsorientierte Bearbeitung eingehender Supportanfragen

### Testing

Regelmässige Funktionstests der Web-Applikationen:
- mednet
- mednet patient (inklusive mobiler Version)

### Vorbereitung

- Vorbereitung der IPA
- Ausarbeitung der IDPA
- Weiterentwicklung von Kompetenzen in:
  - Analytischem Vorgehen
  - Planung
  - Strukturierte Dokumentation

---

## Referenzübersicht

| Code | Kompetenz/Ziel |
|------|----------------|
| **A01** | Anforderungserhebung |
| **A02** | Recherche bestehende Lösung |
| **A03** | Recherche fachliche/technische Anforderungen |
| **A13** | Stakeholder-Bedürfnisse |
| **C02** | Relationales Datenmodell |
| **C08** | Rollen- und Berechtigungskonzept |
| **G01** | Planung und Priorisierung |
| **G02** | Umsetzung und Qualitätssicherung |
| **G04** | Technische Machbarkeit |
| **H01** | Technologieanalyse und Dokumentation |

---

*Seite 3 von 3*
