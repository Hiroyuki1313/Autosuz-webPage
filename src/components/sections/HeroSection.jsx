import React from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, MessageCircle, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import { COMPANY_INFO } from '../../data/companyInfo';
import './Sections.css';

/**
 * HeroSection Component (Web Presentation Style)
 * Open editorial showcase layout without rigid container boxes.
 */
export const HeroSection = ({ onNavigateCatalog, onScrollToClientes }) => {
  return (
    <section id="inicio" className="hero-presentation-wrapper">
      <Container size="default">
        {/* Main 2-Column Presentation Grid */}
        <div className="hero-two-column-stage">
          {/* Column 1: Presentation Header & CTAs */}
          <div className="hero-presentation-header">
            {/* Top Indicator bar with dots & badge matching reference image */}
            <div className="glass-indicator-bar" style={{ margin: '0 0 20px' }}>
              <div className="dots-group" aria-hidden="true">
                <span className="dot-item active" />
                <span className="dot-item" />
                <span className="dot-item" />
                <span className="dot-item" />
                <span className="dot-item" />
              </div>
              <span className="indicator-badge-text">AUTOSUZ CUU • ESTILO &amp; POTENCIA</span>
            </div>

            {/* Presentation Headline */}
            <h1 className="hero-presentation-title">
              Estrena con Estilo. <br />
              <span className="ui-heading-gradient">Maneja con Confianza.</span>
            </h1>

            <div className="hero-tagline-badge">
              <span>TRANSPARENCIA &amp; SEGURIDAD</span>
            </div>

            <p className="hero-presentation-lead">
              Redefiniendo la compra y venta de autos seminuevos en Chihuahua. Inspección certificada en cada detalle, transparencia absoluta y el respaldo que tu familia merece.
            </p>

            {/* Floating Action Buttons */}
            <div className="hero-presentation-actions">
              <button
                type="button"
                className="btn-glass btn-glass-primary"
                onClick={onNavigateCatalog}
                id="cta-catalog-btn"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-glass"
                onClick={onScrollToClientes}
              >
                <Star size={16} color="#eab308" fill="#eab308" />
                <span>Nuestros Clientes</span>
              </button>

              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass btn-glass-whatsapp"
              >
                <MessageCircle size={18} className="wa-icon-green" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Visual Car Showcase Stage */}
          <div className="hero-showcase-stage">
            <div className="hero-car-viewport">
              <img
                src="/assets/untilted.png"
                alt="Vehículo Seminuevo Certificado en Autosuz CUU"
                className="hero-car-img"
              />

              {/* Floating Glass Hotspot Badges */}
              <div className="hero-hotspot-pill hotspot-top-left">
                <ShieldCheck size={16} color="#0284c7" />
                <span>Revisión en Orden</span>
              </div>

              <div className="hero-hotspot-pill hotspot-top-right">
                <Sparkles size={16} color="#eab308" />
                <span>Crédito 24 Hrs</span>
              </div>

              <div className="hero-hotspot-pill hotspot-bottom-left">
                <CheckCircle2 size={16} color="#10b981" />
                <span>Garantía Escrita</span>
              </div>

              <div className="hero-hotspot-pill hotspot-bottom-right">
                <RefreshCw size={16} color="#0284c7" />
                <span>Auto a Cuenta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Gray Line Divider without circle */}
        <div className="subtle-divider-line" style={{ margin: '36px auto 30px' }} />

        {/* Open Editorial Presentation Pillars (Clean headings & descriptions) */}
        <div className="hero-presentation-pillars">
          <div className="presentation-pillar-item">
            <h3 className="pillar-title">Revisión de Confianza</h3>
            <p className="pillar-desc">
              Cada unidad pasa por una exhaustiva verificación mecánica, eléctrica, de suspensión y legal antes de exhibirse.
            </p>
          </div>

          <div className="presentation-pillar-item">
            <h3 className="pillar-title">Financiamiento</h3>
            <p className="pillar-desc">
              Planes con financieras líderes y bancos en Chihuahua. Te brindamos total facilidad de crédito a tu medida para estrenar rápido.
            </p>
          </div>

          <div className="presentation-pillar-item">
            <h3 className="pillar-title">Tomamos tu Auto</h3>
            <p className="pillar-desc">
              Recibimos tu vehículo anterior a cuenta con un avalúo transparente el mismo día para que estrenes sin demoras.
            </p>
          </div>

          <div className="presentation-pillar-item">
            <h3 className="pillar-title">Garantía por Escrito</h3>
            <p className="pillar-desc">
              Póliza de garantía formal en motor y transmisión para viajar con entera tranquilidad en carretera y ciudad.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
