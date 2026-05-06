import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import ProductCard from '../components/ProductCard';

const categories = ['Todos', 'Audio', 'Wearables', 'Accesorios', 'Gaming'];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(p => filter === 'Todos' || p.category === filter)
    .filter(p =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <h1 className="shop-title fade-in">
          Nuestra <span className="text-primary">Tienda</span>
        </h1>
        <p className="shop-subtitle fade-in">
          Explorá la mejor selección de electrónica importada.
        </p>

        {/* Search + Filters */}
        <div className="shop-controls">
          <div className="search-wrap glass">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" className="search-icon">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar productos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className="filter-bar glass">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="results-count">
          {filteredProducts.length === 0
            ? 'Sin resultados'
            : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''}`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="loader" />
          <p>Cargando productos exclusivos…</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state glass">
          <span style={{ fontSize: '48px' }}>🔍</span>
          <h3>Sin resultados</h3>
          <p>No encontramos productos para tu búsqueda.</p>
          <button className="reset-btn" onClick={() => { setFilter('Todos'); setSearch(''); }}>
            Ver todos
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .shop-page {
          min-height: 100vh;
          padding: 110px 5% 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .shop-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .shop-title {
          font-size: clamp(36px, 5vw, 54px);
          margin-bottom: 12px;
        }
        .text-primary { color: var(--primary); }
        .shop-subtitle {
          opacity: 0.6;
          font-size: 16px;
          margin-bottom: 36px;
        }

        /* Controls */
        .shop-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Search */
        .search-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          border-radius: 50px;
          height: 48px;
          min-width: 240px;
        }
        .search-icon { color: rgba(255,255,255,0.4); flex-shrink: 0; }
        .search-input {
          background: none;
          border: none;
          color: var(--text-color);
          font-size: 14px;
          font-family: var(--font-family);
          outline: none;
          flex: 1;
          min-width: 0;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.35); }
        .search-clear {
          background: none;
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          cursor: pointer;
          padding: 2px 4px;
          line-height: 1;
        }
        .search-clear:hover { color: var(--text-color); }

        /* Filter pills */
        .filter-bar {
          display: inline-flex;
          padding: 6px;
          border-radius: 50px;
          gap: 4px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .filter-btn {
          padding: 9px 22px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { color: var(--text-color); background: var(--glass-bg); }
        .filter-btn.active {
          background: var(--primary);
          color: #000;
          box-shadow: 0 4px 16px rgba(255,255,0,0.3);
        }

        /* Results count */
        .results-count {
          font-size: 13px;
          opacity: 0.45;
          margin-bottom: 28px;
          text-align: center;
        }

        /* Product grid */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          animation: fadeIn 0.6s ease both;
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 40vh;
          gap: 20px;
          opacity: 0.6;
        }
        .loader {
          width: 44px; height: 44px;
          border: 3px solid var(--glass-border);
          border-top-color: var(--secondary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Empty state */
        .empty-state {
          max-width: 420px;
          margin: 40px auto;
          text-align: center;
          padding: 70px 40px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .empty-state h3 { font-size: 20px; }
        .empty-state p { font-size: 14px; opacity: 0.55; }
        .reset-btn {
          margin-top: 8px;
          padding: 12px 28px;
          background: var(--primary);
          color: #000;
          font-weight: 800;
          font-size: 13px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(255,255,0,0.25);
        }
        .reset-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,0,0.35); }

        @media (max-width: 600px) {
          .shop-controls { flex-direction: column; }
          .search-wrap { width: 100%; min-width: unset; }
          .filter-bar { border-radius: 16px; }
        }
      `}} />
    </div>
  );
};

export default Shop;
