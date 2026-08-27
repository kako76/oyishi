import React from 'react';
import { useSEO } from '../hooks/useSEO';

export const PrivacidadPage: React.FC = () => {
  useSEO({
    title: 'Política de Privacidad | OYISHI',
    description: 'Conoce cómo tratamos tus datos personales en OYISHI Gastronomía Japonesa.',
    path: '/privacidad'
  });

  return (
    <main className="pt-28 pb-20 bg-oyishi-bg min-h-screen text-oyishi-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <span className="text-xs font-mono text-oyishi-gold tracking-[0.3em] uppercase mb-2 block">Protección de Datos</span>
          <h1 className="text-3xl md:text-5xl font-display text-oyishi-text mb-4">POLÍTICA DE PRIVACIDAD</h1>
          <div className="w-16 h-0.5 bg-oyishi-gold mx-auto opacity-80" />
        </div>

        <div className="bg-oyishi-card border border-oyishi-border/80 rounded-2xl p-8 md:p-12 shadow-2xl space-y-8 text-sm md:text-base font-light leading-relaxed text-oyishi-textSec">
          
          <section>
            <h2 className="text-xl font-display text-oyishi-text mb-3">1. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos recabados en este sitio web es OYISHI Gastronomía Japonesa, con domicilio en Calle Leganés 42, 28945 Fuenlabrada, Madrid. Email de contacto: <a href="mailto:info@oyishi.es" className="text-oyishi-gold underline font-mono">info@oyishi.es</a>.
            </p>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">2. Finalidad del Tratamiento</h2>
            <p>
              Los datos facilitados telefónicamente o por correo electrónico serán utilizados exclusivamente para gestionar solicitudes de reserva de mesa, consultas sobre la carta o dudas sobre pedidos y servicios en nuestro establecimiento.
            </p>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">3. Legitimación y Conservación</h2>
            <p>
              La base legal para el tratamiento es el consentimiento del usuario al ponerse en contacto con el establecimiento. Los datos se conservarán durante el tiempo imprescindible para atender la solicitud.
            </p>
          </section>

          <section className="pt-6 border-t border-oyishi-border/50">
            <h2 className="text-xl font-display text-oyishi-text mb-3">4. Derechos del Usuario (GDPR)</h2>
            <p>
              Cualquier usuario puede ejercer sus derechos de acceso, rectificación, supresión, limitación y oposición enviando un correo electrónico a <a href="mailto:info@oyishi.es" className="text-oyishi-gold underline font-mono">info@oyishi.es</a> indicando como asunto "Protección de Datos".
            </p>
          </section>

        </div>

      </div>
    </main>
  );
};

export default PrivacidadPage;
