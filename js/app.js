// ============================================================
// GABON-CHINA MARKET — Core Application Logic (v2)
// ============================================================

// ── Lucide SVG Icons (inline, no external dependency) ──
const ICONS = {
  home:       '<svg class="icon-svg" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  search:     '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  catalogue:  '<svg class="icon-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  car:        '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.2-3.3C12.8 5.5 11.6 5 10.3 5H5.6c-.8 0-1.5.4-1.9 1.1L2 9c-.6 1-.9 2-.9 3.1V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  building:   '<svg class="icon-svg" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  house:      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  store:      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>',
  ship:       '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 1v4"/></svg>',
  package:    '<svg class="icon-svg" viewBox="0 0 24 24"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  user:       '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  users:      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  login:      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
  logout:     '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  plus:       '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit:       '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash:      '<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  cart:       '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  bell:       '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  settings:   '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  chart:      '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  dollar:     '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  globe:      '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mapPin:     '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  phone:      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail:       '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  clock:      '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check:      '<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  x:          '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  alert:      '<svg class="icon-svg" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  shield:     '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  truck:      '<svg class="icon-svg" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  box:        '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  eye:        '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  facebook:   '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  instagram:  '<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  messageCircle: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  palette:    '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  warehouse:  '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/></svg>',
  customs:    '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  tag:        '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  receipt:    '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>',
};

function icon(name, extraClass = '') {
  return ICONS[name] ? ICONS[name].replace('class="icon-svg"', `class="icon-svg ${extraClass}"`) : '';
}

