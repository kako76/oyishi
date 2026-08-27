import React from 'react';
import { MapPin, Phone, Mail, Clock, CalendarCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-oyishi-bg border-t border-oyishi-border/60 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Logo & Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-oyishi-gold text-[#120E0C] flex items-center justify-center font-display text-2xl font-bold shadow-[0_0_15px_rgba(216,179,106,0.3)]">
                和
              </div>
              <h2 className="font-display text-2xl font-bold tracking-widest text-oyishi-text">
                OYISHI
              </h2>
            </div>
            <p className="text-oyishi-textSec italic font-serif mb-6 text-base max-w-sm">"Gastronomía japonesa en Fuenlabrada."</p>
            
            <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider text-oyishi-textSec mb-6">
              <a href="/" className="hover:text-oyishi-gold transition-colors focus-ring">Inicio</a>
              <span>·</span>
              <a href="/carta" className="hover:text-oyishi-gold transition-colors focus-ring">Carta</a>
              <span>·</span>
              <a href="/quienes-somos" className="hover:text-oyishi-gold transition-colors focus-ring">Quiénes Somos</a>
              <span>·</span>
              <a href="/reservas" className="hover:text-oyishi-gold transition-colors focus-ring">Reservas</a>
              <span>·</span>
              <a href="/contacto" className="hover:text-oyishi-gold transition-colors focus-ring">Contacto</a>
            </div>


          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono text-oyishi-gold tracking-[0.2em] uppercase mb-6">Contacto Directo</h4>
            <ul className="space-y-3 text-sm text-oyishi-textSec font-light">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="mt-1 text-oyishi-gold shrink-0" />
                <a 
                  href="/contacto"
                  className="hover:text-oyishi-text transition-colors focus-ring leading-relaxed text-sm"
                >
                  Calle Leganés 42, 28945<br/>Fuenlabrada, Madrid
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={16} className="text-oyishi-gold shrink-0" />
                <a href="tel:+34918626221" className="hover:text-oyishi-text transition-colors font-mono focus-ring text-xs">918 626 221</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={16} className="text-oyishi-gold shrink-0" />
                <a href="tel:+34699365212" className="hover:text-oyishi-text transition-colors font-mono focus-ring text-xs">699 365 212</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={16} className="text-oyishi-gold shrink-0" />
                <a href="mailto:info@oyishi.es" className="hover:text-oyishi-text transition-colors focus-ring text-xs">info@oyishi.es</a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h4 className="text-xs font-mono text-oyishi-gold tracking-[0.2em] uppercase mb-6">Horario de Apertura</h4>
            <ul className="space-y-3 text-sm text-oyishi-textSec font-light">
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 text-oyishi-gold shrink-0" />
                <div>
                  <p className="text-oyishi-text font-medium mb-1 text-xs">De Lunes a Domingo</p>
                  <p className="font-mono text-xs text-oyishi-textSec">12:00 – 16:30 (Almuerzo)</p>
                  <p className="font-mono text-xs text-oyishi-textSec mt-1">19:30 – 24:00 (Cena)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Reservas */}
          <div>
            <h4 className="text-xs font-mono text-oyishi-gold tracking-[0.2em] uppercase mb-6">Reservas</h4>
            <div className="space-y-4 text-xs font-mono text-oyishi-textSec">
              <p className="font-sans font-light text-xs leading-relaxed">Atención telefónica directa para consultar disponibilidad y confirmar tu mesa.</p>
              <a 
                href="/reservas"
                className="btn-shimmer inline-flex items-center gap-2 px-4 py-2.5 bg-oyishi-gold text-[#120E0C] font-bold rounded hover:bg-white transition-all duration-300"
              >
                <CalendarCheck size={14} />
                <span>RESERVAR MESA</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-oyishi-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-oyishi-textSec uppercase tracking-wider">
          <p>© 2026 OYISHI Gastronomía Japonesa. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a 
              href="/aviso-legal" 
              className="hover:text-oyishi-gold transition-colors focus-ring py-1 flex items-center"
            >
              Aviso Legal
            </a>
            <a 
              href="/privacidad" 
              className="hover:text-oyishi-gold transition-colors focus-ring py-1 flex items-center"
            >
              Privacidad
            </a>
            <a 
              href="/cookies" 
              className="hover:text-oyishi-gold transition-colors focus-ring py-1 flex items-center"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
