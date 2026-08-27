import { useState, useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './store/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { HomePage } from './pages/HomePage';

const CartaPage = lazy(() => import('./pages/CartaPage').then(module => ({ default: module.CartaPage })));
const QuienesSomosPage = lazy(() => import('./pages/QuienesSomosPage').then(module => ({ default: module.QuienesSomosPage })));
const ReservasPage = lazy(() => import('./pages/ReservasPage').then(module => ({ default: module.ReservasPage })));
const ContactoPage = lazy(() => import('./pages/ContactoPage').then(module => ({ default: module.ContactoPage })));
const AvisoLegalPage = lazy(() => import('./pages/AvisoLegalPage').then(module => ({ default: module.AvisoLegalPage })));
const PrivacidadPage = lazy(() => import('./pages/PrivacidadPage').then(module => ({ default: module.PrivacidadPage })));
const CookiesPage = lazy(() => import('./pages/CookiesPage').then(module => ({ default: module.CookiesPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

export const navigateTo = (url: string) => {
  if (url.includes('#')) {
    const [, hash] = url.split('#');
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
    
    setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
    return;
  }

  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

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
      case '/':
        return <HomePage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-oyishi-bg text-oyishi-text font-sans flex flex-col selection:bg-oyishi-coral selection:text-white">
        <Header />
        
        <div className="flex-1">
          <Suspense fallback={
            <div className="pt-40 pb-24 text-center text-oyishi-gold font-mono text-xs tracking-widest uppercase animate-pulse">
              Cargando OYISHI Gastronomía...
            </div>
          }>
            {renderCurrentPage()}
          </Suspense>
        </div>

        <Footer />
        <CartModal />
      </div>
    </CartProvider>
  );
}

export default App;
