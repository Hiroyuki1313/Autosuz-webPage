import React, { useState } from 'react';
import { X, Check, MessageCircle, Calendar, Gauge, Fuel, ShieldCheck, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Badge from '../common/Badge';
import { COMPANY_INFO } from '../../data/companyInfo';
import './Catalog.css';

/**
 * VehicleModal Component with Full Photo Carousel
 * Features large photo view, next/prev controls, counter and thumbnail strip.
 */
export const VehicleModal = ({ vehicle, onClose }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!vehicle) return null;

  const photos = vehicle.photos && vehicle.photos.length > 0
    ? vehicle.photos
    : [vehicle.image];

  const hasMultiple = photos.length > 1;

  const handlePrev = () => {
    setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const currentPhoto = photos[activePhotoIdx] || vehicle.image;

  const waMessage = `Hola Autosuz CUU, me interesa consultar información y disponibilidad del vehículo ${vehicle.title} (${vehicle.year}). ¿Sigue disponible para prueba de manejo?`;

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content vehicle-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Mobile Header Bar with prominent close button */}
        <div className="vehicle-modal-mobile-header">
          <span className="mobile-header-title">{vehicle.title}</span>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Cerrar ficha"
          >
            <X size={18} />
            <span>Cerrar</span>
          </button>
        </div>

        {/* Floating circular close button for desktop */}
        <button
          type="button"
          className="lightbox-close-btn vehicle-modal-close-desktop"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="vehicle-modal-grid">
          {/* Column 1: Photo Carousel & Thumbnails */}
          <div className="modal-photo-column">
            <div className="modal-carousel-stage">
              <img
                src={currentPhoto}
                alt={`${vehicle.title} - Vista ${activePhotoIdx + 1}`}
                className="modal-carousel-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80';
                }}
              />

              {/* Photo counter */}
              <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                zIndex: 10
              }}>
                <Camera size={14} />
                <span>Foto {activePhotoIdx + 1} de {photos.length}</span>
              </div>

              {/* Navigation Arrows */}
              {hasMultiple && (
                <>
                  <button
                    type="button"
                    className="modal-carousel-btn modal-carousel-prev"
                    onClick={handlePrev}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    className="modal-carousel-btn modal-carousel-next"
                    onClick={handleNext}
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Horizontal Thumbnails Strip */}
            {hasMultiple && (
              <div className="modal-thumbnails-strip">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`modal-thumb-btn ${idx === activePhotoIdx ? 'active' : ''}`}
                    onClick={() => setActivePhotoIdx(idx)}
                    title={`Ver foto ${idx + 1}`}
                  >
                    <img
                      src={photo}
                      alt={`Miniatura ${idx + 1}`}
                      className="modal-thumb-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Details Content */}
          <div className="modal-details-column">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge variant="blue">{vehicle.category}</Badge>
              <Badge variant="success" icon={<ShieldCheck size={13} />}>Garantía Autosuz</Badge>
              {vehicle.hasRealPhotos && (
                <Badge variant="dark" icon={<Camera size={13} />}>Fotos Reales</Badge>
              )}
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {vehicle.title}
              </h3>
              <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>
                Modelo {vehicle.year} • Color: {vehicle.color || 'No especificado'}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
              background: 'rgba(255, 255, 255, 0.55)',
              padding: 14,
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.85)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                <Gauge size={16} color="var(--accent-blue)" />
                <span>{vehicle.mileage}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                <Calendar size={16} color="var(--accent-blue)" />
                <span>Año {vehicle.year}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                <Fuel size={16} color="var(--accent-blue)" />
                <span>{vehicle.rawCategory ? `Tipo: ${vehicle.rawCategory.toUpperCase()}` : 'Gasolina'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="var(--accent-blue)" />
                <span>Estado: {vehicle.status}</span>
              </div>
            </div>

            {/* Features Included */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: 10, color: 'var(--text-primary)' }}>
                Equipamiento &amp; Características:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {vehicle.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <Check size={14} color="#10b981" strokeWidth={3} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(15, 23, 42, 0.1)' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass btn-glass-whatsapp"
                style={{ width: '100%', boxSizing: 'border-box' }}
              >
                <MessageCircle size={18} className="wa-icon-green" />
                <span>Cotizar o Apartar por WhatsApp</span>
              </a>

              <button
                type="button"
                className="btn-glass"
                onClick={onClose}
                style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'center' }}
              >
                <X size={16} />
                <span>Cerrar Ficha</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
