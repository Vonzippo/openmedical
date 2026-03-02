import { Router } from 'express';
import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET /api/partners - Alle Partner laden (öffentlich)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM partners WHERE is_active = true ORDER BY sort_order ASC'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Fehler beim Laden der Partner:', error);
    res.status(500).json({
      success: false,
      error: 'Partner konnten nicht geladen werden'
    });
  }
});

// GET /api/partners/categories - Alle Kategorien laden
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT category FROM partners WHERE is_active = true ORDER BY category ASC'
    );

    const categories = rows.map(row => row.category);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Fehler beim Laden der Kategorien:', error);
    res.status(500).json({
      success: false,
      error: 'Kategorien konnten nicht geladen werden'
    });
  }
});

// GET /api/partners/:id - Einzelnen Partner laden
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM partners WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Partner nicht gefunden'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Fehler beim Laden des Partners:', error);
    res.status(500).json({
      success: false,
      error: 'Partner konnte nicht geladen werden'
    });
  }
});

// POST /api/partners - Neuen Partner erstellen (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, logo_path, category, website, description, sort_order } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        error: 'Name und Kategorie sind erforderlich'
      });
    }

    const id = uuidv4();

    await pool.query(
      `INSERT INTO partners (id, name, logo_path, category, website, description, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, logo_path || null, category, website || null, description || null, sort_order || 0]
    );

    const [rows] = await pool.query(
      'SELECT * FROM partners WHERE id = ?',
      [id]
    );

    res.status(201).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Fehler beim Erstellen des Partners:', error);
    res.status(500).json({
      success: false,
      error: 'Partner konnte nicht erstellt werden'
    });
  }
});

// PUT /api/partners/:id - Partner aktualisieren (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, logo_path, category, website, description, is_active, sort_order } = req.body;

    const [result] = await pool.query(
      `UPDATE partners
       SET name = ?, logo_path = ?, category = ?, website = ?, description = ?, is_active = ?, sort_order = ?
       WHERE id = ?`,
      [name, logo_path, category, website, description, is_active, sort_order, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Partner nicht gefunden'
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM partners WHERE id = ?',
      [req.params.id]
    );

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Partners:', error);
    res.status(500).json({
      success: false,
      error: 'Partner konnte nicht aktualisiert werden'
    });
  }
});

// DELETE /api/partners/:id - Partner löschen (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM partners WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Partner nicht gefunden'
      });
    }

    res.json({
      success: true,
      message: 'Partner gelöscht'
    });
  } catch (error) {
    console.error('Fehler beim Löschen des Partners:', error);
    res.status(500).json({
      success: false,
      error: 'Partner konnte nicht gelöscht werden'
    });
  }
});

export default router;
