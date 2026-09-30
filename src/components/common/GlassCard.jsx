import React from 'react';
import './Common.css';

/**
 * Reusable Glassmorphism Card Container
 * Models the frosted glass texture, specular border, and elevation seen in the reference design.
 */
export const GlassCard = ({
  children,
  variant = 'default', // 'default', 'elevated', 'hero', 'subtle'
  interactive = false,
  padding = 'md', // 'none', 'sm', 'md', 'lg', 'xl'
  className = '',
  onClick,
  style = {}
}) => {
  const variantClass = variant !== 'default' ? `glass-card-${variant}` : '';
  const interactiveClass = interactive ? 'glass-card-interactive' : '';
  const paddingClass = padding !== 'none' ? `p-${padding}` : '';

  return (
    <div
      className={`glass-card ${variantClass} ${interactiveClass} ${paddingClass} ${className}`.trim()}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
