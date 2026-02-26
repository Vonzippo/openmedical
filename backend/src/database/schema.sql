-- openmedical Datenbankschema
-- MySQL 8.0+
-- Relationales Datenmodell mit Primär- und Fremdschlüsseln

-- Datenbank erstellen (falls nicht vorhanden)
CREATE DATABASE IF NOT EXISTS openmedical
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE openmedical;

-- =====================================================
-- Tabelle: practices (Praxen)
-- Jede Praxis wird als Datensatz mit eindeutiger UUID erfasst
-- =====================================================
CREATE TABLE IF NOT EXISTS practices (
  -- Primärschlüssel: UUID (36 Zeichen)
  id CHAR(36) NOT NULL,

  -- Praxisinformationen
  praxisname VARCHAR(255) NOT NULL,
  strasse VARCHAR(255) NOT NULL,
  hausnummer VARCHAR(20) DEFAULT NULL,
  plz CHAR(4) NOT NULL,
  ort VARCHAR(255) NOT NULL,

  -- Kontaktdaten
  telefon VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,

  -- Praxissoftware
  software VARCHAR(100) DEFAULT NULL,

  -- Zeitstempel
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Constraints
  PRIMARY KEY (id),
  UNIQUE KEY uk_practices_email (email),
  INDEX idx_practices_plz (plz),
  INDEX idx_practices_ort (ort),
  INDEX idx_practices_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Tabelle: contacts (Kontaktpersonen)
-- Beziehung zu practices über Fremdschlüssel (practice_id)
-- =====================================================
CREATE TABLE IF NOT EXISTS contacts (
  -- Primärschlüssel: UUID
  id CHAR(36) NOT NULL,

  -- Fremdschlüssel: Verknüpfung zur Praxis
  practice_id CHAR(36) NOT NULL,

  -- Personendaten
  anrede ENUM('herr', 'frau', 'divers') NOT NULL,
  vorname VARCHAR(100) NOT NULL,
  nachname VARCHAR(100) NOT NULL,
  funktion VARCHAR(100) DEFAULT NULL,

  -- Kontaktdaten
  email VARCHAR(255) NOT NULL,
  telefon VARCHAR(50) DEFAULT NULL,

  -- Zeitstempel
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Constraints
  PRIMARY KEY (id),
  INDEX idx_contacts_practice (practice_id),
  INDEX idx_contacts_email (email),

  -- Fremdschlüssel: Beziehung zu practices
  CONSTRAINT fk_contacts_practice
    FOREIGN KEY (practice_id)
    REFERENCES practices (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Tabelle: users (Benutzer) - Für spätere Authentifizierung
-- Beziehung zu practices über Fremdschlüssel
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  -- Primärschlüssel: UUID
  id CHAR(36) NOT NULL,

  -- Fremdschlüssel: Optionale Verknüpfung zur Praxis
  practice_id CHAR(36) DEFAULT NULL,

  -- Benutzerdaten
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt Hash

  -- Rolle (Rollen- und Berechtigungskonzept)
  role ENUM('admin', 'user', 'practice') NOT NULL DEFAULT 'user',

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,

  -- Zeitstempel
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL DEFAULT NULL,

  -- Constraints
  PRIMARY KEY (id),
  UNIQUE KEY uk_users_email (email),
  INDEX idx_users_role (role),
  INDEX idx_users_practice (practice_id),

  -- Fremdschlüssel
  CONSTRAINT fk_users_practice
    FOREIGN KEY (practice_id)
    REFERENCES practices (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Übersicht der Beziehungen:
-- =====================================================
-- practices (1) <---> (n) contacts
-- practices (1) <---> (n) users
-- =====================================================
