require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/database');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5001;

// Admin password simple (cambialo cuando quieras)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'trendify2025';

// Middleware
app.use(cors());
app.use(express.json());

// ── Admin middleware ─────────────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
  const adminPass = req.headers['x-admin-password'];
  if (adminPass !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

// GET todos los productos
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET producto por ID
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// POST crear producto (admin)
app.post('/api/products', requireAdmin, (req, res) => {
  try {
    const { name, description, price, category, image_url, stock, is_featured } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }
    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, category, image_url, stock, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      name,
      description || '',
      parseFloat(price),
      category || 'General',
      image_url || '',
      parseInt(stock) || 0,
      is_featured ? 1 : 0
    );
    const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT editar producto (admin)
app.put('/api/products/:id', requireAdmin, (req, res) => {
  try {
    const { name, description, price, category, image_url, stock, is_featured } = req.body;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Producto no encontrado' });

    db.prepare(`
      UPDATE products
      SET name = ?, description = ?, price = ?, category = ?, image_url = ?, stock = ?, is_featured = ?
      WHERE id = ?
    `).run(
      name ?? existing.name,
      description ?? existing.description,
      price !== undefined ? parseFloat(price) : existing.price,
      category ?? existing.category,
      image_url ?? existing.image_url,
      stock !== undefined ? parseInt(stock) : existing.stock,
      is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
      req.params.id
    );
    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar producto' });
  }
});

// DELETE producto (admin)
app.delete('/api/products/:id', requireAdmin, (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Producto no encontrado' });
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Health check
app.get('/health', (req, res) => res.send('Trendify Server is running 🚀'));

app.listen(PORT, () => {
  console.log(`🚀 Trendify API running on http://localhost:${PORT}`);
  console.log(`🔑 Admin password: ${ADMIN_PASSWORD}`);
});
