const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');

// For development, we'll use a placeholder or check for the env var
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN' 
});

router.post('/create_preference', async (req, res) => {
  const { items } = req.body;

  try {
    const preference = new Preference(client);
    
    // Format items for MP
    const mpItems = items.map(item => ({
      title: item.name,
      unit_price: Number(item.price),
      quantity: Number(item.quantity),
      currency_id: 'ARS'
    }));

    const body = {
      items: mpItems,
      back_urls: {
        success: 'http://localhost:5173/success',
        failure: 'http://localhost:5173/failure',
        pending: 'http://localhost:5173/pending'
      },
      auto_return: 'approved'
    };

    const response = await preference.create({ body });
    res.json({ id: response.id, init_point: response.init_point });
  } catch (error) {
    console.error('Error creating MP preference:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
});

module.exports = router;
