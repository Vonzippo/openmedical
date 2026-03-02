/**
 * ============================================
 * AUTH API SERVER - Login Demo (UNVERSCHLÜSSELT)
 * ============================================
 *
 * ACHTUNG: Dieses Beispiel zeigt Passwörter UNVERSCHLÜSSELT
 * zu Lernzwecken. In der Praxis IMMER verschlüsseln (bcrypt)!
 *
 * Dieses Programm demonstriert:
 * - Login/Logout mit REST API
 * - Token-basierte Authentifizierung
 * - Geschützte Routen (Protected Routes)
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const PORT = 3003;

// ============================================
// LOGFILE SETUP
// ============================================
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'auth.log');

// Log-Verzeichnis erstellen falls nicht vorhanden
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Log-Funktion: Schreibt in Datei UND Konsole
function writeLog(level: 'INFO' | 'WARN' | 'ERROR' | 'LOGIN' | 'LOGOUT' | 'REGISTER', message: string, details?: object) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(details && { details })
  };

  // Als JSON-Zeile in Datei schreiben
  const logLine = JSON.stringify(logEntry) + '\n';
  fs.appendFileSync(LOG_FILE, logLine);

  // Auch in Konsole ausgeben (formatiert)
  const consoleMessage = `[${timestamp}] [${level}] ${message}`;
  if (details) {
    console.log(consoleMessage, details);
  } else {
    console.log(consoleMessage);
  }
}

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use(cors());

// Logging: Zeigt alle Anfragen
app.use((req, res, next) => {
  console.log(`\n[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('   Body:', JSON.stringify(req.body));
  }
  if (req.headers.authorization) {
    console.log('   Auth-Header:', req.headers.authorization);
  }
  next();
});

// ============================================
// DATENBANK SIMULATION
// ============================================

// Benutzer-Datenbank (In echt: MySQL, PostgreSQL, etc.)
// ACHTUNG: Passwörter hier UNVERSCHLÜSSELT nur für Demo!
interface User {
  id: number;
  username: string;
  password: string; // In Produktion: NIEMALS Klartext!
  email: string;
  role: 'admin' | 'user';
}

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', email: 'admin@test.ch', role: 'admin' },
  { id: 2, username: 'benutzer', password: 'pass123', email: 'user@test.ch', role: 'user' },
  { id: 3, username: 'max', password: 'max2024', email: 'max@test.ch', role: 'user' },
];

// Token-Speicher (In echt: JWT oder Redis)
interface Session {
  token: string;
  userId: number;
  createdAt: Date;
  expiresAt: Date;
}

const sessions: Session[] = [];

// ============================================
// HILFSFUNKTIONEN
// ============================================

// Einfachen Token generieren (In Produktion: JWT verwenden!)
function generateToken(): string {
  return 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Session nach Token finden
function findSession(token: string): Session | undefined {
  return sessions.find(s => s.token === token && s.expiresAt > new Date());
}

// Benutzer nach ID finden
function findUserById(id: number): User | undefined {
  return users.find(u => u.id === id);
}

// ============================================
// AUTH MIDDLEWARE
// ============================================

// Diese Middleware prüft, ob der Benutzer eingeloggt ist
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Token aus Header lesen: "Authorization: Bearer token_abc123"
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Kein Authorization-Header vorhanden',
      hinweis: 'Sende Header: Authorization: Bearer <dein-token>'
    });
  }

  // "Bearer token_abc123" -> "token_abc123"
  const token = authHeader.replace('Bearer ', '');

  // Session suchen
  const session = findSession(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Ungültiger oder abgelaufener Token',
      hinweis: 'Bitte neu einloggen unter POST /api/auth/login'
    });
  }

  // Benutzer zur Request hinzufügen (für spätere Verwendung)
  (req as any).user = findUserById(session.userId);
  (req as any).session = session;

  console.log(`   ✅ Authentifiziert als: ${(req as any).user.username}`);

  next();
}

// Admin-Only Middleware
function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Zugriff verweigert',
      hinweis: 'Diese Route ist nur für Administratoren'
    });
  }

  next();
}

// ============================================
// ÖFFENTLICHE ROUTEN (Kein Login nötig)
// ============================================

/**
 * GET /api/auth/info
 * API-Informationen
 */
