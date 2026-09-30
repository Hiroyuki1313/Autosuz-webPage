import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyInfo';
import './Header.css';

/**
 * Sticky Header Component (edge-to-edge / start to end)
 * Navigation items: Inicio, Catálogo, Nuestros clientes, Dónde encontrarnos.
 * All items scroll smoothly except Catálogo, which navigates to a dedicated page view.
 */
export const Header = ({
  currentPage = 'home',
  onNavigateHome,
  onNavigateCatalog
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy when on home page
      if (currentPage === 'home') {
        const sections = ['inicio', 'clientes', 'ubicacion'];
        const scrollPosition = window.scrollY + 140;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);

    if (sectionId === 'catalogo') {
      if (onNavigateCatalog) onNavigateCatalog();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      if (onNavigateHome) onNavigateHome();
      // Wait for home page to mount, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand / Logo */}
        <div
          className="header-brand"
          onClick={() => handleNavClick('inicio')}
          role="button"
          tabIndex={0}
        >
          <img
            src="/assets/logo/logo.png"
            alt="Autosuz CUU Logo"
            className="header-logo-img"
            onError={(e) => {
              // Fallback text if image fails to render
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="header-nav" aria-label="Navegación principal">
          <div className="nav-pill-track">
            <button
              type="button"
              className={`nav-link-btn ${currentPage === 'home' && activeSection === 'inicio' ? 'active' : ''}`}
              onClick={() => handleNavClick('inicio')}
            >
              Inicio
            </button>

            <button
              type="button"
              className={`nav-link-btn ${currentPage === 'catalog' ? 'active' : ''}`}
              onClick={() => handleNavClick('catalogo')}
            >
              <span>Catálogo</span>
              <span className="catalog-badge-pill">Nuevo</span>
            </button>

            <button
              type="button"
              className={`nav-link-btn ${currentPage === 'home' && activeSection === 'clientes' ? 'active' : ''}`}
              onClick={() => handleNavClick('clientes')}
            >
              Nuestros clientes
            </button>

            <button
              type="button"
              className={`nav-link-btn ${currentPage === 'home' && activeSection === 'ubicacion' ? 'active' : ''}`}
              onClick={() => handleNavClick('ubicacion')}
            >
              Dónde encontrarnos
            </button>
          </div>
        </nav>

        {/* CTA / Action Button */}
        <div className="header-actions">
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass btn-glass-whatsapp header-cta-btn"
          >
            <MessageCircle size={17} className="wa-icon-green" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'home' && activeSection === 'inicio' ? 'active' : ''}`}
            onClick={() => handleNavClick('inicio')}
          >
            Inicio
          </button>

          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavClick('catalogo')}
          >
            <span>Catálogo de Vehículos</span>
            <span className="catalog-badge-pill">Ver Autos</span>
          </button>

          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'home' && activeSection === 'clientes' ? 'active' : ''}`}
            onClick={() => handleNavClick('clientes')}
          >
            Nuestros clientes
          </button>

          <button
            type="button"
            className={`nav-link-btn ${currentPage === 'home' && activeSection === 'ubicacion' ? 'active' : ''}`}
            onClick={() => handleNavClick('ubicacion')}
          >
            Dónde encontrarnos
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
