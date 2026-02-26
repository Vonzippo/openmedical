import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Serverseitige Validierung mit express-validator
// Blockiert manipulierte oder automatisierte Requests

export const validatePractice = [
  // Praxisdaten
  body('praxisname')
    .trim()
    .notEmpty()
    .withMessage('Praxisname ist erforderlich')
    .isLength({ max: 255 })
    .withMessage('Praxisname darf maximal 255 Zeichen haben'),

  body('strasse')
    .trim()
    .notEmpty()
    .withMessage('Strasse ist erforderlich')
    .isLength({ max: 255 })
    .withMessage('Strasse darf maximal 255 Zeichen haben'),

  body('hausnummer')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Hausnummer darf maximal 20 Zeichen haben'),

  body('plz')
    .trim()
    .notEmpty()
    .withMessage('PLZ ist erforderlich')
    .matches(/^\d{4}$/)
    .withMessage('PLZ muss 4 Ziffern haben (Schweizer Format)'),

  body('ort')
    .trim()
    .notEmpty()
    .withMessage('Ort ist erforderlich')
    .isLength({ max: 255 })
    .withMessage('Ort darf maximal 255 Zeichen haben'),

  body('telefon')
    .trim()
    .notEmpty()
    .withMessage('Telefon ist erforderlich')
    .matches(/^[\d\s+\-()]+$/)
    .withMessage('Ungültiges Telefonformat'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('E-Mail ist erforderlich')
    .isEmail()
    .withMessage('Ungültige E-Mail-Adresse')
    .normalizeEmail(),

  body('software')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Software darf maximal 100 Zeichen haben'),

  // Kontaktperson
  body('contact.anrede')
    .trim()
    .notEmpty()
    .withMessage('Anrede ist erforderlich')
    .isIn(['herr', 'frau', 'divers'])
    .withMessage('Ungültige Anrede'),

  body('contact.vorname')
    .trim()
    .notEmpty()
    .withMessage('Vorname ist erforderlich')
    .isLength({ max: 100 })
    .withMessage('Vorname darf maximal 100 Zeichen haben'),

  body('contact.nachname')
    .trim()
    .notEmpty()
    .withMessage('Nachname ist erforderlich')
    .isLength({ max: 100 })
    .withMessage('Nachname darf maximal 100 Zeichen haben'),

  body('contact.funktion')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Funktion darf maximal 100 Zeichen haben'),

  body('contact.kontaktEmail')
    .trim()
    .notEmpty()
    .withMessage('Kontakt-E-Mail ist erforderlich')
    .isEmail()
    .withMessage('Ungültige Kontakt-E-Mail-Adresse')
    .normalizeEmail(),

  body('contact.kontaktTelefon')
    .optional()
    .trim()
    .matches(/^[\d\s+\-()]*$/)
    .withMessage('Ungültiges Telefonformat'),
];

// Middleware zur Fehlerprüfung
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // HTTP 400 Bad Request bei Validierungsfehlern
    return res.status(400).json({
      success: false,
      error: 'Validierungsfehler',
      details: errors.array().map((err) => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
      })),
    });
  }

  next();
};
