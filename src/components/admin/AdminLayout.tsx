import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminOrdersService } from '../../services/adminOrdersService';
import { 
  LayoutDashboard, 
  MenuSquare, 
  Globe, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  CalendarDays, 
  Bot, 
  Settings,
  LogOut,
  Lock,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPath, onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!adminOrdersService.getToken());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check auth on path change in case token is removed
    setIsAuthenticated(!!adminOrdersService.getToken());
  }, [currentPath]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    const result = await adminOrdersService.login(passwordInput);
    setIsLoggingIn(false);

    if (result.success) {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      setLoginError(result.error || 'Contraseña incorrecta.');
    }
  };

  const handleLogout = () => {
    adminOrdersService.logout();
    setIsAuthenticated(false);
    onNavigate('/admin');
  };

  const navItems = [
    { name: 'Inicio', path: '/admin', icon: LayoutDashboard },
    { name: 'Carta', path: '/admin/carta', icon: MenuSquare },
    { name: 'Web', path: '/admin/web', icon: Globe },
    { name: 'Horarios', path: '/admin/horarios', icon: Clock },
    { name: 'Restaurante', path: '/admin/restaurante', icon: MapPin },
    { name: 'Pedidos', path: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Reservas', path: '/admin/reservas', icon: CalendarDays },
    { name: 'Andrea', path: '/admin/andrea', icon: Bot },
    { name: 'Configuración', path: '/admin/configuracion', icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-oyishi-bg flex items-center justify-center p-4 selection:bg-oyishi-coral selection:text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-oyishi-card border border-oyishi-border p-8 rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-oyishi-gold/10 border border-oyishi-gold/30 flex items-center justify-center text-oyishi-gold">
              <Lock size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-display text-center text-oyishi-text mb-2 tracking-tight">Acceso Restringido</h1>
          <p className="text-oyishi-textSec text-sm text-center mb-8 font-light">
            Panel de administración maestro de OYISHI. Introduce la clave de acceso.
          </p>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-sans text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Clave de Seguridad</label>
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#1A1513] border border-oyishi-border/80 rounded px-4 py-3 text-oyishi-text focus:outline-none focus:border-oyishi-gold transition-colors font-mono text-sm"
                placeholder="••••••••" required disabled={isLoggingIn} />
            </div>
            {loginError && <div className="text-red-400 text-xs text-center font-sans">{loginError}</div>}
            <button type="submit" disabled={isLoggingIn}
              className="w-full py-3 bg-oyishi-coral text-white font-sans text-xs tracking-widest uppercase font-bold rounded hover:bg-oyishi-coralHover transition-colors disabled:opacity-50">
              {isLoggingIn ? 'Verificando...' : 'Acceder al Panel'}
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-oyishi-bg flex flex-col md:flex-row selection:bg-oyishi-coral selection:text-white font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#140F0C] border-b border-oyishi-border/60 p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3 text-oyishi-gold">
          <div className="w-8 h-8 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 flex items-center justify-center font-display">和</div>
          <span className="font-display tracking-widest">OYISHI ADMIN</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-oyishi-text">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'fixed inset-0 z-40 bg-[#140F0C] pt-20' : 'hidden'}
        md:block md:w-64 md:shrink-0 bg-[#140F0C] border-r border-oyishi-border/60 flex flex-col h-screen sticky top-0
      `}>
        <div className="hidden md:flex p-6 items-center gap-3 border-b border-oyishi-border/40">
          <div className="w-10 h-10 rounded-sm bg-oyishi-gold/15 border border-oyishi-gold/30 flex items-center justify-center font-display text-xl text-oyishi-gold">和</div>
          <div>
            <h2 className="font-display text-lg text-oyishi-text tracking-widest">OYISHI</h2>
            <span className="text-[10px] text-oyishi-textSec uppercase tracking-widest block">Panel Maestro</span>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <span className="text-[10px] text-oyishi-textSec/70 font-semibold uppercase tracking-widest ml-3 mb-3 block">Menú Principal</span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left font-medium
                    ${isActive 
                      ? 'bg-oyishi-gold/10 text-oyishi-gold border border-oyishi-gold/20' 
                      : 'text-oyishi-textSec hover:text-white hover:bg-oyishi-card border border-transparent'
                    }`}
                >
                  <Icon size={18} className={isActive ? 'text-oyishi-gold' : 'text-oyishi-textSec/70'} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-oyishi-border/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm transition-colors font-medium text-left"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-oyishi-bg min-h-screen relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};
