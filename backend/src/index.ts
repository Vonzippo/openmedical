import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Routes
import practicesRouter from './routes/practices';
import authRouter from './routes/auth';
import contentsRouter from './routes/contents';
import partnersRouter from './routes/partners';
import searchRouter from './routes/search';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Sicherheit und Logging
app.use(helmet()); // Sicherheits-Header
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));
app.use(morgan('dev')); // Server-Logging
app.use(express.json()); // JSON Body Parser
app.use(cookieParser());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/practices', practicesRouter);
app.use('/api/contents', contentsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/search', searchRouter);

// Error handling - Einheitliche Fehlercodes
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// 404 Handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint nicht gefunden'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
