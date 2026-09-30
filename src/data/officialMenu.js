/**
 * CARTA OFICIAL DE LA QUERENDONA
 * Extraída directamente de: https://foodielovercarta.com/menu/la-querendona
 * Total de productos: 118
 */

export const officialRestaurantInfo = {
  name: "La Querendona",
  slogan: "Saborea la esencia de Colombia en Huelva",
  description: "Comida casera colombiana, ingredientes frescos, sazón tradicional y mucho amor en raciones generosas.",
  address: "Calle Bonares, 5",
  postalCode: "21007",
  city: "Huelva",
  province: "Huelva",
  country: "España",
  phone: "643931608",
  phoneFormatted: "643 93 16 08",
  whatsapp: "643931608",
  whatsappUrl: "https://wa.me/34643931608",
  logoUrl: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/2effc510d_WhatsAppImage2026-09-07at004236.jpeg",
  coverUrl: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/be67804c9_WhatsAppImage2026-09-07at003230.jpeg",
  coordinates: {
    lat: 37.2614,
    lng: -6.9447
  },
  schedule: [
    { day: "Lunes", hours: "Cerrado", closed: true },
    { day: "Martes", hours: "08:30 - 15:30 | 20:00 - 23:30", closed: false },
    { day: "Miércoles", hours: "08:30 - 15:30 | 20:00 - 23:30", closed: false },
    { day: "Jueves", hours: "08:30 - 15:30 | 20:00 - 23:30", closed: false },
    { day: "Viernes", hours: "08:30 - 15:30 | 20:00 - 23:30", closed: false },
    { day: "Sábado", hours: "08:30 - 15:30 | 20:00 - 23:30", closed: false },
    { day: "Domingo", hours: "08:30 - 16:30", closed: false },
  ]
};

export const officialCategories = [
  { id: "DESAYUNOS", name: "DESAYUNOS", label: "Desayunos Tradicionales", iconKey: "breakfast", desc: "Huevos al gusto, arepas artesanales, caldos reconfortantes y panadería criolla recién horneada." },
  { id: "ALMUERZOS", name: "ALMUERZOS", label: "Almuerzos & Especialidades", iconKey: "lunch", desc: "Bandejas monumentales, sancochos en leña, cazuelas marinas y carnes campesinas." },
  { id: "CENAS", name: "CENAS", label: "Cenas, Picadas & Arepas", iconKey: "dinner", desc: "Empanadas doradas, salchipapas querendonas, hamburguesas criollas, perros y picadas para compartir." },
  { id: "BEBIDAS", name: "BEBIDAS", label: "Bebidas, Jugos & Cervezas", iconKey: "drinks", desc: "Jugos 100% fruta tropical (lulo, maracuyá, guanábana), aguapanela con limón, cervezas y cafés." }
];

