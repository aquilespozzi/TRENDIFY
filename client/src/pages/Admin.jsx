import React, { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'trendify2025'; // Debe coincidir con el servidor
const CATEGORIES = ['Audio', 'Wearables', 'Accesorios', 'Gaming', 'General'];

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: 'Audio',
  image_url: '',
  stock: '',
  is_featured: false,
};

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }
  const [showForm, setShowForm] = useState(false);

  // Verificar si ya había sesión guardada
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchProducts();
  }, [authenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      showMsg('error', 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setAuthenticated(true);
      setPassError('');
    } else {
      setPassError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthenticated(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = editingId
      ? `http://localhost:5001/api/products/${editingId}`
      : 'http://localhost:5001/api/products';
    const method = editingId ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': ADMIN_PASSWORD,
        },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 }),
      });
      if (res.ok) {
        showMsg('success', editingId ? 'Producto actualizado ✓' : 'Producto creado ✓');
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        fetchProducts();
      } else {
        const data = await res.json();
        showMsg('error', data.error || 'Error al guardar');
      }
    } catch {
      showMsg('error', 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category || 'General',
      image_url: product.image_url || '',
      stock: product.stock,
      is_featured: !!product.is_featured,
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar "${name}"?`)) return;
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': ADMIN_PASSWORD },
      });
      if (res.ok) {
        showMsg('success', 'Producto eliminado');
        fetchProducts();
      } else {
        showMsg('error', 'Error al eliminar');
      }
    } catch {
      showMsg('error', 'Error de conexión');
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  // ── LOGIN ────────────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-card glass fade-in">
          <h1>
            <span className="logo-trend">TREND</span>
            <span className="logo-ify">IFY</span>
          </h1>
          <p className="admin-login-subtitle">Panel de Administración</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <label>Contraseña</label>
            <input
              type="password"
              value={passInput}
              onChange={e => setPassInput(e.target.value)}
              placeholder="Contraseña de administrador"
              autoFocus
            />
            {passError && <span className="admin-error">⚠️ {passError}</span>}
            <button type="submit">Ingresar al panel</button>
          </form>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .admin-login {
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            padding: 80px 20px;
            background: radial-gradient(ellipse at 50% 40%, #0d0010, #000 60%);
          }
          .admin-login-card {
            width: 100%; max-width: 400px;
            padding: 48px; border-radius: 24px; text-align: center;
          }
          .admin-login-card h1 {
            font-size: 26px; font-weight: 900; letter-spacing: 1px; margin-bottom: 6px;
          }
          .logo-trend { color: #fff; }
          .logo-ify { color: var(--primary); text-shadow: 0 0 12px rgba(255,255,0,0.5); }
          .admin-login-subtitle { font-size: 13px; opacity: 0.5; margin-bottom: 32px; }
          .admin-login-form { display: flex; flex-direction: column; gap: 14px; text-align: left; }
          .admin-login-form label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); }
          .admin-login-form input {
            background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
            padding: 13px 16px; border-radius: 10px; color: #fff;
            font-size: 14px; font-family: var(--font-family); outline: none;
          }
          .admin-login-form input:focus { border-color: var(--primary); }
          .admin-login-form button {
            padding: 14px; background: var(--primary); color: #000;
            font-weight: 800; font-size: 14px; border-radius: 10px;
            border: none; cursor: pointer; margin-top: 4px;
            box-shadow: 0 6px 20px rgba(255,255,0,0.25);
            transition: all 0.2s;
          }
          .admin-login-form button:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,255,0,0.35); }
          .admin-error { color: #ff6b6b; font-size: 13px; }
        `}} />
      </div>
    );
  }

  // ── PANEL ────────────────────────────────────────────────────────────────────
  return (
    <div className="admin-page">
      {/* Topbar */}
      <div className="admin-topbar glass">
        <div className="admin-topbar-inner">
          <h1 className="admin-logo">
            <span className="logo-trend">TREND</span>
            <span className="logo-ify">IFY</span>
            <span className="admin-badge">ADMIN</span>
          </h1>
          <div className="admin-topbar-actions">
            <a href="/" className="admin-link">← Ver tienda</a>
            <button className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {/* Message toast */}
        {message && (
          <div className={`admin-toast ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Header + Add button */}
        <div className="admin-section-header">
          <div>
            <h2>Productos</h2>
            <p className="admin-count">{products.length} producto{products.length !== 1 ? 's' : ''} en la tienda</p>
          </div>
          <button
            className="btn-add"
            onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
          >
            {showForm && !editingId ? '✕ Cancelar' : '+ Agregar producto'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="admin-form-card glass fade-in">
            <h3 className="form-title">{editingId ? '✏️ Editar producto' : '➕ Nuevo producto'}</h3>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Auriculares Neon Pro" required />
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción breve del producto..." rows={3} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Precio (ARS) *</label>
                  <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0" />
                </div>
              </div>

              <div className="form-group">
                <label>URL de imagen</label>
                <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
              </div>

              {form.image_url && (
                <div className="img-preview">
                  <img src={form.image_url} alt="Preview" onError={e => e.target.style.display='none'} />
                </div>
              )}

              <div className="form-check">
                <input id="featured" name="is_featured" type="checkbox" checked={form.is_featured} onChange={handleChange} />
                <label htmlFor="featured">⭐ Marcar como destacado</label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Crear producto'}
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
              </div>
            </form>
          </div>
        )}

        {/* Product list */}
        {loading ? (
          <div className="admin-loading">
            <div className="loader" />
            <p>Cargando productos…</p>
          </div>
        ) : (
          <div className="admin-table-wrap glass">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Destacado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan="7" className="empty-row">No hay productos. ¡Agregá el primero!</td></tr>
                ) : products.map(p => (
                  <tr key={p.id} className={editingId === p.id ? 'row-editing' : ''}>
                    <td>
                      <div className="table-img">
                        {p.image_url
                          ? <img src={p.image_url} alt={p.name} />
                          : <span className="no-img">sin img</span>
                        }
                      </div>
                    </td>
                    <td className="td-name">{p.name}</td>
                    <td><span className="cat-badge">{p.category}</span></td>
                    <td className="td-price">${p.price.toFixed(2)}</td>
                    <td className={`td-stock ${p.stock === 0 ? 'out' : ''}`}>{p.stock}</td>
                    <td>{p.is_featured ? '⭐' : '—'}</td>
                    <td className="td-actions">
                      <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
                      <button className="btn-delete" onClick={() => handleDelete(p.id, p.name)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-page {
          min-height: 100vh;
          background: var(--bg-color);
          padding-bottom: 60px;
        }

        /* Topbar */
        .admin-topbar {
          position: sticky; top: 0; z-index: 100;
          border-bottom: 1px solid var(--glass-border);
          background: rgba(0,0,0,0.85);
        }
        .admin-topbar-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 16px 5%;
          display: flex; align-items: center; justify-content: space-between;
        }
        .admin-logo {
          font-size: 22px; font-weight: 900; letter-spacing: 1px;
          display: flex; align-items: center; gap: 6px;
        }
        .logo-trend { color: #fff; }
        .logo-ify { color: var(--primary); text-shadow: 0 0 10px rgba(255,255,0,0.4); }
        .admin-badge {
          background: var(--secondary); color: white;
          font-size: 9px; font-weight: 800; letter-spacing: 2px;
          padding: 3px 8px; border-radius: 4px; align-self: center;
        }
        .admin-topbar-actions {
          display: flex; align-items: center; gap: 16px;
        }
        .admin-link {
          font-size: 13px; opacity: 0.55; transition: opacity 0.2s;
        }
        .admin-link:hover { opacity: 1; color: var(--accent); }
        .admin-logout {
          background: none; border: 1px solid var(--glass-border);
          color: rgba(255,255,255,0.55); padding: 7px 16px;
          border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;
        }
        .admin-logout:hover { border-color: var(--secondary); color: var(--secondary); }

        /* Content */
        .admin-content {
          max-width: 1200px; margin: 0 auto;
          padding: 36px 5%;
          position: relative;
        }

        /* Toast */
        .admin-toast {
          position: fixed; top: 90px; right: 24px; z-index: 2000;
          padding: 14px 22px; border-radius: 12px;
          font-size: 14px; font-weight: 600;
          animation: fadeIn 0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .admin-toast.success {
          background: rgba(0,215,120,0.15);
          border: 1px solid rgba(0,215,120,0.4);
          color: #00d978;
        }
        .admin-toast.error {
          background: rgba(255,60,60,0.12);
          border: 1px solid rgba(255,60,60,0.35);
          color: #ff6b6b;
        }

        /* Section header */
        .admin-section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px; flex-wrap: wrap; gap: 14px;
        }
        .admin-section-header h2 { font-size: 24px; }
        .admin-count { font-size: 13px; opacity: 0.45; margin-top: 4px; }
        .btn-add {
          padding: 12px 24px;
          background: var(--primary); color: #000;
          font-weight: 800; font-size: 13px;
          border-radius: 10px; border: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(255,255,0,0.2);
          transition: all 0.2s;
        }
        .btn-add:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,0,0.3); }

        /* Form card */
        .admin-form-card {
          border-radius: 20px; padding: 32px;
          margin-bottom: 32px; border-color: rgba(255,255,0,0.12);
        }
        .form-title { font-size: 18px; margin-bottom: 24px; }
        .product-form { display: flex; flex-direction: column; gap: 18px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label {
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--accent);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          padding: 12px 14px; border-radius: 10px;
          color: #fff; font-size: 14px; font-family: var(--font-family); outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus { border-color: var(--primary); }
        .form-group textarea { resize: vertical; }
        .form-group select option { background: #111; }

        /* image preview */
        .img-preview {
          width: 120px; height: 90px; border-radius: 10px; overflow: hidden;
          border: 1px solid var(--glass-border); background: rgba(255,255,255,0.03);
        }
        .img-preview img { width: 100%; height: 100%; object-fit: cover; }

        /* Checkbox */
        .form-check {
          display: flex; align-items: center; gap: 10px;
        }
        .form-check input[type='checkbox'] {
          width: 18px; height: 18px; accent-color: var(--primary);
          cursor: pointer;
        }
        .form-check label { font-size: 14px; cursor: pointer; }

        /* Form actions */
        .form-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-save {
          padding: 13px 28px; background: var(--primary); color: #000;
          font-weight: 800; font-size: 14px; border-radius: 10px; border: none;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(255,255,0,0.2);
        }
        .btn-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,0,0.3); }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-cancel {
          padding: 13px 22px; background: none;
          border: 1px solid var(--glass-border);
          color: rgba(255,255,255,0.55); font-size: 14px;
          border-radius: 10px; cursor: pointer; transition: all 0.2s;
        }
        .btn-cancel:hover { border-color: var(--secondary); color: var(--secondary); }

        /* Table */
        .admin-table-wrap {
          border-radius: 20px; overflow: hidden;
        }
        .admin-table {
          width: 100%; border-collapse: collapse;
        }
        .admin-table th {
          padding: 14px 16px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.4);
          text-align: left; border-bottom: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.02);
        }
        .admin-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 14px; vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: rgba(255,255,255,0.02); }
        .row-editing td { background: rgba(255,255,0,0.03) !important; }

        .table-img {
          width: 56px; height: 48px; border-radius: 8px; overflow: hidden;
          background: rgba(255,255,255,0.04);
        }
        .table-img img { width: 100%; height: 100%; object-fit: cover; }
        .no-img { font-size: 10px; opacity: 0.3; display: flex; align-items: center; justify-content: center; height: 100%; }

        .td-name { font-weight: 600; max-width: 200px; }
        .cat-badge {
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: 50px; background: rgba(0,211,235,0.1);
          border: 1px solid rgba(0,211,235,0.2); color: var(--accent);
        }
        .td-price { color: var(--secondary); font-weight: 700; }
        .td-stock { font-weight: 600; }
        .td-stock.out { color: #ff6b6b; }
        .td-actions { display: flex; gap: 8px; }
        .btn-edit {
          padding: 7px 14px; background: rgba(255,255,0,0.1);
          border: 1px solid rgba(255,255,0,0.25); color: var(--primary);
          font-size: 12px; font-weight: 700; border-radius: 8px; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-edit:hover { background: rgba(255,255,0,0.18); }
        .btn-delete {
          padding: 7px 14px; background: rgba(255,60,60,0.08);
          border: 1px solid rgba(255,60,60,0.2); color: #ff6b6b;
          font-size: 12px; font-weight: 700; border-radius: 8px; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-delete:hover { background: rgba(255,60,60,0.16); }

        .empty-row {
          text-align: center; opacity: 0.4; padding: 48px !important;
        }

        /* Loading */
        .admin-loading {
          display: flex; flex-direction: column; align-items: center;
          gap: 16px; padding: 80px; opacity: 0.5;
        }
        .loader {
          width: 36px; height: 36px;
          border: 3px solid var(--glass-border);
          border-top-color: var(--secondary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr; }
          .admin-table th:nth-child(1),
          .admin-table td:nth-child(1) { display: none; }
        }
        @media (max-width: 560px) {
          .admin-table th:nth-child(6),
          .admin-table td:nth-child(6) { display: none; }
        }
      `}} />
    </div>
  );
};

export default Admin;
