import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';

const router = Router();

// POST /api/newsletter/subscribe - Newsletter-Anmeldung
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // E-Mail Validierung
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Gültige E-Mail-Adresse erforderlich'
      });
    }

    // Prüfen ob E-Mail bereits existiert
    const [existing] = await pool.query(
      'SELECT id FROM newsletter_subscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'E-Mail-Adresse bereits angemeldet'
      });
    }

    // Neue Anmeldung erstellen
    const id = uuidv4();
    await pool.execute(
      'INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)',
      [id, email]
    );

    res.status(201).json({
      success: true,
      message: 'Newsletter-Anmeldung erfolgreich'
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    res.status(500).json({
      success: false,
      error: 'Newsletter-Anmeldung fehlgeschlagen'
    });
  }
});

export default router;
