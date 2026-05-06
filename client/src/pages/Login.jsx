import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.error || 'Email o contraseña incorrectos');
      }
    } catch {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />

      <div className="auth-card glass fade-in">
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <span className="logo-trend">TREND</span>
          <span className="logo-ify">IFY</span>
        </Link>

        <h1 className="auth-title">
          Bienvenido de <span className="text-accent">nuevo</span>
        </h1>
        <p className="auth-subtitle">Ingresá para explorar Trendify Import</p>

        {error && (
          <div className="auth-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-pass">Contraseña</label>
            <div className="pass-wrap">
              <input
                id="login-pass"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Ocultar' : 'Mostrar'}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Ingresando…</> : 'Ingresar'}
          </button>
        </form>

        <p className="auth-switch">
          ¿No tenés cuenta?{' '}
          <Link to="/register" className="auth-switch-link">Registrate acá</Link>
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 60% 40%, #0d0010 0%, #000 60%);
        }
        .auth-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: 0.3;
        }
        .auth-blob-1 {
          width: 450px; height: 450px;
          background: var(--secondary);
          top: -150px; right: -150px;
        }
        .auth-blob-2 {
          width: 350px; height: 350px;
          background: var(--highlight);
          bottom: -120px; left: -120px;
        }

        /* Card */
        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: 48px;
          border-radius: 28px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        /* Logo */
        .auth-logo {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 1.5px;
          margin-bottom: 32px;
        }
        .logo-trend { color: var(--text-color); }
        .logo-ify {
          color: var(--primary);
          text-shadow: 0 0 12px rgba(255,255,0,0.5);
        }

        .auth-title {
          font-size: 26px;
          margin-bottom: 8px;
        }
        .text-accent { color: var(--accent); }
        .auth-subtitle {
          font-size: 14px;
          opacity: 0.55;
          margin-bottom: 36px;
        }

        /* Error */
        .auth-error {
          background: rgba(255,60,60,0.1);
          border: 1px solid rgba(255,60,60,0.3);
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 24px;
          text-align: left;
        }

        /* Form */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
        }
        .form-group input,
        .pass-wrap input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          padding: 14px 16px;
          border-radius: 12px;
          color: var(--text-color);
          font-size: 14px;
          font-family: var(--font-family);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-group input::placeholder,
        .pass-wrap input::placeholder { color: rgba(255,255,255,0.25); }
        .form-group input:focus,
        .pass-wrap input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(255,255,0,0.1);
        }

        /* Password toggle */
        .pass-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .pass-toggle {
          position: absolute;
          right: 14px;
          background: none;
          font-size: 16px;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
        }

        /* Submit */
        .auth-submit {
          width: 100%;
          padding: 15px;
          background: var(--primary);
          color: #000;
          font-weight: 800;
          font-size: 15px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(255,255,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 6px;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255,255,0,0.35);
        }
        .auth-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .btn-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        /* Switch */
        .auth-switch {
          margin-top: 28px;
          font-size: 14px;
          opacity: 0.6;
          text-align: center;
        }
        .auth-switch-link {
          color: var(--secondary);
          font-weight: 700;
          opacity: 1;
        }
        .auth-switch-link:hover { opacity: 0.8; }

        @media (max-width: 480px) {
          .auth-card { padding: 36px 24px; }
        }
      `}} />
    </div>
  );
};

export default Login;
