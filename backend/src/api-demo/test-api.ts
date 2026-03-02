/**
 * ============================================
 * API TEST SKRIPT
 * ============================================
 *
 * Dieses Skript testet alle API-Endpunkte automatisch.
 * Starte zuerst den Server mit: npx tsx src/api-demo/server.ts
 * Dann in einem neuen Terminal: npx tsx src/api-demo/test-api.ts
 */

const BASE_URL = 'http://localhost:3002';

// Farben für die Konsole
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logRequest(method: string, endpoint: string) {
  log(`\n📤 ${method} ${endpoint}`, colors.cyan);
}

function logResponse(status: number, data: unknown) {
  const color = status >= 200 && status < 300 ? colors.green : colors.red;
  log(`📥 Status: ${status}`, color);
  console.log(JSON.stringify(data, null, 2));
}

async function testAPI() {
  log('\n========================================', colors.yellow);
  log('🧪 API TEST SUITE STARTET', colors.yellow);
  log('========================================', colors.yellow);

  try {
    // ============================================
    // TEST 1: API Info abrufen
    // ============================================
    logRequest('GET', '/api/info');
    let response = await fetch(`${BASE_URL}/api/info`);
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 2: Alle Produkte abrufen
    // ============================================
    logRequest('GET', '/api/produkte');
    response = await fetch(`${BASE_URL}/api/produkte`);
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 3: Einzelnes Produkt abrufen
    // ============================================
    logRequest('GET', '/api/produkte/1');
    response = await fetch(`${BASE_URL}/api/produkte/1`);
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 4: Nicht existierendes Produkt (404 Test)
    // ============================================
    logRequest('GET', '/api/produkte/999');
    response = await fetch(`${BASE_URL}/api/produkte/999`);
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 5: Neues Produkt erstellen (POST)
    // ============================================
    logRequest('POST', '/api/produkte');
    log('   Body: { name: "Webcam", preis: 79.99 }', colors.blue);
    response = await fetch(`${BASE_URL}/api/produkte`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Webcam', preis: 79.99 }),
    });
    const neuesProdukt = await response.json();
    logResponse(response.status, neuesProdukt);

    // ============================================
    // TEST 6: Produkt erstellen ohne Pflichtfelder (400 Test)
    // ============================================
    logRequest('POST', '/api/produkte');
    log('   Body: { name: "Nur Name" } (Preis fehlt!)', colors.blue);
    response = await fetch(`${BASE_URL}/api/produkte`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Nur Name' }),
    });
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 7: Produkt komplett aktualisieren (PUT)
    // ============================================
    const produktId = neuesProdukt.data?.id || 4;
    logRequest('PUT', `/api/produkte/${produktId}`);
    log('   Body: { name: "HD Webcam Pro", preis: 129.99 }', colors.blue);
    response = await fetch(`${BASE_URL}/api/produkte/${produktId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'HD Webcam Pro', preis: 129.99 }),
    });
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 8: Produkt teilweise aktualisieren (PATCH)
    // ============================================
    logRequest('PATCH', `/api/produkte/${produktId}`);
    log('   Body: { preis: 99.99 } (nur Preis ändern)', colors.blue);
    response = await fetch(`${BASE_URL}/api/produkte/${produktId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preis: 99.99 }),
    });
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 9: Produkt löschen (DELETE)
    // ============================================
    logRequest('DELETE', `/api/produkte/${produktId}`);
    response = await fetch(`${BASE_URL}/api/produkte/${produktId}`, {
      method: 'DELETE',
    });
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 10: Gelöschtes Produkt abrufen (404 Test)
    // ============================================
    logRequest('GET', `/api/produkte/${produktId}`);
    response = await fetch(`${BASE_URL}/api/produkte/${produktId}`);
    logResponse(response.status, await response.json());

    // ============================================
    // TEST 11: Finale Liste aller Produkte
    // ============================================
    logRequest('GET', '/api/produkte');
    response = await fetch(`${BASE_URL}/api/produkte`);
    logResponse(response.status, await response.json());

    // ============================================
    // ZUSAMMENFASSUNG
    // ============================================
    log('\n========================================', colors.green);
    log('✅ ALLE TESTS ABGESCHLOSSEN!', colors.green);
    log('========================================\n', colors.green);

  } catch (error) {
    log('\n❌ FEHLER:', colors.red);
    console.error(error);
    log('\nStelle sicher, dass der Server läuft:', colors.yellow);
    log('npx tsx src/api-demo/server.ts', colors.cyan);
  }
}

// Tests ausführen
testAPI();
