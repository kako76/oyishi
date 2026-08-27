export type MenuCategory = 'Todos' | 'Entrantes & Tempura' | 'Sushi & Makis' | 'Especiales & Menús' | 'Bebidas & Postres';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: MenuCategory;
  badges?: string[];
  image?: string;
  isPopular?: boolean;
}

export const menuData: MenuItem[] = [
  // Entrantes
  { id: 'e1', name: 'Dim-sum variado', description: '5 piezas surtidas elaboradas al vapor con el toque del chef.', price: 5.50, category: 'Entrantes & Tempura' },
  { id: 'e2', name: 'Spicy gamba crunch', description: 'Gamba rebozada crujiente con salsa picante especial.', price: 7.50, category: 'Entrantes & Tempura', isPopular: true, badges: ['Top Ventas'] },
  { id: 'e3', name: 'Rollitos vegetales', description: 'Crujientes y rellenos de verduras de temporada.', price: 4.50, category: 'Entrantes & Tempura' },
  { id: 'e4', name: 'Minirollitos (10 uds)', price: 5.00, category: 'Entrantes & Tempura' },
  { id: 'e5', name: 'Rollitos de gambas', price: 6.00, category: 'Entrantes & Tempura' },
  { id: 'e6', name: 'Gyozas de carne y verduras', description: 'Tradicionales empanadillas japonesas a la plancha.', price: 5.80, category: 'Entrantes & Tempura' },
  { id: 't1', name: 'Langostino tempura estilo japonés', description: 'Langostinos rebozados en tempura crujiente.', price: 8.50, category: 'Entrantes & Tempura' },
  
  // Sushi & Makis
  { id: 's1', name: 'California roll', description: '8 piezas con surimi, aguacate y pepino.', price: 8.50, category: 'Sushi & Makis' },
  { id: 's2', name: 'Spicy roll', description: '8 piezas con atún picante y crujiente.', price: 9.00, category: 'Sushi & Makis' },
  { id: 's3', name: 'Ebi Ten roll', description: '8 piezas con langostino tempurizado.', price: 9.50, category: 'Sushi & Makis' },
  { id: 's4', name: 'Atún uramaki', description: '8 piezas de arroz por fuera con atún fresco.', price: 8.90, category: 'Sushi & Makis', badges: ['Fresco Lonja'] },
  { id: 's5', name: 'Salmón nigiri', description: '2 piezas de salmón noruego sobre arroz de sushi.', price: 4.50, category: 'Sushi & Makis' },
  { id: 's6', name: 'Atún nigiri', description: '2 piezas de atún rojo.', price: 5.50, category: 'Sushi & Makis' },
  { id: 's7', name: 'Pez mantequilla nigiri', description: '2 piezas de pez mantequilla con trufa.', price: 5.00, category: 'Sushi & Makis' },
  { id: 's8', name: 'Bandeja maki', description: '8 salmón + 8 atún. Ideal para compartir.', price: 11.90, category: 'Sushi & Makis' },
  
  // Especiales
  { id: 'es1', name: 'Bandeja Omega', description: '8 Sésamo roll + 8 piezas de la casa.', price: 15.90, category: 'Especiales & Menús', isPopular: true, badges: ['Chef Choice'] },
  { id: 'es2', name: 'Bandeja roll', description: 'Surtido especial de rolls.', price: 12.50, category: 'Especiales & Menús' },
  { id: 'es3', name: 'Selección del chef (Sashimi)', description: '9 cortes del mejor pescado fresco del día.', price: 14.50, category: 'Especiales & Menús', badges: ['Premium'] },
  { id: 'm1', name: 'Menú para 2 personas', description: 'Selección equilibrada para compartir en pareja.', price: 29.90, category: 'Especiales & Menús' },
  { id: 'm2', name: 'Menú para 4 personas', description: 'Surtido completo de nuestras mejores especialidades.', price: 55.00, category: 'Especiales & Menús' },
  
  // Bebidas & Postres
  { id: 'b1', name: 'Sake', description: 'Licor de arroz japonés tradicional, servido caliente o frío.', price: 4.50, category: 'Bebidas & Postres' },
  { id: 'b2', name: 'Cerveza japonesa', description: 'Sapporo, Asahi o Kirin Ichiban.', price: 3.50, category: 'Bebidas & Postres' },
  { id: 'p1', name: 'Mochi', description: 'Surtido de dulces japoneses de arroz glutinoso.', price: 4.00, category: 'Bebidas & Postres' },
  { id: 'p2', name: 'Helado té verde', description: 'Helado artesanal de matcha.', price: 3.50, category: 'Bebidas & Postres' },
];
