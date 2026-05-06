const db = require('./database');

const products = [
  // ── Audio ────────────────────────────────────────────────────────
  {
    name: 'Neon Buds Pro',
    description: 'Auriculares TWS con cancelación de ruido activa, luces RGB y 30h de batería. Conexión Bluetooth 5.3.',
    price: 129.99,
    category: 'Audio',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    stock: 50,
    is_featured: 1,
  },
  {
    name: 'SoundMax Over-Ear',
    description: 'Auriculares over-ear plegables con drivers de 40mm, modo DJ y cable removible.',
    price: 89.99,
    category: 'Audio',
    image_url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop',
    stock: 40,
    is_featured: 0,
  },
  {
    name: 'BassCore Mini Speaker',
    description: 'Parlante Bluetooth portátil IPX7, 360° surround sound y hasta 20h de reproducción.',
    price: 74.50,
    category: 'Audio',
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop',
    stock: 60,
    is_featured: 0,
  },

  // ── Wearables ─────────────────────────────────────────────────────
  {
    name: 'Quantum Watch G3',
    description: 'Smartwatch con pantalla AMOLED 1.5", monitor cardíaco, SpO2 y GPS integrado.',
    price: 249.50,
    category: 'Wearables',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    stock: 30,
    is_featured: 1,
  },
  {
    name: 'FitBand Slim X2',
    description: 'Pulsera inteligente liviana con medición de pasos, calorías, sueño y notificaciones.',
    price: 49.99,
    category: 'Wearables',
    image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=800&auto=format&fit=crop',
    stock: 80,
    is_featured: 0,
  },
  {
    name: 'AirGlasses AR Vision',
    description: 'Lentes de realidad aumentada con HUD integrado, notificaciones en pantalla y cámara 12MP.',
    price: 399.00,
    category: 'Wearables',
    image_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
    stock: 10,
    is_featured: 1,
  },

  // ── Accesorios ────────────────────────────────────────────────────
  {
    name: 'UltraLink Hub 7-in-1',
    description: 'Hub USB-C con HDMI 4K, 3× USB-A, Power Delivery 100W y lector SD/microSD.',
    price: 59.99,
    category: 'Accesorios',
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop',
    stock: 100,
    is_featured: 0,
  },
  {
    name: 'MagCharge Pad Pro',
    description: 'Cargador inalámbrico magnético de 15W compatible con Qi. Cable USB-C incluido.',
    price: 39.99,
    category: 'Accesorios',
    image_url: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800&auto=format&fit=crop',
    stock: 120,
    is_featured: 0,
  },
  {
    name: 'NanoLight LED Strip',
    description: 'Tira LED inteligente de 5m, 16 millones de colores, control por app y voz.',
    price: 29.99,
    category: 'Accesorios',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    stock: 200,
    is_featured: 0,
  },

  // ── Gaming ────────────────────────────────────────────────────────
  {
    name: 'Titan Keyboard Mech',
    description: 'Teclado mecánico TKL con switches brown, iluminación RGB por tecla y chasis de aluminio.',
    price: 189.00,
    category: 'Gaming',
    image_url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop',
    stock: 20,
    is_featured: 1,
  },
  {
    name: 'Vortex Mouse 16K',
    description: 'Mouse gaming con sensor óptico 16.000 DPI, 7 botones programables y peso ajustable.',
    price: 79.99,
    category: 'Gaming',
    image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop',
    stock: 45,
    is_featured: 0,
  },
  {
    name: 'StrikeZone Headset 7.1',
    description: 'Headset con sonido 7.1 virtual, micrófono retráctil con cancelación de ruido y RGB.',
    price: 109.00,
    category: 'Gaming',
    image_url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    stock: 35,
    is_featured: 0,
  },
];

const insertProduct = db.prepare(`
  INSERT INTO products (name, description, price, category, image_url, stock, is_featured)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

try {
  // Limpiar productos existentes para evitar duplicados
  db.prepare('DELETE FROM products').run();

  for (const p of products) {
    insertProduct.run(p.name, p.description, p.price, p.category, p.image_url, p.stock, p.is_featured);
  }

  const total = db.prepare('SELECT COUNT(*) as count FROM products').get();
  console.log(`✅ Seed completado: ${total.count} productos cargados en la base de datos.`);
} catch (error) {
  console.error('❌ Error al sembrar la base de datos:', error);
}
