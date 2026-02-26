import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validators';
import { authenticateToken } from '../middleware/auth';
import {
  register,
  login,
  getCurrentUser,
  logout,
} from '../controllers/authController';

const router = Router();

// Validierung für Registrierung
const validateRegister = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('E-Mail ist erforderlich')
    .isEmail()
    .withMessage('Ungültige E-Mail-Adresse')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Passwort ist erforderlich')
    .isLength({ min: 8 })
    .withMessage('Passwort muss mindestens 8 Zeichen haben'),
  body('practiceId')
    .optional()
    .isUUID()
    .withMessage('Ungültige Praxis-ID'),
];

// Validierung für Login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('E-Mail ist erforderlich')
    .isEmail()
    .withMessage('Ungültige E-Mail-Adresse')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Passwort ist erforderlich'),
];

// REST-API Endpunkte für Authentifizierung

// POST /api/auth/register - Registrierung
router.post('/register', validateRegister, handleValidationErrors, register);

// POST /api/auth/login - Login
router.post('/login', validateLogin, handleValidationErrors, login);

// GET /api/auth/me - Aktueller Benutzer (authentifiziert)
router.get('/me', authenticateToken, getCurrentUser);

// POST /api/auth/logout - Logout
router.post('/logout', logout);

export default router;
