import pool from '../config/database.js';

// Datenbank-Tabellen initialisieren
export async function initializeDatabase() {
  const connection = await pool.getConnection();

  try {
    console.log('Initializing database tables...');

    // Practices Tabelle
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS practices (
        id CHAR(36) NOT NULL,
        praxisname VARCHAR(255) NOT NULL,
        strasse VARCHAR(255) NOT NULL,
        hausnummer VARCHAR(20) DEFAULT NULL,
        plz CHAR(4) NOT NULL,
        ort VARCHAR(255) NOT NULL,
        telefon VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        software VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uk_practices_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Contacts Tabelle
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id CHAR(36) NOT NULL,
        practice_id CHAR(36) NOT NULL,
        anrede ENUM('herr', 'frau', 'divers') NOT NULL,
        vorname VARCHAR(100) NOT NULL,
        nachname VARCHAR(100) NOT NULL,
        funktion VARCHAR(100) DEFAULT NULL,
        email VARCHAR(255) NOT NULL,
        telefon VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_contacts_practice (practice_id),
        CONSTRAINT fk_contacts_practice
          FOREIGN KEY (practice_id)
          REFERENCES practices (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Users Tabelle
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id CHAR(36) NOT NULL,
        practice_id CHAR(36) DEFAULT NULL,
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user', 'practice') NOT NULL DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL DEFAULT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uk_users_email (email),
        INDEX idx_users_practice (practice_id),
        CONSTRAINT fk_users_practice
          FOREIGN KEY (practice_id)
          REFERENCES practices (id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    connection.release();
  }
}
