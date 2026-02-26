import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { generateToken } from '../middleware/auth';

// Cookie-Optionen für JWT Token
const cookieOptions = {
  httpOnly: true, // Nicht per JavaScript zugreifbar
  secure: process.env.NODE_ENV === 'production', // HTTPS in Production
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Tage
};

// POST /api/auth/register - Neuen Benutzer registrieren
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, practiceId } = req.body;

    // Prüfen ob E-Mail bereits existiert
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'E-Mail-Adresse bereits registriert',
      });
    }

    // Benutzer erstellen
    const user = await UserModel.create({
      email,
      password,
      role: practiceId ? 'practice' : 'user',
      practiceId,
    });

    // JWT Token generieren
    const token = generateToken(user.id, user.email, user.role);

    // Token als HttpOnly Cookie setzen
    res.cookie('token', token, cookieOptions);

    // HTTP 201 Created
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
      message: 'Registrierung erfolgreich',
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      error: 'Registrierung fehlgeschlagen',
    });
  }
};

// POST /api/auth/login - Benutzer anmelden
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Benutzer suchen
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Ungültige E-Mail oder Passwort',
      });
    }

    // Passwort prüfen (bcrypt)
    const isValidPassword = await UserModel.verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Ungültige E-Mail oder Passwort',
      });
    }

    // Prüfen ob Benutzer aktiv ist
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Konto ist deaktiviert',
      });
    }

    // Letzten Login aktualisieren
    await UserModel.updateLastLogin(user.id);

    // JWT Token generieren
    const token = generateToken(user.id, user.email, user.role);

    // Token als HttpOnly Cookie setzen
    res.cookie('token', token, cookieOptions);

    // HTTP 200 OK
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      },
      message: 'Login erfolgreich',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login fehlgeschlagen',
    });
  }
};

// GET /api/auth/me - Aktuellen Benutzer abrufen
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Nicht authentifiziert',
      });
    }

    // Benutzer mit Praxis-Daten laden
    const user = await UserModel.findByIdWithPractice(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Benutzer nicht gefunden',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      error: 'Fehler beim Laden des Benutzers',
    });
  }
};

// POST /api/auth/logout - Benutzer abmelden
export const logout = async (req: Request, res: Response) => {
  // Cookie löschen
  res.clearCookie('token');

  res.status(200).json({
    success: true,
    message: 'Logout erfolgreich',
  });
};
