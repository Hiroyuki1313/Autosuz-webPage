import React from 'react';
import './Common.css';

/**
 * Reusable Heading Component for consistent typography hierarchy
 */
export const Heading = ({
  level = 2,
  variant = 'section', // 'hero', 'section', 'card', 'sub'
  gradient = false,
  align = 'left', // 'left', 'center', 'right'
  children,
  className = '',
  style = {}
}) => {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
  const gradientClass = gradient ? 'ui-heading-gradient' : '';
  const alignClass = `align-${align}`;

  return (
    <Tag
      className={`ui-heading ui-heading-${variant} ${gradientClass} ${alignClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default Heading;
