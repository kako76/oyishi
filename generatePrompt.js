import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REFERENCE_MAP = {
  "Rollitos vegetales": "1",
  "Minirollitos": "1A",
  "Rollitos de gambas": "2",
  "Langostino tempura estilo japonesa": "2A",
  "Rollitos de queso": "3",
  "Gyozas de carne y verduras": "4",
  "Shumai": "5",
  "Jiaozi de gambas": "6",
  "Jiaozi peonies": "7",
  "Gyozas vegetarianas": "8",
  "Xiao long bao": "10",
  "Dim-sum variado": "11",
  "Ensalada de algas": "12",
  "Goma wakame": "13",
  "Ensalada sesar": "14",
  "Ensalada aguacate": "15",
  "Edamame": "16",
  "Sopa miso": "17",
  "California roll": "18",
  "California salmón roll": "19",
  "Sésamo salmón roll": "19A",
  "California Atún roll": "20",
  "Gambas roll": "21",
  "Maki Almendra": "22",
  "Sésamo roll": "23",
  "Maki dragón": "24",
  "Spicy salmon crunch": "25",
  "Spicy tuna crunch": "26",
  "Spicy gamba crunch": "27",
  "Aguacate uramaki": "28",
  "Uramaki mango": "28A",
  "Cheese bamboo roll": "29",
  "Sake cheese bamboo roll": "30",
  "Dinamita roll": "31",
  "Salmón uramaki": "32",
  "Atún uramaki": "33",
  "Rock roll": "34",
  "Maki crispy salmón": "35",
  "Tempurizados maki de pez mantequilla": "35A",
  "Maki crispy pato": "36",
  "Sésamo roll en crispy": "37",
  "Sushi atún": "38",
  "Sushi atún flameado": "38A",
  "Sushi salmón": "39",
  "Sushi salmón flameado": "39A",
  "Sushi gambas": "40",
  "Sushi lubina": "41",
  "Sushi lubina flameado": "41A",
  "Sushi de vieira": "41B",
  "Sushi anguila": "42",
  "Pez mantequilla": "43",
  "Sushi pez mantequilla flameado": "43A",
  "Sushi aguacate": "44",
  "Sushi pulpo": "45",
  "Sushi tobiko": "46",
  "Sushi ikura": "47",
  "Sushi tartar atún": "48",
  "Sushi tartar salmón": "49",
  "Maki atún": "50",
  "Maki salmón": "51",
  "Maki anguila": "52",
  "Maki gambas": "53",
  "Maki salmón con aguacate": "54",
  "Maki atún con aguacate": "55",
  "Maki surimi": "56",
  "Maki vegetal": "57",
  "Maki pez mantequilla": "58",
  "Maki aguacate": "59",
  "Futomaki": "60",
  "Temaki de atún y aguacate": "61",
  "Temaki de salmón y aguacate": "62",
  "Temaki California": "63",
  "Temaki de anguila": "64",
  "Temaki de pato": "65",
  "Temaki mantequilla": "66",
  "Tartar salmón con aguacate": "67",
  "Tartar atún con aguacate": "68",
  "Yu-sen manguro": "69",
  "Tartar salmón": "70",
  "Sashimi salmón": "71",
  "Sashimi atún": "72",
  "Sashimi pez mantequilla": "73",
  "Tataki maguro": "74",
  "Sashimi variado (9 cortes)": "75",
  "Sashimi variado (24 cortes)": "76",
  "Kushiyaki salmón": "77",
  "Kushiyaki gambas": "79",
  "Yakitori brocheta de pollo": "80",
  "Yakitori solomillo de buey": "81",
  "Arroz de sushi": "82",
  "Arroz blanco": "83",
  "Yakisoba con gambas": "84",
  "Yakisoba vegetal": "84A",
  "Yakiudon con gambas y verduras": "85",
  "Yakifideo con gambas y verduras": "86",
  "Arroz con setas": "87",
  "Kaisen yakimeshi": "88",
  "Yakimeshi": "89",
  "Arroz frito con tres delicias": "89A",
  "Yakimeshi piña": "90",
  "Yakimeshi ternera": "91",
  "Yakimeshi pollo": "91A",
  "Pollo teppanyaki": "92",
  "Ternera con setas": "93",
  "Ternera con verduras": "94",
  "Gambas con champiñones": "95",
  "Ebi teppanyaki": "96",
  "1/2 pato crujiente con salsa agripicante": "97",
  "Pollo crujiente con almendras": "98",
  "Pollo crujiente al limón": "99",
  "Cerdo agridulce": "100"
};

