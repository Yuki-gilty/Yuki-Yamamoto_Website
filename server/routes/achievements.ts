import express, { Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import db from '../db';
import { Achievement } from '../types';

const router = express.Router();

// Get all achievements (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const achievements = await db.all('SELECT * FROM achievements ORDER BY year DESC, id ASC') as Achievement[];
    
    // Group by year
    const grouped: Record<string, Achievement[]> = {};
    achievements.forEach((achievement) => {
      if (!grouped[achievement.year]) {
        grouped[achievement.year] = [];
      }
      grouped[achievement.year].push(achievement);
    });

    res.json(grouped);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single achievement (public)
router.get('/:id', [param('id').isInt()], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const achievement: any = await db.get('SELECT * FROM achievements WHERE id = ?', [parseInt(req.params.id)]);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create achievement (admin only)
router.post(
  '/',
  authenticateToken,
  [
    body('year').notEmpty().withMessage('Year is required'),
    body('text_ja').notEmpty().withMessage('Japanese text is required'),
    body('text_en').notEmpty().withMessage('English text is required'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { year, text_ja, text_en } = req.body;
      const result: any = await db.run(
        'INSERT INTO achievements (year, text_ja, text_en) VALUES (?, ?, ?)',
        [year, text_ja, text_en]
      );

      const achievement: any = await db.get('SELECT * FROM achievements WHERE id = ?', [result.lastID]);
      res.status(201).json(achievement);
    } catch (error) {
      console.error('Error creating achievement:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Update achievement (admin only)
router.put(
  '/:id',
  authenticateToken,
  [
    param('id').isInt(),
    body('year').notEmpty().withMessage('Year is required'),
    body('text_ja').notEmpty().withMessage('Japanese text is required'),
    body('text_en').notEmpty().withMessage('English text is required'),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { year, text_ja, text_en } = req.body;

      const existing: any = await db.get('SELECT id FROM achievements WHERE id = ?', [parseInt(id)]);
      if (!existing) {
        return res.status(404).json({ error: 'Achievement not found' });
      }

      await db.run(
        'UPDATE achievements SET year = ?, text_ja = ?, text_en = ? WHERE id = ?',
        [year, text_ja, text_en, parseInt(id)]
      );

      const achievement: any = await db.get('SELECT * FROM achievements WHERE id = ?', [parseInt(id)]);
      res.json(achievement);
    } catch (error) {
      console.error('Error updating achievement:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Delete achievement (admin only)
router.delete('/:id', authenticateToken, [param('id').isInt()], async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const existing: any = await db.get('SELECT id FROM achievements WHERE id = ?', [parseInt(id)]);
    if (!existing) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    await db.run('DELETE FROM achievements WHERE id = ?', [parseInt(id)]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
