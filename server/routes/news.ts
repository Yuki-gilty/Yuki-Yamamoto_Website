import express, { Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import db from '../db';
import { NewsItem } from '../types';

const router = express.Router();

// Get all news (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const news = await db.all('SELECT * FROM news ORDER BY date DESC') as NewsItem[];
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single news item (public)
router.get('/:id', [param('id').isInt()], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const news: any = await db.get('SELECT * FROM news WHERE id = ?', [parseInt(req.params.id)]);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create news (admin only)
router.post(
  '/',
  authenticateToken,
  [
    body('date').notEmpty().withMessage('Date is required'),
    body('title_ja').notEmpty().withMessage('Japanese title is required'),
    body('title_en').notEmpty().withMessage('English title is required'),
    body('content_ja').notEmpty().withMessage('Japanese content is required'),
    body('content_en').notEmpty().withMessage('English content is required'),
    body('image_url').optional().isString(),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { date, title_ja, title_en, content_ja, content_en, image_url } = req.body;
      const result: any = await db.run(
        'INSERT INTO news (date, title_ja, title_en, content_ja, content_en, image_url) VALUES (?, ?, ?, ?, ?, ?)',
        [date, title_ja, title_en, content_ja, content_en, image_url || null]
      );

      const news: any = await db.get('SELECT * FROM news WHERE id = ?', [result.lastID]);
      res.status(201).json(news);
    } catch (error) {
      console.error('Error creating news:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Update news (admin only)
router.put(
  '/:id',
  authenticateToken,
  [
    param('id').isInt(),
    body('date').notEmpty().withMessage('Date is required'),
    body('title_ja').notEmpty().withMessage('Japanese title is required'),
    body('title_en').notEmpty().withMessage('English title is required'),
    body('content_ja').notEmpty().withMessage('Japanese content is required'),
    body('content_en').notEmpty().withMessage('English content is required'),
    body('image_url').optional().isString(),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { date, title_ja, title_en, content_ja, content_en, image_url } = req.body;

      const existing: any = await db.get('SELECT id FROM news WHERE id = ?', [parseInt(id)]);
      if (!existing) {
        return res.status(404).json({ error: 'News not found' });
      }

      await db.run(
        'UPDATE news SET date = ?, title_ja = ?, title_en = ?, content_ja = ?, content_en = ?, image_url = ? WHERE id = ?',
        [date, title_ja, title_en, content_ja, content_en, image_url || null, parseInt(id)]
      );

      const news: any = await db.get('SELECT * FROM news WHERE id = ?', [parseInt(id)]);
      res.json(news);
    } catch (error) {
      console.error('Error updating news:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Delete news (admin only)
router.delete('/:id', authenticateToken, [param('id').isInt()], async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const existing: any = await db.get('SELECT id FROM news WHERE id = ?', [parseInt(id)]);
    if (!existing) {
      return res.status(404).json({ error: 'News not found' });
    }

    await db.run('DELETE FROM news WHERE id = ?', [parseInt(id)]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
