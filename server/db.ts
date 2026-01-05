import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath);

// Promisify database methods
const dbRun = promisify(db.run.bind(db));
const dbGet = promisify(db.get.bind(db));
const dbAll = promisify(db.all.bind(db));
const dbExec = promisify(db.exec.bind(db));

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize database
(async () => {
  try {
    // Create tables
    await dbExec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        title_ja TEXT NOT NULL,
        title_en TEXT NOT NULL,
        content_ja TEXT NOT NULL,
        content_en TEXT NOT NULL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year TEXT NOT NULL,
        text_ja TEXT NOT NULL,
        text_en TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create default admin user if it doesn't exist
    const adminExists: any = await dbGet('SELECT id FROM users WHERE username = ?', ['admin']);
    
    if (!adminExists) {
      const defaultPassword = 'admin123';
      const passwordHash = bcrypt.hashSync(defaultPassword, 10);
      await dbRun('INSERT INTO users (username, password_hash) VALUES (?, ?)', ['admin', passwordHash]);
      console.log('Default admin user created: username=admin, password=admin123');
      const testCompare = bcrypt.compareSync(defaultPassword, passwordHash);
      console.log('Password hash verification:', testCompare ? 'SUCCESS' : 'FAILED');
    } else {
      // Verify existing admin password
      const adminUser: any = await dbGet('SELECT password_hash FROM users WHERE username = ?', ['admin']);
      if (adminUser) {
        const testPassword = 'admin123';
        const testCompare = bcrypt.compareSync(testPassword, adminUser.password_hash);
        console.log('Existing admin password verification:', testCompare ? 'SUCCESS' : 'FAILED');
        if (!testCompare) {
          console.log('Resetting admin password...');
          const passwordHash = bcrypt.hashSync(testPassword, 10);
          await dbRun('UPDATE users SET password_hash = ? WHERE username = ?', [passwordHash, 'admin']);
          console.log('Admin password reset: username=admin, password=admin123');
        }
      }
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
})();

// Database wrapper with promisified methods
const database = {
  run: (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  },
  get: (sql: string, params: any[] = []) => dbGet(sql, params),
  all: (sql: string, params: any[] = []) => dbAll(sql, params),
  exec: (sql: string) => dbExec(sql),
  close: () => promisify(db.close.bind(db))(),
};

export default database;
