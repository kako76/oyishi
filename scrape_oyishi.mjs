import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

async function scrape() {
  const html = fs.readFileSync('menu.html', 'utf-8');
  const $ = cheerio.load(html);

  const products = [];
  const categories = [];

  $('.categoria').each((_, catEl) => {
    let categoryName = $(catEl).find('.class-title').first().text().trim();
    if (!categoryName) return;
    
    categories.push(categoryName);
    
    $(catEl).find('.wzh_col, .col-lg-3').each((_, itemEl) => {
      const aTag = $(itemEl).find('h5.caption a');
      let name = aTag.text().trim();
      if (!name) return;

      const link = $(itemEl).find('.menu-button a').attr('href') || '#';
      let originalId = '';
      if (link.includes('id=')) {
        originalId = link.split('id=')[1];
      }

      let description = $(itemEl).find('.simple-text').first().text().trim();
      let priceStr = $(itemEl).find('.menu-price').text().replace('€', '').replace('\'', '').replace('\'', '').trim();
      let price = parseFloat(priceStr) || 0;

      // Clean name
      name = name.replace(/^[0-9]+[A-Z]?\./, '').trim();

      let pieces = undefined;
      const piecesMatch = description.match(/\((\d+)\s*(piezas|unidades|cortes)\)/i) || name.match(/\((\d+)\s*(piezas|unidades|cortes)\)/i);
      if (piecesMatch) {
        pieces = parseInt(piecesMatch[1]);
      }

      let imgUrl = $(itemEl).find('img').first().attr('src');
      if (imgUrl && !imgUrl.startsWith('http')) {
        imgUrl = 'https://oyishi.es' + imgUrl;
      }

      const allergens = [];
      $(itemEl).find('#img_allergy img').each((_, imgEl) => {
        const src = $(imgEl).attr('src');
        if (src) {
          const match = src.match(/(\d+)\.png/);
          if (match) {
             const id = match[1];
             const map = {
               "1": "Gluten", "2": "Crustáceos", "3": "Huevos", "4": "Pescado", "5": "Cacahuetes",
               "6": "Soja", "7": "Lácteos", "8": "Frutos de cáscara", "9": "Apio", "10": "Mostaza",
               "11": "Sésamo", "12": "Sulfitos", "13": "Altramuces", "14": "Moluscos", "15": "Picante", "16": "Maíz"
             };
             allergens.push(map[id] || `Alergeno ${id}`);
          }
        }
      });
      
      products.push({
        id: `p_${originalId || Math.random().toString(36).substring(2, 9)}`,
        originalId,
        name,
        category: categoryName,
        description: description || undefined,
        pieces,
        price,
        allergens: allergens,
        imageUrl: imgUrl || undefined,
        sourceUrl: link !== '#' ? `https://oyishi.es/${link.replace('./', '')}` : 'https://oyishi.es/menu.php',
        source: 'oyishi.es',
        verified: true
      });
    });
  });

  const dir = path.join(process.cwd(), 'src/data/oyishi');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const outPath = path.join(dir, 'products.json');
  fs.writeFileSync(outPath, JSON.stringify({ categories, products }, null, 2));
  console.log(`Saved ${products.length} products to ${outPath}`);
}

scrape().catch(console.error);
