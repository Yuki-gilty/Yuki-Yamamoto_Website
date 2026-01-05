import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db';
import authRoutes from './routes/auth';
import newsRoutes from './routes/news';
import achievementsRoutes from './routes/achievements';
import uploadRoutes from './routes/upload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Database initialized at ${path.join(__dirname, 'database.sqlite')}`);
  console.log(`✓ API endpoints available at http://localhost:${PORT}/api`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
}).on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`✗ Port ${PORT} is already in use. Please stop the other process or change the PORT environment variable.`);
  } else {
    console.error('✗ Server failed to start:', err.message);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

