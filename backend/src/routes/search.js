import { Router } from 'express';
import pool from '../config/database.js';

const router = Router();

// GET /api/search?q=suchbegriff - Globale Suche
// SQL LIKE-Abfrage für skalierbare Suche
router.get('/', async (req, res) => {
  try {
    const { q, type } = req.query;

    if (!q || typeof q !== 'string' || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Suchbegriff muss mindestens 2 Zeichen lang sein'
      });
    }

    const searchTerm = `%${q.trim()}%`;
    const results = {
      partners: [],
      contents: [],
      practices: []
    };

    // Partner durchsuchen (SQL LIKE)
    if (!type || type === 'partners') {
      const [partners] = await pool.query(
        `SELECT id, name, category, description, 'partner' as result_type
         FROM partners
         WHERE is_active = true
         AND (name LIKE ? OR category LIKE ? OR description LIKE ?)
         ORDER BY sort_order ASC
         LIMIT 10`,
        [searchTerm, searchTerm, searchTerm]
      );
      results.partners = partners;
    }

    // Inhalte durchsuchen (SQL LIKE)
    if (!type || type === 'contents') {
      const [contents] = await pool.query(
        `SELECT id, title, content, type, 'content' as result_type
         FROM contents
         WHERE title LIKE ? OR content LIKE ?
         ORDER BY created_at DESC
         LIMIT 10`,
        [searchTerm, searchTerm]
      );
      results.contents = contents;
    }

    // Praxen durchsuchen (SQL LIKE)
    if (!type || type === 'practices') {
      const [practices] = await pool.query(
        `SELECT id, praxisname, ort, software, 'practice' as result_type
         FROM practices
         WHERE (praxisname LIKE ? OR ort LIKE ? OR software LIKE ?)
         ORDER BY praxisname ASC
         LIMIT 10`,
        [searchTerm, searchTerm, searchTerm]
      );
      results.practices = practices;
    }

    // Gesamtzahl der Ergebnisse
    const totalResults =
      results.partners.length +
      results.contents.length +
      results.practices.length;

    res.json({
      success: true,
      data: {
        query: q.trim(),
        totalResults,
        results
      }
    });
  } catch (error) {
    console.error('Fehler bei der Suche:', error);
    res.status(500).json({
      success: false,
      error: 'Suche fehlgeschlagen'
    });
  }
});

export default router;