const API_URL = window.location.origin + '/api';

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('gcm_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Si ce n'est pas une tentative de connexion, on déconnecte
        if (!endpoint.includes('/auth/login')) {
          AuthManager.logout(false);
          throw new Error('Session expirée ou non autorisée');
        }
      }
      throw new Error(data?.message || `Erreur ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ── Gestion de l'état d'authentification ──
const AuthManager = {
  currentUser: null,

  init() {
    const saved = localStorage.getItem('gcm_user');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
    this.updateUI();
  },

  async login(username, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    // Convertir les rôles Spring Security (ex: ROLE_ACHETEUR) en rôles locaux (ex: ACHETEUR)
    const primaryRole = data.roles && data.roles.length > 0 ? data.roles[0].replace('ROLE_', '') : 'ACHETEUR';
    
    this.currentUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: primaryRole,
      roles: data.roles
    };
    
    localStorage.setItem('gcm_user', JSON.stringify(this.currentUser));
    localStorage.setItem('gcm_token', data.token);
    this.updateUI();
    return this.currentUser;
  },

  async register(username, email, password, roleValue, sellerType = null) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ 
        username, 
        email, 
        password, 
        role: roleValue ? [roleValue] : null,
        sellerType: sellerType
      })
    });
    return data;
  },

  logout(redirect = true) {
    this.currentUser = null;
    localStorage.removeItem('gcm_user');
    localStorage.removeItem('gcm_token');
    this.updateUI();
    if (redirect) window.location.href = 'index.html';
  },

  isLoggedIn()  { return this.currentUser !== null; },
  getRole()     { return this.currentUser?.role || 'VISITEUR'; },
  hasRole(role) { return this.getRole() === role; },
  canBuy()      { return this.hasRole('ACHETEUR') || this.hasRole('ADMIN'); },
  canSell()     { return this.hasRole('VENDEUR') || this.hasRole('ADMIN'); },
  isAdmin()     { return this.hasRole('ADMIN'); },

  updateUI() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    if (this.isLoggedIn()) {
      const dashboardLink = this.getDashboardLink();
      const unreadCount = NotificationManager?.getUnreadCount ? NotificationManager.getUnreadCount() : 0;
      navActions.innerHTML = `
        <div class="notif-wrapper">
          <button class="notif-btn" onclick="NotificationManager.toggle()" aria-label="Notifications">
            ${icon('bell')}
            <span class="notif-count" data-count="${unreadCount}">${unreadCount > 0 ? unreadCount : ''}</span>
          </button>
          <div class="notif-dropdown" id="notifDropdown"></div>
        </div>
        <a href="${dashboardLink}" class="btn btn-secondary btn-sm">
          ${icon('chart')} Dashboard
        </a>
        <button onclick="AuthManager.logout()" class="btn btn-sm" style="background: var(--bg-glass); color: var(--text-secondary); border: 1px solid var(--border-glass);">
          ${icon('logout')} Déconnexion
        </button>
      `;
    } else {
      navActions.innerHTML = `
        <a href="login.html" class="btn btn-secondary btn-sm">${icon('login')} Connexion</a>
        <a href="register.html" class="btn btn-primary btn-sm">${icon('user')} Inscription</a>
      `;
    }

    document.querySelectorAll('[data-role]').forEach(el => {
      const roles = el.dataset.role.split(',');
      el.style.display = roles.includes(this.getRole()) || roles.includes('ALL') ? '' : 'none';
    });

    document.querySelectorAll('.btn-buy, .btn-rent').forEach(btn => {
      if (!this.canBuy()) {
        btn.title = 'Connectez-vous en tant qu\'acheteur pour acheter/louer';
        btn.classList.add('disabled');
        btn.onclick = (e) => {
          e.preventDefault();
          showToast('Veuillez vous connecter en tant qu\'acheteur', 'warning');
        };
      }
    });
  },

  getDashboardLink() {
    switch (this.getRole()) {
      case 'ADMIN':    return 'dashboard-admin.html';
      case 'VENDEUR':  return 'dashboard-seller.html';
      case 'ACHETEUR': return 'dashboard-buyer.html';
      default:         return 'login.html';
    }
  }
};


// ── Gestion des Produits ──
const ProductManager = {
  async getAll() {
    return await apiFetch('/products');
  },

  async getBySeller(sellerId) {
    return await apiFetch(`/products/seller/${sellerId}`);
  },

  async create(productData) {
    return await apiFetch('/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async delete(productId) {
    return await apiFetch(`/products/${productId}`, {
      method: 'DELETE'
    });
  }
};

// ── Gestion des Commandes ──
const OrderManager = {
  async getAll() {
    return await apiFetch('/orders');
  },

  async getByBuyer(buyerId) {
    return await apiFetch(`/orders/buyer/${buyerId}`);
  },

  async getBySeller(sellerId) {
    return await apiFetch(`/orders/seller/${sellerId}`);
  },

  async updateStatus(orderId, status) {
    return await apiFetch(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }
};

// ── Gestion des Utilisateurs (Admin) ──
const UserManager = {
  async getAll() {
    return await apiFetch('/auth/users'); // On devra ajouter cet endpoint
  },

  async delete(userId) {
    return await apiFetch(`/auth/users/${userId}`, {
      method: 'DELETE'
    });
  }
};

// ── Notification Manager ──
const NotificationManager = {
  _notifications: null,

  getAll() {
    if (!this._notifications) {
      const saved = localStorage.getItem('gcm_notifications');
      this._notifications = saved ? JSON.parse(saved) : this._getDefaults();
      this._save();
    }
    return this._notifications;
  },

  _getDefaults() {
    const role = AuthManager.getRole();
    const notifs = [];
    if (role === 'ACHETEUR' || role === 'ADMIN') {
      notifs.push(
        { id: 1, type: 'order', icon: 'green', title: 'Commande confirmée', message: 'Votre commande #1001 (Toyota Land Cruiser V8) a été confirmée.', time: 'Il y a 2h', read: false },
        { id: 2, type: 'tracking', icon: 'blue', title: 'Colis expédié', message: 'Votre commande #1003 (Climatiseur Split) a été expédiée depuis la Chine.', time: 'Il y a 5h', read: false },
        { id: 3, type: 'status', icon: 'yellow', title: 'Statut mis à jour', message: 'Commande #1002 : votre location est active.', time: 'Il y a 1j', read: true }
      );
    }
    if (role === 'VENDEUR' || role === 'ADMIN') {
      notifs.push(
        { id: 4, type: 'sale', icon: 'green', title: 'Nouvelle vente !', message: 'Jean-Pierre M. a acheté votre Toyota Land Cruiser V8.', time: 'Il y a 3h', read: false },
        { id: 5, type: 'sale', icon: 'yellow', title: 'Nouvelle location', message: 'Jean-Pierre M. a loué votre Appartement 3 pièces.', time: 'Il y a 1j', read: true }
      );
    }
    return notifs;
  },

  _save() {
    localStorage.setItem('gcm_notifications', JSON.stringify(this._notifications));
  },

  getUnreadCount() {
    return this.getAll().filter(n => !n.read).length;
  },

  add(notif) {
    this._notifications.unshift({ ...notif, id: Date.now(), read: false });
    this._save();
    this._updateBadge();
  },

  markAllRead() {
    this.getAll().forEach(n => n.read = true);
    this._save();
    this._updateBadge();
    this.render();
  },

  _updateBadge() {
    const badge = document.querySelector('.notif-count');
    if (badge) {
      const c = this.getUnreadCount();
      badge.textContent = c > 0 ? c : '';
      badge.dataset.count = c;
    }
  },

  toggle() {
    const dd = document.getElementById('notifDropdown');
    if (!dd) return;
    dd.classList.toggle('open');
    if (dd.classList.contains('open')) this.render();
  },

  render() {
    const dd = document.getElementById('notifDropdown');
    if (!dd) return;
    const notifs = this.getAll();
    const iconMap = { green: icon('check'), yellow: icon('alert'), blue: icon('ship'), red: icon('x') };

    dd.innerHTML = `
      <div class="notif-header">
        <h4>Notifications</h4>
        <button class="btn btn-sm btn-secondary" onclick="NotificationManager.markAllRead()" style="padding: 4px 10px; font-size: 0.75rem;">Tout marquer lu</button>
      </div>
      ${notifs.length === 0 ? '<div class="notif-empty">Aucune notification</div>' :
        notifs.map(n => `
          <div class="notif-item ${n.read ? '' : 'unread'}">
            <div class="notif-icon ${n.icon}">${iconMap[n.icon] || icon('bell')}</div>
            <div class="notif-text">
              <p><strong>${n.title}</strong></p>
              <p style="color: var(--text-secondary);">${n.message}</p>
              <small>${n.time}</small>
            </div>
          </div>
        `).join('')
      }
    `;
  }
};

// Fermer le menu déroulant des notifications lors d'un clic à l'extérieur
document.addEventListener('click', (e) => {
  const dd = document.getElementById('notifDropdown');
  if (dd && dd.classList.contains('open') && !e.target.closest('.notif-wrapper')) {
    dd.classList.remove('open');
  }
});

// ── Personnalisation du thème ──
const ThemeManager = {
  defaults: {
    bgPrimary: '#0a0e1a',
    bgSecondary: '#111827',
    heroGradient: 'default'
  },

  presets: {
    dark:       { bgPrimary: '#0a0e1a', bgSecondary: '#111827', label: 'Sombre (défaut)' },
    midnight:   { bgPrimary: '#0d1117', bgSecondary: '#161b22', label: 'Midnight' },
    navy:       { bgPrimary: '#0a192f', bgSecondary: '#112240', label: 'Navy' },
    charcoal:   { bgPrimary: '#1a1a2e', bgSecondary: '#16213e', label: 'Charcoal' },
    forest:     { bgPrimary: '#0b1a0b', bgSecondary: '#112211', label: 'Forêt' },
    wine:       { bgPrimary: '#1a0a0a', bgSecondary: '#2a1515', label: 'Vin' },
    ocean:      { bgPrimary: '#0a1628', bgSecondary: '#0f2035', label: 'Océan' },
    slate:      { bgPrimary: '#1e293b', bgSecondary: '#334155', label: 'Ardoise' },
    light:      { bgPrimary: '#f0f2f5', bgSecondary: '#ffffff', label: 'Clair',
                  textPrimary: '#1a1a2e', textSecondary: '#475569', textMuted: '#94a3b8',
                  borderGlass: 'rgba(0,0,0,0.1)', borderGlassHover: 'rgba(0,0,0,0.2)',
                  bgGlass: 'rgba(0,0,0,0.03)', bgGlassHover: 'rgba(0,0,0,0.06)' },
    cream:      { bgPrimary: '#faf7f2', bgSecondary: '#f5f0e8', label: 'Crème',
                  textPrimary: '#2d2a26', textSecondary: '#6b6560', textMuted: '#9a9490',
                  borderGlass: 'rgba(0,0,0,0.08)', borderGlassHover: 'rgba(0,0,0,0.15)',
                  bgGlass: 'rgba(0,0,0,0.03)', bgGlassHover: 'rgba(0,0,0,0.06)' }
  },

  init() {
    const saved = localStorage.getItem('gcm_theme');
    if (saved) this.apply(saved);
    this.injectPanel();
  },

  apply(presetName) {
    const preset = this.presets[presetName];
    if (!preset) return;

    const root = document.documentElement;
    root.style.setProperty('--bg-primary', preset.bgPrimary);
    root.style.setProperty('--bg-secondary', preset.bgSecondary);

    if (preset.textPrimary) {
      root.style.setProperty('--text-primary', preset.textPrimary);
      root.style.setProperty('--text-secondary', preset.textSecondary);
      root.style.setProperty('--text-muted', preset.textMuted);
      root.style.setProperty('--border-glass', preset.borderGlass);
      root.style.setProperty('--border-glass-hover', preset.borderGlassHover);
      root.style.setProperty('--bg-glass', preset.bgGlass);
      root.style.setProperty('--bg-glass-hover', preset.bgGlassHover);
      root.style.setProperty('--text-inverse', '#f1f5f9');
    } else {
      // Reset to dark defaults
      root.style.setProperty('--text-primary', '#f1f5f9');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--text-muted', '#64748b');
      root.style.setProperty('--border-glass', 'rgba(255,255,255,0.08)');
      root.style.setProperty('--border-glass-hover', 'rgba(255,255,255,0.15)');
      root.style.setProperty('--bg-glass', 'rgba(255,255,255,0.04)');
      root.style.setProperty('--bg-glass-hover', 'rgba(255,255,255,0.08)');
      root.style.setProperty('--text-inverse', '#0a0e1a');
    }

    localStorage.setItem('gcm_theme', presetName);

    // Update active swatch
    document.querySelectorAll('.color-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.theme === presetName);
    });
  },

  injectPanel() {
    // Ne pas injecter sur les pages d'authentification
    if (document.querySelector('.auth-page')) return;

    const panel = document.createElement('div');
    panel.innerHTML = `
      <button class="theme-toggle-btn" onclick="ThemeManager.togglePanel()" aria-label="Personnaliser le thème">
        ${icon('palette', 'icon-lg')}
      </button>
      <div class="theme-panel" id="themePanel">
        <h4>${icon('palette')} Personnaliser le fond</h4>
        <div class="theme-section">
          <label>Fond du site</label>
          <div class="color-grid">
            ${Object.entries(this.presets).map(([key, p]) => `
              <div class="color-swatch" data-theme="${key}" onclick="ThemeManager.apply('${key}')"
                   title="${p.label}"
                   style="background: ${p.bgPrimary}; ${key === 'light' || key === 'cream' ? 'border: 1px solid rgba(0,0,0,0.2);' : ''}">
              </div>
            `).join('')}
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="ThemeManager.reset()">
          Réinitialiser par défaut
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    // Mark active
    const current = localStorage.getItem('gcm_theme') || 'dark';
    document.querySelectorAll('.color-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.theme === current);
    });
  },

  togglePanel() {
    document.getElementById('themePanel')?.classList.toggle('open');
  },

  reset() {
    this.apply('dark');
    localStorage.removeItem('gcm_theme');
    showToast('Thème réinitialisé', 'success');
  }
};

