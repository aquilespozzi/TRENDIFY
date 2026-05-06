import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, setIsOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-trend">TREND</span>
            <span className="logo-ify">IFY</span>
            <span className="logo-import">IMPORT</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/tienda" className="nav-link">Tienda</Link>
            <a href="https://wa.me/123456789" className="nav-link" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <span className="user-name">Hola, {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Salir</button>
              </div>
            ) : (
              <Link to="/login" className="login-btn">Ingresar</Link>
            )}

            <button className="cart-icon-btn" onClick={() => setIsOpen(true)} aria-label="Carrito">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .navbar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 76px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.4s ease;
          z-index: 1000;
          padding: 0 5%;
        }
        .scrolled {
          height: 68px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.6);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: baseline;
          gap: 2px;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 1px;
          flex-shrink: 0;
        }
        .logo-trend { color: var(--text-color); }
        .logo-ify {
          color: var(--primary);
          text-shadow: 0 0 12px rgba(255,255,0,0.6);
        }
        .logo-import {
          font-size: 9px;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 2px;
          margin-left: 6px;
          text-transform: uppercase;
          opacity: 0.8;
          align-self: center;
        }

        /* Desktop links */
        .nav-links {
          display: flex;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }
        .nav-link {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.75;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        .nav-link:hover {
          opacity: 1;
          background: var(--glass-bg);
          color: var(--secondary);
        }

        /* Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-name {
          font-size: 13px;
          color: var(--accent);
          font-weight: 600;
        }
        .logout-btn {
          background: none;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid transparent;
          padding: 2px 0;
        }
        .logout-btn:hover {
          color: var(--secondary);
          border-color: var(--secondary);
          opacity: 1;
        }
        .login-btn {
          padding: 9px 22px;
          border-radius: 8px;
          border: 1px solid var(--primary);
          color: var(--primary);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }
        .login-btn:hover {
          background: var(--primary);
          color: #000;
          box-shadow: 0 0 20px rgba(255,255,0,0.35);
        }
        .cart-icon-btn {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-color);
          width: 42px;
          height: 42px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cart-icon-btn:hover {
          border-color: var(--primary);
          box-shadow: 0 0 12px rgba(255,255,0,0.2);
        }
        .cart-count {
          position: absolute;
          top: -6px; right: -6px;
          background: var(--secondary);
          color: white;
          font-size: 9px;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-color);
          padding: 0 3px;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 38px; height: 38px;
          padding: 8px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          height: 2px;
          background: var(--text-color);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        /* Mobile nav */
        .mobile-nav {
          display: flex;
          flex-direction: column;
          background: rgba(0,0,0,0.95);
          border-top: 1px solid var(--glass-border);
          padding: 16px 24px 20px;
          gap: 4px;
          animation: fadeIn 0.2s ease;
        }
        .mobile-nav-link {
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          opacity: 0.75;
          transition: all 0.2s;
        }
        .mobile-nav-link:hover { opacity: 1; background: var(--glass-bg); }
        .mobile-nav-link.accent {
          color: var(--primary);
          border: 1px solid rgba(255,255,0,0.3);
          margin-top: 8px;
          opacity: 1;
          text-align: center;
        }

        @media (max-width: 768px) {
          .user-name { display: none; }
          .login-btn { display: none; }
        }
        @media (max-width: 480px) {
          .logo-import { display: none; }
        }
      `}} />
    </>
  );
};

export default Navbar;