async function buildKnowledgeBase() {
  console.log("Reading products.json...");
  const productsFile = fs.readFileSync(path.join(__dirname, 'src/data/oyishi/products.json'), 'utf8');
  const productsData = JSON.parse(productsFile);
  
  const menuList = [];
  
  // Normalize names for mapping
  const normalizedMap = {};
  for (const [name, ref] of Object.entries(REFERENCE_MAP)) {
    normalizedMap[name.toLowerCase().trim()] = ref;
  }
  
  for (const p of productsData.products) {
    let aliases = [];
    const cleanName = p.name.toLowerCase().trim();
    
    // Resolve correct reference
    let finalRef = p.originalId;
    if (normalizedMap[cleanName]) {
      finalRef = normalizedMap[cleanName];
    }
    
    if (finalRef) {
      aliases.push(finalRef.toString());
      aliases.push(`el ${finalRef}`);
      aliases.push(`numero ${finalRef}`);
    }
    
    aliases.push(cleanName);
    
    // Bandejas
    if (cleanName.startsWith('bandeja')) {
      const match = cleanName.match(/bandeja.*?f(\d+)/) || cleanName.match(/f(\d+).*?bandeja/);
      if (match) {
        const fRef = `F${match[1]}`;
        aliases.push(fRef);
        finalRef = fRef;
      }
    }
    
    menuList.push({
      reference: finalRef || null,
      category: p.category,
      name: p.name.trim(),
      description: p.description || "",
      ingredients: [], 
      pieces: p.pieces || null,
      price: p.price,
      allergens: p.allergens || [],
      aliases: [...new Set(aliases)]
    });
  }

  const missing = [
    { name: "MENU PARA 4 PERSONAS", category: "MENUS" },
    { name: "MENÚ PARA 2 PERSONAS", category: "MENUS", altName: "MENU PARA 2 PERSONAS" },
    { name: "Lata Coca Cola", category: "BEBIDA" },
    { name: "Lata Coca Cola zero", category: "BEBIDA" },
    { name: "Lata Fanta naranja", category: "BEBIDA" },
    { name: "Lata Fanta limon", category: "BEBIDA" },
    { name: "Lata Nestea", category: "BEBIDA" },
    { name: "Lata Aquarius", category: "BEBIDA" },
    { name: "Lata Aquarius naranja", category: "BEBIDA" },
    { name: "Agua", category: "BEBIDA" },
    { name: "Lata cerveza", category: "BEBIDA" },
    { name: "Vino de la casa", category: "VINO" },
    { name: "Vino tinto la rioja", category: "VINO" },
    { name: "Vino tinto ribera del duero", category: "VINO" },
    { name: "Vino rosado señorío llanos", category: "VINO" },
    { name: "Vino blanco Rueda", category: "VINO" }
  ];
  
  for (const item of missing) {
    const exists = menuList.find(m => m.name.toLowerCase() === item.name.toLowerCase() || (item.altName && m.name.toLowerCase() === item.altName.toLowerCase()));
    if (!exists) {
      menuList.push({
        reference: null,
        category: item.category,
        name: item.name,
        description: "",
        ingredients: [],
        pieces: null,
        price: "Consultar",
        allergens: [],
        aliases: [item.name.toLowerCase()]
      });
    }
  }

  const kbPath = path.join(__dirname, 'docs/retell/KNOWLEDGE_BASE.json');
  fs.writeFileSync(kbPath, JSON.stringify(menuList, null, 2));
  
  const templatePath = path.join(__dirname, 'docs/retell/ANDREA_PROMPT_TEMPLATE.md');
  let promptTemplate = '';
  try {
    promptTemplate = fs.readFileSync(templatePath, 'utf8');
  } catch (e) {
    console.error('Error reading template, make sure docs/retell/ANDREA_PROMPT_TEMPLATE.md exists', e);
    return;
  }

  const prompt = `${promptTemplate}
${JSON.stringify(menuList.map(m => ({
  ref: m.reference || "S/R",
  nombre: m.name,
  precio: typeof m.price === 'number' ? m.price.toFixed(2) + '€' : m.price,
  alergenos: m.allergens.length > 0 ? m.allergens.join(', ') : 'Ninguno o no confirmados',
  categoria: m.category,
  variantes: m.aliases.join(', ')
})), null, 2)}
`;
  
  const promptPath = path.join(__dirname, 'docs/retell/ANDREA_PROMPT.md');
  fs.writeFileSync(promptPath, prompt);
  console.log("Generado correctamente.");
}

buildKnowledgeBase();