app.get('/api/auth/info', (req: Request, res: Response) => {
  res.json({
    name: 'Auth Demo API',
    version: '1.0.0',
    beschreibung: 'Login-System Demo für IPA',
    warnung: '⚠️ Passwörter sind UNVERSCHLÜSSELT - nur für Lernzwecke!',
    endpunkte: {
      oeffentlich: [
        { methode: 'POST', pfad: '/api/auth/login', beschreibung: 'Einloggen' },
        { methode: 'POST', pfad: '/api/auth/register', beschreibung: 'Registrieren' },
      ],
      geschuetzt: [
        { methode: 'GET', pfad: '/api/auth/me', beschreibung: 'Eigenes Profil (Login nötig)' },
        { methode: 'POST', pfad: '/api/auth/logout', beschreibung: 'Ausloggen (Login nötig)' },
        { methode: 'GET', pfad: '/api/users', beschreibung: 'Alle Benutzer (Admin only)' },
      ]
    },
    testbenutzer: [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'benutzer', password: 'pass123', role: 'user' },
    ]
  });
});

/**
 * POST /api/auth/register
 * Neuen Benutzer registrieren
 */
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  // Validierung
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      error: 'Fehlende Pflichtfelder',
      erforderlich: ['username', 'password', 'email']
    });
  }

  // Prüfen ob Benutzername bereits existiert
  if (users.find(u => u.username === username)) {
    return res.status(409).json({
      success: false,
      error: 'Benutzername bereits vergeben'
    });
  }

  // Neuen Benutzer erstellen
  const newUser: User = {
    id: users.length + 1,
    username,
    password, // ⚠️ UNVERSCHLÜSSELT - nur für Demo!
    email,
    role: 'user'
  };

  users.push(newUser);

  console.log(`   ✅ Neuer Benutzer registriert: ${username}`);
  writeLog('REGISTER', `Neuer Benutzer registriert: ${username}`, { userId: newUser.id, email });

  res.status(201).json({
    success: true,
    message: 'Registrierung erfolgreich',
    data: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
      // Passwort wird NICHT zurückgegeben!
    }
  });
});

/**
 * POST /api/auth/login
 * Benutzer einloggen
 */
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log(`   🔐 Login-Versuch für: ${username}`);
  writeLog('INFO', `Login-Versuch für: ${username}`, { ip: req.ip || 'unknown' });

  // Validierung
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: 'Username und Passwort erforderlich'
    });
  }

  // Benutzer suchen
  const user = users.find(u => u.username === username);

  if (!user) {
    console.log(`   ❌ Benutzer nicht gefunden: ${username}`);
    writeLog('WARN', `Login fehlgeschlagen - Benutzer nicht gefunden: ${username}`, { ip: req.ip || 'unknown' });
    return res.status(401).json({
      success: false,
      error: 'Ungültige Anmeldedaten'
      // Aus Sicherheitsgründen nicht verraten, ob User existiert
    });
  }

  // Passwort prüfen (UNVERSCHLÜSSELT - nur für Demo!)
  // In Produktion: bcrypt.compare(password, user.hashedPassword)
  if (user.password !== password) {
    console.log(`   ❌ Falsches Passwort für: ${username}`);
    writeLog('WARN', `Login fehlgeschlagen - Falsches Passwort: ${username}`, { userId: user.id, ip: req.ip || 'unknown' });
    return res.status(401).json({
      success: false,
      error: 'Ungültige Anmeldedaten'
    });
  }

  // Token generieren
  const token = generateToken();

  // Session erstellen (gültig für 1 Stunde)
  const session: Session = {
    token,
    userId: user.id,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // +1 Stunde
  };

  sessions.push(session);

  console.log(`   ✅ Login erfolgreich: ${username}`);
  console.log(`   🎫 Token erstellt: ${token}`);
  writeLog('LOGIN', `Login erfolgreich: ${username}`, { userId: user.id, role: user.role, token, ip: req.ip || 'unknown' });

  res.status(200).json({
    success: true,
    message: 'Login erfolgreich',
    data: {
      token: token, // Diesen Token für weitere Requests verwenden!
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      expiresAt: session.expiresAt
    }
  });
});

