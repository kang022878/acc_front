/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": any;
  }
}

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
      'auto-rotate'?: boolean;
      'auto-rotate-delay'?: string | number;
      'rotation-per-second'?: string;
      'camera-orbit'?: string;
      'camera-target'?: string;
      'field-of-view'?: string;
      'camera-controls'?: boolean;
        'disable-zoom'?: boolean;
        'shadow-intensity'?: string | number;
        exposure?: string | number;
      };
    }
  }
}

export {};
