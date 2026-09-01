import React, { useState, useEffect } from 'react';
import { adminOrdersService } from '../services/adminOrdersService';
import { useSEO } from '../hooks/useSEO';
import { Save, Undo2, CheckCircle2, AlertCircle, LayoutTemplate, Type, Image as ImageIcon, Share2, Search, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminWebPage: React.FC = () => {
  const [originalConfig, setOriginalConfig] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');

  useSEO({
    title: 'Gestión Web | OYISHI Administrador',
    description: 'Gestión de contenidos web de OYISHI.',
    path: '/admin/web'
  });

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
  }, []);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/web-content');
      if (res.ok) {
        const data = await res.json();
        setOriginalConfig(JSON.parse(JSON.stringify(data)));
        setConfig(JSON.parse(JSON.stringify(data)));
      }
    } catch (err) {
      console.error('Error cargando configuración web:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const hasUnsavedChanges = JSON.stringify(originalConfig) !== JSON.stringify(config);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const token = adminOrdersService.getToken();
      const res = await fetch('/api/admin/web-content', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(true);
        setOriginalConfig(JSON.parse(JSON.stringify(config)));
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(data.error || 'Error al guardar configuración');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error de conexión');
    } finally {
      setIsSaving(false);
    }
  };

  const restoreOriginal = () => {
    if (window.confirm('¿Descartar todos los cambios no guardados?')) {
      setConfig(JSON.parse(JSON.stringify(originalConfig)));
      setSaveError('');
      setSaveSuccess(false);
    }
  };

  const handleChange = (section: string, field: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (isLoading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-oyishi-bg">
        <div className="text-oyishi-gold animate-pulse font-mono uppercase tracking-widest text-sm">
          Cargando configuración...
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', name: 'Portada', icon: LayoutTemplate },
    { id: 'about', name: 'Quiénes Somos', icon: Type },
    { id: 'featured', name: 'Destacados', icon: ImageIcon },
    { id: 'cta', name: 'Llamadas a la Acción', icon: Smartphone },
    { id: 'social', name: 'Redes Sociales', icon: Share2 },
    { id: 'seo', name: 'SEO', icon: Search }
  ];

  return (
    <div className="min-h-screen pb-20 bg-oyishi-bg text-oyishi-text">
      {/* Header Fijo */}
      <div className="bg-[#140F0C] border-b border-oyishi-border/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-display text-oyishi-text tracking-tight flex items-center gap-3">
              <span className="text-oyishi-gold">Gestión Web</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <span className="text-amber-400 text-xs font-mono flex items-center gap-1.5 animate-pulse mr-2">
                Hay cambios sin guardar
              </span>
            )}
            <button 
              onClick={restoreOriginal} 
              disabled={!hasUnsavedChanges || isSaving}
              className="px-4 py-2 border border-oyishi-border text-oyishi-textSec hover:text-white rounded hover:bg-oyishi-card transition-colors text-xs font-sans uppercase tracking-widest disabled:opacity-30 flex items-center gap-1.5"
            >
              <Undo2 size={14} /> Deshacer
            </button>
            <button 
              onClick={handleSave} 
              disabled={!hasUnsavedChanges || isSaving}
              className="px-6 py-2 bg-oyishi-coral text-white rounded hover:bg-oyishi-coralHover transition-colors flex items-center gap-2 font-bold text-xs font-sans uppercase tracking-widest disabled:opacity-50 shadow-[0_0_15px_rgba(216,179,106,0.15)]"
            >
              {isSaving ? 'Guardando...' : <><Save size={16} /> Guardar Cambios</>}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 hide-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap text-left ${
                    activeTab === tab.id 
                    ? 'bg-oyishi-gold/10 text-oyishi-gold border border-oyishi-gold/20' 
                    : 'text-oyishi-textSec hover:text-white hover:bg-oyishi-card border border-transparent'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-sans uppercase tracking-widest font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={18} /> {saveError}
            </div>
          )}
          
          {saveSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle2 size={18} /> Cambios guardados correctamente. (Recuerda que no afectarán la web pública hasta que se conecten).
            </motion.div>
          )}

          <div className="bg-[#140F0C] border border-oyishi-border/80 rounded-2xl overflow-hidden shadow-2xl p-6 lg:p-8">
            <AnimatePresence mode="wait">
              
              {activeTab === 'hero' && (
                <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-display text-white mb-6 border-b border-oyishi-border/50 pb-4">Portada / Hero</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Título Principal</label>
                      <input type="text" value={config.hero?.title || ''} onChange={e => handleChange('hero', 'title', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Subtítulo / Descripción</label>
                      <textarea rows={3} value={config.hero?.subtitle || ''} onChange={e => handleChange('hero', 'subtitle', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#1A1513] p-4 rounded border border-oyishi-border/50">
                        <label className="flex items-center justify-between mb-3 text-xs font-mono uppercase text-oyishi-gold">
                          Botón Carta
                          <input type="checkbox" checked={config.hero?.showButtonMenu !== false} onChange={e => handleChange('hero', 'showButtonMenu', e.target.checked)} className="accent-oyishi-gold" />
                        </label>
                        <input type="text" value={config.hero?.buttonMenuText || ''} onChange={e => handleChange('hero', 'buttonMenuText', e.target.value)} className="w-full bg-black border border-oyishi-border rounded p-2 text-sm text-oyishi-text focus:border-oyishi-gold outline-none" />
                      </div>
                      <div className="bg-[#1A1513] p-4 rounded border border-oyishi-border/50">
                        <label className="flex items-center justify-between mb-3 text-xs font-mono uppercase text-oyishi-gold">
                          Botón Pedir
                          <input type="checkbox" checked={config.hero?.showButtonOrder !== false} onChange={e => handleChange('hero', 'showButtonOrder', e.target.checked)} className="accent-oyishi-gold" />
                        </label>
                        <input type="text" value={config.hero?.buttonOrderText || ''} onChange={e => handleChange('hero', 'buttonOrderText', e.target.value)} className="w-full bg-black border border-oyishi-border rounded p-2 text-sm text-oyishi-text focus:border-oyishi-gold outline-none" />
                      </div>
                      <div className="bg-[#1A1513] p-4 rounded border border-oyishi-border/50">
                        <label className="flex items-center justify-between mb-3 text-xs font-mono uppercase text-oyishi-gold">
                          Botón Reservar
                          <input type="checkbox" checked={config.hero?.showButtonReserve !== false} onChange={e => handleChange('hero', 'showButtonReserve', e.target.checked)} className="accent-oyishi-gold" />
                        </label>
                        <input type="text" value={config.hero?.buttonReserveText || ''} onChange={e => handleChange('hero', 'buttonReserveText', e.target.value)} className="w-full bg-black border border-oyishi-border rounded p-2 text-sm text-oyishi-text focus:border-oyishi-gold outline-none" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-oyishi-border/50 mt-4">
                      <ImageUploader 
                        currentUrl={config.hero?.imageUrl || ''}
                        folder="web"
                        label="Imagen Principal (Fondo)"
                        onUploadSuccess={(url) => handleChange('hero', 'imageUrl', url)}
                        onRemove={() => handleChange('hero', 'imageUrl', '')}
                        helpText="Optimiza la imagen a WebP para reducir tiempos de carga."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex items-center justify-between mb-6 border-b border-oyishi-border/50 pb-4">
                    <h2 className="text-2xl font-display text-white">Quiénes Somos</h2>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono uppercase text-oyishi-gold">
                      Mostrar sección
                      <input type="checkbox" checked={config.about?.showSection !== false} onChange={e => handleChange('about', 'showSection', e.target.checked)} className="accent-oyishi-gold w-4 h-4" />
                    </label>
                  </div>
                  
                  <div className={`space-y-4 ${config.about?.showSection === false ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Título de Sección</label>
                      <input type="text" value={config.about?.title || ''} onChange={e => handleChange('about', 'title', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Texto Principal</label>
                      <textarea rows={2} value={config.about?.mainText || ''} onChange={e => handleChange('about', 'mainText', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Texto Secundario</label>
                      <textarea rows={4} value={config.about?.secondaryText || ''} onChange={e => handleChange('about', 'secondaryText', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div className="pt-4 border-t border-oyishi-border/50 mt-4">
                      <ImageUploader 
                        currentUrl={config.about?.imageUrl || ''}
                        folder="web"
                        label="Imagen Lateral"
                        onUploadSuccess={(url) => handleChange('about', 'imageUrl', url)}
                        onRemove={() => handleChange('about', 'imageUrl', '')}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'featured' && (
                <motion.div key="featured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex items-center justify-between mb-6 border-b border-oyishi-border/50 pb-4">
                    <h2 className="text-2xl font-display text-white">Destacados</h2>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono uppercase text-oyishi-gold">
                      Mostrar sección
                      <input type="checkbox" checked={config.featured?.showSection !== false} onChange={e => handleChange('featured', 'showSection', e.target.checked)} className="accent-oyishi-gold w-4 h-4" />
                    </label>
                  </div>
                  
                  <div className={`space-y-4 ${config.featured?.showSection === false ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Título de Sección</label>
                      <input type="text" value={config.featured?.title || ''} onChange={e => handleChange('featured', 'title', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Subtítulo</label>
                      <input type="text" value={config.featured?.subtitle || ''} onChange={e => handleChange('featured', 'subtitle', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Referencias de Productos (separadas por coma)</label>
                      <input 
                        type="text" 
                        value={(config.featured?.productIds || []).join(', ')} 
                        onChange={e => handleChange('featured', 'productIds', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
                        placeholder="ej. N05, V01, R03"
                        className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text font-mono focus:border-oyishi-gold outline-none" 
                      />
                      <p className="text-xs text-oyishi-textSec mt-2">Los productos se extraerán del catálogo actual. No introduzcas datos ficticios.</p>
                    </div>
                    <div className="pt-4 border-t border-oyishi-border/50 mt-4">
                      <ImageUploader 
                        currentUrl={config.featured?.imageUrl || ''}
                        folder="web"
                        label="Imagen Decorativa (Opcional)"
                        onUploadSuccess={(url) => handleChange('featured', 'imageUrl', url)}
                        onRemove={() => handleChange('featured', 'imageUrl', '')}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'cta' && (
                <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-display text-white mb-6 border-b border-oyishi-border/50 pb-4">Llamadas a la Acción (CTA)</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Teléfono Principal</label>
                      <input type="text" value={config.cta?.phone || ''} onChange={e => handleChange('cta', 'phone', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">WhatsApp</label>
                      <input type="text" value={config.cta?.whatsapp || ''} onChange={e => handleChange('cta', 'whatsapp', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Texto de Botón General de Contacto</label>
                      <input type="text" value={config.cta?.buttonText || ''} onChange={e => handleChange('cta', 'buttonText', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'social' && (
                <motion.div key="social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-display text-white mb-6 border-b border-oyishi-border/50 pb-4">Redes Sociales</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-[#1A1513] p-4 rounded border border-oyishi-border/50">
                      <span className="w-24 text-sm text-oyishi-text font-mono uppercase">Instagram</span>
                      <input type="text" value={config.social?.instagram || ''} onChange={e => handleChange('social', 'instagram', e.target.value)} placeholder="https://instagram.com/oyishi" className="flex-1 bg-black border border-oyishi-border rounded p-2 text-sm text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div className="flex items-center gap-4 bg-[#1A1513] p-4 rounded border border-oyishi-border/50">
                      <span className="w-24 text-sm text-oyishi-text font-mono uppercase">Facebook</span>
                      <input type="text" value={config.social?.facebook || ''} onChange={e => handleChange('social', 'facebook', e.target.value)} className="flex-1 bg-black border border-oyishi-border rounded p-2 text-sm text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div className="flex items-center gap-4 bg-[#1A1513] p-4 rounded border border-oyishi-border/50">
                      <span className="w-24 text-sm text-oyishi-text font-mono uppercase">TikTok</span>
                      <input type="text" value={config.social?.tiktok || ''} onChange={e => handleChange('social', 'tiktok', e.target.value)} placeholder="(Opcional)" className="flex-1 bg-black border border-oyishi-border rounded p-2 text-sm text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'seo' && (
                <motion.div key="seo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <h2 className="text-2xl font-display text-white mb-6 border-b border-oyishi-border/50 pb-4">SEO y Metadatos</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Título Global (meta title)</label>
                      <input type="text" value={config.seo?.title || ''} onChange={e => handleChange('seo', 'title', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Descripción (meta description)</label>
                      <textarea rows={3} value={config.seo?.description || ''} onChange={e => handleChange('seo', 'description', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                      <p className="text-xs text-oyishi-textSec mt-2">Recomendado: 150-160 caracteres.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-oyishi-gold mb-2">Texto de compartir (og:title)</label>
                      <input type="text" value={config.seo?.ogText || ''} onChange={e => handleChange('seo', 'ogText', e.target.value)} className="w-full bg-[#1A1513] border border-oyishi-border rounded p-3 text-oyishi-text focus:border-oyishi-gold outline-none" />
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
