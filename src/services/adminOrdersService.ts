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

const AUTH_TOKEN_KEY = 'oyishi_admin_token';

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

      if (res.status === 401 || res.status === 403) {
        this.logout();
        window.location.reload(); // Force reload to show login
        return [];
      }

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.orders)) {
          return data.orders.map((order: any) => {
            let items = order.order_items;
            
            // Fallback por si la API falla en normalizar o devuelve algo raro
            if (!Array.isArray(items)) {
              if (typeof items === 'string') {
                try {
                  const parsed = JSON.parse(items);
                  items = Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
                } catch {
                  items = [{ name: items, quantity: 1 }];
                }
              } else if (items && typeof items === 'object') {
                items = [items];
              } else {
                items = [];
              }
            }
            
            return {
              ...order,
              order_items: items
            };
          });
        }
      }
    } catch {
      // Offline fallback only if network failed completely, not on 401
    }

    return [];
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

      if (res.status === 401 || res.status === 403) {
        this.logout();
        window.location.reload();
        return false;
      }

      if (res.ok) {
        return true;
      }
    } catch {
      // Network error
    }

    return false;
  }
};
