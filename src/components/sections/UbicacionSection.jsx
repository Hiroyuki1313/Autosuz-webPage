import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Coffee, Car, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { COMPANY_INFO } from '../../data/companyInfo';
import './Sections.css';

/**
 * UbicacionSection Component (Web Presentation Style)
 * Open editorial showcase layout for showroom visit, map and direct contact.
 */
export const UbicacionSection = () => {
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.8764109037206!2d-106.12448912384164!3d28.663418982676315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea43004979782f%3A0xaeffea71cd070394!2sSeminuevos%20AutoSuz!5e0!3m2!1ses!2smx!4v1790798136652!5m2!1ses!2smx`;
  const externalMapsLink = `https://maps.google.com/?q=Seminuevos+AutoSuz+Chihuahua`;

  return (
    <section id="ubicacion" className="section-spacing">
      <Container size="default">
        {/* Section Header */}
        <SectionTitle
          badgeText="SHOWROOM &amp; ATENCIÓN EN CUU"
          title="Dónde Encontrarnos en"
          titleHighlight="Chihuahua"
          subtitle="Diseñamos un espacio donde elegir tu próximo auto sea una experiencia cómoda, transparente y sin prisas. Ven a conocer las unidades en persona."
          align="center"
          showDots={true}
          showDivider={true}
          showPill={false}
        />

        {/* Presentation Stage (Editorial Narrative + Panoramic Viewport) */}
        <div className="ubicacion-presentation-stage">
          {/* Left Column: Editorial Presentation */}
          <div className="ubicacion-editorial-col">
            <h3 className="ubicacion-headline">
              Tu próximo destino comienza aquí.
            </h3>

            <p className="ubicacion-story">
              Visítanos en Av. Francisco Villa para recibir asesoría personalizada. Disfruta un café de cortesía, revisa físicamente cada detalle del vehículo que te interesa y sal para tu prueba de manejo.
            </p>

            <div className="ubicacion-flow-list">
              <div className="ubicacion-flow-item">
                <div className="ubicacion-flow-icon">
                  <MapPin size={20} />
                </div>
                <div className="ubicacion-flow-text">
                  <h4>Ubicación Privilegiada</h4>
                  <p>{COMPANY_INFO.address.full}</p>
                </div>
              </div>

              <div className="ubicacion-flow-item">
                <div className="ubicacion-flow-icon">
                  <Clock size={20} />
                </div>
                <div className="ubicacion-flow-text">
                  <h4>Horarios</h4>
                  <p>
                    {COMPANY_INFO.schedule.weekdays} <br />
                    {COMPANY_INFO.schedule.weekends}
                  </p>
                </div>
              </div>

              <div className="ubicacion-flow-item">
                <div className="ubicacion-flow-icon">
                  <Phone size={20} />
                </div>
                <div className="ubicacion-flow-text">
                  <h4>Línea Telefónica Directa</h4>
                  <p>{COMPANY_INFO.phoneFormatted} • Atención Inmediata</p>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href={externalMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass"
              >
                <ExternalLink size={16} />
                <span>Cómo Llegar en Google Maps</span>
              </a>

              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass btn-glass-whatsapp"
              >
                <MessageCircle size={16} className="wa-icon-green" />
                <span>Agendar Cita / Prueba de Manejo</span>
              </a>
            </div>
          </div>

          {/* Right Column: Panoramic Map Viewport */}
          <div className="ubicacion-map-panoramic">
            <iframe
              title="Ubicación Autosuz CUU"
              src={googleMapsUrl}
              className="map-panoramic-iframe"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* Showroom Amenities Horizontal Ribbon */}
        <div className="showroom-amenities-ribbon">
          <div className="amenity-item">
            <div className="amenity-bullet-glass">
              <Coffee size={16} />
            </div>
            <span className="amenity-label">Café &amp; Sala de Espera Climatizada</span>
          </div>

          <div className="amenity-item">
            <div className="amenity-bullet-glass">
              <Car size={16} />
            </div>
            <span className="amenity-label">Pruebas de Manejo Inmediatas</span>
          </div>

          <div className="amenity-item">
            <div className="amenity-bullet-glass">
              <CheckCircle2 size={16} />
            </div>
            <span className="amenity-label">Estacionamiento Privado Clientes</span>
          </div>

          <div className="amenity-item">
            <div className="amenity-bullet-glass">
              <ShieldCheck size={16} />
            </div>
            <span className="amenity-label">Avalúo de tu Auto en 15 Minutos</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UbicacionSection;
