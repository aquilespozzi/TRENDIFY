import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setError(data.error || 'Error al registrarse');
      }
    } catch {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const strength = password.length >= 8 ? 'strong' : password.length >= 5 ? 'medium' : 'weak';

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob-a" />
      <div className="auth-blob auth-blob-b" />

      <div className="auth-card glass fade-in">
        <Link to="/" className="auth-logo">
          <span className="logo-trend">TREND</span>
          <span className="logo-ify">IFY</span>
        </Link>

        <h1 className="auth-title">
          Unite a <span className="text-secondary">Trendify</span>
        </h1>
        <p className="auth-subtitle">Creá tu cuenta y empezá a comprar</p>

        {error && <div className="auth-error">⚠️ {error}</div>}

        {success ? (
          <div className="success-block">
            <div className="success-circle">✓</div>
            <h3>¡Registro exitoso!</h3>
            <p>Redirigiendo al inicio de sesión…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-username">Nombre de usuario</label>
              <input
                id="reg-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Tu nombre"
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-pass">Contraseña</label>
              <div className="pass-wrap">
                <input
                  id="reg-pass"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {password && (
                <div className="strength-row">
                  <div className={`strength-bar ${strength}`} />
                  <span className="strength-label">
                    {strength === 'strong' ? 'Contraseña fuerte' : strength === 'medium' ? 'Contraseña aceptable' : 'Contraseña débil'}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" className="auth-submit register" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Creando cuenta…</> : 'Crear cuenta gratis'}
            </button>
          </form>
        )}

        <p className="auth-switch">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="auth-switch-link">Iniciá sesión</Link>
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
          background: radial-gradient(ellipse at 40% 40%, #0d0010 0%, #000 60%);
        }
        .auth-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: 0.3;
        }
        .auth-blob-a {
          width: 400px; height: 400px;
          background: var(--secondary);
          top: -120px; left: -120px;
        }
        .auth-blob-b {
          width: 350px; height: 350px;
          background: var(--accent);
          bottom: -100px; right: -100px;
        }
        .auth-card {
          width: 100%; max-width: 440px;
          padding: 48px; border-radius: 28px;
          position: relative; z-index: 1; text-align: center;
        }
        .auth-logo {
          display: inline-flex; align-items: baseline; gap: 2px;
          font-size: 22px; font-weight: 900; letter-spacing: 1.5px; margin-bottom: 32px;
        }
        .logo-trend { color: var(--text-color); }
        .logo-ify { color: var(--primary); text-shadow: 0 0 12px rgba(255,255,0,0.5); }
        .auth-title { font-size: 26px; margin-bottom: 8px; }
        .text-secondary { color: var(--secondary); }
        .auth-subtitle { font-size: 14px; opacity: 0.55; margin-bottom: 36px; }

        .auth-error {
          background: rgba(255,60,60,0.1);
          border: 1px solid rgba(255,60,60,0.3);
          color: #ff6b6b;
          padding: 12px 16px; border-radius: 10px;
          font-size: 13px; margin-bottom: 24px; text-align: left;
        }

        .auth-form { display: flex; flex-direction: column; gap: 20px; text-align: left; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label {
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--accent);
        }
        .form-group input, .pass-wrap input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          padding: 14px 16px; border-radius: 12px;
          color: var(--text-color); font-size: 14px;
          font-family: var(--font-family); outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-group input::placeholder, .pass-wrap input::placeholder { color: rgba(255,255,255,0.25); }
        .form-group input:focus, .pass-wrap input:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 3px rgba(193,52,226,0.12);
        }
        .pass-wrap { position: relative; display: flex; align-items: center; }
        .pass-toggle {
          position: absolute; right: 14px;
          background: none; font-size: 16px; cursor: pointer; padding: 4px;
        }

        /* Strength */
        .strength-row {
          display: flex; align-items: center; gap: 12px; margin-top: 4px;
        }
        .strength-bar {
          flex: 1; height: 3px; border-radius: 2px; transition: all 0.3s;
        }
        .strength-bar.weak    { background: #ff6b6b; }
        .strength-bar.medium  { background: var(--primary); }
        .strength-bar.strong  { background: #00d97e; }
        .strength-label { font-size: 11px; opacity: 0.5; white-space: nowrap; }

        /* Submit */
        .auth-submit {
          width: 100%; padding: 15px;
          background: var(--primary); color: #000;
          font-weight: 800; font-size: 15px;
          border-radius: 12px; border: none; cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(255,255,0,0.2);
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 6px;
        }
        .auth-submit.register {
          background: var(--secondary);
          box-shadow: 0 8px 24px rgba(193,52,226,0.2);
        }
        .auth-submit:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        .auth-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .btn-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite; display: inline-block;
        }

        /* Success */
        .success-block { padding: 20px 0; }
        .success-circle {
          width: 72px; height: 72px;
          background: rgba(0,215,120,0.12);
          border: 2px solid rgba(0,215,120,0.4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          font-size: 28px; color: #00d97e;
          animation: fadeIn 0.5s ease both;
        }
        .success-block h3 { font-size: 20px; margin-bottom: 8px; }
        .success-block p { font-size: 14px; opacity: 0.55; }

        .auth-switch {
          margin-top: 28px; font-size: 14px;
          opacity: 0.6; text-align: center;
        }
        .auth-switch-link { color: var(--primary); font-weight: 700; opacity: 1; }
        .auth-switch-link:hover { opacity: 0.8; }

        @media (max-width: 480px) { .auth-card { padding: 36px 24px; } }
      `}} />
    </div>
  );
};

export default Register;
