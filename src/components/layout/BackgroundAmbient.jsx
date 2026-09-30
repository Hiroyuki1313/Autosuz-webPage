import React from 'react';

/**
 * BackgroundAmbient Component
 * Generates dynamic floating elements based on the reference image:
 * - 3D glossy black spheres with specular reflections
 * - Deep blurred black bokeh orbs
 * - Translucent water droplets / clear glass bubbles
 * All moving gently and subtly across the viewport.
 */
export const BackgroundAmbient = () => {
  return (
    <div className="ambient-scene" aria-hidden="true">
      {/* Soft blurred background mesh lights */}
      <div className="ambient-orb orb-light-1" />
      <div className="ambient-orb orb-light-2" />

      {/* Deep blurred black orbs (like in the reference photo) */}
      <div className="black-blur-orb black-blur-top-right drift-slow-1" />
      <div className="black-blur-orb black-blur-bottom-left drift-slow-2" />
      <div className="black-blur-orb black-blur-mid-left drift-slow-3" />

      {/* 3D Glossy Black Spheres (sharp with specular reflection) */}
      <div className="black-gloss-sphere sphere-black-1 drift-slow-4" />
      <div className="black-gloss-sphere sphere-black-2 drift-slow-2" />
      <div className="black-gloss-sphere sphere-black-small drift-slow-5" />

      {/* Translucent water-drop glass bubbles with specular reflections */}
      <div className="clear-glass-bubble bubble-glass-1 drift-slow-3" />
      <div className="clear-glass-bubble bubble-glass-2 drift-slow-1" />
      <div className="clear-glass-bubble bubble-glass-3 drift-slow-5" />
      <div className="clear-glass-bubble bubble-glass-mini drift-slow-4" />

      {/* Discrete subtle frosted glass blur veil across the background */}
      <div className="ambient-frosted-veil" />
    </div>
  );
};

export default BackgroundAmbient;
