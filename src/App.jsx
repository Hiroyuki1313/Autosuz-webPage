import React, { useState } from 'react';
import BackgroundAmbient from './components/layout/BackgroundAmbient';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ClientesSection from './components/sections/ClientesSection';
import UbicacionSection from './components/sections/UbicacionSection';
import CatalogPage from './components/catalog/CatalogPage';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from './data/companyInfo';
import './index.css';

/**
 * Main Application Component for Autosuz CUU
 * Implements a glassmorphic & neumorphic design with:
 * - Edge-to-edge sticky header
 * - Single-scroll home sections: Inicio, Nuestros Clientes, Dónde Encontrarnos
 * - Dedicated Catalog page view pushed on demand
 * - Reusable typography, container and content components
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'catalog'

  const navigateToCatalog = () => {
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToClientes = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('clientes');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('clientes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="autosuz-app">
      {/* Background Glass Orbs & Ambient Bubbles */}
      <BackgroundAmbient />

      {/* Sticky Header spanning start to end */}
      <Header
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateCatalog={navigateToCatalog}
      />

      {/* Dynamic View Routing */}
      {currentPage === 'home' ? (
        <main className="main-content-scrollview">
          {/* Section: Inicio (Hero & Value Propositions) */}
          <HeroSection
            onNavigateCatalog={navigateToCatalog}
            onScrollToClientes={scrollToClientes}
          />

          {/* Section: Nuestros Clientes (Real Deliveries & Testimonials) */}
          <ClientesSection />

          {/* Section: Dónde Encontrarnos (Showroom, Maps & Hours) */}
          <UbicacionSection />
        </main>
      ) : (
        /* Dedicated Page: Catálogo */
        <CatalogPage onNavigateHome={navigateToHome} />
      )}

      {/* Reusable Glassmorphism Footer */}
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateCatalog={navigateToCatalog}
      />

      {/* Floating Glass WhatsApp Action Pill */}
      <a
        href={COMPANY_INFO.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-pill"
        title="Chatear con un asesor de Autosuz"
        aria-label="Contacto por WhatsApp"
      >
        <MessageCircle size={24} className="wa-icon-green" />
        <span className="wa-tooltip-text">¿Dudas? Chatea con nosotros</span>
      </a>

      {/* Global Inline styles for floating widget */}
      <style>{`
        .floating-wa-pill {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.82);
          color: var(--text-primary);
          border: 1.5px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12), inset 0 1px 1px #fff;
          backdrop-filter: blur(16px);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, background-color 0.3s;
        }

        .floating-wa-pill:hover {
          background: rgba(255, 255, 255, 0.96);
          color: var(--accent-navy);
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.16), inset 0 1px 1px #fff;
        }

        .wa-tooltip-text {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .floating-wa-pill {
            bottom: 20px;
            right: 20px;
            padding: 12px;
          }
          .wa-tooltip-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
