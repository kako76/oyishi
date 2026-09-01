import React, { useState, useEffect, useMemo } from 'react';
import { adminOrdersService } from '../services/adminOrdersService';
import { useCatalog } from '../hooks/useCatalog';
import { type OyishiProduct } from '../data/oyishi';
import { useSEO } from '../hooks/useSEO';
import {
  Lock,
  Search,
  Filter,
  Edit2,
  CheckCircle2,
  Save,
  X,
  AlertCircle,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploader } from '../components/admin/ImageUploader';

interface AdminOyishiProduct extends OyishiProduct {
  active?: boolean;
}

export const AdminContentPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!adminOrdersService.getToken());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { allProducts, categories, isLoading } = useCatalog();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('TODAS');
  
  const [editingProduct, setEditingProduct] = useState<AdminOyishiProduct | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local state to instantly reflect changes
  const [localProducts, setLocalProducts] = useState<AdminOyishiProduct[]>([]);

  useEffect(() => {
    if (allProducts.length > 0) {
      setLocalProducts(allProducts);
    }
  }, [allProducts]);

  useSEO({
    title: 'Panel de Contenido | OYISHI Administrador',
    description: 'Acceso privado de administración de contenido OYISHI.',
    path: '/admin/contenido'
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
      setLoginError(result.error || 'Contraseña incorrecta. Por favor, verifica las credenciales de acceso OYISHI.');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setIsSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const token = adminOrdersService.getToken();
      const method = editingProduct.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/products', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingProduct)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(true);
        // Update local state to reflect instantly
        if (editingProduct.id) {
          setLocalProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
        } else {
          setLocalProducts(prev => [...prev, { ...editingProduct, id: data.id }]);
        }
        setTimeout(() => {
          setEditingProduct(null);
          setSaveSuccess(false);
        }, 1500);
      } else {
        setSaveError(data.error || 'Error al guardar el producto');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Error de conexión');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!editingProduct || !editingProduct.id) return;
    const confirmDelete = window.confirm(
      "¿ESTÁS SEGURO?\n\nEliminar un producto puede ROMPER referencias de pedidos pasados de Retell o en curso.\nSe recomienda encarecidamente DESACTIVARLO en su lugar si el producto ya ha sido comercializado."
    );
    if (!confirmDelete) return;

    try {
      const token = adminOrdersService.getToken();
      const res = await fetch(`/api/admin/products?id=${editingProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLocalProducts(prev => prev.filter(p => p.id !== editingProduct.id));
        setEditingProduct(null);
      } else {
        alert(data.error || 'Error al eliminar el producto');
      }
    } catch (err: any) {
      alert(err.message || 'Error de conexión');
    }
  };

  const handleCreateNew = () => {
    setEditingProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      category: categories[0] || 'Entrantes',
      reference: '',
      allergens: [],
      active: true,
      imageUrl: '',
      allergenStatus: 'verified',
      imageStatus: 'missing',
      verified: true,
      source: 'oyishi.es',
      sourceUrl: ''
    });
  };

  const toggleProductActive = async (product: AdminOyishiProduct) => {
    const newActiveState = product.active === false ? true : false;
    const token = adminOrdersService.getToken();
    
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: product.id, active: newActiveState })
      });
      
      if (res.ok) {
        setLocalProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: newActiveState } : p));
      } else {
        alert('Error al cambiar estado del producto');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const filteredProducts = useMemo(() => {
    return localProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.reference && p.reference.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'TODAS' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [localProducts, searchQuery, categoryFilter]);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-oyishi-bg flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-oyishi-card border border-oyishi-border p-8 rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-oyishi-gold/10 border border-oyishi-gold/30 flex items-center justify-center text-oyishi-gold">
              <Lock size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-display text-center text-oyishi-text mb-2 tracking-tight">Acceso Restringido</h1>
          <p className="text-oyishi-textSec text-sm text-center mb-8 font-light">
            Panel de administración de contenido de OYISHI. Introduce la clave de acceso.
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
    <div className="min-h-screen pb-10 bg-oyishi-bg text-oyishi-text">
      {/* Header */}
      <div className="bg-[#140F0C] border-b border-oyishi-border/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-2xl font-display text-oyishi-text tracking-tight flex items-center gap-3">
              <span className="text-oyishi-gold">Gestión de Carta</span>
            </h1>
          </div>
          <button onClick={handleCreateNew} className="bg-oyishi-gold text-black font-bold font-sans text-xs uppercase tracking-widest px-4 py-2.5 rounded shadow-[0_0_15px_rgba(216,179,106,0.3)] hover:bg-yellow-400 transition-all flex items-center gap-2">
            <Plus size={16} /> Nuevo Producto
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filtros */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-oyishi-card border border-oyishi-border p-4 rounded-xl">
          <div className="flex items-center gap-4 w-full md:w-auto flex-1">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-oyishi-textSec" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o referencia..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1A1513] border border-oyishi-border rounded text-sm text-oyishi-text focus:outline-none focus:border-oyishi-gold"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-oyishi-textSec" size={16} />
              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="pl-10 pr-8 py-2 bg-[#1A1513] border border-oyishi-border rounded text-sm text-oyishi-text focus:outline-none focus:border-oyishi-gold appearance-none"
              >
                <option value="TODAS">Todas las categorías</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          
          <div className="text-sm text-oyishi-textSec font-mono">
            Mostrando: <span className="text-white">{filteredProducts.length}</span> / {localProducts.length} productos
          </div>
        </div>

        {/* Lista de productos */}
        {isLoading ? (
          <div className="text-center py-20 text-oyishi-gold animate-pulse font-mono uppercase tracking-widest text-sm">
            Cargando catálogo...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className={`bg-oyishi-card border ${product.active === false ? 'border-red-500/30 opacity-75' : 'border-oyishi-border/80'} rounded-xl overflow-hidden hover:border-oyishi-gold/50 transition-all duration-300 shadow-xl flex flex-col`}>
                <div className="h-32 bg-gradient-to-b from-[#F7F3EE] to-[#EDE7DF] flex items-center justify-center p-2 relative">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full object-contain drop-shadow-md" />
                  ) : (
                    <ImageIcon className="text-black/10" size={48} />
                  )}
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => toggleProductActive(product)}
                      className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${product.active === false ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}
                    >
                      {product.active === false ? 'INACTIVO' : 'ACTIVO'}
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className="font-display text-base text-oyishi-text">
                        {product.reference && <span className="text-oyishi-gold mr-1">{product.reference}.</span>}
                        {product.name}
                      </h3>
                      <span className="font-mono font-bold text-oyishi-gold">{product.price.toFixed(2)}€</span>
                    </div>
                    <span className="text-[10px] text-oyishi-textSec uppercase tracking-wider block mb-2">{product.category}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-oyishi-border/40 mt-4">
                    <button 
                      onClick={() => setEditingProduct({...product})}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-oyishi-bgSec border border-oyishi-border/80 rounded hover:border-oyishi-gold hover:text-oyishi-gold transition-colors text-xs font-sans uppercase tracking-widest"
                    >
                      <Edit2 size={14} /> Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Edición */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-oyishi-bg border border-oyishi-gold/30 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-oyishi-bg border-b border-oyishi-border/60 p-4 flex justify-between items-center z-10">
                <h2 className="text-xl font-display text-oyishi-text">{editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <button onClick={() => setEditingProduct(null)} className="text-oyishi-textSec hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Referencia (Editable con cuidado) */}
                  <div>
                    <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Referencia Comercial</label>
                    <input type="text" value={editingProduct.reference || ''} onChange={e => setEditingProduct({...editingProduct, reference: e.target.value.toUpperCase()})} className="w-full bg-[#1A1513] border border-oyishi-border text-oyishi-text focus:border-oyishi-gold outline-none rounded px-3 py-2 text-sm font-mono" />
                    <p className="text-[10px] text-oyishi-textSec mt-1">Cuidado al cambiarla si ya está en uso en Retell.</p>
                  </div>
                  
                  {/* Nombre */}
                  <div>
                    <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Nombre</label>
                    <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-[#1A1513] border border-oyishi-border rounded px-3 py-2 text-oyishi-text focus:border-oyishi-gold outline-none text-sm" required />
                  </div>
                  
                  {/* Categoría */}
                  <div>
                    <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Categoría</label>
                    <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-[#1A1513] border border-oyishi-border rounded px-3 py-2 text-oyishi-text focus:border-oyishi-gold outline-none text-sm appearance-none">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  
                  {/* Precio */}
                  <div>
                    <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Precio (€)</label>
                    <input type="number" step="0.01" min="0" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})} className="w-full bg-[#1A1513] border border-oyishi-border rounded px-3 py-2 text-oyishi-text focus:border-oyishi-gold outline-none text-sm font-mono" required />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Descripción</label>
                  <textarea value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} rows={3} className="w-full bg-[#1A1513] border border-oyishi-border rounded px-3 py-2 text-oyishi-text focus:border-oyishi-gold outline-none text-sm resize-none" />
                </div>
                
                {/* Alérgenos */}
                <div>
                  <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">Alérgenos (separados por coma)</label>
                  <input type="text" value={(editingProduct.allergens || []).join(', ')} onChange={e => setEditingProduct({...editingProduct, allergens: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full bg-[#1A1513] border border-oyishi-border rounded px-3 py-2 text-oyishi-text focus:border-oyishi-gold outline-none text-sm" placeholder="Ej: SOJA, PESCADO, GLUTEN" />
                </div>

                {/* URL de Imagen */}
                <ImageUploader 
                  currentUrl={editingProduct.imageUrl || ''}
                  folder="products"
                  onUploadSuccess={(url) => setEditingProduct({...editingProduct, imageUrl: url})}
                  onRemove={() => setEditingProduct({...editingProduct, imageUrl: ''})}
                  helpText="Sube una imagen optimizada (JPG, PNG o WEBP). Máximo 5MB."
                />

                {/* Estado */}
                <div className="flex items-center gap-3 bg-oyishi-card p-4 rounded-lg border border-oyishi-border">
                  <input type="checkbox" id="activeCheckbox" checked={editingProduct.active !== false} onChange={e => setEditingProduct({...editingProduct, active: e.target.checked})} className="w-4 h-4 accent-oyishi-gold" />
                  <label htmlFor="activeCheckbox" className="text-sm font-medium cursor-pointer flex-1">
                    Producto Activo (Visible en Carta)
                  </label>
                </div>

                {saveError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} /> {saveError}
                  </div>
                )}
                
                {saveSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle2 size={16} /> Producto guardado correctamente
                  </div>
                )}

                <div className="pt-4 border-t border-oyishi-border flex justify-between items-center sticky bottom-0 bg-oyishi-bg">
                  {editingProduct.id ? (
                    <button type="button" onClick={handleDeleteProduct} className="text-red-400 hover:text-red-300 transition-colors text-xs font-sans uppercase tracking-widest flex items-center gap-1.5 p-2">
                      <Trash2 size={14} /> Eliminar
                    </button>
                  ) : (
                    <div />
                  )}
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2 border border-oyishi-border text-oyishi-text rounded hover:bg-oyishi-card transition-colors text-xs font-sans uppercase tracking-widest">
                      Cancelar
                    </button>
                    <button type="submit" disabled={isSaving} className="px-6 py-2 bg-oyishi-coral text-white rounded hover:bg-oyishi-coralHover transition-colors flex items-center gap-2 font-bold text-xs font-sans uppercase tracking-widest disabled:opacity-50">
                      {isSaving ? 'Guardando...' : <><Save size={16} /> Guardar</>}
                    </button>
                  </div>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
