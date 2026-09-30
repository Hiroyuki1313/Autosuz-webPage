import React from 'react';
import './Common.css';

/**
 * Reusable Container Component for controlling responsive max-widths and margins.
 */
export const Container = ({
  children,
  size = 'default', // 'default' (1280px), 'narrow' (960px), 'wide' (1440px), 'full'
  className = '',
  id,
  style = {}
}) => {
  return (
    <div
      id={id}
      className={`ui-container ui-container-${size} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
