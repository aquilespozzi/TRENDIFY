const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'trendify.db'), { verbose: console.log });

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT 0
  );
`);

console.log('✅ SQLite Database & Tables Initialized');

module.exports = db;
