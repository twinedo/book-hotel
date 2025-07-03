import React, { useEffect, useRef } from 'react';
import { RenderAuth } from '../../pages/auth';

export function VanillaAuthWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    
      const vanillaRoot = document.createElement('div');
      containerRef.current.appendChild(vanillaRoot);
      
      RenderAuth();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} />;
}