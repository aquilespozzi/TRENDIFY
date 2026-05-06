import React from 'react';

const Home = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Envío Express',
      desc: 'Entrega rápida y segura a todo el país con seguimiento en tiempo real.',
    },
    {
      icon: '🛡️',
      title: 'Garantía Oficial',
      desc: 'Todos nuestros productos incluyen garantía oficial del fabricante.',
    },
    {
      icon: '💎',
      title: 'Exclusividad',
      desc: 'Modelos únicos de importación directa que no encontrás en otro lado.',
    },
  ];

  return (
    <div className="home-page">
      {/* Animated blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content fade-in">
          <span className="hero-eyebrow">Importación directa · Tecnología premium</span>
          <h1 className="hero-title">
            <span className="text-gradient">Innovación</span><br />
            en tus manos
          </h1>
          <p className="hero-subtitle">
            Descubrí lo último en tecnología de importación.
            Calidad, velocidad y estilo en un solo lugar.
          </p>
          <div className="hero-actions">
            <a href="/tienda" className="cta-primary">Ver Catálogo</a>
            <a href="#novedades" className="cta-secondary">Novedades</a>
          </div>
        </div>

        <div className="hero-visual fade-in">
          <div className="hero-card glass">
            <div className="card-shimmer" />
            <span className="card-tag">NEW ARRIVAL</span>
            <h2 className="card-name">Smart Tech<br />2025</h2>
            <p className="card-desc">Importación directa · Garantía incluida</p>
            <div className="card-footer-row">
              <span className="card-price">Consultá precio</span>
              <a href="/tienda" className="card-cta">Ver →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────── */}
      <section id="novedades" className="features">
        <div className="features-header fade-in">
          <h2 className="section-title">
            ¿Por qué elegir <span className="text-gradient">Trendify</span>?
          </h2>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-item glass fade-in"
              style={{ animationDelay: `${(i + 1) * 0.15}s` }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="cta-section fade-in">
        <div className="cta-box glass">
          <h2>¿Listo para explorar nuestra tienda?</h2>
          <p>Creá tu cuenta gratis y empezá a comprar con total seguridad.</p>
          <div className="cta-actions">
            <a href="/register" className="cta-primary">Crear cuenta</a>
            <a href="/tienda" className="cta-secondary">Ver tienda</a>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .home-page {
          min-height: 100vh;
          padding-top: 76px;
          position: relative;
          overflow: hidden;
        }

        /* Blobs */
        .blob {
          position: absolute;
          filter: blur(90px);
          z-index: 0;
          opacity: 0.35;
          border-radius: 50%;
          animation: move 22s infinite alternate ease-in-out;
          pointer-events: none;
        }
        .blob-1 {
          width: 450px; height: 450px;
          background: var(--secondary);
          top: -120px; right: -120px;
        }
        .blob-2 {
          width: 550px; height: 550px;
          background: var(--highlight);
          bottom: -160px; left: -160px;
          animation-duration: 28s;
        }
        .blob-3 {
          width: 350px; height: 350px;
          background: var(--accent);
          top: 45%; left: 25%;
          animation-duration: 34s;
          opacity: 0.25;
        }

        /* ── Hero ── */
        .hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 5% 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          margin-bottom: 18px;
          opacity: 0.8;
        }
        .hero-title {
          font-size: clamp(48px, 6vw, 80px);
          line-height: 1.05;
          margin-bottom: 22px;
        }
        .hero-subtitle {
          font-size: 17px;
          opacity: 0.7;
          max-width: 460px;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Buttons */
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 34px;
          background: var(--primary);
          color: #000;
          font-weight: 800;
          font-size: 14px;
          border-radius: 50px;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(255,255,0,0.3);
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 35px rgba(255,255,0,0.5);
        }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 14px 30px;
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          color: var(--text-color);
          transition: all 0.3s ease;
        }
        .cta-secondary:hover {
          background: var(--glass-bg);
          border-color: var(--secondary);
          color: var(--secondary);
        }

        /* Hero visual */
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-card {
          width: 340px;
          height: 440px;
          border-radius: 24px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transform: rotate(4deg);
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
          animation: float 6s ease-in-out infinite;
        }
        .hero-card:hover { transform: rotate(0deg) scale(1.04); }
        .card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
          pointer-events: none;
        }
        .card-tag {
          color: var(--accent);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 14px;
          display: block;
        }
        .card-name {
          font-size: 30px;
          color: var(--text-color);
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .card-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 28px;
        }
        .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card-price {
          font-size: 16px;
          font-weight: 700;
          color: var(--secondary);
        }
        .card-cta {
          padding: 10px 20px;
          background: var(--primary);
          color: #000;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          transition: all 0.2s;
        }
        .card-cta:hover { box-shadow: 0 0 16px rgba(255,255,0,0.4); transform: scale(1.05); }

        /* ── Features ── */
        .features {
          max-width: 1200px;
          margin: 80px auto;
          padding: 0 5%;
          position: relative;
          z-index: 1;
        }
        .features-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 42px);
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .feature-item {
          padding: 40px 32px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .feature-item:hover {
          border-color: rgba(193,52,226,0.4);
          transform: translateY(-6px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .feature-icon {
          font-size: 42px;
          margin-bottom: 20px;
          display: block;
        }
        .feature-item h3 {
          font-size: 18px;
          color: var(--primary);
          margin-bottom: 12px;
        }
        .feature-item p {
          font-size: 14px;
          opacity: 0.65;
          line-height: 1.65;
        }

        /* ── CTA ── */
        .cta-section {
          max-width: 1200px;
          margin: 0 auto 100px;
          padding: 0 5%;
          position: relative;
          z-index: 1;
        }
        .cta-box {
          border-radius: 24px;
          padding: 70px 60px;
          text-align: center;
          border-color: rgba(255,255,0,0.12);
        }
        .cta-box h2 { font-size: clamp(24px, 3.5vw, 38px); margin-bottom: 14px; }
        .cta-box p { font-size: 16px; opacity: 0.6; margin-bottom: 36px; }
        .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; text-align: center; }
          .hero-subtitle { margin-left: auto; margin-right: auto; }
          .hero-actions { justify-content: center; }
          .hero-visual { margin-top: 40px; }
          .feature-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hero-card { width: 280px; height: 360px; }
          .cta-box { padding: 48px 24px; }
        }
      `}} />
    </div>
  );
};

export default Home;
