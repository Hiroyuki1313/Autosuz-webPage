import React from 'react';
import GlassCard from './GlassCard';
import Heading from './Heading';
import Badge from './Badge';
import './Common.css';

/**
 * Reusable FeatureCard Component
 * Frosted glass card containing an icon bubble, badge, title and description
 */
export const FeatureCard = ({
  icon,
  title,
  description,
  badge = '',
  className = '',
  onClick
}) => {
  return (
    <GlassCard interactive padding="none" className={`feature-card-wrapper ${className}`} onClick={onClick}>
      <div className="feature-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="feature-icon-bubble">
            {icon}
          </div>
          {badge && <Badge variant="blue">{badge}</Badge>}
        </div>

        <Heading level={3} variant="card">
          {title}
        </Heading>

        <p className="ui-text-body" style={{ margin: 0, fontSize: '0.95rem' }}>
          {description}
        </p>
      </div>
    </GlassCard>
  );
};

export default FeatureCard;