// ============================================
// GESCHÜTZTE ROUTEN (Login erforderlich)
// ============================================

/**
 * GET /api/auth/me
 * Eigenes Profil abrufen
 */
app.get('/api/auth/me', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;

  res.json({
    success: true,
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * POST /api/auth/logout
 * Ausloggen (Session löschen)
 */
app.post('/api/auth/logout', authMiddleware, (req: Request, res: Response) => {
  const session = (req as any).session;
  const user = (req as any).user;

  // Session aus Array entfernen
  const index = sessions.findIndex(s => s.token === session.token);
  if (index > -1) {
    sessions.splice(index, 1);
  }

  console.log(`   👋 Benutzer ausgeloggt: ${user.username}`);
  writeLog('LOGOUT', `Benutzer ausgeloggt: ${user.username}`, { userId: user.id });

  res.json({
    success: true,
    message: 'Erfolgreich ausgeloggt'
  });
});

/**
 * PUT /api/auth/me
 * Eigenes Profil aktualisieren
 */
app.put('/api/auth/me', authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { email, password } = req.body;

  // Benutzer im Array finden und aktualisieren
  const userIndex = users.findIndex(u => u.id === user.id);

  if (email) {
    users[userIndex].email = email;
  }

  if (password) {
    users[userIndex].password = password; // ⚠️ Unverschlüsselt!
    console.log(`   🔑 Passwort geändert für: ${user.username}`);
  }

  res.json({
    success: true,
    message: 'Profil aktualisiert',
    data: {
      id: users[userIndex].id,
      username: users[userIndex].username,
      email: users[userIndex].email,
      role: users[userIndex].role
    }
  });
});

// ============================================
// ADMIN ROUTEN (Nur für Admins)
// ============================================

/**
 * GET /api/users
 * Alle Benutzer auflisten (nur Admin)
 */
app.get('/api/users', authMiddleware, adminMiddleware, (req: Request, res: Response) => {
  // Passwörter NICHT mitsenden!
  const safeUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role
  }));

  res.json({
    success: true,
    anzahl: safeUsers.length,
    data: safeUsers
  });
});

/**
 * DELETE /api/users/:id
 * Benutzer löschen (nur Admin)
 */
app.delete('/api/users/:id', authMiddleware, adminMiddleware, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const currentUser = (req as any).user;

  // Sich selbst nicht löschen
  if (id === currentUser.id) {
    return res.status(400).json({
      success: false,
      error: 'Du kannst dich nicht selbst löschen'
    });
  }

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Benutzer nicht gefunden'
    });
  }

  const deletedUser = users.splice(index, 1)[0];

  // Sessions des gelöschten Benutzers auch löschen
  const sessionIndex = sessions.findIndex(s => s.userId === id);
  if (sessionIndex > -1) {
    sessions.splice(sessionIndex, 1);
  }

  console.log(`   🗑️ Benutzer gelöscht: ${deletedUser.username}`);

  res.json({
    success: true,
    message: `Benutzer "${deletedUser.username}" gelöscht`
  });
});

// ============================================
// FEHLERBEHANDLUNG
// ============================================

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpunkt nicht gefunden',
    tipp: 'Besuche GET /api/auth/info für alle Endpunkte'
  });
});

// ============================================
// SERVER STARTEN
// ============================================

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🔐 AUTH DEMO SERVER GESTARTET');
  console.log('========================================');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 Info: http://localhost:${PORT}/api/auth/info`);
  console.log('========================================');
  console.log('\n⚠️  WARNUNG: Passwörter UNVERSCHLÜSSELT!');
  console.log('    Nur für Lernzwecke verwenden!\n');
  console.log('Test-Accounts:');
  console.log('  - admin / admin123 (Administrator)');
  console.log('  - benutzer / pass123 (Normaler User)');
  console.log('========================================');
  console.log(`\n📁 Logfile: ${LOG_FILE}`);
  console.log('========================================\n');
  writeLog('INFO', 'Server gestartet', { port: PORT });
});
