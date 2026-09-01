interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  const fallbackConfig = {
    hero: {
      title: "Japón, servido en Fuenlabrada.",
      subtitle: "El mejor sushi y cocina tradicional japonesa sin salir de la ciudad. Una experiencia culinaria diseñada para compartir y disfrutar.",
      buttonMenuText: "Carta completa",
      buttonOrderText: "Pedir para llevar",
      buttonReserveText: "Reservar mesa",
      showButtonMenu: true,
      showButtonOrder: true,
      showButtonReserve: true,
      mediaUrl: "/Eliminar_letras_y_completar_sushi_202608281705.mp4"
    },
    about: {
      showSection: true,
      title: "QUIÉNES SOMOS",
      mainText: "La auténtica gastronomía japonesa",
      secondaryText: "Elaboramos cada plato con ingredientes frescos y la dedicación que exige la cocina tradicional de Japón.",
      imageUrl: ""
    },
    featured: {
      showSection: true,
      title: "NUESTRA SELECCIÓN",
      subtitle: "Los platos más aclamados por nuestros clientes",
      productIds: []
    },
    cta: {
      phone: "918 626 221",
      whatsapp: "699 365 212",
      buttonText: "CONTACTAR",
      reserveUrl: "/reservas",
      menuUrl: "/carta"
    },
    social: {
      instagram: "https://instagram.com/oyishi",
      facebook: "https://facebook.com/oyishi",
      tiktok: "",
      otherUrl: ""
    },
    seo: {
      title: "OYISHI | Gastronomía Japonesa en Fuenlabrada",
      description: "Restaurante japonés en Fuenlabrada. Auténtico sushi, ramen y platos tradicionales.",
      ogText: "Descubre OYISHI"
    }
  };

  try {
    if (!env.DB) {
      return new Response(JSON.stringify(fallbackConfig), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { results } = await env.DB.prepare('SELECT config_json FROM web_content WHERE id = 1').all();
    
    if (!results || results.length === 0) {
      return new Response(JSON.stringify(fallbackConfig), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const config = JSON.parse(results[0].config_json as string);

    return new Response(JSON.stringify(config), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error fetching web content:', err);
    return new Response(JSON.stringify(fallbackConfig), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
