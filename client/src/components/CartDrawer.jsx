import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartDrawer = () => {
  const { cartItems, isOpen, setIsOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/payment/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al iniciar el pago.');
      }
    } catch {
      alert('Error de conexión.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsOpen(false)}>
      <aside className="cart-panel glass" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="cart-head">
          <h2>Tu Carrito {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar">✕</button>
        </div>

        {/* Items */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="empty-icon">🛒</span>
              <h3>Tu carrito está vacío</h3>
              <p>Explorá la tienda y agregá productos.</p>
              <a href="/tienda" className="go-shop-btn" onClick={() => setIsOpen(false)}>
                Ver tienda
              </a>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item glass">
                <img src={item.image_url} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="item-right">
                  <span className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Eliminar">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-foot">
            <div className="total-row">
              <span>Total</span>
              <span className="total-price">${cartTotal.toFixed(2)}</span>
            </div>
            {user ? (
              <button className="checkout-btn" onClick={handleCheckout}>
                💳 Pagar con MercadoPago
              </button>
            ) : (
              <div className="auth-notice">
                <p>Registrate para finalizar tu compra.</p>
                <a href="/login" className="auth-notice-link">Iniciar sesión →</a>
              </div>
            )}
            <button className="keep-shopping" onClick={() => setIsOpen(false)}>
              Seguir comprando
            </button>
          </div>
        )}
      </aside>

      <style dangerouslySetInnerHTML={{ __html: `
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
          backdrop-filter: blur(5px);
          animation: fadeOverlay 0.25s ease;
        }
        .cart-panel {
          width: 100%;
          max-width: 420px;
          height: 100%;
          background: #050505;
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.4s cubic-bezier(0.16,1,0.3,1);
          border-left: 1px solid var(--glass-border);
          overflow: hidden;
        }

        /* Head */
        .cart-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--glass-border);
          flex-shrink: 0;
        }
        .cart-head h2 {
          font-size: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cart-badge {
          background: var(--secondary);
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 50px;
        }
        .close-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--glass-border);
          color: rgba(255,255,255,0.7);
          width: 36px; height: 36px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; cursor: pointer; transition: all 0.2s;
        }
        .close-btn:hover { color: var(--text-color); border-color: var(--secondary); }

        /* Body */
        .cart-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Empty */
        .cart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          gap: 10px;
          opacity: 0.7;
        }
        .empty-icon { font-size: 52px; margin-bottom: 8px; }
        .cart-empty h3 { font-size: 18px; }
        .cart-empty p { font-size: 13px; opacity: 0.6; }
        .go-shop-btn {
          margin-top: 16px;
          padding: 10px 24px;
          background: var(--primary);
          color: #000;
          font-weight: 800;
          font-size: 13px;
          border-radius: 50px;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(255,255,0,0.25);
        }
        .go-shop-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,0,0.35); }

        /* Item */
        .cart-item {
          display: flex;
          gap: 14px;
          padding: 14px;
          border-radius: 14px;
          align-items: flex-start;
        }
        .cart-item img {
          width: 70px; height: 70px;
          object-fit: cover;
          border-radius: 10px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.04);
        }
        .item-info { flex: 1; min-width: 0; }
        .item-info h3 {
          font-size: 14px; font-weight: 600; margin-bottom: 4px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .item-price { font-size: 12px; color: var(--secondary); font-weight: 700; margin-bottom: 10px; }
        .qty-row { display: flex; align-items: center; gap: 10px; }
        .qty-btn {
          width: 26px; height: 26px;
          background: rgba(255,255,255,0.07);
          border: 1px solid var(--glass-border);
          color: var(--text-color);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; line-height: 1; cursor: pointer; transition: all 0.15s;
        }
        .qty-btn:hover { border-color: var(--primary); color: var(--primary); }
        .qty-row span { font-size: 14px; font-weight: 700; min-width: 18px; text-align: center; }
        .item-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 10px; flex-shrink: 0;
        }
        .item-subtotal { font-size: 14px; font-weight: 800; color: var(--text-color); }
        .remove-btn {
          background: none; font-size: 16px; cursor: pointer;
          opacity: 0.5; transition: opacity 0.2s;
        }
        .remove-btn:hover { opacity: 1; }

        /* Foot */
        .cart-foot {
          padding: 20px 28px 28px;
          border-top: 1px solid var(--glass-border);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .total-row {
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .total-row > span:first-child { font-size: 14px; opacity: 0.6; }
        .total-price {
          font-size: 28px; font-weight: 900; color: var(--primary);
          text-shadow: 0 0 16px rgba(255,255,0,0.3);
        }
        .checkout-btn {
          width: 100%; padding: 16px;
          background: var(--primary); color: #000;
          font-weight: 800; font-size: 14px;
          border-radius: 50px; border: none; cursor: pointer;
          box-shadow: 0 8px 24px rgba(255,255,0,0.25);
          transition: all 0.25s ease;
        }
        .checkout-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(255,255,0,0.4);
        }

        .auth-notice {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .auth-notice p { font-size: 13px; opacity: 0.65; margin-bottom: 10px; }
        .auth-notice-link { color: var(--secondary); font-weight: 700; font-size: 13px; }

        .keep-shopping {
          width: 100%; background: none;
          border: 1px solid var(--glass-border);
          color: rgba(255,255,255,0.5);
          padding: 12px;
          border-radius: 50px;
          font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
        }
        .keep-shopping:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        @media (max-width: 480px) {
          .cart-panel { max-width: 100%; }
          .cart-head, .cart-body, .cart-foot { padding-left: 20px; padding-right: 20px; }
        }
      `}} />
    </div>
  );
};

export default CartDrawer;
