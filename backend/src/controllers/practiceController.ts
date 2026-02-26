import { Request, Response } from 'express';
import { PracticeModel, PracticeInput } from '../models/Practice';

// Controller für Praxis-Endpunkte

// POST /api/practices - Neue Praxis registrieren
export const createPractice = async (req: Request, res: Response) => {
  try {
    const practiceData: PracticeInput = req.body;

    // Prüfen ob E-Mail bereits existiert
    const existingPractice = await PracticeModel.findByEmail(practiceData.email);
    if (existingPractice) {
      return res.status(409).json({
        success: false,
        error: 'Eine Praxis mit dieser E-Mail-Adresse existiert bereits',
      });
    }

    // Praxis in Datenbank speichern
    const practice = await PracticeModel.create(practiceData);

    // HTTP 201 Created - Erfolgreiche Erstellung
    res.status(201).json({
      success: true,
      data: {
        id: practice.id,
        praxisname: practice.praxisname,
        email: practice.email,
        createdAt: practice.createdAt,
      },
      message: 'Praxis erfolgreich registriert',
    });
  } catch (error) {
    console.error('Error creating practice:', error);

    // HTTP 500 Internal Server Error
    res.status(500).json({
      success: false,
      error: 'Fehler bei der Registrierung. Bitte versuchen Sie es später erneut.',
    });
  }
};

// GET /api/practices/:id - Praxis nach ID abrufen
export const getPracticeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const practice = await PracticeModel.findById(id);

    if (!practice) {
      // HTTP 404 Not Found
      return res.status(404).json({
        success: false,
        error: 'Praxis nicht gefunden',
      });
    }

    // HTTP 200 OK
    res.status(200).json({
      success: true,
      data: practice,
    });
  } catch (error) {
    console.error('Error fetching practice:', error);

    res.status(500).json({
      success: false,
      error: 'Fehler beim Abrufen der Praxis',
    });
  }
};

// GET /api/practices - Alle Praxen abrufen
export const getAllPractices = async (req: Request, res: Response) => {
  try {
    const practices = await PracticeModel.findAll();

    // HTTP 200 OK
    res.status(200).json({
      success: true,
      data: practices,
      count: practices.length,
    });
  } catch (error) {
    console.error('Error fetching practices:', error);

    res.status(500).json({
      success: false,
      error: 'Fehler beim Abrufen der Praxen',
    });
  }
};