// ── Mobile Navigation ──
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// ── Toast Notifications ──
function showToast(message, type = 'success', duration = 4000) {
  const toastIcons = {
    success: icon('check'),
    error:   icon('x'),
    warning: icon('alert'),
    info:    icon('bell')
  };
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.1rem;">${toastIcons[type]}</span>
    <div>
      <p style="color: var(--text-primary); font-weight: 500; font-size: 0.9rem;">${message}</p>
    </div>
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toast-in 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Product Card Generator ──
function createProductCard(product) {
  const isUnavailable = !product.available;
  const priceLabel = product.priceLabel || '';
  const sellerName = product.seller?.username || product.sellerName || 'Vendeur';
  
  return `
    <div class="card ${isUnavailable ? 'unavailable' : ''}" data-id="${product.id}">
      <div class="card-img-wrapper">
        <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600'">
        ${product.isMbShop ? `<span class="badge badge-mbshop" style="position:absolute;top:12px;left:12px;z-index:2;">${icon('store','icon-sm')} MB Shop</span>` : ''}
        ${isUnavailable ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;"><span class="badge badge-red" style="font-size:0.85rem;padding:8px 16px;">${icon('alert','icon-sm')} Rupture de stock</span></div>` : ''}
        <span class="badge ${product.mode === 'location' ? 'badge-blue' : 'badge-green'}" style="position:absolute;top:12px;right:12px;z-index:2;">
          ${product.mode === 'location' ? icon('house','icon-sm') + ' Location' : icon('tag','icon-sm') + ' Vente'}
        </span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.title}</h3>
        <p class="card-text">${product.description}</p>
        <div class="card-price">${formatPrice(product.price)} <span>${priceLabel}</span></div>
        <div class="card-footer">
          <span class="text-sm text-muted">${sellerName}</span>
          ${isUnavailable
            ? `<button class="btn btn-sm disabled" disabled>${icon('x','icon-sm')} Indisponible</button>`
            : `<a href="product.html?id=${product.id}" class="btn btn-primary btn-sm">${icon('eye','icon-sm')} Voir détails</a>`
          }
        </div>
      </div>
    </div>
  `;
}

// ── Catalogue Filter ──
function filterProducts(products, filters = {}) {
  return products.filter(p => {
    if (filters.category && filters.category !== 'all' && p.category !== filters.category) return false;
    if (filters.mode && filters.mode !== 'all' && p.mode !== filters.mode) return false;
    if (filters.mbshop !== undefined && p.isMbShop !== filters.mbshop) return false;
    if (filters.available && !p.available) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      return p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s);
    }
    return true;
  });
}

// ── URL Params Helper ──
function getUrlParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  AuthManager.init();
  initMobileNav();
  ThemeManager.init();

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  const main = document.querySelector('main') || document.querySelector('.page-enter');
  if (main) main.classList.add('page-enter');
});
