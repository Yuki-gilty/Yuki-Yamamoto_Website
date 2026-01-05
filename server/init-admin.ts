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

(async () => {
  try {
    // Enable foreign keys
    await dbRun('PRAGMA foreign_keys = ON');

    // Create tables if they don't exist
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

    // Check if admin user exists
    const adminExists: any = await dbGet('SELECT * FROM users WHERE username = ?', ['admin']);

    if (adminExists) {
      console.log('Admin user already exists. Updating password...');
      const defaultPassword = 'admin123';
      const passwordHash = bcrypt.hashSync(defaultPassword, 10);
      await dbRun('UPDATE users SET password_hash = ? WHERE username = ?', [passwordHash, 'admin']);
      console.log('Admin password updated: username=admin, password=admin123');
      
      // Verify the password
      const testPassword = bcrypt.compareSync(defaultPassword, passwordHash);
      console.log('Password verification test:', testPassword ? 'SUCCESS' : 'FAILED');
    } else {
      console.log('Creating admin user...');
      const defaultPassword = 'admin123';
      const passwordHash = bcrypt.hashSync(defaultPassword, 10);
      const result: any = await dbRun('INSERT INTO users (username, password_hash) VALUES (?, ?)', ['admin', passwordHash]);
      console.log('Default admin user created: username=admin, password=admin123');
      
      // Verify the password
      const testPassword = bcrypt.compareSync(defaultPassword, passwordHash);
      console.log('Password verification test:', testPassword ? 'SUCCESS' : 'FAILED');
    }

    // List all users
    const allUsers: any[] = await dbAll('SELECT id, username, created_at FROM users');
    console.log('\nAll users in database:');
    console.log(allUsers);

    await promisify(db.close.bind(db))();
    console.log('\nDone!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await promisify(db.close.bind(db))();
    process.exit(1);
  }
})();