export const officialProducts = [
  {
    "id": "6a9e016c0e779a61d60f16b6",
    "name": "Desayuno Querendón",
    "description": "Huevos al gusto (perico, revueltos solos o fritos), arepa con queso y bebida caliente (chocolate, café o Milo).",
    "price": 7.5,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a3828e07b_Producto1200x1200cartadigital.png",
    "video": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/30046c64d_copy_DE31CB25-8D1F-434C-8210-8A7082C5B127.mov",
    "available": true,
    "order": 0,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16b7",
    "name": "Desayuno Trasnochador",
    "description": "Calentado de frijoles, huevos al gusto (perico, revueltos solos o fritos), arepa con queso y bebida caliente (chocolate, café o Milo).",
    "price": 9.5,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/c5ab61a8c_Producto1200x1200cartadigital.png",
    "video": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/0fb1408ef_copy_57C88152-BD8D-497A-B294-D860B098BE3D.mov",
    "available": true,
    "order": 1,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16b8",
    "name": "Desayuno Trasnochador Moreno",
    "description": "Calentado de frijoles, huevos al gusto (perico, revueltos solos o fritos), arepa con queso, chicharrón, carne asada o chorizo, y bebida caliente (chocolate, café o Milo).",
    "price": 13,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/19a62fe21_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 2,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16b9",
    "name": "Desayuno El Pereirano",
    "description": "Huevos con salchicha ranchera, tajadas maduras, arepa con queso y bebida caliente (chocolate, café o Milo).",
    "price": 9,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/b81f5c06e_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 3,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16ba",
    "name": "Migote",
    "description": "Mezcla de chocolate caliente (agua o leche), buñuelo, pandebono, queso mozzarella, queso fresco, galletas Saltín y galletas Ducales.",
    "price": 8,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/e39205833_WhatsAppImage2026-09-07at022001.jpeg",
    "video": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/60454ed33_WhatsAppVideo2026-09-07at130912.mp4",
    "available": true,
    "order": 4,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16bb",
    "name": "Arepa con Queso",
    "description": "Masa de maíz y queso fresco latino.",
    "price": 4.5,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/98adf0bf9_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 5,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16bc",
    "name": "Arepa con Chorizo",
    "description": "Masa de maíz y chorizo ahumado a base de carne de cerdo.",
    "price": 6,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/974b00d36_Producto1200x1200cartadigital.png",
    "video": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d2076353e_copy_55E9328E-1104-4748-9562-61DF6F02E1B7.mov",
    "available": true,
    "order": 6,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16bd",
    "name": "Arepa o Patacón con Chicharrón",
    "description": "Masa de maíz y tira de chicharrón crocante.",
    "price": 9,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/2d791050f_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 7,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16be",
    "name": "Arepa con Carne Asada",
    "description": "Masa de maíz y filete de ternera a la plancha.",
    "price": 8,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/fe2b5e23f_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 8,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16bf",
    "name": "Arepa con Chunchurria (solo fines de semana)",
    "description": "Masa de maíz y chunchurria frita.",
    "price": 8,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/6a611e86e_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 9,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16c0",
    "name": "Arepa con Bofe (solo fines de semana)",
    "description": "Masa de maíz y bofe frito.",
    "price": 8,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f8687d8ae_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 10,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16c1",
    "name": "Arepa con Morcilla",
    "description": "Masa de maíz y morcilla de arroz.",
    "price": 8,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/5a3d74ed4_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 11,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16c2",
    "name": "Buñuelo",
    "description": "Masa a base de almidón de yuca, con queso costeño, de forma redonda y frita.",
    "price": 1.2,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/7d57c2048_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 12,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16c3",
    "name": "Pandebono",
    "description": "Masa a base de almidón de yuca, con queso costeño, cocinada al horno.",
    "price": 1.2,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/897efa044_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 13,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e016c0e779a61d60f16c4",
    "name": "Caldo de Costilla",
    "description": "Caldo claro con sustancia de costilla de ternera, papa en gajos, papa criolla, cebolla fresca, cilantro y arepa de maíz.",
    "price": 7,
    "category": "DESAYUNOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/5d9bffa9e_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 14,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e10",
    "name": "Menú Diario",
    "description": "Primer plato de sopa, segundo plato seco y bebida. Consultar con el camarero el menú del día.",
    "price": 12,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/64f7637ed_Producto1200x1200cartadigital-2.png",
    "video": "",
    "available": true,
    "order": 15,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e11",
    "name": "Tiradito de Corvina",
    "description": "Cortes finos de corvina bañados en zumo natural de lulo y limón, cebolla morada en juliana fina y cilantro fresco, con crocante de plátano verde.",
    "price": 12,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/507763327_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 16,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e12",
    "name": "Carpaccio de Ternera",
    "description": "Ternera curada con sal y pimienta, emulsión de hogao (tomate y cebolla sofrita y colada), brotes de rábano y arepa crocante.",
    "price": 9,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/997f65cf2_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 17,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e13",
    "name": "Ensalada de Tomate",
    "description": "Tomates de temporada en gajos, queso fresco tipo Burgos, aceitunas, champiñones y almíbar simple de café emulsionado con aceite de oliva.",
    "price": 9,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/ed4580b8d_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 18,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e14",
    "name": "Cóctel de Langostinos",
    "description": "Langostinos cocidos en su punto, salsa rosa casera con un toque de tabasco y coco rallado tostado, acompañado de tostón de plátano verde.",
    "price": 12,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/bb5d055f7_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 19,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e15",
    "name": "Briochetas de Posta Negra",
    "description": "Pandebonos recién horneados rellenos de ternera cocinada lentamente en Coca-Cola y panela hasta desmechar, servidos como mini hamburguesas.",
    "price": 9,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a011bc181_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 20,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e16",
    "name": "Bandeja Paisa Tradicional 3 Pisos",
    "description": "Frijoles bola roja estofados, chicharrón extra crujiente, carne en polvo, chorizo Santa Rosano y huevo frito. Acompañada de arroz blanco, tajada de maduro, aguacate y arepa de maíz trillado.",
    "price": 18,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/fb8fc80bd_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 21,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e17",
    "name": "Chuleta Valluna",
    "description": "Corte grueso de lomo de cerdo marinado en especias criollas, apanado artesanalmente y frito. Servido con arroz blanco, papas a la francesa, ensalada fresca y limón.",
    "price": 12,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/96c022f3e_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 22,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e18",
    "name": "Sancocho Bifásico",
    "description": "Caldo de costilla de res y pollo cocido a fuego lento, con yuca, plátano verde, mazorca y papa. Acompañado de arroz blanco, aguacate, arepa, ensalada y ají de la casa.",
    "price": 15,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/7a7d9cf54_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 23,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e19",
    "name": "Parrillada Cafetera",
    "description": "Yuca, papa criolla, arepa, maduro, limón, tomate, chicharrón crocante, lomo de ternera, pechuga de pollo, lomo de cerdo, guacamole y picadillo.",
    "price": 25,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4bded5fba_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 24,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e1a",
    "name": "Lomo de corvina",
    "description": "Fresco lomo de Corvina bañado en una salsa de chontaduro con leche de coco, sobre puré\nde plátano maduro",
    "price": 20,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/657c245de_8E864346-FCD1-458E-87AD-7DB782C47947.png",
    "video": "",
    "available": false,
    "order": 25,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e1b",
    "name": "Pollo Caribeño",
    "description": "Tiras de pechuga de pollo de corral marinadas en leche de coco y lima, rebozadas en panko y coco rallado, con chips de patacón, tomates cherry y salsa de la casa.",
    "price": 12,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/1b2171d2c_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 26,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e1c",
    "name": "Arepas Montañeras",
    "description": "Dos arepitas de maíz blanco a la plancha con mantequilla, rellenas de queso mozzarella, carne de ternera desmechada y salsa suave de café elaborada con su propio jugo.",
    "price": 12,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/5247a793d_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 27,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e1d",
    "name": "Empanadas",
    "description": "Masa de maíz con ternera en guiso de la abuela, acompañada de ají criollo y guacamole cremoso.",
    "price": 6,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/3825988b4_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 28,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e1e",
    "name": "Papas Rellenas (solo jueves, viernes y sábado)",
    "description": "Masa de papa rellena de ternera con guiso de la abuela, en pasta Orly y acompañada de ají criollo.",
    "price": 4,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/b24a19401_F21339DA-2F1E-4BAF-AFF6-6D0B3D0AE738.png",
    "video": "",
    "available": true,
    "order": 29,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e1f",
    "name": "Tequeños",
    "description": "Queso latino en masa fina de harina, acompañado de salsa de mora.",
    "price": 6.5,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f7c4a3f09_8699A2A3-F7A6-44F4-8D53-83B6513182CA.png",
    "video": "",
    "available": true,
    "order": 30,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e20",
    "name": "Alitas de Pollo",
    "description": "Alitas de pollo crujientes al horno, acompañadas de papas fritas y salsa BBQ de café.",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a35fca1dd_AC19B2DA-6F6D-4D84-A451-2BDBCE688DE4.png",
    "video": "",
    "available": true,
    "order": 31,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e21",
    "name": "Plátano Maduro",
    "description": "Plátano maduro con queso y bocadillo, acompañado de salsa de piña.",
    "price": 7,
    "category": "CENAS",
    "image": "",
    "video": "",
    "available": true,
    "order": 32,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e22",
    "name": "Trilogía de Patacón",
    "description": "Tres patacones: ternera, pollo y chicharrón acevichado, con queso fresco, cebolla encurtida y ají de mango.",
    "price": 8,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/78016d065_C2178789-DB10-43B0-9B67-B40048DABE67.png",
    "video": "",
    "available": true,
    "order": 33,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e23",
    "name": "Papas Locas",
    "description": "Papas fritas, salsa de la casa, barbacoa y mayonesa, bañadas en salsa cheddar con beicon y cebolla crispy.",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d0d40d9b7_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 34,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e24",
    "name": "Salchipapa Clásica",
    "description": "Papas fritas con salchichas Frankfurt, salsa de la casa, salsa cheddar y beicon.",
    "price": 8,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/56e627784_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 35,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e25",
    "name": "Salchipapa Querendón",
    "description": "Papas fritas, papa criolla, salchichas Frankfurt, salchicha ranchera, chorizo Santa Rosano, salsa de la casa, salsa de piña, barbacoa, queso fresco, mozzarella y huevo de codorniz.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4168cf07f_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 36,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e26",
    "name": "Papas Trasnochadoras",
    "description": "Papas fritas, salsa de la casa, barbacoa, carne y pollo desmechados, piña calada, chicharrón crocante, queso fresco y guacamole cremoso.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/27d01f52e_34AA5B9A-61B1-45A8-BA69-45A62E0EF99D.png",
    "video": "",
    "available": true,
    "order": 37,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e27",
    "name": "Nuggets de Pollo",
    "description": "Crocantes Nuggets de Pollo Acompañados de Papa Francesa y Salsa de la Casa",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/1a67fc9b8_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 38,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e28",
    "name": "Cóctel de Huevos",
    "description": "Huevos de codorniz, ripio de papa, queso fresco, piña calada, salsa de la casa, salsa de piña y salsa de mora.",
    "price": 8,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/85bc9f98f_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 39,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e29",
    "name": "Arepa Querendona",
    "description": "Arepa de maíz, ternera y pollo desmechados, queso fresco, huevo de codorniz, salsas de la casa y guacamole.",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/5de72e9fb_A5A8B337-BED6-491F-8F7A-69EFA1233BE2.png",
    "video": "",
    "available": true,
    "order": 40,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e2a",
    "name": "Arepa Trasnochadora",
    "description": "Arepa de maíz, ternera y pollo desmechados, chorizo Santa Rosano, chicharrón crocante, salsas de la casa y guacamole.",
    "price": 9,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/334954e73_2D8507CC-9640-4425-A99A-C96560DC2C7D.png",
    "video": "",
    "available": true,
    "order": 41,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e2b",
    "name": "Arepa Morena",
    "description": "Arepa de maíz, carne Angus, vegetales frescos, piña calada, cebolla caramelizada en ron y panela, queso Edam, tocineta, huevo de codorniz, ripio de papa, queso fresco y salsas de la casa.",
    "price": 10,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/800cb97ed_BF93F233-A4F2-4DED-81FE-38A71BD54FC8.png",
    "video": "",
    "available": true,
    "order": 42,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e2c",
    "name": "Maduro Relleno",
    "description": "Plancha de plátano maduro, ternera y pollo desmechados, queso fresco, piña calada y mozzarella.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/53cfac68c_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 43,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e2d",
    "name": "Patacón del Monte",
    "description": "Tostón de plátano, ternera y pollo desmechados, chorizo Santa Rosano, chicharrón crocante, guacamole cremoso y salsa de la casa.",
    "price": 15,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/dcd0e55d2_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 44,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e2e",
    "name": "Perro Clásico",
    "description": "Pan brioche, salchicha Frankfurt, patatas paja, salsa de la casa y queso fundido.",
    "price": 5,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/b8085039b_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 45,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e2f",
    "name": "Perro Querendón",
    "description": "Pan brioche, salchicha ranchera, piña calada, cebolla caramelizada en ron y panela, patatas paja, queso fresco, huevos de codorniz, salsas de la casa, salsa de piña y salsa de mora.",
    "price": 8,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/8ad20a667_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 46,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e30",
    "name": "Perra Trasnochadora",
    "description": "Pan brioche, pollo desmechado, piña calada, cebolla caramelizada en panela y ron, beicon ahumado, patatas paja, mozzarella, salsa de piña y salsa de la casa.",
    "price": 9,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4ee41d348_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 47,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e31",
    "name": "Perro Pereirano",
    "description": "Pan brioche, doble salchicha Frankfurt, patatas paja, salsa de la casa, salsa de piña, trozos de maduro, queso fundido con tocineta y huevos de codorniz.",
    "price": 9,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/58a6d9079_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 48,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e32",
    "name": "Perro Moreno",
    "description": "Pan brioche, guacamole cremoso, chorizo Santa Rosano, chimichurri, patatas paja, queso fresco asado, huevo de codorniz, salsa de la casa y salsa de piña.",
    "price": 10,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/50d4564c0_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 49,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e33",
    "name": "Hamburguesa de Pollo Crispy Sencilla",
    "description": "Pan potato roll, pollo apanado en panko, vegetales frescos, queso americano y salsa de la casa.",
    "price": 5,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/297327436_6A89DE4E-4BBB-4399-B348-21EA2338A030.png",
    "video": "",
    "available": true,
    "order": 50,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e34",
    "name": "Hamburguesa de Pollo Crispy Completa",
    "description": "Pan potato roll, pollo apanado en panko, vegetales frescos, queso americano y salsa de la casa.",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a4e5acfa1_60889C91-4105-450A-954B-7E7E269C299E.png",
    "video": "",
    "available": true,
    "order": 51,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e35",
    "name": "Hamburguesa de Angus Sencilla",
    "description": "Pan brioche, hamburguesa de ternera Angus, vegetales frescos, queso americano y salsa de la casa.",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/8fcf2b2e6_4FC9B1C6-2257-4447-B429-9570220A287A.png",
    "video": "",
    "available": true,
    "order": 52,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e36",
    "name": "Hamburguesa de Angus Premium",
    "description": "Pan brioche, hamburguesa de ternera Angus, vegetales frescos, queso americano, huevo, beicon y salsa de la casa.",
    "price": 9,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/87d6620cf_767733A4-1F7B-4CEF-BB06-C135EE94B776.png",
    "video": "",
    "available": true,
    "order": 53,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e37",
    "name": "Hamburguesa Volcán",
    "description": "Pan brioche, carne Angus, vegetales frescos, cebolla caramelizada, queso americano, huevo frito, beicon, patatas paja, salsa de la casa y salsa cheddar con beicon ahumado y cebolla crispy.",
    "price": 11,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f825a652a_FCBC1455-ABEA-4D5B-891C-BB4311AAC068.png",
    "video": "",
    "available": true,
    "order": 54,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e38",
    "name": "Hamburguesa Mega Volcán 1",
    "description": "Pan brioche, doble carne Angus, vegetales frescos, cebolla caramelizada, queso americano, huevo frito, doble beicon, patatas paja, salsa de la casa y salsa cheddar con beicon ahumado y cebolla crispy.",
    "price": 15,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d2e4da40c_757E5A56-D557-4154-942A-6FCE55A188E1.png",
    "video": "",
    "available": true,
    "order": 55,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e39",
    "name": "Hamburguesa Querendona",
    "description": "Pan brioche, vegetales frescos, carne Angus, piña calada, cebolla caramelizada en panela y ron, doble queso Edam, beicon, tajada de maduro, queso fresco, patatas paja, salsas de la casa y huevo de codorniz.",
    "price": 14,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/dbf1c1e2f_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 56,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e3a",
    "name": "Hamburguesa Trasnochadora",
    "description": "Pan brioche, lechuga fresca, carne Angus, piña calada, queso Edam, maduritos calados, queso Philadelphia, chicharrón crocante glaseado en salsa de café, cebolla puerro crocante y salsa de la casa.",
    "price": 15,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/3947b88c5_9E0CBD7A-EC3C-4403-BA1B-0393EADA8E96.png",
    "video": "",
    "available": true,
    "order": 57,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e3b",
    "name": "Hamburguesa Morena",
    "description": "Pan brioche, carne Angus de 200 g, vegetales frescos, aguacate, piña calada, cebolla caramelizada en ron y panela, queso Edam, beicon, ternera desmechada, patatas paja, queso fresco y salsas de la casa.",
    "price": 15,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/56e8256e1_C4DEBAD0-5532-4441-8ED3-76365185408B.png",
    "video": "",
    "available": true,
    "order": 58,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e3c",
    "name": "Patacón Burger",
    "description": "Tostón de plátano verde, vegetales frescos, carne Angus, piña caramelizada, cebolla caramelizada en panela y ron, doble queso Edam, beicon, tajada de maduro, queso asado, patatas paja y salsas de la casa.",
    "price": 15,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/02fff60ca_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 59,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e3d",
    "name": "Lomo de Añojo",
    "description": "Filete de ternera tierna preparado en su punto, acompañado de papas saladas, arepa, guacamole y chimichurri.",
    "price": 18,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/6229dc5bb_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 60,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e3e",
    "name": "Chuleta Valluna",
    "description": "Corte grueso de lomo de cerdo marinado en especias criollas, apanado artesanalmente y frito, con papas a la francesa, ensalada fresca y limón.",
    "price": 13,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/e73c48c25_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 61,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e3f",
    "name": "Picada de Chicharrón",
    "description": "Trozos de chicharrón crocante, yuca y papa criolla, con guacamole cremoso y ají de mango.",
    "price": 13,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/eb1c42acf_E6039C1F-DF2A-4323-A42E-0643DFF8980B.png",
    "video": "",
    "available": true,
    "order": 62,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e40",
    "name": "Picada Montañera",
    "description": "Arepa de maíz, pataconcitos, chorizo Santa Rosano, salchichón cervecero, ají de mango y guacamole cremoso.",
    "price": 10,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/e0f8aed7a_C1D47F8D-06CE-42B7-8645-EE8551827E12.png",
    "video": "",
    "available": true,
    "order": 63,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e41",
    "name": "Chuzo Mixto",
    "description": "Trozos de lomo de cerdo y pechuga marinados, acompañados de arepa con queso, papa francesa y salsa tártara.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4f8bcddf8_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 64,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e42",
    "name": "Mazorca Desgranada",
    "description": "Base de lechuga, maíz dulce, pechuga a la plancha salteada con marinado, queso fresco, patatas paja, mozzarella, salsas de la casa, salsa de piña y salsa tártara.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4ff75efa4_C82A63BB-819B-4481-AF16-BE98F0079624.png",
    "video": "",
    "available": true,
    "order": 65,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e43",
    "name": "Ceviche de Chicharrón",
    "description": "Trozos de chicharrón crocante marinados en salsa acevichada, aguacate, frutos secos y chips de plátano verde.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/49049d237_8D3D1261-DB4A-4BEE-A9A5-A61462848349.png",
    "video": "",
    "available": true,
    "order": 66,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e44",
    "name": "Qbano Querendón",
    "description": "Pan recién horneado, lechuga, piña calada, cebolla caramelizada al ron y panela, tocineta ahumada, pollo desmechado, queso Edam, salsa de la casa y salsa tártara.",
    "price": 11,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f8dc9244b_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 67,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6a9e01f47faa8c268cc05e45",
    "name": "Enrollado Trasnochador",
    "description": "Tortilla de trigo rellena de pollo y ternera desmechados, lechuga fresca, piña calada, salsa de la casa, mozzarella, nachos con salsa cheddar y guacamole cremoso.",
    "price": 12,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/abeb9ea14_Producto1200x1200cartadigital-1.png",
    "video": "",
    "available": true,
    "order": 68,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa2b7b1e504dee8700f34a2",
    "name": "Langostinos encocado",
    "description": "Langostinos al ajillo españolas, pero terminadas con un chorro de leche de coco al\nfinal de la cocción y moneditas de plátano verde.",
    "price": 10,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a467eb7a2_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 69,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa2ba2081ec7ed24cd4b314",
    "name": "Pechuga ajiacada",
    "description": "Pechuga de pollo de corral a baja temperatura, servida sobre una crema untuosa de papas\ny guascas, con alcaparras fritas y maíz baby braseado.",
    "price": 14,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d242b5e08_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 70,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa2ba8d9b730e34885a39d3",
    "name": "Cazuela de marisco",
    "description": "Mezcla de Productos del mar de Temporada, Salteados con delicioso guiso colombiano,\ncocinado en cremosa leche de coco que le da ese toque perfecto",
    "price": 15,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/53fa3b73e_Producto1200x1200cartadigital.png",
    "video": "",
    "available": false,
    "order": 71,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6aa573231fc37dc2db99f500",
    "name": "Nachos Querendon",
    "description": "Clasicos Nachos de Maiz, Salsa de La Casa, Guacamole Cremoso, Carne y Pollo\nDesmechado, Salsa Acevichada, Piña Calada Bañados en salsa Cheddar.",
    "price": 10,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a3c2b857e_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 72,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa587ec8914d8fe8f73deee",
    "name": "Arepas arrieras",
    "description": "Arepas Mixtas(Ternera, Pollo y Chorizo), Cebolla Encurtida, acompañada de Ají de Mang",
    "price": 7,
    "category": "CENAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/ce0021410_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 73,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8604807bc009bdd5b7dfa",
    "name": "Lomo de Añojo",
    "description": "Filete de ternera tierna preparado en su punto, acompañado de papas saladas, arepa, guacamole y chimichurri.",
    "price": 18,
    "category": "ALMUERZOS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/ae49117fe_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 74,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c971",
    "name": "Aguapanela",
    "description": "Bebida caliente · desayuno",
    "price": 1.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/0108ccfb0_9B4A68FE-E081-48EA-950C-A339649F5336.png",
    "video": "",
    "available": true,
    "order": 75,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c972",
    "name": "Chocolate",
    "description": "Bebida caliente · desayuno",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f0fda119a_51071FCE-A068-40BE-AA84-69F94A122340.png",
    "video": "",
    "available": true,
    "order": 76,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c973",
    "name": "Milo caliente",
    "description": "Bebida caliente · desayuno",
    "price": 3,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/539a58d30_2E186939-B958-4626-A86F-CC6CB4877DAF.png",
    "video": "",
    "available": true,
    "order": 77,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c974",
    "name": "Café",
    "description": "Bebida caliente · desayuno",
    "price": 1.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/080e1f8c0_D39208E7-9EAD-46AA-A94B-E1AAFD2C87DD.png",
    "video": "",
    "available": true,
    "order": 78,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c975",
    "name": "Infusión",
    "description": "Bebida caliente · desayuno",
    "price": 1.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/29b0dc247_52DB4F67-3309-431A-AB3D-7596781B9E7C.png",
    "video": "",
    "available": true,
    "order": 79,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c976",
    "name": "Milo Frio",
    "description": "Bebida fría",
    "price": 3.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/3434d8314_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 80,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c977",
    "name": "Aguapanela con limón pequeña",
    "description": "Bebida fría",
    "price": 1.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/61fa5907f_759B4FB8-D8F1-49C1-A686-D2B707BA8FA7.png",
    "video": "",
    "available": true,
    "order": 81,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c978",
    "name": "Aguapanela con limón grande",
    "description": "Bebida fría",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/c0d3d6e63_A4B49D42-1E7F-4E2C-83F5-A47E375C9FE7.png",
    "video": "",
    "available": true,
    "order": 82,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c979",
    "name": "Jugo natural en agua",
    "description": "Sabores: mango, guanábana, lulo, mora, maracuyá y tomate de árbol",
    "price": 4.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/7ea05282d_B7BB790B-27CA-4833-89AB-4B54A28E3033.png",
    "video": "",
    "available": true,
    "order": 83,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c97a",
    "name": "Jugo natural en leche",
    "description": "Sabores: mango, guanábana, lulo, mora, maracuyá y tomate de árbol",
    "price": 5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/dc0fc0741_B7BB790B-27CA-4833-89AB-4B54A28E3033.png",
    "video": "",
    "available": true,
    "order": 84,
    "is_featured": true,
    "allergens": [],
    "tags": [
      "Recomendado",
      "Tradicional"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c97b",
    "name": "Postobón",
    "description": "Sabores: uva colombiana y manzana",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/5fc2e1057_1FAF75E0-0894-46FC-8970-6866931B75CF.png",
    "video": "",
    "available": true,
    "order": 85,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c97c",
    "name": "Jugos Hitos",
    "description": "Sabores: lulo, mora, tropical y mango",
    "price": 2.3,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/34ec4273e_A3DD4614-F5E9-42F4-9273-D8A7767C5396.png",
    "video": "",
    "available": true,
    "order": 86,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c97d",
    "name": "Pony Malta",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/3af529626_10B1E66A-3C46-454D-8940-AA0BEEC301C9.png",
    "video": "",
    "available": true,
    "order": 87,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c97e",
    "name": "Estrella Galicia / 0,0 - Caña",
    "description": "Cerveza de barril",
    "price": 1.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/2da7be410_62AAEFFD-4A8F-4F8B-94C1-8B6719805713.png",
    "video": "",
    "available": true,
    "order": 88,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c97f",
    "name": "Estrella Galicia / 0,0 - Copa",
    "description": "Cerveza de barril",
    "price": 1.7,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/032dda92e_F8D40BBE-CABE-4721-BC7D-BAF524B2E772.png",
    "video": "",
    "available": true,
    "order": 89,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c980",
    "name": "Estrella Galicia / 0,0 - Jarra",
    "description": "Cerveza de barril",
    "price": 2.8,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/1ec4e0a16_38A7668E-9FD6-48C1-9211-0BC81C1526BC.png",
    "video": "",
    "available": true,
    "order": 90,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c981",
    "name": "Estrella Galicia - Tercio",
    "description": "",
    "price": 2.2,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/749f08103_8F1ECF7C-F7E5-4E1D-8764-5CDC5D90F194.png",
    "video": "",
    "available": true,
    "order": 91,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c982",
    "name": "1906 Black Coupage - Tercio",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a4c5b3205_ECC892BB-7B47-4344-886A-55A9F727CBF7.png",
    "video": "",
    "available": true,
    "order": 92,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c983",
    "name": "1906 Red Vintage - Tercio",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/bfe1d00a3_1F1687B6-3D68-435B-B59F-D4A78378DE7B.png",
    "video": "",
    "available": true,
    "order": 93,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c984",
    "name": "1906 Tradicional - Tercio",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/885911c2b_F5F772B5-E3DF-4655-AD59-FA6A31AE99AE.png",
    "video": "",
    "available": true,
    "order": 94,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c985",
    "name": "Rivera Responsado - Tercio",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/9cac65391_0214E700-FC55-43DC-ACE7-2A23C6E44FEB.png",
    "video": "",
    "available": true,
    "order": 95,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c986",
    "name": "Águila",
    "description": "Cerveza colombiana",
    "price": 3,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/56036f5f1_2BC3EB7A-45D4-4F5B-9612-64BCDD3DA69D.png",
    "video": "",
    "available": true,
    "order": 96,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c987",
    "name": "Club Colombia",
    "description": "Cerveza colombiana",
    "price": 3,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a4726ddc7_D18FAAA8-ED09-4E74-821D-A813CF9AA5AE.png",
    "video": "",
    "available": true,
    "order": 97,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c988",
    "name": "Poker",
    "description": "Cerveza colombiana",
    "price": 3,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/7f32c8947_A1E91018-B265-40D7-ACCC-323CA5D7B3D2.png",
    "video": "",
    "available": true,
    "order": 98,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c989",
    "name": "Agua pequeña",
    "description": "",
    "price": 1.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/e2082196d_27A4E280-FE65-42D8-908F-E12CA7566E64.png",
    "video": "",
    "available": true,
    "order": 99,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c98a",
    "name": "Agua grande",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/6b50be975_73B489C3-F5BE-434D-AF59-E06A3204E3EF.png",
    "video": "",
    "available": true,
    "order": 100,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c98b",
    "name": "Agua con gas",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4ceb9310f_80609EAD-62D9-4C0A-AFA9-F899E7190C7A.png",
    "video": "",
    "available": true,
    "order": 101,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c98c",
    "name": "Copa de vino blanco",
    "description": "Verdejo o semidulce",
    "price": 2.2,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/bad685ab1_CD898896-DCBE-44E1-9A8A-D3FB7937C1CE.png",
    "video": "",
    "available": true,
    "order": 102,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c98d",
    "name": "Copa de vino tinto",
    "description": "Rioja o Rivera",
    "price": 2.2,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/8ed85287f_1C4481DB-BBB5-4346-AB7C-8AAE2E0FB1C3.png",
    "video": "",
    "available": true,
    "order": 103,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c98e",
    "name": "Tinto de verano",
    "description": "",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/ca234e6db_226C221B-E992-4418-A93F-B9419C49B370.png",
    "video": "",
    "available": true,
    "order": 104,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c98f",
    "name": "Coca-Cola Original",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/551923f06_E7FFCF33-1FB7-4731-99C7-3C98F498421A.png",
    "video": "",
    "available": true,
    "order": 105,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c990",
    "name": "Coca-Cola Zero Zero",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d33c1e1db_IMG_7854.png",
    "video": "",
    "available": true,
    "order": 106,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c991",
    "name": "Sprite",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/4257cb089_Producto1200x1200cartadigital.png",
    "video": "",
    "available": true,
    "order": 107,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c992",
    "name": "Fanta Naranja",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/0c24aaefd_1C5A278E-3C6E-4AE4-81FE-24DC2ED8E86A.png",
    "video": "",
    "available": true,
    "order": 108,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c993",
    "name": "Fanta Limón",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/e647c283a_840E4C0C-B5E5-4E33-9F58-171DD638F107.png",
    "video": "",
    "available": true,
    "order": 109,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c994",
    "name": "Aquarius Limón",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/42d1cabcd_14D22ACB-B6CA-4FF3-B084-E7E270CAC940.png",
    "video": "",
    "available": true,
    "order": 110,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c995",
    "name": "Aquarius Naranja",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/17b0047fb_43F1CDAD-1B26-4349-BE5F-2F240F336521.png",
    "video": "",
    "available": true,
    "order": 111,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6aa8637f5726c6c864f0c996",
    "name": "Fuze Tea Limón",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/af8536666_D4A7D7A7-8C48-4731-A7FD-B21BB1FAAE04.png",
    "video": "",
    "available": true,
    "order": 112,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6ab00f748947b9460ac02288",
    "name": "Fuze Tea Maracuyá",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/b11b0a20c_2576E2F2-68E0-498F-84D4-BF4AB2AE841A.png",
    "video": "",
    "available": true,
    "order": 113,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6ab0139a1eda35cdc73a4479",
    "name": "Coca-Cola Zero",
    "description": "Refresco 350 ml en vidrio",
    "price": 2.5,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/507052492_C5BE3B16-6B2D-46C5-BDA8-23EBCEB0DA38.png",
    "video": "",
    "available": true,
    "order": 114,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6ab017b6cd67ee3dda6193db",
    "name": "Estrella Galicia 0’0 tercio",
    "description": "",
    "price": 2.2,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/76358308f_26BB8C97-B2D0-4C9F-B4B6-EB8DCF09C71C.png",
    "video": "",
    "available": true,
    "order": 115,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6ab019019146f1413bb8a7ed",
    "name": "Estrella Galicia Sin Gluten -Tercio",
    "description": "",
    "price": 2.2,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f9773f673_2A584895-F7E9-4518-8581-1D36F5542AD3.png",
    "video": "",
    "available": true,
    "order": 116,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  },
  {
    "id": "6ab019ca36e1a185a27af7a4",
    "name": "Cerveza Corona",
    "description": "",
    "price": 0,
    "category": "BEBIDAS",
    "image": "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/270dca78e_67D73D27-9DB6-47A8-A846-B913B6892037.png",
    "video": "",
    "available": true,
    "order": 117,
    "is_featured": false,
    "allergens": [],
    "tags": [
      "Casero"
    ]
  }
];
