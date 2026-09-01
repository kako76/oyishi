CREATE TABLE IF NOT EXISTS web_content (
  id INTEGER PRIMARY KEY,
  config_json TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO web_content (id, config_json) VALUES (1, '{
  "hero": {
    "title": "Japón, servido en Fuenlabrada.",
    "subtitle": "El mejor sushi y cocina tradicional japonesa sin salir de la ciudad. Una experiencia culinaria diseñada para compartir y disfrutar.",
    "buttonMenuText": "Carta completa",
    "buttonOrderText": "Pedir para llevar",
    "buttonReserveText": "Reservar mesa",
    "showButtonMenu": true,
    "showButtonOrder": true,
    "showButtonReserve": true,
    "mediaUrl": "/Eliminar_letras_y_completar_sushi_202608281705.mp4"
  },
  "about": {
    "showSection": true,
    "title": "QUIÉNES SOMOS",
    "mainText": "La auténtica gastronomía japonesa",
    "secondaryText": "Elaboramos cada plato con ingredientes frescos y la dedicación que exige la cocina tradicional de Japón.",
    "imageUrl": "/images/about.jpg"
  },
  "featured": {
    "showSection": true,
    "title": "NUESTRA SELECCIÓN",
    "subtitle": "Los platos más aclamados por nuestros clientes",
    "productIds": ["N05", "V01", "R03"]
  },
  "cta": {
    "phone": "918 626 221",
    "whatsapp": "699 365 212",
    "buttonText": "CONTACTAR",
    "reserveUrl": "/reservas",
    "menuUrl": "/carta"
  },
  "social": {
    "instagram": "https://instagram.com/oyishi",
    "facebook": "https://facebook.com/oyishi",
    "tiktok": "",
    "otherUrl": ""
  },
  "seo": {
    "title": "OYISHI | Gastronomía Japonesa en Fuenlabrada",
    "description": "Restaurante japonés en Fuenlabrada. Auténtico sushi, ramen y platos tradicionales.",
    "ogText": "Descubre OYISHI"
  }
}');
