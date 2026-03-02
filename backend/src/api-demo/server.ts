/**
 * ============================================
 * API DEMO SERVER - Lernprogramm
 * ============================================
 *
 * Dieses Programm demonstriert, wie eine REST-API funktioniert.
 * Es zeigt die grundlegenden HTTP-Methoden: GET, POST, PUT, DELETE
 */

import express, { Request, Response } from 'express';
import cors from 'cors';

// Express-App erstellen
const app = express();
const PORT = 3002;

// ============================================
// MIDDLEWARE
// ============================================
// Middleware sind Funktionen, die vor den Route-Handlern ausgeführt werden

// JSON-Body-Parser: Erlaubt das Lesen von JSON-Daten im Request-Body
app.use(express.json());

// CORS: Erlaubt Anfragen von anderen Domains (z.B. Frontend auf Port 3000)
app.use(cors());

// Logging-Middleware: Zeigt alle eingehenden Anfragen
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next(); // Wichtig: next() ruft die nächste Middleware/Route auf
});

// ============================================
// DATENBANK-SIMULATION
// ============================================
// In einer echten App würde hier eine Datenbank wie MySQL, PostgreSQL etc. verwendet

interface Produkt {
  id: number;
  name: string;
  preis: number;
  erstelltAm: Date;
}

// Simpler In-Memory-Speicher (wird bei Neustart zurückgesetzt)
let produkte: Produkt[] = [
  { id: 1, name: 'Tastatur', preis: 49.99, erstelltAm: new Date() },
  { id: 2, name: 'Maus', preis: 29.99, erstelltAm: new Date() },
  { id: 3, name: 'Monitor', preis: 299.99, erstelltAm: new Date() },
];

let nextId = 4; // Auto-Increment für neue Produkte

// ============================================
// API ENDPUNKTE (Routes)
// ============================================

/**
 * GET /api/produkte
 * Alle Produkte abrufen
 *
 * Antwort: Array aller Produkte
 */
app.get('/api/produkte', (req: Request, res: Response) => {
  console.log('📦 Alle Produkte werden abgerufen...');

  // Status 200 = OK
  res.status(200).json({
    success: true,
    anzahl: produkte.length,
    data: produkte
  });
});

/**
 * GET /api/produkte/:id
 * Ein einzelnes Produkt abrufen
 *
 * :id ist ein URL-Parameter (z.B. /api/produkte/1)
 */
app.get('/api/produkte/:id', (req: Request, res: Response) => {
  // Parameter aus der URL lesen und in Zahl umwandeln
  const id = parseInt(req.params.id);

  // Produkt suchen
  const produkt = produkte.find(p => p.id === id);

  if (!produkt) {
    // Status 404 = Not Found
    return res.status(404).json({
      success: false,
      error: `Produkt mit ID ${id} nicht gefunden`
    });
  }

  console.log(`📦 Produkt ${id} gefunden: ${produkt.name}`);

  res.status(200).json({
    success: true,
    data: produkt
  });
});

/**
 * POST /api/produkte
 * Neues Produkt erstellen
 *
 * Erwartet JSON-Body mit: { name: string, preis: number }
 */
app.post('/api/produkte', (req: Request, res: Response) => {
  // Daten aus dem Request-Body lesen
  const { name, preis } = req.body;

  // Validierung: Prüfen ob alle Pflichtfelder vorhanden sind
  if (!name || preis === undefined) {
    // Status 400 = Bad Request
    return res.status(400).json({
      success: false,
      error: 'Name und Preis sind Pflichtfelder',
      beispiel: { name: 'Laptop', preis: 999.99 }
    });
  }

  // Neues Produkt erstellen
  const neuesProdukt: Produkt = {
    id: nextId++,
    name: name,
    preis: parseFloat(preis),
    erstelltAm: new Date()
  };

  // Zum Array hinzufügen (in echtem Projekt: Datenbank INSERT)
  produkte.push(neuesProdukt);

  console.log(`✅ Neues Produkt erstellt: ${neuesProdukt.name} (ID: ${neuesProdukt.id})`);

  // Status 201 = Created
  res.status(201).json({
    success: true,
    message: 'Produkt erfolgreich erstellt',
    data: neuesProdukt
  });
});

