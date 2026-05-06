import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = '123456789';
  const message = 'Hola Trendify! Me gustaría consultar sobre un producto.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      className={`wa-float ${hovered ? 'active' : ''}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="wa-tooltip">¿Necesitás ayuda?</span>

      <div className="wa-btn">
        <div className="wa-ring" />
        <svg viewBox="0 0 32 32" className="wa-svg" aria-hidden="true">
          <path
            d="M16 0C7.164 0 0 7.163 0 16c0 2.825.734 5.476 2.018 7.783L.001 31.7l8.083-2.117A15.93 15.93 0 0016 32C24.836 32 32 24.837 32 16S24.836 0 16 0zm8.406 22.794c-.354.993-2.059 1.897-2.832 1.975-.725.073-1.398.35-4.712-.981-3.985-1.614-6.534-5.682-6.728-5.948-.197-.267-1.607-2.137-1.607-4.075 0-1.937 1.017-2.888 1.378-3.28.361-.391.787-.489 1.049-.489.263 0 .524.003.754.014.242.012.567-.092.888.677.33.793 1.12 2.73 1.218 2.927.099.198.165.43.033.694-.132.264-.198.43-.394.661-.197.231-.415.516-.594.693-.197.198-.402.412-.173.808.23.397 1.022 1.582 2.123 2.599 1.461.729 2.513.771 2.864.677.351-.093.568-.296.786-.526.217-.23.434-.575.651-.908.162-.25.38-.329.613-.225.235.103 1.486.7 1.74.827.254.127.423.19.484.296.062.107.062.617-.293 1.61z"
            fill="white"
          />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .wa-float {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        /* Tooltip */
        .wa-tooltip {
          background: rgba(10,10,10,0.9);
          border: 1px solid var(--glass-border);
          color: var(--text-color);
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-family);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
          backdrop-filter: blur(12px);
        }
        .wa-float.active .wa-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* Button */
        .wa-btn {
          position: relative;
          width: 58px; height: 58px;
          background: linear-gradient(135deg, #25d366, #128c7e);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(37,211,102,0.4);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .wa-float.active .wa-btn {
          transform: scale(1.1) rotate(-8deg);
          box-shadow: 0 10px 32px rgba(37,211,102,0.55);
        }

        /* Ping */
        .wa-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(37,211,102,0.5);
          animation: wa-ping 2.2s ease-in-out infinite;
        }
        @keyframes wa-ping {
          0%   { transform: scale(1); opacity: 0.7; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        .wa-svg {
          width: 28px; height: 28px;
          position: relative; z-index: 1;
          transition: transform 0.3s ease;
        }

        @media (max-width: 600px) {
          .wa-float { bottom: 18px; right: 18px; }
          .wa-tooltip { display: none; }
        }
      `}} />
    </a>
  );
};

export default WhatsAppButton;
