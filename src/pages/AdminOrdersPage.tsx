import React, { useState, useEffect, useCallback } from 'react';
import { adminOrdersService, type RetellOrder } from '../services/adminOrdersService';
import {
  Lock,
  LogOut,
  RefreshCw,
  Phone,
  Calendar,
  Clock,
  Users,
  ShoppingBag,
  FileText,
  CheckCircle2,
  Clock3,
  Utensils,
  ChefHat,
  PackageCheck,
  ChevronRight,
  X,
  Bot,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type DateFilter = 'hoy' | 'ayer' | 'semana' | 'todos';
type StatusFilter = 'TODOS' | 'NUEVO' | 'CONFIRMADO' | 'PREPARANDO' | 'LISTO' | 'COMPLETADO';

const normalizeOrderItems = (items: any): any[] => {
  if (Array.isArray(items)) return items;
  if (typeof items === 'string') {
    try {
      const parsed = JSON.parse(items);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [{ name: items, quantity: 1 }];
    }
  }
  if (items && typeof items === 'object') {
    return [items];
  }
  return [];
};

export const AdminOrdersPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!adminOrdersService.getToken());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [orders, setOrders] = useState<RetellOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<RetellOrder | null>(null);

  const [dateFilter, setDateFilter] = useState<DateFilter>('todos');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('TODOS');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useSEO({
    title: 'Panel de Pedidos | OYISHI Administrador',
    description: 'Acceso privado de administración de pedidos OYISHI.',
    path: '/admin/pedidos'
  });

  // Ensure search engines do not index admin page
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
  }, []);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await adminOrdersService.getOrders();
      const normalizedData = data.map(order => ({
        ...order,
        order_items: normalizeOrderItems(order.order_items)
      }));
      setOrders(normalizedData);
    } catch (err) {
      console.error('Error cargando pedidos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, loadOrders]);

  // Polling automático cada 15s para recibir nuevos pedidos en tiempo real
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      loadOrders();
    }, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, loadOrders]);

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

  const handleLogout = () => {
    adminOrdersService.logout();
    setIsAuthenticated(false);
    setOrders([]);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (id: string, newStatus: RetellOrder['status']) => {
    const success = await adminOrdersService.updateOrderStatus(id, newStatus);
    if (success) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteOrder = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('¿Seguro que quieres eliminar este pedido? Esta acción no se puede deshacer.')) {
      setIsDeleting(id);
      const result = await adminOrdersService.deleteOrder(id);
      if (result.success) {
        setOrders(prev => prev.filter(o => o.id !== id));
        if (selectedOrder?.id === id) {
          setSelectedOrder(null);
        }
        // Minimal visual feedback is handled by state update automatically removing it
      } else {
        alert(result.error || 'No se pudo eliminar el pedido');
      }
      setIsDeleting(null);
    }
  };

  const handleExportExcel = () => {
    try {
      const dataToExport = orders.map(order => ({
        ID: order.id,
        Fecha: order.date,
        Hora: order.time,
        Cliente: order.customer_name,
        Teléfono: order.phone,
        Personas: order.party_size,
        Productos: order.order_items ? order.order_items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ') : '',
        Notas: order.notes,
        Estado: order.status,
        Total: order.total
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
      
      const dateStr = new Date().toISOString().split('T')[0];
      XLSX.writeFile(workbook, `oyishi-pedidos-${dateStr}.xlsx`);
    } catch (error) {
      console.error("Error al exportar Excel:", error);
      alert("Se produjo un error al exportar el archivo Excel.");
    }
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF('landscape');
      
      const dateStr = new Date().toISOString().split('T')[0];
      doc.setFontSize(18);
      doc.text('OYISHI - Listado de pedidos', 14, 22);
      doc.setFontSize(11);
      doc.text(`Generado el: ${dateStr}`, 14, 30);

      const tableData = orders.map(order => [
        order.date,
        order.time,
        order.customer_name,
        order.phone,
        order.party_size,
        order.order_items ? order.order_items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ') : '',
        order.notes || '',
        order.status,
        `${order.total}€`
      ]);

      autoTable(doc, {
        startY: 36,
        head: [['Fecha', 'Hora', 'Cliente', 'Teléfono', 'Personas', 'Productos', 'Notas', 'Estado', 'Total']],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [216, 179, 106] } // Color oyishi-gold
      });

      doc.save(`oyishi-pedidos-${dateStr}.pdf`);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Se produjo un error al exportar el archivo PDF.");
    }
  };

  // Filtrado de datos
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = yesterdayObj.toISOString().split('T')[0];

  const filteredOrders = orders.filter(order => {
    // Filtro por fecha
    if (dateFilter === 'hoy' && order.date !== todayStr) return false;
    if (dateFilter === 'ayer' && order.date !== yesterdayStr) return false;
    if (dateFilter === 'semana') {
      const orderDate = new Date(order.date).getTime();
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      if (orderDate < weekAgo) return false;
    }

    // Filtro por estado
    if (statusFilter !== 'TODOS' && order.status !== statusFilter) return false;

    return true;
  });

  const countByStatus = (st: RetellOrder['status']) => orders.filter(o => o.status === st).length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-oyishi-bg flex items-center justify-center px-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-oyishi-card border border-oyishi-border/80 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold mx-auto mb-4 shadow-[0_0_30px_rgba(216,179,106,0.2)]">
              <Lock size={26} />
            </div>
            <span className="text-[10px] font-sans font-medium text-oyishi-gold tracking-[0.35em] uppercase block mb-1">
              Acceso Exclusivo Personal
            </span>
            <h1 className="text-2xl font-display text-oyishi-text tracking-wide uppercase">
              PANEL DE PEDIDOS OYISHI
            </h1>
            <p className="text-xs text-oyishi-textSec mt-2 font-light">
              Punto de control administrativo para reservas y pedidos del agente telefónico.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-oyishi-textSec uppercase tracking-widest mb-2">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-oyishi-bg border border-oyishi-border/80 rounded-xl px-4 py-3 text-oyishi-text placeholder-oyishi-textSec/40 focus:outline-none focus:border-oyishi-gold text-sm font-mono tracking-widest transition-colors"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-lg text-red-200 text-xs text-center font-sans">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-shimmer w-full py-3.5 bg-oyishi-coral text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-oyishi-coralHover transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <RefreshCw size={16} className="animate-spin text-white" />
              ) : (
                <>
                  <Lock size={15} />
                  <span>ACCEDER AL PANEL DE CONTROL</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-oyishi-border/40 text-center">
            <span className="text-[10px] font-mono text-oyishi-textSec/60 tracking-widest uppercase block">
              OYISHI System Security Protocol • Cloudflare Serverless
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-oyishi-bg text-oyishi-text">
      {/* Header Superior del Panel Admin */}
      <div className="bg-oyishi-card/80 border-b border-oyishi-border/80 backdrop-blur-md sticky top-16 z-30 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-oyishi-gold/15 border border-oyishi-gold/40 flex items-center justify-center text-oyishi-gold font-display text-lg">
              管理
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display text-oyishi-text tracking-wide uppercase">
                  PEDIDOS OYISHI
                </h1>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  EN VIVO
                </span>
              </div>
              <p className="text-xs text-oyishi-textSec font-light">
                Panel de gestión de comandas y reservas del Agente Telefónico Retell AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                autoRefresh
                  ? 'bg-oyishi-gold/15 border-oyishi-gold/40 text-oyishi-gold'
                  : 'bg-oyishi-bg border-oyishi-border text-oyishi-textSec'
              }`}
            >
              <Clock3 size={13} />
              <span>Auto-refresh: {autoRefresh ? '15s' : 'Pausado'}</span>
            </button>

            <button
              onClick={loadOrders}
              disabled={isLoading}
              className="p-2 rounded-lg bg-oyishi-bg border border-oyishi-border/80 text-oyishi-gold hover:border-oyishi-gold transition-colors"
              title="Recargar datos ahora"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/60 text-red-300 hover:bg-red-900/60 text-xs font-sans font-medium transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Contadores por Estado */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div
            onClick={() => setStatusFilter(statusFilter === 'NUEVO' ? 'TODOS' : 'NUEVO')}
            className={`cursor-pointer bg-oyishi-card border rounded-xl p-4 transition-all ${
              statusFilter === 'NUEVO'
                ? 'border-oyishi-gold shadow-[0_0_20px_rgba(216,179,106,0.25)]'
                : 'border-oyishi-border/80 hover:border-oyishi-gold/50'
            }`}
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-mono font-medium tracking-widest uppercase">NUEVOS</span>
              <Bot size={18} />
            </div>
            <div className="text-3xl font-display text-amber-400 font-bold">
              {countByStatus('NUEVO')}
            </div>
            <span className="text-[10px] text-oyishi-textSec/70 mt-1 block">Esperando confirmación</span>
          </div>

          <div
            onClick={() => setStatusFilter(statusFilter === 'CONFIRMADO' ? 'TODOS' : 'CONFIRMADO')}
            className={`cursor-pointer bg-oyishi-card border rounded-xl p-4 transition-all ${
              statusFilter === 'CONFIRMADO'
                ? 'border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.2)]'
                : 'border-oyishi-border/80 hover:border-blue-400/50'
            }`}
          >
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs font-mono font-medium tracking-widest uppercase">CONFIRMADOS</span>
              <CheckCircle2 size={18} />
            </div>
            <div className="text-3xl font-display text-blue-400 font-bold">
              {countByStatus('CONFIRMADO')}
            </div>
            <span className="text-[10px] text-oyishi-textSec/70 mt-1 block">Aceptados por cocina</span>
          </div>

          <div
            onClick={() => setStatusFilter(statusFilter === 'PREPARANDO' ? 'TODOS' : 'PREPARANDO')}
            className={`cursor-pointer bg-oyishi-card border rounded-xl p-4 transition-all ${
              statusFilter === 'PREPARANDO'
                ? 'border-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.2)]'
                : 'border-oyishi-border/80 hover:border-orange-400/50'
            }`}
          >
            <div className="flex items-center justify-between text-orange-400 mb-2">
              <span className="text-xs font-mono font-medium tracking-widest uppercase">PREPARANDO</span>
              <ChefHat size={18} />
            </div>
            <div className="text-3xl font-display text-orange-400 font-bold">
              {countByStatus('PREPARANDO')}
            </div>
            <span className="text-[10px] text-oyishi-textSec/70 mt-1 block">En barra / cocina</span>
          </div>

          <div
            onClick={() => setStatusFilter(statusFilter === 'LISTO' ? 'TODOS' : 'LISTO')}
            className={`cursor-pointer bg-oyishi-card border rounded-xl p-4 transition-all ${
              statusFilter === 'LISTO'
                ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                : 'border-oyishi-border/80 hover:border-emerald-400/50'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-mono font-medium tracking-widest uppercase">LISTOS</span>
              <Utensils size={18} />
            </div>
            <div className="text-3xl font-display text-emerald-400 font-bold">
              {countByStatus('LISTO')}
            </div>
            <span className="text-[10px] text-oyishi-textSec/70 mt-1 block">Listos para entrega</span>
          </div>

          <div
            onClick={() => setStatusFilter(statusFilter === 'COMPLETADO' ? 'TODOS' : 'COMPLETADO')}
            className={`cursor-pointer bg-oyishi-card border rounded-xl p-4 transition-all ${
              statusFilter === 'COMPLETADO'
                ? 'border-slate-400 shadow-[0_0_20px_rgba(148,163,184,0.2)]'
                : 'border-oyishi-border/80 hover:border-slate-400/50'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono font-medium tracking-widest uppercase">COMPLETADOS</span>
              <PackageCheck size={18} />
            </div>
            <div className="text-3xl font-display text-slate-300 font-bold">
              {countByStatus('COMPLETADO')}
            </div>
            <span className="text-[10px] text-oyishi-textSec/70 mt-1 block">Servidos / Finalizados</span>
          </div>
        </div>

        {/* Barra de Filtros (Fechas + Estados) */}
        <div className="bg-oyishi-card border border-oyishi-border/80 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">

          {/* Filtros por Fecha */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-oyishi-textSec uppercase tracking-wider mr-2">FECHA:</span>
            {(['hoy', 'ayer', 'semana', 'todos'] as DateFilter[]).map(df => (
              <button
                key={df}
                onClick={() => setDateFilter(df)}
                className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-all uppercase tracking-wider font-medium ${
                  dateFilter === df
                    ? 'bg-oyishi-gold text-[#120E0C] font-bold shadow-md'
                    : 'bg-oyishi-bg text-oyishi-textSec hover:text-oyishi-text'
                }`}
              >
                {df === 'hoy' ? 'Hoy' : df === 'ayer' ? 'Ayer' : df === 'semana' ? 'Esta semana' : 'Todos'}
              </button>
            ))}
          </div>

          {/* Filtros por Estado */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-oyishi-textSec uppercase tracking-wider mr-2">ESTADO:</span>
            {(['TODOS', 'NUEVO', 'CONFIRMADO', 'COMPLETADO'] as StatusFilter[]).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-all uppercase tracking-wider font-medium ${
                  statusFilter === st
                    ? 'bg-oyishi-coral text-white font-bold shadow-md'
                    : 'bg-oyishi-bg text-oyishi-textSec hover:text-oyishi-text'
                }`}
              >
                {st === 'TODOS' ? 'Todos' : st}
              </button>
            ))}
          </div>
          
          {/* Botones de Exportación */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleExportExcel}
              className="px-3 py-1.5 rounded-lg bg-[#1D6F42]/20 border border-[#1D6F42]/50 text-[#21A366] hover:bg-[#1D6F42]/40 transition-colors text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <FileSpreadsheet size={14} />
              <span>Descargar Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-900/60 transition-colors text-xs font-sans font-medium flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>

        {/* Lista de Pedidos */}
        {filteredOrders.length === 0 ? (
          <div className="bg-oyishi-card border border-oyishi-border/80 rounded-2xl p-12 text-center my-8">
            <Bot size={40} className="text-oyishi-gold/40 mx-auto mb-4" />
            <h3 className="text-xl font-display text-oyishi-text mb-2">No se encontraron pedidos</h3>
            <p className="text-sm text-oyishi-textSec max-w-md mx-auto font-light">
              No hay pedidos que coincidan con los filtros seleccionados ({dateFilter} - {statusFilter}).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-oyishi-card border rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  order.status === 'NUEVO'
                    ? 'border-amber-400/80 shadow-[0_0_25px_rgba(217,119,6,0.15)]'
                    : 'border-oyishi-border/80 hover:border-oyishi-gold/60'
                }`}
              >
                <div>
                  {/* Badge de Origen y Estado */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-sans font-medium text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 uppercase tracking-widest flex items-center gap-1.5">
                      <Bot size={13} />
                      AGENTE TELEFÓNICO
                    </span>

                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value as RetellOrder['status'])}
                      className={`text-xs font-mono px-3 py-1 rounded-lg border font-bold uppercase focus:outline-none cursor-pointer ${
                        order.status === 'NUEVO' ? 'bg-amber-950/80 border-amber-500 text-amber-300' :
                        order.status === 'CONFIRMADO' ? 'bg-blue-950/80 border-blue-500 text-blue-300' :
                        order.status === 'PREPARANDO' ? 'bg-orange-950/80 border-orange-500 text-orange-300' :
                        order.status === 'LISTO' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' :
                        'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      <option value="NUEVO">NUEVO</option>
                      <option value="CONFIRMADO">CONFIRMADO</option>
                      <option value="PREPARANDO">PREPARANDO</option>
                      <option value="LISTO">LISTO</option>
                      <option value="COMPLETADO">COMPLETADO</option>
                    </select>
                  </div>

                  {/* Nombre Cliente & Teléfono */}
                  <div className="mb-4">
                    <h3 className="font-display text-xl text-oyishi-text mb-1 flex items-center justify-between">
                      <span>{order.customer_name}</span>
                      {order.total > 0 && (
                        <span className="font-mono text-lg font-bold text-oyishi-gold">{order.total.toFixed(2)}€</span>
                      )}
                    </h3>

                    <a
                      href={`tel:${order.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-oyishi-gold/90 hover:underline"
                    >
                      <Phone size={13} />
                      <span>{order.phone}</span>
                    </a>
                  </div>

                  {/* Fecha & Hora & Personas */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-oyishi-bg/70 rounded-xl border border-oyishi-border/40 text-xs mb-4">
                    <div>
                      <span className="text-[9px] font-mono text-oyishi-textSec/70 block uppercase">Fecha</span>
                      <span className="font-mono text-oyishi-text font-medium flex items-center gap-1">
                        <Calendar size={12} className="text-oyishi-gold" />
                        {order.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-oyishi-textSec/70 block uppercase">Hora</span>
                      <span className="font-mono text-oyishi-text font-medium flex items-center gap-1">
                        <Clock size={12} className="text-oyishi-gold" />
                        {order.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-oyishi-textSec/70 block uppercase">Personas</span>
                      <span className="font-mono text-oyishi-text font-medium flex items-center gap-1">
                        <Users size={12} className="text-oyishi-gold" />
                        {order.party_size} p.
                      </span>
                    </div>
                  </div>

                  {/* Productos Solicitados */}
                  {order.order_items && order.order_items.length > 0 && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-oyishi-textSec uppercase tracking-wider block mb-2">
                        Contenido del Pedido ({order.order_items.length}):
                      </span>
                      <ul className="space-y-1 text-xs">
                        {order.order_items.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex justify-between items-center text-oyishi-text/90">
                            <span className="truncate pr-2">• {item.quantity}x {item.name}</span>
                            {item.price && <span className="font-mono text-oyishi-textSec">{(item.price * item.quantity).toFixed(2)}€</span>}
                          </li>
                        ))}
                        {order.order_items.length > 3 && (
                          <li className="text-[11px] font-mono text-oyishi-gold pt-1 italic">
                            + {order.order_items.length - 3} producto(s) más...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Observaciones */}
                  {order.notes && (
                    <div className="p-2.5 bg-oyishi-gold/10 border border-oyishi-gold/20 rounded-lg text-xs text-oyishi-textSec mb-4">
                      <span className="font-sans font-medium text-oyishi-gold block text-[10px] uppercase mb-0.5">Observaciones:</span>
                      <p className="font-light italic line-clamp-2">{order.notes}</p>
                    </div>
                  )}
                </div>

                {/* Footer Tarjeta */}
                <div className="pt-4 border-t border-oyishi-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-oyishi-textSec/60">
                      ID: {order.agent_call_id.substring(0, 14)}
                    </span>
                    <button
                      onClick={(e) => handleDeleteOrder(order.id, e)}
                      disabled={isDeleting === order.id}
                      className="text-red-400 hover:text-red-300 transition-colors p-1.5 rounded-lg hover:bg-red-900/30 disabled:opacity-50"
                      title="Eliminar pedido"
                    >
                      {isDeleting === order.id ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs font-sans text-oyishi-gold hover:text-white flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>Ver detalle completo</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalle Completo del Pedido */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-oyishi-card border border-oyishi-border rounded-2xl max-w-xl w-full p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 p-2 text-oyishi-textSec hover:text-white rounded-full bg-oyishi-bg/80 border border-oyishi-border/80 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-sans font-medium text-oyishi-gold bg-oyishi-gold/15 px-3 py-1 rounded-full border border-oyishi-gold/30 uppercase tracking-widest flex items-center gap-1.5">
                  <Bot size={13} />
                  RETEL AI AGENT CALL
                </span>
                <span className="font-mono text-xs text-oyishi-textSec">
                  {selectedOrder.created_at.replace('T', ' ').substring(0, 16)}
                </span>
              </div>

              <h2 className="text-2xl font-display text-oyishi-text mb-1">
                {selectedOrder.customer_name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <a
                  href={`tel:${selectedOrder.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-mono text-oyishi-gold hover:underline flex items-center gap-1.5"
                >
                  <Phone size={14} />
                  {selectedOrder.phone}
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-oyishi-bg rounded-xl border border-oyishi-border/80 mb-6 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-oyishi-textSec block uppercase">Fecha Reserva</span>
                  <span className="font-mono text-oyishi-text font-bold">{selectedOrder.date}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-oyishi-textSec block uppercase">Hora</span>
                  <span className="font-mono text-oyishi-text font-bold">{selectedOrder.time}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-oyishi-textSec block uppercase">Comensales</span>
                  <span className="font-mono text-oyishi-text font-bold">{selectedOrder.party_size} personas</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono text-oyishi-gold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShoppingBag size={14} />
                  <span>Productos de la Comanda</span>
                </h4>
                <div className="bg-oyishi-bg rounded-xl p-4 border border-oyishi-border/60 space-y-2">
                  {selectedOrder.order_items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-oyishi-text font-medium">{item.quantity}x {item.name}</span>
                      {item.price && (
                        <span className="font-mono text-oyishi-gold">{(item.price * item.quantity).toFixed(2)}€</span>
                      )}
                    </div>
                  ))}
                  {selectedOrder.total > 0 && (
                    <div className="pt-3 border-t border-oyishi-border/60 flex justify-between items-center text-base font-bold">
                      <span className="text-oyishi-text uppercase font-display">TOTAL ESTIMADO</span>
                      <span className="font-mono text-oyishi-gold text-lg">{selectedOrder.total.toFixed(2)}€</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-oyishi-gold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FileText size={14} />
                    <span>Notas del Agente / Instrucciones</span>
                  </h4>
                  <div className="p-3 bg-oyishi-bg rounded-xl border border-oyishi-border/60 text-xs text-oyishi-textSec leading-relaxed font-light">
                    {selectedOrder.notes}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-oyishi-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-[10px] font-mono text-oyishi-textSec/60">
                    Retell Call ID: {selectedOrder.agent_call_id}
                  </div>
                  <button
                    onClick={() => handleDeleteOrder(selectedOrder.id)}
                    disabled={isDeleting === selectedOrder.id}
                    className="text-red-400 hover:text-red-300 transition-colors p-1.5 rounded-lg hover:bg-red-900/30 disabled:opacity-50 flex items-center gap-1.5 text-xs font-sans font-medium"
                    title="Eliminar pedido"
                  >
                    {isDeleting === selectedOrder.id ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    <span>Eliminar</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-oyishi-textSec uppercase">Estado:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={e => handleStatusChange(selectedOrder.id, e.target.value as RetellOrder['status'])}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg border font-bold uppercase focus:outline-none cursor-pointer bg-oyishi-bg border-oyishi-gold text-oyishi-gold"
                  >
                    <option value="NUEVO">NUEVO</option>
                    <option value="CONFIRMADO">CONFIRMADO</option>
                    <option value="PREPARANDO">PREPARANDO</option>
                    <option value="LISTO">LISTO</option>
                    <option value="COMPLETADO">COMPLETADO</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminOrdersPage;
