import React from 'react';
import { MapPin, MessageCircle, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import Container from '../common/Container';
import { COMPANY_INFO } from '../../data/companyInfo';
import './Footer.css';

/**
 * Reusable Glassmorphism Footer Component
 */
export const Footer = ({ onNavigateHome, onNavigateCatalog }) => {
  const handleLinkClick = (sectionId) => {
    if (sectionId === 'catalogo') {
      if (onNavigateCatalog) onNavigateCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigateHome) onNavigateHome();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="site-footer">
      <Container size="default">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Column 1: Brand & Slogan */}
            <div className="footer-col-brand">
              <img
                src="/assets/logo/logo.png"
                alt="Autosuz CUU"
                className="footer-logo-img"
              />
              <p className="footer-brand-desc">
                {COMPANY_INFO.description}
              </p>
              <div className="footer-meta-pill">
                <span className="footer-dot" />
                <span>Autos Certificados & Garantía Mecánica en Chihuahua</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="footer-heading">Secciones</h4>
              <ul className="footer-links-list">
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => handleLinkClick('inicio')}
                  >
                    <ArrowRight size={14} /> Inicio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => handleLinkClick('catalogo')}
                  >
                    <ArrowRight size={14} /> Catálogo de Autos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => handleLinkClick('clientes')}
                  >
                    <ArrowRight size={14} /> Nuestros Clientes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => handleLinkClick('ubicacion')}
                  >
                    <ArrowRight size={14} /> Dónde Encontrarnos
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details */}
            <div>
              <h4 className="footer-heading">Contacto</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <MessageCircle size={18} className="wa-icon-green" />
                  <div>
                    <strong>WhatsApp:</strong>
                    <br />
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-contact-link"
                      style={{ fontWeight: 600 }}
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Hours & Location */}
            <div>
              <h4 className="footer-heading">Horarios</h4>
              <div className="footer-schedule-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--text-primary)' }}>
                  <Clock size={15} />
                  <span>Horarios de Atención</span>
                </div>
                <div>{COMPANY_INFO.schedule.weekdays}</div>
                <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>{COMPANY_INFO.schedule.weekends}</div>
              </div>

              <div style={{ marginTop: 14 }} className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon" />
                <span style={{ fontSize: '0.875rem' }}>{COMPANY_INFO.address.full}</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div>
              © {new Date().getFullYear()} <strong>Autosuz CUU</strong>. Todos los derechos reservados.
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <span style={{ cursor: 'pointer' }}>Aviso de Privacidad</span>
              <span>•</span>
              <span style={{ cursor: 'pointer' }}>Términos de Compra</span>
              <span>•</span>
              <span style={{ cursor: 'pointer' }}>Revisión Mecánica en Orden</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