/**
 * PUT /api/produkte/:id
 * Produkt komplett aktualisieren
 *
 * Erwartet JSON-Body mit allen Feldern
 */
app.put('/api/produkte/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, preis } = req.body;

  // Index des Produkts finden
  const index = produkte.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Produkt mit ID ${id} nicht gefunden`
    });
  }

  // Validierung
  if (!name || preis === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Name und Preis sind Pflichtfelder für PUT'
    });
  }

  // Produkt aktualisieren
  produkte[index] = {
    ...produkte[index], // Behalte id und erstelltAm
    name: name,
    preis: parseFloat(preis)
  };

  console.log(`📝 Produkt ${id} aktualisiert: ${name}`);

  res.status(200).json({
    success: true,
    message: 'Produkt erfolgreich aktualisiert',
    data: produkte[index]
  });
});

/**
 * PATCH /api/produkte/:id
 * Produkt teilweise aktualisieren
 *
 * Nur die übergebenen Felder werden geändert
 */
app.patch('/api/produkte/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  const index = produkte.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Produkt mit ID ${id} nicht gefunden`
    });
  }

  // Nur übergebene Felder aktualisieren
  if (updates.name) produkte[index].name = updates.name;
  if (updates.preis) produkte[index].preis = parseFloat(updates.preis);

  console.log(`📝 Produkt ${id} teilweise aktualisiert`);

  res.status(200).json({
    success: true,
    message: 'Produkt erfolgreich aktualisiert',
    data: produkte[index]
  });
});

/**
 * DELETE /api/produkte/:id
 * Produkt löschen
 */
app.delete('/api/produkte/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const index = produkte.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Produkt mit ID ${id} nicht gefunden`
    });
  }

  // Produkt entfernen
  const geloeschtesProdukt = produkte.splice(index, 1)[0];

  console.log(`🗑️ Produkt ${id} gelöscht: ${geloeschtesProdukt.name}`);

  // Status 200 mit Bestätigung (alternativ: 204 No Content)
  res.status(200).json({
    success: true,
    message: `Produkt "${geloeschtesProdukt.name}" erfolgreich gelöscht`,
    data: geloeschtesProdukt
  });
});

// ============================================
// ZUSÄTZLICHE DEMO-ENDPUNKTE
// ============================================

/**
 * GET /api/info
 * API-Informationen anzeigen
 */
app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    name: 'API Demo Server',
    version: '1.0.0',
    beschreibung: 'Ein Lernprogramm für REST-APIs',
    endpunkte: [
      { methode: 'GET', pfad: '/api/produkte', beschreibung: 'Alle Produkte abrufen' },
      { methode: 'GET', pfad: '/api/produkte/:id', beschreibung: 'Ein Produkt abrufen' },
      { methode: 'POST', pfad: '/api/produkte', beschreibung: 'Neues Produkt erstellen' },
      { methode: 'PUT', pfad: '/api/produkte/:id', beschreibung: 'Produkt komplett aktualisieren' },
      { methode: 'PATCH', pfad: '/api/produkte/:id', beschreibung: 'Produkt teilweise aktualisieren' },
      { methode: 'DELETE', pfad: '/api/produkte/:id', beschreibung: 'Produkt löschen' },
    ]
  });
});

/**
 * Fehlerbehandlung für nicht existierende Routen
 */
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpunkt nicht gefunden',
    tipp: 'Besuche /api/info für eine Liste aller verfügbaren Endpunkte'
  });
});

// ============================================
// SERVER STARTEN
// ============================================
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🚀 API DEMO SERVER GESTARTET');
  console.log('========================================');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 Info: http://localhost:${PORT}/api/info`);
  console.log(`📦 Produkte: http://localhost:${PORT}/api/produkte`);
  console.log('========================================\n');
});
