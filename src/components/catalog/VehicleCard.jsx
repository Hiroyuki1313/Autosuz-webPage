import React, { useState } from 'react';
import { Gauge, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import './Catalog.css';

/**
 * VehicleCard Component with Photo Carousel
 * Cycles through photos from MySQL fotos_url with arrows and indicators.
 */
export const VehicleCard = ({ vehicle, onOpenDetails }) => {
  const [photoIdx, setPhotoIdx] = useState(0);

  const photos = vehicle.photos && vehicle.photos.length > 0
    ? vehicle.photos
    : [vehicle.image];

  const hasMultiplePhotos = photos.length > 1;

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setPhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setPhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const currentPhoto = photos[photoIdx] || vehicle.image;

  return (
    <GlassCard interactive padding="sm" className="vehicle-card">
      <div className="vehicle-img-wrapper" onClick={() => onOpenDetails(vehicle)} style={{ cursor: 'pointer' }}>
        <img
          src={currentPhoto}
          alt={`${vehicle.title} - Foto ${photoIdx + 1}`}
          className="vehicle-card-img"
          loading="lazy"
          onError={(e) => {
            // graceful fallback if an image link is broken
            e.target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80';
          }}
        />
        <span className="vehicle-category-tag">{vehicle.category}</span>
        
        {/* Photo count badge */}
        {hasMultiplePhotos && (
          <span className="carousel-photo-badge">
            <Camera size={12} />
            <span>{photoIdx + 1}/{photos.length}</span>
          </span>
        )}

        {/* Carousel Arrow Controls & Tap Zones */}
        {hasMultiplePhotos && (
          <>
            {/* Left Tap Zone */}
            <div
              className="carousel-tap-zone tap-zone-left"
              onClick={handlePrevPhoto}
              aria-label="Foto anterior"
            />

            {/* Right Tap Zone */}
            <div
              className="carousel-tap-zone tap-zone-right"
              onClick={handleNextPhoto}
              aria-label="Foto siguiente"
            />

            <button
              type="button"
              className="carousel-btn carousel-btn-prev"
              onClick={handlePrevPhoto}
              title="Foto anterior"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="carousel-btn carousel-btn-next"
              onClick={handleNextPhoto}
              title="Foto siguiente"
              aria-label="Foto siguiente"
            >
              <ChevronRight size={18} />
            </button>

            {/* Bottom dots */}
            <div className="carousel-dots-row">
              {photos.slice(0, 7).map((_, idx) => (
                <span
                  key={idx}
                  className={`carousel-dot ${idx === photoIdx ? 'active' : ''}`}
                />
              ))}
              {photos.length > 7 && (
                <span style={{ fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>+</span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="vehicle-card-content">
        <h3
          className="vehicle-title-year"
          onClick={() => onOpenDetails(vehicle)}
          style={{ cursor: 'pointer' }}
        >
          {vehicle.title}
        </h3>

        <div className="vehicle-specs-chips">
          <span className="spec-chip">
            <Gauge size={13} /> {vehicle.mileage}
          </span>
          <span className="spec-chip">
            <ShieldCheck size={13} /> {vehicle.color || 'Certificado'}
          </span>
          <span className="spec-chip">
            Año {vehicle.year}
          </span>
        </div>

        <div className="vehicle-actions-row">
          <button
            type="button"
            className="btn-glass btn-card-details"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => onOpenDetails(vehicle)}
          >
            <span>Ver Ficha ({photos.length} {photos.length === 1 ? 'foto' : 'fotos'})</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default VehicleCard;
