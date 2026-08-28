import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { AnatomyOfFlavor } from '../components/AnatomyOfFlavor';
import { ReservationForm } from '../components/ReservationForm';
import { useSEO } from '../hooks/useSEO';

const FeaturedProductsSection = lazy(() => import('../components/FeaturedProductsSection'));

export const HomePage: React.FC = () => {
  useSEO({
    title: 'OYISHI | Restaurante Japonés en Fuenlabrada',
    description: 'Restaurante japonés OYISHI en Fuenlabrada. Descubre nuestra carta de sushi, nigiri, maki, uramaki, sashimi y cocina japonesa.',
    path: '/'
  });

  return (
    <main className="bg-oyishi-bg text-oyishi-text">
      <Hero />
      <AnatomyOfFlavor />

      <Suspense fallback={
        <div className="py-24 text-center text-oyishi-gold font-sans text-xs tracking-widest uppercase animate-pulse">
          Cargando Selección Gastronómica...
        </div>
      }>
        <FeaturedProductsSection />
      </Suspense>

      <ReservationForm />

      {/* Map Section (VERIFIED FUENLABRADA EMBED - Integrated Dark Atmosphere) */}
      <section className="h-[260px] md:h-[280px] w-full bg-oyishi-bg relative border-b border-oyishi-border/60 overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=Calle%20Legan%C3%A9s%2042,%2028945%20Fuenlabrada,%20Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps OYISHI Fuenlabrada"
          className="w-full h-full contrast-[1.05] brightness-[0.85] grayscale-[0.8] invert-[0.9] hue-rotate-[180deg] opacity-85 hover:opacity-100 transition-opacity duration-500"
        ></iframe>
      </section>
    </main>
  );
};
