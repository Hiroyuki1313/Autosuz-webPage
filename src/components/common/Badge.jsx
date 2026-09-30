import React from 'react';
import './Common.css';

/**
 * Reusable Badge / Pill Tag
 */
export const Badge = ({
  children,
  variant = 'default', // 'default', 'dark', 'success', 'blue'
  icon = null,
  className = '',
  onClick
}) => {
  return (
    <span
      className={`ui-badge ui-badge-${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="ui-badge-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
