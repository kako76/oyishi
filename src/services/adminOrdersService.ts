export interface RetellOrder {
  id: string;
  customer_name: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  order_items: Array<{
    name: string;
    quantity: number;
    price?: number;
    notes?: string;
  }>;
  notes?: string;
  total: number;
  agent_call_id: string;
  created_at: string;
  status: 'NUEVO' | 'CONFIRMADO' | 'PREPARANDO' | 'LISTO' | 'COMPLETADO';
}

const STORAGE_KEY = 'oyishi_admin_orders_db';
const AUTH_TOKEN_KEY = 'oyishi_admin_token';

// Demostración de estructura de comanda si aún no existen registros recibidos
const INITIAL_DEMO_ORDERS: RetellOrder[] = [
  {
    id: 'ord_rt_901',
    customer_name: 'Carlos Mendoza',
    phone: '+34 612 345 678',
    date: new Date().toISOString().split('T')[0],
    time: '21:30',
    party_size: 2,
    order_items: [
      { name: 'California Salmón Roll (8p)', quantity: 2, price: 7.85 },
      { name: 'Sopa Miso', quantity: 2, price: 2.90 },
      { name: 'Mochis de Mango (2p)', quantity: 1, price: 2.95 }
    ],
    notes: 'Alergia al sésamo. Mesa cerca de la ventana a ser posible.',
    total: 24.45,
    agent_call_id: 'call_retell_8f921a4',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'NUEVO'
  },
  {
    id: 'ord_rt_902',
    customer_name: 'Laura Fernández',
    phone: '+34 689 112 233',
    date: new Date().toISOString().split('T')[0],
    time: '22:00',
    party_size: 4,
    order_items: [
      { name: 'F10. Bandeja maki sushi sashimi', quantity: 1, price: 58.80 },
      { name: 'Edamame', quantity: 2, price: 4.50 },
      { name: 'Vino Blanco Rueda', quantity: 1, price: 11.00 }
    ],
    notes: 'Reserva telefónica con pedido anticipado de bandeja.',
    total: 78.80,
    agent_call_id: 'call_retell_3c19b02',
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: 'CONFIRMADO'
  }
];

export const adminOrdersService = {
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  },

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  async login(password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        this.setToken(data.token);
        return { success: true };
      }

      return { success: false, error: data.error || 'Credenciales no válidas' };
    } catch {
      return { success: false, error: 'No se pudo conectar con el servidor de autenticación /api/admin/login' };
    }
  },

  async getOrders(): Promise<RetellOrder[]> {
    const token = this.getToken();
    if (!token) return [];

    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.orders) && data.orders.length > 0) {
          return data.orders;
        }
      }
    } catch {
      // Si la API aún no tiene BD conectada o está en desarrollo offline
    }

    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch {
        // parsing error
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
    return INITIAL_DEMO_ORDERS;
  },

  async updateOrderStatus(id: string, newStatus: RetellOrder['status']): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        return true;
      }
    } catch {
      // Fallback local update
    }

    const currentOrders = await this.getOrders();
    const updated = currentOrders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  }
};
