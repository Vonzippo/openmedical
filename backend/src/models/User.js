import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';

// User Model - Datenbankoperationen
export const UserModel = {
  // Neuen Benutzer erstellen mit bcrypt Passwort-Hash
  async create(data) {
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(data.password, 10); // Salt Rounds: 10
    const now = new Date();

    await pool.execute(
      `INSERT INTO users (id, email, password_hash, role, practice_id, is_active, email_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.email,
        passwordHash,
        data.role || 'user',
        data.practiceId || null,
        true,
        false,
        now,
        now,
      ]
    );

    return {
      id,
      email: data.email,
      role: data.role || 'user',
      practiceId: data.practiceId || null,
      isActive: true,
      emailVerified: false,
      createdAt: now,
      lastLogin: null,
    };
  },

  // Benutzer nach E-Mail finden (für Login)
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      practiceId: row.practice_id,
      isActive: row.is_active,
      emailVerified: row.email_verified,
      createdAt: row.created_at,
      lastLogin: row.last_login,
    };
  },

  // Benutzer nach ID finden
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      email: row.email,
      role: row.role,
      practiceId: row.practice_id,
      isActive: row.is_active,
      emailVerified: row.email_verified,
      createdAt: row.created_at,
      lastLogin: row.last_login,
    };
  },

  // Passwort überprüfen
  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  // Letzten Login aktualisieren
  async updateLastLogin(id) {
    await pool.execute(
      'UPDATE users SET last_login = ? WHERE id = ?',
      [new Date(), id]
    );
  },

  // Benutzer mit Praxis-Daten laden
  async findByIdWithPractice(id) {
    const [rows] = await pool.execute(
      `SELECT u.*, p.praxisname, p.id as practice_id_full
       FROM users u
       LEFT JOIN practices p ON u.practice_id = p.id
       WHERE u.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      email: row.email,
      role: row.role,
      isActive: row.is_active,
      emailVerified: row.email_verified,
      createdAt: row.created_at,
      lastLogin: row.last_login,
      practice: row.practice_id ? {
        id: row.practice_id,
        praxisname: row.praxisname,
      } : null,
    };
  },
};
