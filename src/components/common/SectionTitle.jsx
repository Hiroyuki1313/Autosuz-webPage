import React from 'react';
import Heading from './Heading';
import './Common.css';

/**
 * Reusable SectionTitle Component
 * Directly captures the design elements from the reference image:
 * [● ○ ○ ○ ○ ⊞  BADGE]
 * Big title
 * Subtitle description
 * Optional [+] divider and split metadata
 */
export const SectionTitle = ({
  badgeText = '',
  title = '',
  titleHighlight = '',
  subtitle = '',
  align = 'center', // 'center' or 'left'
  showDots = true,
  showDivider = false,
  showPill = true,
  metadata = null, // e.g. { left: "CALIDAD", right: "GARANTÍA" }
  className = ''
}) => {
  return (
    <div className={`section-title-wrapper ${align} ${className}`}>
      {badgeText && (
        <div className="glass-indicator-bar">
          {showDots && (
            <div className="dots-group" aria-hidden="true">
              <span className="dot-item active" />
              <span className="dot-item" />
              <span className="dot-item" />
              <span className="dot-item" />
              <span className="dot-item" />
            </div>
          )}
          <span className="indicator-badge-text">{badgeText}</span>
        </div>
      )}

      <Heading level={2} variant="section" align={align} gradient={false}>
        {title}{' '}
        {titleHighlight && (
          <span className="ui-heading-gradient">{titleHighlight}</span>
        )}
      </Heading>

      {subtitle && (
        <p className={`section-subtitle ${align === 'center' ? 'align-center' : ''}`}>
          {subtitle}
        </p>
      )}

      {showDivider && (
        showPill ? (
          <div className="glass-cross-divider">
            <div className="glass-cross-pill" title="Autosuz CUU">
              +
            </div>
          </div>
        ) : (
          <div className="subtle-divider-line" />
        )
      )}

      {metadata && (
        <div className="split-metadata-bar">
          <span className="split-meta-item">{metadata.left}</span>
          <span className="split-meta-divider" />
          <span className="split-meta-item">{metadata.right}</span>
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
