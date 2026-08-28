import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './store/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { navigateTo } from './utils/navigation';
import { useIsReducedMotion } from './utils/motionVariants';

const CartaPage = lazy(() => import('./pages/CartaPage').then(module => ({ default: module.CartaPage })));
const QuienesSomosPage = lazy(() => import('./pages/QuienesSomosPage').then(module => ({ default: module.QuienesSomosPage })));
const ReservasPage = lazy(() => import('./pages/ReservasPage').then(module => ({ default: module.ReservasPage })));
const ContactoPage = lazy(() => import('./pages/ContactoPage').then(module => ({ default: module.ContactoPage })));
const AvisoLegalPage = lazy(() => import('./pages/AvisoLegalPage').then(module => ({ default: module.AvisoLegalPage })));
const PrivacidadPage = lazy(() => import('./pages/PrivacidadPage').then(module => ({ default: module.PrivacidadPage })));
const CookiesPage = lazy(() => import('./pages/CookiesPage').then(module => ({ default: module.CookiesPage })));
const AdminOrdersPage = lazy(() => import('./pages/AdminOrdersPage').then(module => ({ default: module.AdminOrdersPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

function PageContainer({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  const isReduced = useIsReducedMotion();

  if (isReduced) {
    return <div key={pageKey}>{children}</div>;
  }

  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const normalizePath = (path: string): string => {
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
};

import { StickyMobileCTA } from './components/StickyMobileCTA';

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handleLocationChange = () => {
      let rawPath = window.location.pathname;
      if (rawPath === '/pedidos' || rawPath === '/pedidos/') {
        window.history.replaceState({}, '', '/carta');
        rawPath = '/carta';
      }
      const newPath = normalizePath(rawPath);
      setCurrentPath(newPath);

      // Track SPA page_view in GA4 if measurement ID is provided
      const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      if (gaId && typeof window.gtag === 'function') {
        window.gtag('config', gaId, { page_path: newPath });
      }
    };

    // Run once on mount for direct visits & initial tracking
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Intercept local links for seamless SPA navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      if (target.target === '_blank' || target.hasAttribute('download')) return;

      const href = target.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:')
      ) {
        return;
      }

      if (
        href.startsWith('/') ||
        href.startsWith('#')
      ) {
        e.preventDefault();
        navigateTo(href);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/pedidos':
      case '/carta':
        return <CartaPage />;
      case '/quienes-somos':
        return <QuienesSomosPage />;
      case '/reservas':
        return <ReservasPage />;
      case '/contacto':
        return <ContactoPage />;
      case '/aviso-legal':
        return <AvisoLegalPage />;
      case '/privacidad':
        return <PrivacidadPage />;
      case '/cookies':
        return <CookiesPage />;
      case '/admin/pedidos':
        return <AdminOrdersPage />;
      case '/':
        return <HomePage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-oyishi-bg text-oyishi-text font-sans flex flex-col selection:bg-oyishi-coral selection:text-white pb-16 md:pb-0">
        <Header />

        <div className="flex-1">
          <Suspense fallback={
            <div className="pt-40 pb-24 text-center text-oyishi-gold font-mono text-xs tracking-widest uppercase animate-pulse">
              Cargando OYISHI Gastronomía...
            </div>
          }>
            <AnimatePresence mode="wait">
              <PageContainer pageKey={currentPath}>
                {renderCurrentPage()}
              </PageContainer>
            </AnimatePresence>
          </Suspense>
        </div>

        <Footer />
        <CartModal />
        <Toast />
        <StickyMobileCTA />
      </div>
    </CartProvider>
  );
}

export default App;
