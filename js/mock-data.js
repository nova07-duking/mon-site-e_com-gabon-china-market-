// ============================================================
// GABON-CHINA MARKET — Mock Data
// ============================================================

const MOCK_USERS = {
  buyer: {
    id: 2,
    username: 'Jean-Pierre Moussavou',
    email: 'jean@email.ga',
    role: 'ACHETEUR',
    joinDate: '2025-06-15'
  },
  seller: {
    id: 3,
    username: 'Paul Ndong',
    email: 'paul@email.ga',
    role: 'VENDEUR',
    sellerType: 'vehicule',
    joinDate: '2025-08-20'
  },
  admin: {
    id: 1,
    username: 'Admin MB Shop',
    email: 'admin@mbshop.ga',
    role: 'ADMIN',
    joinDate: '2025-01-01'
  }
};

const MOCK_PRODUCTS = [
  {
    id: 1, title: 'Toyota Land Cruiser V8', type: 'VEHICULE', category: 'vehicule',
    mode: 'vente', price: 25000000, priceLabel: '',
    description: 'Toyota Land Cruiser 2023, V8, 4×4, faible kilométrage. Idéal pour les routes du Gabon.',
    image: 'https://images.unsplash.com/photo-1625231334401-536db49db23f?w=600',
    features: ['V8 4.5L', '4x4', 'GPS', 'Cuir', 'Climatisation'],
    sellerId: 3, sellerName: 'Paul Ndong', available: true, quantity: 1, isMbShop: false
  },
  {
    id: 2, title: 'Mercedes-Benz Classe C', type: 'VEHICULE', category: 'vehicule',
    mode: 'vente', price: 18500000, priceLabel: '',
    description: 'Mercedes-Benz C220 CDI, berline élégante, parfaite pour la ville. Entretien complet, pneus neufs.',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600',
    features: ['Diesel', 'Automatique', 'Cuir', 'Toit ouvrant'],
    sellerId: 3, sellerName: 'Paul Ndong', available: true, quantity: 1, isMbShop: false
  },
  {
    id: 3, title: 'Range Rover Sport', type: 'VEHICULE', category: 'vehicule',
    mode: 'vente', price: 35000000, priceLabel: '',
    description: 'Range Rover Sport 2022, SUV de luxe, toit panoramique, caméra 360°. Parfait état.',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600',
    features: ['V6 3.0L', '4x4', 'Caméra 360°', 'Toit panoramique'],
    sellerId: 3, sellerName: 'Paul Ndong', available: false, quantity: 0, isMbShop: false
  },
  {
    id: 4, title: 'Appartement 3 pièces — Libreville Centre', type: 'MAISON', category: 'appartement',
    mode: 'location', price: 350000, priceLabel: '/mois',
    description: 'Bel appartement 3 pièces meublé, centre-ville de Libreville. Eau et électricité incluses.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
    features: ['3 pièces', 'Meublé', 'Gardien', 'Parking'],
    sellerId: 5, sellerName: 'Steeve Ondo', available: true, quantity: 1, isMbShop: false
  },
  {
    id: 5, title: 'Villa 5 pièces avec piscine', type: 'MAISON', category: 'maison',
    mode: 'vente', price: 120000000, priceLabel: '',
    description: 'Villa de standing, 5 pièces, piscine, jardin tropical. Quartier résidentiel sécurisé.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
    features: ['5 pièces', 'Piscine', 'Jardin', 'Sécurisé', 'Garage'],
    sellerId: 5, sellerName: 'Steeve Ondo', available: true, quantity: 1, isMbShop: false
  },
  {
    id: 6, title: 'Duplex moderne — Owendo', type: 'MAISON', category: 'appartement',
    mode: 'location', price: 500000, priceLabel: '/mois',
    description: 'Duplex moderne 4 pièces, terrasse, cuisine équipée. Quartier calme et sécurisé à Owendo.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
    features: ['4 pièces', 'Terrasse', 'Cuisine équipée', 'Parking'],
    sellerId: 5, sellerName: 'Steeve Ondo', available: true, quantity: 1, isMbShop: false
  },
  {
    id: 7, title: 'Groupe Électrogène 5kVA', type: 'DIVERS', category: 'mbshop',
    mode: 'vente', price: 450000, priceLabel: '',
    description: 'Groupe électrogène importé de Chine, puissant et silencieux. Garantie MB Shop 1 an.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492CC74b4?w=600',
    features: ['5kVA', 'Silencieux', 'Diesel', 'Garantie 1 an'],
    sellerId: 1, sellerName: 'MB Shop', available: true, quantity: 5, isMbShop: true
  },
  {
    id: 8, title: 'Climatiseur Split 12000 BTU', type: 'DIVERS', category: 'mbshop',
    mode: 'vente', price: 185000, priceLabel: '',
    description: 'Climatiseur split inverter, importation directe Chine. Installation possible via MB Shop.',
    image: 'https://images.unsplash.com/photo-1631567091046-7eb3a22fd3a5?w=600',
    features: ['12000 BTU', 'Inverter', 'Silencieux', 'Télécommande'],
    sellerId: 1, sellerName: 'MB Shop', available: true, quantity: 12, isMbShop: true
  },
  {
    id: 9, title: 'Smartphone Android 256GB', type: 'DIVERS', category: 'mbshop',
    mode: 'vente', price: 95000, priceLabel: '',
    description: 'Smartphone dernière génération, écran AMOLED, double SIM. Import direct de Shenzhen.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    features: ['256GB', 'AMOLED', 'Double SIM', '5000mAh'],
    sellerId: 1, sellerName: 'MB Shop', available: true, quantity: 20, isMbShop: true
  },
  {
    id: 10, title: 'TV LED 55" 4K UHD', type: 'DIVERS', category: 'mbshop',
    mode: 'vente', price: 320000, priceLabel: '',
    description: 'Téléviseur 55 pouces 4K Ultra HD, Smart TV, HDMI x3. Livraison gratuite à Libreville.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600',
    features: ['55"', '4K UHD', 'Smart TV', 'HDR10'],
    sellerId: 1, sellerName: 'MB Shop', available: false, quantity: 0, isMbShop: true
  }
];

