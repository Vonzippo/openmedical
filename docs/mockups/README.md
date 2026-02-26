# Low-Fidelity Mockups

**Version:** 1.0
**Datum:** 26.02.2026
**Technologie:** React + Material UI

---

## Übersicht

Die Low-Fidelity Mockups wurden direkt mit React und Material UI erstellt, um eine schnelle Iteration und spätere Weiterentwicklung zu ermöglichen.

### Design-Prinzipien

- **Graustufen-Farbpalette** für Wireframe-Look
- **Gestrichelte Rahmen** für Platzhalter-Elemente
- **[PLACEHOLDER]** Texte für zu ersetzende Inhalte
- **Responsive Layout** mit Material UI Grid

---

## Seiten

### 1. Home (Landing Page)
**Pfad:** `/`
**Datei:** `frontend/src/pages/Home.tsx`

**Sektionen:**
- Hero-Bereich mit Slogan "EINFACH, EFFIZIENT UND SICHER"
- Features-Grid (3 Spalten)
- Über uns Preview
- Call-to-Action

---

### 2. Über uns
**Pfad:** `/ueber-uns`
**Datei:** `frontend/src/pages/UeberUns.tsx`

**Sektionen:**
- Firmeninformationen mit Bild
- Team-Übersicht (4 Personen)
- Unternehmenswerte (Sicherheit, Innovation, Qualität, Kundennähe)

---

### 3. Produkte
**Pfad:** `/produkte`
**Datei:** `frontend/src/pages/Produkte.tsx`

**Sektionen:**
- mednet Hauptprodukt mit Features
- mednet patient Mobile App
- Sicherheits-Features (Verschlüsselung, HTTPS, Penetrationstests, Swiss Hosting)

---

### 4. Partner
**Pfad:** `/partner`
**Datei:** `frontend/src/pages/Partner.tsx`

**Sektionen:**
- Suchfeld und Kategorie-Filter (AIS/PIS, LIS, KIS)
- Partner-Grid mit Logos
- Partner werden CTA

---

### 5. Jobs
**Pfad:** `/jobs`
**Datei:** `frontend/src/pages/Jobs.tsx`

**Sektionen:**
- Stellenangebote als Akkordeon
- Aufgaben, Anforderungen, Benefits pro Stelle
- Spontanbewerbung CTA

---

### 6. Kontakt
**Pfad:** `/kontakt`
**Datei:** `frontend/src/pages/Kontakt.tsx`

**Sektionen:**
- Kontaktformular (Vorname, Nachname, E-Mail, Telefon, Betreff, Nachricht)
- Kontaktdaten (Adresse, Telefon, E-Mail, Öffnungszeiten)
- Google Maps Platzhalter
- TeamViewer Support

---

### 7. Anmeldung (Praxis-Registrierung)
**Pfad:** `/anmeldung`
**Datei:** `frontend/src/pages/Anmeldung.tsx`

**Sektionen:**
- Stepper (Praxisdaten → Kontaktperson → Bestätigung)
- Formularfelder: Praxisname, Adresse, PLZ, Ort, Telefon, E-Mail
- Praxissoftware-Auswahl

---

### 8. Dashboard (Authentifizierter Bereich)
**Pfad:** `/dashboard`
**Datei:** `frontend/src/pages/Dashboard.tsx`

**Sektionen:**
- Sidebar-Navigation (Profil, Einstellungen, Dokumente, Benachrichtigungen)
- Statistik-Karten (Verbindungen, Dokumente, Nachrichten)
- Praxisprofil mit Logo-Upload
- Systemstatus mit Fortschrittsanzeige

---

## Layout-Komponenten

### Header
**Datei:** `frontend/src/components/Layout.tsx`

- Logo-Platzhalter
- Navigation (Home, Über uns, Produkte, Partner, Jobs, Kontakt)
- Sprachauswahl (DE, FR, IT, EN)

### Footer
- Copyright
- Adresse, Telefon, E-Mail Platzhalter

---

## Theme-Konfiguration

**Datei:** `frontend/src/theme.ts`

```typescript
palette: {
  primary: { main: '#666666' },
  secondary: { main: '#888888' },
  background: { default: '#f5f5f5', paper: '#ffffff' },
  text: { primary: '#333333', secondary: '#666666' }
}
```

**Card-Styling:** `border: '2px dashed #ccc'` für Wireframe-Look

---

## Starten der Mockups

```bash
cd /Users/patrick/Desktop/openmedical
npm install
npm run dev
```

Öffne http://localhost:5173 im Browser.

---

## Nächste Schritte

1. [ ] Feedback zu Mockups einholen
2. [ ] High-Fidelity Design mit echten Farben/Logos
3. [ ] Responsive Breakpoints testen
4. [ ] Barrierefreiheit prüfen (WCAG 2.1 AA)
