import { useReducedMotion } from 'framer-motion';

// Luxe Ease Out cubic bezier curve - Japonesa Contemporánea
export const LUXE_EASE = [0.16, 1, 0.3, 1] as const;
export const FAST_EASE = [0.25, 1, 0.5, 1] as const;

// Custom hook helper to safely detect reduced motion preference
export function useIsReducedMotion() {
  const shouldReduceMotion = useReducedMotion();
  return Boolean(shouldReduceMotion);
}

// Fade up básico con ease refinado
export const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: LUXE_EASE,
    },
  },
};

// Animación staggered para cuadrículas de productos o categorías
export const staggerGridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Item individual dentro de contenedor staggered
export const staggerGridItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: LUXE_EASE,
    },
  },
};

// Revelado de cortina de imagen editorial (ClipPath seguro con porcentajes exactos)
export const editorialImageReveal = {
  hidden: {
    opacity: 0,
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    scale: 1.08
  },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    scale: 1,
    transition: {
      duration: 1.1,
      ease: LUXE_EASE,
    },
  },
};

// Animación ambiental de deriva y respiración de fondo
export const slowFloatingBackground: any = {
  animate: {
    scale: [1, 1.05, 1],
    y: [0, -10, 0],
    transition: {
      duration: 16,
      ease: 'easeInOut' as const,
      repeat: Infinity,
    },
  },
};

// Rotación lenta meditativa para el Anillo Ensō
export const ensoRotateVariant: any = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 90,
      ease: 'linear' as const,
      repeat: Infinity,
    },
  },
};

// Toast notification variant
export const toastVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: LUXE_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Reduced motion fallback variants
export const reducedMotionFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

// Elevación física 3D para tarjetas de menú
export const cardHover3D = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.015,
    transition: {
      duration: 0.35,
      ease: LUXE_EASE,
    },
  },
};
