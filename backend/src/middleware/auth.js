import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js';

// JWT Secret aus Umgebungsvariablen
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

// JWT Token generieren
export const generateToken = (userId, email, role) => {
  return jwt.sign(
    { id: userId, email, role },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Middleware: JWT Token prüfen
export const authenticateToken = async (req, res, next) => {
  // Token aus Cookie oder Authorization Header
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentifizierung erforderlich',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Prüfen ob Benutzer noch existiert und aktiv ist
    const user = await UserModel.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Benutzer nicht gefunden oder deaktiviert',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Ungültiger oder abgelaufener Token',
    });
  }
};

// Middleware: Bestimmte Rolle erforderlich
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentifizierung erforderlich',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Keine Berechtigung für diese Aktion',
      });
    }

    next();
  };
};
