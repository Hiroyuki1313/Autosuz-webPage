import React from 'react';
import { Check } from 'lucide-react';
import './Common.css';

/**
 * Reusable TextContent Component
 * Renders structured typography: lead paragraphs, body copy, and checkmark lists.
 */
export const TextContent = ({
  lead = '',
  body = '',
  features = [],
  children,
  className = ''
}) => {
  return (
    <div className={`ui-text-content ${className}`}>
      {lead && <p className="ui-text-lead">{lead}</p>}
      {body && <p className="ui-text-body">{body}</p>}
      
      {features.length > 0 && (
        <ul className="ui-feature-list">
          {features.map((feature, idx) => (
            <li key={idx} className="ui-feature-item">
              <span className="ui-feature-icon-wrapper">
                <Check size={14} strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
};

export default TextContent;
