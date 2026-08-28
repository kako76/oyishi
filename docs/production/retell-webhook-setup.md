# GuÃ­a de ConfiguraciÃ³n Webhook Retell AI â€” OYISHI

Este documento especifica los pasos necesarios para conectar el agente telefÃ³nico de **Retell AI** con el panel administrativo privado de pedidos de OYISHI (`/admin/pedidos`).

---

## 1. URL del Endpoint Webhook

En el panel de control de Retell AI (o en la configuraciÃ³n del Agente / Custom Tools):

* **URL del Webhook (ProducciÃ³n):** `https://oyishi.es/api/webhook/retell`
* **URL del Webhook (Preview/Pruebas):** `https://oyishi.pages.dev/api/webhook/retell`
* **MÃ©todo HTTP:** `POST`
* **Content-Type:** `application/json`

---

## 2. AutenticaciÃ³n y Seguridad

Para evitar que terceros envÃ­en pedidos falsos al endpoint:

1. Define la variable de entorno `RETELL_WEBHOOK_SECRET` en Cloudflare Pages (**Settings > Environment Variables**).
2. En la configuraciÃ³n de Retell AI, aÃ±ade un Header personalizado en las peticiones del Webhook:
   * **Header Name:** `x-retell-secret`
   * **Header Value:** `<tu_secreto_configurado>`

El backend serverless (`/functions/api/webhook/retell.ts`) verificarÃ¡ automÃ¡ticamente esta cabecera antes de procesar cualquier comanda.

---

## 3. Estructura del Payload JSON (Payload Schema)

El agente telefÃ³nico de Retell AI debe enviar un objeto JSON al finalizar o registrar la llamada con el siguiente formato:

```json
{
  "call": {
    "call_id": "call_retell_8f921a4",
    "from_number": "+34612345678"
  },
  "args": {
    "customer_name": "Carlos Mendoza",
    "phone": "+34612345678",
    "date": "2026-08-28",
    "time": "21:30",
    "party_size": 2,
    "order_items": [
      {
        "name": "California SalmÃ³n Roll (8p)",
        "quantity": 2,
        "price": 7.85
      },
      {
        "name": "Sopa Miso",
        "quantity": 2,
        "price": 2.90
      }
    ],
    "notes": "Alergia al sÃ©samo. Mesa cerca de la ventana.",
    "total": 21.50
  }
}
```

---

## 4. Persistencia en Cloudflare

En la infraestructura de Cloudflare Pages, puedes conectar:
* **Cloudflare D1 Database:** Binding con el nombre `DB`. Crea la tabla executing el esquema SQL:
  ```sql
  CREATE TABLE IF NOT EXISTS retell_orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    phone TEXT,
    date TEXT,
    time TEXT,
    party_size INTEGER,
    order_items TEXT,
    notes TEXT,
    total REAL,
    agent_call_id TEXT,
    created_at TEXT,
    status TEXT DEFAULT 'NUEVO'
  );
  ```
* **Cloudflare KV Namespace:** Binding con el nombre `ORDERS_KV`.

---

## 5. VerificaciÃ³n de Funcionamiento

1. Inicia sesiÃ³n en `/admin/pedidos` utilizando la contraseÃ±a de administrador.
2. Realiza una llamada de prueba al nÃºmero del agente (+18584625063) o simula un envÃ­o HTTP POST cURL hacia `https://oyishi.es/api/webhook/retell`.
3. El nuevo pedido aparecerÃ¡ instantÃ¡neamente en el estado **NUEVO** con un indicador acÃºstico/visualmente resaltado en dorado.