const MOCK_ORDERS = [
  { id: 1001, productId: 1, productTitle: 'Toyota Land Cruiser V8', type: 'achat', totalPrice: 25000000, status: 'delivered', date: '2026-02-15', buyer: 'Jean-Pierre M.' },
  { id: 1002, productId: 4, productTitle: 'Appartement 3 pièces — Libreville', type: 'location', totalPrice: 350000, status: 'active', date: '2026-03-10', buyer: 'Jean-Pierre M.' },
  { id: 1003, productId: 8, productTitle: 'Climatiseur Split 12000 BTU (x2)', type: 'commande_chine', totalPrice: 370000, status: 'shipped', date: '2026-03-18', buyer: 'Jean-Pierre M.' }
];

const MOCK_TRACKING = {
  'CN-2026-88431': {
    orderId: 1003,
    product: 'Climatiseur Split 12000 BTU (x2)',
    status: 'shipped',
    currentStep: 2,
    steps: [
      { label: 'Entrepôt Chine', date: '2026-03-18', done: true },
      { label: 'Expédié', date: '2026-03-19', done: true },
      { label: 'En transit maritime', date: null, done: false },
      { label: 'Douanes Gabon', date: null, done: false },
      { label: 'Livré MB Shop', date: null, done: false }
    ],
    history: [
      { date: '2026-03-19 14:30', event: 'Colis pris en charge par le transporteur maritime', location: 'Shenzhen, Chine' },
      { date: '2026-03-18 09:00', event: 'Colis emballé et prêt à l\'expédition', location: 'Entrepôt Shenzhen' },
      { date: '2026-03-17 16:00', event: 'Commande confirmée par le fournisseur', location: 'Shenzhen, Chine' }
    ]
  }
};

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

function getStatusColor(status) {
  const map = { delivered: 'badge-green', active: 'badge-blue', shipped: 'badge-yellow', pending: 'badge-yellow', cancelled: 'badge-red' };
  return map[status] || 'badge-blue';
}

function getStatusLabel(status) {
  const map = { delivered: 'Livré', active: 'En cours', shipped: 'Expédié', pending: 'En attente', cancelled: 'Annulé' };
  return map[status] || status;
}
