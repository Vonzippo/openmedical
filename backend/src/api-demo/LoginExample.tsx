/**
 * ============================================
 * REACT LOGIN BEISPIEL
 * ============================================
 *
 * Dieses Beispiel zeigt, wie man einen Login-API-Call
 * von einem React-Frontend aus macht.
 */

import React, { useState } from 'react';

// ============================================
// TYPEN
// ============================================
interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    token: string;
    user: User;
    expiresAt: string;
  };
}

// ============================================
// LOGIN KOMPONENTE
// ============================================
export function LoginExample() {
  // State für Formular
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State für Ergebnis
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ============================================
  // LOGIN FUNKTION - Der API Call
  // ============================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Verhindert Seiten-Reload

    setLoading(true);
    setError(null);

    try {
      // ========================================
      // DER FETCH CALL (entspricht dem curl-Befehl)
      // ========================================
      const response = await fetch('http://localhost:3003/api/auth/login', {
        method: 'POST',                              // -X POST
        headers: {
          'Content-Type': 'application/json',        // -H "Content-Type: application/json"
        },
        body: JSON.stringify({                       // -d '{"username": "...", "password": "..."}'
          username: username,
          password: password,
        }),
      });

      // Response als JSON parsen
      const data: LoginResponse = await response.json();

      // Prüfen ob Login erfolgreich
      if (data.success && data.data) {
        // Erfolg! Token und User speichern
        setToken(data.data.token);
        setUser(data.data.user);

        // Token im localStorage speichern (für spätere Requests)
        localStorage.setItem('authToken', data.data.token);

        console.log('Login erfolgreich!', data);
      } else {
        // Fehler vom Server
        setError(data.error || 'Login fehlgeschlagen');
      }
    } catch (err) {
      // Netzwerk-Fehler
      setError('Verbindung zum Server fehlgeschlagen');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // GESCHÜTZTE ROUTE AUFRUFEN (mit Token)
  // ============================================
  const fetchProfile = async () => {
    if (!token) {
      setError('Kein Token vorhanden - bitte zuerst einloggen');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/api/auth/me', {
        method: 'GET',
        headers: {
          // Token im Authorization-Header senden
          'Authorization': `Bearer ${token}`,        // -H "Authorization: Bearer token_xxx"
        },
      });

      const data = await response.json();
      console.log('Profil-Daten:', data);
      alert(`Profil: ${JSON.stringify(data, null, 2)}`);
    } catch (err) {
      console.error('Fehler beim Profil abrufen:', err);
    }
  };

  // ============================================
  // LOGOUT FUNKTION
  // ============================================
  const handleLogout = async () => {
    if (!token) return;

    try {
      await fetch('http://localhost:3003/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // State zurücksetzen
      setToken(null);
      setUser(null);
      localStorage.removeItem('authToken');

      console.log('Logout erfolgreich');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login Demo</h1>

      {/* Wenn eingeloggt: User-Info anzeigen */}
      {user ? (
        <div>
          <h2>Willkommen, {user.username}!</h2>
          <p>Email: {user.email}</p>
          <p>Rolle: {user.role}</p>
          <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>
            Token: {token}
          </p>

          <button onClick={fetchProfile} style={{ marginRight: '10px' }}>
            Profil abrufen
          </button>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        /* Login-Formular */
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin oder benutzer"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>
              Passwort:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123 oder pass123"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
          </div>

          {/* Fehler anzeigen */}
          {error && (
            <p style={{ color: 'red' }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
            {loading ? 'Lädt...' : 'Einloggen'}
          </button>

          {/* Test-Accounts */}
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            <p><strong>Test-Accounts:</strong></p>
            <p>Admin: admin / admin123</p>
            <p>User: benutzer / pass123</p>
          </div>
        </form>
      )}
    </div>
  );
}

// ============================================
// VERGLEICH: CURL vs FETCH
// ============================================
/*

CURL:
-----
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'


FETCH (JavaScript/React):
-------------------------
const response = await fetch('http://localhost:3003/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123',
  }),
});
const data = await response.json();


MIT TOKEN (geschützte Route):
-----------------------------
CURL:
curl http://localhost:3003/api/auth/me \
  -H "Authorization: Bearer token_abc123"

FETCH:
const response = await fetch('http://localhost:3003/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

*/

export default LoginExample;
