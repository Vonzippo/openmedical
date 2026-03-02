import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';

// Practice Model - Datenbankoperationen
export const PracticeModel = {
  // Neue Praxis erstellen mit UUID
  async create(data) {
    const id = uuidv4(); // Eindeutige UUID generieren
    const now = new Date();

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Praxis in practices Tabelle einfügen
      await connection.execute(
        `INSERT INTO practices (id, praxisname, strasse, hausnummer, plz, ort, telefon, email, software, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          data.praxisname,
          data.strasse,
          data.hausnummer || null,
          data.plz,
          data.ort,
          data.telefon,
          data.email,
          data.software || null,
          now,
          now,
        ]
      );

      // Kontaktperson in contacts Tabelle einfügen (Fremdschlüssel: practice_id)
      const contactId = uuidv4();
      await connection.execute(
        `INSERT INTO contacts (id, practice_id, anrede, vorname, nachname, funktion, email, telefon, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          contactId,
          id, // Fremdschlüssel zur Praxis
          data.contact.anrede,
          data.contact.vorname,
          data.contact.nachname,
          data.contact.funktion || null,
          data.contact.kontaktEmail,
          data.contact.kontaktTelefon || null,
          now,
        ]
      );

      await connection.commit();

      return {
        id,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Praxis nach ID suchen
  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, c.anrede, c.vorname, c.nachname, c.funktion, c.email as kontaktEmail, c.telefon as kontaktTelefon
       FROM practices p
       LEFT JOIN contacts c ON p.id = c.practice_id
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      praxisname: row.praxisname,
      strasse: row.strasse,
      hausnummer: row.hausnummer,
      plz: row.plz,
      ort: row.ort,
      telefon: row.telefon,
      email: row.email,
      software: row.software,
      contact: {
        anrede: row.anrede,
        vorname: row.vorname,
        nachname: row.nachname,
        funktion: row.funktion,
        kontaktEmail: row.kontaktEmail,
        kontaktTelefon: row.kontaktTelefon,
      },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  },

  // Praxis nach E-Mail suchen (für Duplikatprüfung)
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM practices WHERE email = ?',
      [email]
    );

    if (rows.length === 0) return null;
    return rows[0];
  },

  // Alle Praxen abrufen
  async findAll() {
    const [rows] = await pool.execute(
      `SELECT p.*, c.anrede, c.vorname, c.nachname, c.funktion, c.email as kontaktEmail, c.telefon as kontaktTelefon
       FROM practices p
       LEFT JOIN contacts c ON p.id = c.practice_id
       ORDER BY p.created_at DESC`
    );

    return rows.map((row) => ({
      id: row.id,
      praxisname: row.praxisname,
      strasse: row.strasse,
      hausnummer: row.hausnummer,
      plz: row.plz,
      ort: row.ort,
      telefon: row.telefon,
      email: row.email,
      software: row.software,
      contact: {
        anrede: row.anrede,
        vorname: row.vorname,
        nachname: row.nachname,
        funktion: row.funktion,
        kontaktEmail: row.kontaktEmail,
        kontaktTelefon: row.kontaktTelefon,
      },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  },
};
