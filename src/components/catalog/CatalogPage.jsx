import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Car, RefreshCw, AlertCircle } from 'lucide-react';
import Container from '../common/Container';
import GlassCard from '../common/GlassCard';
import SectionTitle from '../common/SectionTitle';
import VehicleCard from './VehicleCard';
import VehicleModal from './VehicleModal';
import { fetchAutos } from '../../services/autoService';
import { VEHICLES_DATA } from '../../data/vehiclesData';
import './Catalog.css';

/**
 * CatalogPage Component
 * Browses live inventory loaded from Hostinger MySQL database (table `autos`).
 * Filters out 'venta' and 'frio'. Renders photo carousel for each vehicle.
 */
export const CatalogPage = ({ onNavigateHome }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingDB, setIsUsingDB] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [activeVehicleModal, setActiveVehicleModal] = useState(null);

  const categories = ['Todos', 'Sedán', 'SUV', 'Pickup', 'Hatchback', 'Otros'];

  // Load from MySQL API
  const loadAutosFromDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAutos();
      setVehicles(data);
      setIsUsingDB(true);
    } catch (err) {
      console.warn('Fallback a datos de catálogo:', err);
      setError('No se pudo conectar directamente con MySQL, mostrando catálogo disponible.');
      setVehicles(VEHICLES_DATA);
      setIsUsingDB(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAutosFromDatabase();
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        const matchesCategory =
          selectedCategory === 'Todos' ||
          (car.category && car.category.toLowerCase() === selectedCategory.toLowerCase());

        const matchesSearch =
          (car.title && car.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (car.marca && car.marca.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (car.modelo && car.modelo.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (car.category && car.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (car.year && car.year.toString().includes(searchQuery));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'year-new') return (b.year || 0) - (a.year || 0);
        return 0;
      });
  }, [vehicles, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="catalog-page-wrapper">
      <Container size="default">
        {/* Navigation Bar / Breadcrumb */}
        <div className="catalog-header-bar">
          <button
            type="button"
            className="back-to-home-btn"
            onClick={onNavigateHome}
          >
            <ArrowLeft size={16} />
            <span>Volver a Inicio</span>
          </button>
        </div>

        {/* Section Title */}
        <SectionTitle
          badgeText="INVENTARIO OFICIAL AUTOSUZ"
          title="Catálogo de Autos"
          titleHighlight="en Línea"
          subtitle="Explora los vehículos en inventario disponibles directamente en nuestra base de datos. Cada auto cuenta con carrusel de fotos, revisión mecánica en orden y garantía formal."
          align="center"
          showDots={true}
          showDivider={true}
          showPill={false}
        />

        {/* Search & Category Filter Controls (Oculto temporalmente mientras hay pocas unidades en stock) */}
        {/* Para volver a mostrarlo, remover el style={{ display: 'none' }} */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <GlassCard padding="md" className="catalog-controls-glass">
            <div className="controls-flex-row">
              {/* Search Input */}
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-inside" />
                <input
                  type="text"
                  placeholder="Buscar por marca, modelo o año (ej: Cavalier, Golf, Rio, 2023)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="catalog-search-input"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="category-pills-row">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Selector & Refresh */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  className="btn-glass"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                  onClick={loadAutosFromDatabase}
                  title="Recargar desde la base de datos"
                  disabled={loading}
                >
                  <RefreshCw size={14} className={loading ? 'spin-animation' : ''} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <SlidersHorizontal size={15} color="var(--text-muted)" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.9)',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.84rem',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="default">Ordenar: Más Recientes</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="year-new">Año: Más Nuevo</option>
                  </select>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="spin-animation" style={{ display: 'inline-block', margin: '0 auto 16px' }}>
              <RefreshCw size={36} color="var(--accent-blue)" />
            </div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Consultando inventario en la base de datos de Autosuz...
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && !loading && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '14px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
            color: '#b91c1c'
          }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* Vehicles Grid */}
        {!loading && filteredVehicles.length > 0 && (
          <div className="vehicles-grid">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onOpenDetails={setActiveVehicleModal}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredVehicles.length === 0 && (
          <GlassCard padding="xl" style={{ textAlign: 'center', margin: '40px auto', maxWidth: '600px' }}>
            <Car size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
              No se encontraron vehículos disponibles
            </h3>
            <p className="ui-text-body" style={{ marginTop: 8 }}>
              Intenta cambiar la categoría o buscar con otro término.
            </p>
            <button
              type="button"
              className="btn-glass"
              style={{ marginTop: 18 }}
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
            >
              Restablecer Filtros
            </button>
          </GlassCard>
        )}

        {/* Vehicle Details Modal with Expanded Photo Carousel */}
        {activeVehicleModal && (
          <VehicleModal
            vehicle={activeVehicleModal}
            onClose={() => setActiveVehicleModal(null)}
          />
        )}
      </Container>
    </main>
  );
};

export default CatalogPage;
