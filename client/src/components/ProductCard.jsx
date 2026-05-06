import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  return (
    <div className="product-card glass fade-in">
      <div className="product-image">
        <img src={product.image_url} alt={product.name} loading="lazy" />
        {product.is_featured && (
          <span className="badge">⭐ Destacado</span>
        )}
        <div className="image-overlay">
          <span className="overlay-text">Ver detalle</span>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description.substring(0, 65)}…
        </p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {user ? (
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Añadir 🛒
            </button>
          ) : (
            <Link to="/login" className="login-to-buy">
              Login para comprar
            </Link>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .product-card {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          border-color: rgba(193,52,226,0.35);
        }

        /* Image */
        .product-image {
          height: 220px;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.03);
          flex-shrink: 0;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-image img { transform: scale(1.08); }

        /* Overlay */
        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .product-card:hover .image-overlay { opacity: 1; }
        .overlay-text {
          background: rgba(255,255,255,0.9);
          color: #000;
          padding: 9px 20px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* Badge */
        .badge {
          position: absolute;
          top: 12px; left: 12px;
          background: var(--primary);
          color: #000;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        /* Info */
        .product-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-category {
          color: var(--accent);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
          display: block;
        }
        .product-name {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .product-description {
          font-size: 13px;
          opacity: 0.55;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        /* Footer */
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: auto;
        }
        .product-price {
          font-size: 22px;
          font-weight: 800;
          color: var(--secondary);
        }
        .add-to-cart-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          background: var(--primary);
          color: #000;
          font-size: 12px;
          font-weight: 800;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .add-to-cart-btn:hover {
          box-shadow: 0 0 20px rgba(255,255,0,0.4);
          transform: translateY(-2px);
        }
        .login-to-buy {
          font-size: 12px;
          font-weight: 600;
          color: var(--secondary);
          padding: 8px 14px;
          border: 1px solid rgba(193,52,226,0.35);
          border-radius: 10px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .login-to-buy:hover {
          background: rgba(193,52,226,0.1);
          border-color: var(--secondary);
        }
      `}} />
    </div>
  );
};

export default ProductCard;
