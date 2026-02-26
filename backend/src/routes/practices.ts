import { Router } from 'express';
import {
  createPractice,
  getPracticeById,
  getAllPractices,
} from '../controllers/practiceController';
import {
  validatePractice,
  handleValidationErrors,
} from '../middleware/validators';

const router = Router();

// REST-API Endpunkte für Praxen

// POST /api/practices - Neue Praxis registrieren
// Validierung: Erst express-validator, dann Controller
router.post('/', validatePractice, handleValidationErrors, createPractice);

// GET /api/practices - Alle Praxen abrufen
router.get('/', getAllPractices);

// GET /api/practices/:id - Einzelne Praxis abrufen
router.get('/:id', getPracticeById);

export default router;
