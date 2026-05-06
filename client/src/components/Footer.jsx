import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer glass">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            <span className="logo-trend">TREND</span>
            <span className="logo-ify">IFY</span>
            <span className="logo-import">IMPORT</span>
          </h2>
          <p>Importación directa de la mejor tecnología al alcance de tu mano.</p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h3 className="footer-heading">Navegación</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/login">Ingresar</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-heading">Contacto</h3>
          <ul>
            <li><a href="mailto:info@trendify.com">📧 info@trendify.com</a></li>
            <li>
              <a href="https://wa.me/123456789" target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>
            </li>
            <li><span>📍 Buenos Aires, Argentina</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Trendify Import. Todos los derechos reservados.</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer {
          margin-top: 100px;
          padding: 64px 5% 0;
          border-top: 1px solid var(--glass-border);
          position: relative;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 500px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--secondary), var(--primary), var(--secondary), transparent);
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 48px;
        }

        /* Brand */
        .footer-logo {
          display: flex;
          align-items: baseline;
          gap: 2px;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .logo-trend { color: var(--text-color); }
        .logo-ify {
          color: var(--primary);
          text-shadow: 0 0 12px rgba(255,255,0,0.5);
        }
        .logo-import {
          font-size: 9px;
          font-weight: 600;
          color: var(--accent);
          letter-spacing: 2px;
          margin-left: 6px;
          align-self: center;
        }
        .footer-brand p {
          font-size: 14px;
          opacity: 0.55;
          max-width: 280px;
          line-height: 1.7;
        }

        /* Columns */
        .footer-heading {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--secondary);
          margin-bottom: 20px;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-col ul li,
        .footer-col ul li a,
        .footer-col ul li span {
          font-size: 14px;
          opacity: 0.6;
          transition: opacity 0.2s, color 0.2s;
        }
        .footer-col ul li a:hover {
          opacity: 1;
          color: var(--primary);
        }

        /* Bottom */
        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 0;
          border-top: 1px solid var(--glass-border);
          text-align: center;
          font-size: 12px;
          opacity: 0.35;
        }

        @media (max-width: 860px) {
          .footer-container { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 520px) {
          .footer-container { grid-template-columns: 1fr; gap: 36px; text-align: center; }
          .footer-brand p { margin: 0 auto; }
          .footer-logo { justify-content: center; }
        }
      `}} />
    </footer>
  );
};

export default Footer;
