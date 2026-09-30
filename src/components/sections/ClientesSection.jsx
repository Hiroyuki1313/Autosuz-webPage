import React, { useState } from 'react';
import { X } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { CLIENTES_PHOTOS, CLIENTES_DATA } from '../../data/clientesData';
import './Sections.css';

/**
 * ClientesSection Component
 * Default mode: Seamless infinite floating photo marquee (from right to left).
 * Prepared architecture: Toggleable to review cards grid in the future if needed.
 */
export const ClientesSection = ({ mode = 'floating' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Duplicate photos for seamless infinite horizontal loop
  const marqueePhotos = [...CLIENTES_PHOTOS, ...CLIENTES_PHOTOS];

  return (
    <section id="clientes" className="section-spacing" style={{ overflow: 'hidden' }}>
      <Container size="default">
        {/* Section Title */}
        <SectionTitle
          badgeText="CONFIANZA &amp; RESULTADOS"
          title="Nuestros Clientes en"
          titleHighlight="Autosuz CUU"
          subtitle="Cada entrega representa el fruto de un esfuerzo y la confianza depositada en nuestro equipo. Conoce las familias y profesionistas que ya están rodando con Autosuz."
          align="center"
          showDots={true}
          showDivider={true}
          showPill={false}
        />
      </Container>

      {/* Floating Gallery Mode (Photos drifting slowly from right to left) */}
      {mode === 'floating' && (
        <div className="clientes-marquee-container">
          <div className="clientes-marquee-track">
            {marqueePhotos.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="cliente-photo-frame"
                onClick={() => setSelectedPhoto(item.image)}
                title="Ver entrega en tamaño completo"
              >
                <img
                  src={item.image}
                  alt={`Entrega de vehículo seminuevo en Autosuz CUU #${index + 1}`}
                  className="cliente-photo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Future Card Reviews Mode (Preserved & ready to switch anytime) */}
      {mode === 'cards' && (
        <Container size="default">
          <div className="clientes-grid">
            {CLIENTES_DATA.map((cliente) => (
              <div
                key={cliente.id}
                className="cliente-card"
                onClick={() => setSelectedPhoto(cliente.image)}
              >
                <div className="cliente-img-container">
                  <img
                    src={cliente.image}
                    alt={`Entrega a ${cliente.name}`}
                    className="cliente-img"
                    loading="lazy"
                  />
                </div>
                <div className="cliente-body">
                  <span className="cliente-name">{cliente.name}</span>
                  <p className="cliente-quote">"{cliente.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Lightbox when clicking any photo */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div
            className="lightbox-content cliente-photo-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Cerrar foto"
            >
              <X size={20} />
            </button>
            <img
              src={selectedPhoto}
              alt="Entrega Autosuz ampliada"
              className="cliente-photo-modal-img"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientesSection;
