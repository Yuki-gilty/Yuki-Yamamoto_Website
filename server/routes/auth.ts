import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import db from '../db';
import { JWT_SECRET } from '../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user: any = await db.get('SELECT * FROM users WHERE username = ?', [username]);

      if (!user) {
        console.log(`Login attempt failed: User '${username}' not found`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log(`Login attempt for user: ${username}`);
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      console.log(`Password validation result: ${isValidPassword}`);
      
      if (!isValidPassword) {
        console.log(`Login attempt failed: Invalid password for user '${username}'`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '24h',
      });

      res.json({
        token,
        username: user.username,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
