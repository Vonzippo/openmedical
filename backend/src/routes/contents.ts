import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import pool from '../config/database';
import { authenticateToken, requireRole } from '../middleware/auth';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = express.Router();

// CRUD-Prinzip: Create, Read, Update, Delete

// CREATE - Neuen Inhalt erstellen (nur Admin)
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  [
    body('title').notEmpty().withMessage('Titel ist erforderlich'),
    body('content').notEmpty().withMessage('Inhalt ist erforderlich'),
    body('type').isIn(['news', 'product', 'page']).withMessage('Ungültiger Typ'),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { title, content, type } = req.body;
      const id = uuidv4();
      const userId = (req as any).user.id;

      await pool.execute(
        'INSERT INTO contents (id, title, content, type, created_by) VALUES (?, ?, ?, ?, ?)',
        [id, title, content, type, userId]
      );

      res.status(201).json({
        success: true,
        data: { id, title, content, type, created_by: userId },
      });
    } catch (error) {
      console.error('Create content error:', error);
      res.status(500).json({ success: false, error: 'Inhalt konnte nicht erstellt werden' });
    }
  }
);

// READ - Alle Inhalte abrufen
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM contents';
    const params: string[] = [];

    if (type) {
      query += ' WHERE type = ?';
      params.push(type as string);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get contents error:', error);
    res.status(500).json({ success: false, error: 'Inhalte konnten nicht geladen werden' });
  }
});

// READ - Einzelnen Inhalt abrufen
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM contents WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Inhalt nicht gefunden' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ success: false, error: 'Inhalt konnte nicht geladen werden' });
  }
});

// UPDATE - Inhalt aktualisieren (nur Admin)
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  [
    body('title').optional().notEmpty().withMessage('Titel darf nicht leer sein'),
    body('content').optional().notEmpty().withMessage('Inhalt darf nicht leer sein'),
    body('type').optional().isIn(['news', 'product', 'page']).withMessage('Ungültiger Typ'),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { title, content, type } = req.body;
      const { id } = req.params;

      // Prüfen ob Inhalt existiert
      const [existing] = await pool.execute<RowDataPacket[]>(
        'SELECT id FROM contents WHERE id = ?',
        [id]
      );

      if (existing.length === 0) {
        return res.status(404).json({ success: false, error: 'Inhalt nicht gefunden' });
      }

      // Update nur die angegebenen Felder
      const updates: string[] = [];
      const values: string[] = [];

      if (title) {
        updates.push('title = ?');
        values.push(title);
      }
      if (content) {
        updates.push('content = ?');
        values.push(content);
      }
      if (type) {
        updates.push('type = ?');
        values.push(type);
      }

      if (updates.length > 0) {
        values.push(id);
        await pool.execute(
          `UPDATE contents SET ${updates.join(', ')} WHERE id = ?`,
          values
        );
      }

      res.json({ success: true, message: 'Inhalt aktualisiert' });
    } catch (error) {
      console.error('Update content error:', error);
      res.status(500).json({ success: false, error: 'Inhalt konnte nicht aktualisiert werden' });
    }
  }
);

// DELETE - Inhalt löschen (nur Admin)
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  async (req: express.Request, res: express.Response) => {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        'DELETE FROM contents WHERE id = ?',
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'Inhalt nicht gefunden' });
      }

      res.json({ success: true, message: 'Inhalt gelöscht' });
    } catch (error) {
      console.error('Delete content error:', error);
      res.status(500).json({ success: false, error: 'Inhalt konnte nicht gelöscht werden' });
    }
  }
);

export default router;
