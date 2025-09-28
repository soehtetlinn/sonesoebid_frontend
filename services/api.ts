import { Product, User, UserRole, Bid, Notification, NotificationType, Order, OrderStatus, Review, Condition, ListingType, CartItem, Conversation, Message, Dispute, DisputeStatus } from '../types';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  return res.json();
}

function normalizeProduct(p: any): Product {
  const bids = Array.isArray(p?.bids) ? p.bids : [];
  return { ...(p as Product), bids } as Product;
}

// Mock Data
let MOCK_USERS: User[] = [
  { id: 1, username: 'JohnDoe', email: 'john@example.com', role: UserRole.BIDDER, reviews: [], firstName: 'John', lastName: 'Doe', phone: '+1 555-123-4567', address: { line1: '123 Main St', city: 'New York', state: 'NY', postalCode: '10001', country: 'USA' } },
  { id: 2, username: 'AdminUser', email: 'admin@example.com', role: UserRole.ADMIN, reviews: [], firstName: 'Ada', lastName: 'Min', phone: '+1 555-987-6543', address: { line1: '1 Admin Way', city: 'San Jose', state: 'CA', postalCode: '95112', country: 'USA' } },
  { id: 3, username: 'JaneSmith', email: 'jane@example.com', role: UserRole.BUYER, reviews: [], firstName: 'Jane', lastName: 'Smith', phone: '+1 555-222-3333', address: { line1: '456 Market St', city: 'San Francisco', state: 'CA', postalCode: '94103', country: 'USA' } },
];

const generateBids = (startPrice: number): Bid[] => {
    const bids: Bid[] = [];
    let currentBid = startPrice;
    const numBids = Math.floor(Math.random() * 8);
    for (let i = 0; i < numBids; i++) {
        currentBid += Math.floor(Math.random() * 20) + 1;
        bids.push({
            id: i + 1,
            userId: Math.random() > 0.5 ? 1 : 3,
            username: Math.random() > 0.5 ? 'JohnDoe' : 'JaneSmith',
            maxBid: currentBid + Math.floor(Math.random() * 10),
            timestamp: new Date(Date.now() - (numBids - i) * 3600000).toISOString(),
        });
    }
    return bids.sort((a,b) => b.maxBid - a.maxBid);
};

let MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'A high-quality vintage leather jacket from the 80s. In excellent condition, with a classic retro look. Perfect for all seasons.',
    seller: 'JohnDoe',
    imageUrl: 'https://picsum.photos/seed/jacket/800/600',
    category: 'Fashion',
    condition: Condition.USED,
    location: 'New York, NY',
    listingType: ListingType.AUCTION,
    startingPrice: 50.00,
    currentPrice: 75.50,
    buyNowPrice: 150.00,
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    bids: generateBids(50.00),
    userId: 1,
  },
  {
    id: '2',
    title: 'Modern Ergonomic Office Chair',
    description: 'Improve your posture and comfort with this modern ergonomic office chair. Fully adjustable with lumbar support.',
    seller: 'JaneSmith',
    imageUrl: 'https://picsum.photos/seed/chair/800/600',
    category: 'Furniture',
    condition: Condition.NEW,
    location: 'San Francisco, CA',
    listingType: ListingType.FIXED_PRICE,
    startingPrice: 180.00,
    currentPrice: 180.00,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    bids: [],
    userId: 3,
  },
  {
    id: '3',
    title: 'Professional DSLR Camera Kit',
    description: 'Canon EOS Rebel T7 DSLR Camera with 18-55mm lens. Includes camera bag, tripod, and memory card. Barely used.',
    seller: 'JohnDoe',
    imageUrl: 'https://picsum.photos/seed/camera/800/600',
    category: 'Electronics',
    condition: Condition.USED,
    location: 'Chicago, IL',
    listingType: ListingType.AUCTION,
    startingPrice: 300.00,
    currentPrice: 425.00,
    buyNowPrice: 600.00,
    endDate: new Date(Date.now() + 1 * 23 * 60 * 60 * 1000).toISOString(), // 23 hours from now
    bids: generateBids(300.00),
    userId: 1,
  },
    {
    id: '4',
    title: 'Antique Pocket Watch',
    description: 'A beautiful gold-plated pocket watch from the early 1900s. Still in working condition, a true collector\'s item.',
    seller: 'JaneSmith',
    imageUrl: 'https://picsum.photos/seed/watch/800/600',
    category: 'Collectibles',
    condition: Condition.USED,
    location: 'Boston, MA',
    listingType: ListingType.AUCTION,
    startingPrice: 250.00,
    currentPrice: 310.00,
    endDate: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago (ended)
    bids: generateBids(250.00),
    userId: 3,
  },
  {
    id: '5',
    title: 'Signed First Edition Novel',
    description: 'A rare, signed first edition of a best-selling fantasy novel. A must-have for any book collector.',
    seller: 'JohnDoe',
    imageUrl: 'https://picsum.photos/seed/book/800/600',
    category: 'Books',
    condition: Condition.NEW,
    location: 'New York, NY',
    listingType: ListingType.FIXED_PRICE,
    startingPrice: 115.00,
    currentPrice: 115.00,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    bids: [],
    userId: 1,
  },
  {
    id: '6',
    title: 'High-Performance Gaming Laptop',
    description: 'Latest model gaming laptop with RTX 4080, 32GB RAM, and 2TB SSD. Capable of running all modern games at max settings.',
    seller: 'JohnDoe',
    imageUrl: 'https://picsum.photos/seed/laptop/800/600',
    category: 'Electronics',
    condition: Condition.NEW,
    location: 'Austin, TX',
    listingType: ListingType.AUCTION,
    startingPrice: 1500.00,
    currentPrice: 1750.00,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    bids: generateBids(1500.00),
    userId: 1,
  }
].map(p => {
    if (p.listingType === ListingType.AUCTION && p.bids.length > 0) {
        p.currentPrice = calculateCurrentPrice(p);
    }
    return p;
});

let MOCK_WATCHLIST: { userId: number, productId: string }[] = [{ userId: 1, productId: '2' }];
let MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'noti-1',
        userId: 1,
        type: NotificationType.OUTBID,
        message: 'You have been outbid on "Antique Pocket Watch"!',
        relatedId: '4',
        title: 'Antique Pocket Watch',
        isRead: false,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
    }
];
let MOCK_ORDERS: Order[] = [];
let MOCK_REVIEWS: Review[] = [];
let MOCK_CART: { [userId: number]: CartItem[] } = { 1: [] };
let MOCK_CONVERSATIONS: Conversation[] = [];
let MOCK_MESSAGES: { [conversationId: string]: Message[] } = {};
let MOCK_TYPING: { [conversationId: string]: number | null } = {};
let MOCK_DISPUTES: Dispute[] = [];


function calculateCurrentPrice(product: Product): number {
    const bids = product.bids.sort((a, b) => b.maxBid - a.maxBid);
    if (bids.length === 0) {
        return product.startingPrice;
    }
    if (bids.length === 1) {
        return product.startingPrice; // Or a single bid increment above start
    }
    // The current price is one increment above the second-highest bid, but not exceeding the highest bidder's max bid.
    const bidIncrement = 1.00;
    const secondHighestMaxBid = bids[1].maxBid;
    const highestMaxBid = bids[0].maxBid;
    
    return Math.min(highestMaxBid, secondHighestMaxBid + bidIncrement);
}


// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const createOrder = (product: Product, buyerId: number, finalPrice: number): Order => {
    const newOrder: Order = {
        id: `order-${product.id}-${buyerId}`,
        productId: product.id,
        productTitle: product.title,
        sellerId: product.userId,
        buyerId,
        finalPrice,
        purchaseDate: new Date().toISOString(),
        status: OrderStatus.COMPLETED,
        reviewLeftByBuyer: false,
        reviewLeftBySeller: false,
    };
    if (!MOCK_ORDERS.some(o => o.id === newOrder.id)) {
        MOCK_ORDERS.unshift(newOrder);
    }
    return newOrder;
}

export const api = {
  login: async (emailOrUsername: string, password: string): Promise<{ user: User | null; error?: string }> => {
    if (API_URL) {
      try {
        const resp = await http<{ token: string; user: User }>(`/api/login`, { 
          method: 'POST', 
          body: JSON.stringify({ 
            email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
            username: !emailOrUsername.includes('@') ? emailOrUsername : undefined,
            password 
          }) 
        });
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('auth_user', JSON.stringify(resp.user));
        return { user: resp.user };
      } catch (e: any) {
        const errorMessage = e.message || 'Login failed';
        return { user: null, error: errorMessage };
      }
    }
    
    // Fallback to mock for development
    await delay(500);
    const user = MOCK_USERS.find(u => 
      u.email.toLowerCase() === emailOrUsername.toLowerCase() || 
      u.username.toLowerCase() === emailOrUsername.toLowerCase()
    );
    
    if (user) {
      // Mock password check (in real app, this would be hashed)
      if (password === 'password123') {
        return { user };
      }
    }
    
    return { user: null, error: 'Invalid credentials' };
  },
  
  register: async (username: string, email: string, password: string, firstName?: string, lastName?: string, phone?: string): Promise<{ user: User | null; error?: string }> => {
    if (API_URL) {
      try {
        const resp = await http<{ token: string; user: User }>(`/api/register`, { 
          method: 'POST', 
          body: JSON.stringify({ 
            username, 
            email, 
            password,
            firstName,
            lastName,
            phone
          }) 
        });
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('auth_user', JSON.stringify(resp.user));
        return { user: resp.user };
      } catch (e: any) {
        const errorMessage = e.message || 'Registration failed';
        return { user: null, error: errorMessage };
      }
    }
    
    // Fallback to mock for development
    await delay(500);
    const existingUser = MOCK_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() || 
      u.username.toLowerCase() === username.toLowerCase()
    );
    
    if (existingUser) {
      return { user: null, error: 'User with this email or username already exists' };
    }
    
    const newUser: User = {
        id: MOCK_USERS.length + 1,
        username,
        email,
        role: UserRole.BIDDER,
        reviews: [],
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
        address: {},
    };
    MOCK_USERS.push(newUser);
    return { user: newUser };
  },
  getProducts: async (filters: any): Promise<Product[]> => {
    if (API_URL) {
      try {
        const products = await http<Product[]>(`/api/products`);
        const withBids = products.map(normalizeProduct);
        let filteredProducts = withBids;
        if (filters?.searchTerm) {
            filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));
        }
        if (filters?.priceMin) {
            filteredProducts = filteredProducts.filter(p => p.currentPrice >= filters.priceMin);
        }
        if (filters?.priceMax) {
            filteredProducts = filteredProducts.filter(p => p.currentPrice <= filters.priceMax);
        }
        if (filters?.condition) {
            filteredProducts = filteredProducts.filter(p => p.condition === filters.condition);
        }
        if (filters?.listingType) {
            filteredProducts = filteredProducts.filter(p => p.listingType === filters.listingType);
        }
        return filteredProducts;
      } catch (e) {
        // fall back to mock
      }
    }
    await delay(500);
    let filteredProducts = MOCK_PRODUCTS;
    if (filters?.searchTerm) {
        filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    }
    if (filters?.priceMin) {
        filteredProducts = filteredProducts.filter(p => p.currentPrice >= filters.priceMin);
    }
    if (filters?.priceMax) {
        filteredProducts = filteredProducts.filter(p => p.currentPrice <= filters.priceMax);
    }
    if (filters?.condition) {
        filteredProducts = filteredProducts.filter(p => p.condition === filters.condition);
    }
    if (filters?.listingType) {
        filteredProducts = filteredProducts.filter(p => p.listingType === filters.listingType);
    }
    return filteredProducts;
  },
  getProductById: async (id: string): Promise<Product | null> => {
    if (API_URL) {
      try { const p = await http<Product>(`/api/products/${id}`); return normalizeProduct(p); } catch { /* fall back to mock */ }
    }
    await delay(500);
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return product || null;
  },
  placeBid: async (productId: string, maxBid: number, user: User): Promise<Product | null> => {
    if (API_URL) {
      try {
        await http(`/api/products/${productId}/bids`, { method: 'POST', body: JSON.stringify({ userId: user.id, maxBid }) });
        const p = await http<Product>(`/api/products/${productId}`);
        return normalizeProduct(p);
      } catch {
        return null;
      }
    }
    await delay(300);
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return null;

    const sortedBids = [...product.bids].sort((a,b) => b.maxBid - a.maxBid);
    const highestBid = sortedBids.length > 0 ? sortedBids[0] : null;

    // Check if bid is valid
    const minBid = calculateCurrentPrice(product) + 1.00;
    if (maxBid < minBid) return null;
    
    const previousHighestBidder = highestBid ? MOCK_USERS.find(u => u.id === highestBid.userId) : null;

    // Update or add user's bid
    const existingBidIndex = product.bids.findIndex(b => b.userId === user.id);
    if (existingBidIndex > -1) {
        if(maxBid <= product.bids[existingBidIndex].maxBid) return null; // Can only increase max bid
        product.bids[existingBidIndex].maxBid = maxBid;
        product.bids[existingBidIndex].timestamp = new Date().toISOString();
    } else {
        const newBid: Bid = {
            id: product.bids.length + 1,
            userId: user.id,
            username: user.username,
            maxBid,
            timestamp: new Date().toISOString()
        };
        product.bids.push(newBid);
    }
    
    // Recalculate current price
    product.currentPrice = calculateCurrentPrice(product);

    // Generate outbid notification
    if (previousHighestBidder && previousHighestBidder.id !== user.id) {
        const newHighestBidder = product.bids.sort((a,b) => b.maxBid - a.maxBid)[0];
        if (newHighestBidder.userId === user.id) {
             MOCK_NOTIFICATIONS.unshift({
                id: `noti-${Date.now()}`,
                userId: previousHighestBidder.id,
                type: NotificationType.OUTBID,
                message: `You have been outbid on "${product.title}"!`,
                relatedId: product.id,
                title: product.title,
                isRead: false,
                timestamp: new Date().toISOString(),
            });
        }
    }
    
    return product;
  },
  getUsers: async (): Promise<User[]> => {
    if (API_URL) {
      try { return await http<User[]>(`/api/users`); } catch { /* fall back */ }
    }
    await delay(500);
    return MOCK_USERS;
  },
  createUser: async (data: Partial<User>): Promise<User | null> => {
    if (API_URL) {
      try { return await http<User>(`/api/users`, { method: 'POST', body: JSON.stringify(data) }); } catch { return null; }
    }
    return null;
  },
  deleteUser: async (userId: number): Promise<boolean> => {
    if (API_URL) {
      try { await http(`/api/users/${userId}`, { method: 'DELETE' }); return true; } catch { return false; }
    }
    return false;
  },
  getUserProfile: async (userId: number): Promise<User | null> => {
    if (API_URL) {
      try {
        const user = await http<User>(`/api/users/${userId}`);
        const userReviews = [] as Review[]; // reviews endpoint not yet wired; return empty for now
        return { ...user, reviews: userReviews } as User;
      } catch {
        // fall back to mock
      }
    }
    await delay(400);
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) return null;
    const userReviews = MOCK_REVIEWS.filter(r => r.revieweeId === userId);
    return { ...user, reviews: userReviews };
  },
  updateUserProfile: async(userId: number, data: Partial<User>): Promise<User | null> => {
      if (API_URL) {
        try {
          const token = localStorage.getItem('auth_token') || '';
          const updated = await http<User>(`/api/users/${userId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) } as any);
          // return with reviews placeholder for UI compatibility
          return { ...updated, reviews: [] } as User;
        } catch {
          // fall back to mock
        }
      }
      await delay(400);
      const user = MOCK_USERS.find(u => u.id === userId);
      if (!user) return null;
      user.username = data.username ?? user.username;
      user.email = data.email ?? user.email;
      user.firstName = data.firstName ?? user.firstName;
      user.lastName = data.lastName ?? user.lastName;
      user.phone = data.phone ?? user.phone;
      user.address = { ...(user.address || {}), ...(data.address || {}) };
      return {...user};
  },
  getProductsByUserId: async (userId: number): Promise<Product[]> => {
    if (API_URL) {
      try {
        const products = await http<Product[]>(`/api/users/${userId}/products`);
        return products.map(normalizeProduct);
      } catch (e) {
        console.error('Failed to fetch user products from backend:', e);
        // fall back to mock
      }
    }
    await delay(500);
    return MOCK_PRODUCTS.filter(p => p.userId === userId);
  },
  addProduct: async (productData: Omit<Product, 'id' | 'currentPrice' | 'bids' | 'seller'>, user: User): Promise<Product> => {
    if (API_URL) {
      try {
        const created = await http<Product>(`/api/products`, { method: 'POST', body: JSON.stringify({ ...productData, seller: user.username, currentPrice: productData.startingPrice, userId: user.id }) });
        return normalizeProduct(created);
      } catch {
        throw new Error('Backend rejected product create. Check required fields.');
      }
    }
    await delay(400);
    const newProduct: Product = { ...productData, id: String(Date.now()), currentPrice: productData.startingPrice, bids: [], seller: user.username, userId: user.id };
    MOCK_PRODUCTS.unshift(newProduct);
    return newProduct;
  },
  updateProduct: async (productId: string, productData: Partial<Product>): Promise<Product | null> => {
    if (API_URL) {
      try { return await http<Product>(`/api/products/${productId}`, { method: 'PATCH', body: JSON.stringify(productData) }); } catch {}
    }
    await delay(400);
    const productIndex = MOCK_PRODUCTS.findIndex(p => p.id === productId);
    if (productIndex === -1) return null;
    MOCK_PRODUCTS[productIndex] = { ...MOCK_PRODUCTS[productIndex], ...productData };
    return MOCK_PRODUCTS[productIndex];
  },
  deleteProduct: async (productId: string): Promise<boolean> => {
    if (API_URL) {
      try { await http(`/api/products/${productId}`, { method: 'DELETE' }); return true; } catch { return false; }
    }
    await delay(400);
    const initialLength = MOCK_PRODUCTS.length;
    MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== productId);
    return MOCK_PRODUCTS.length < initialLength;
  },
  buyNow: async (productId: string, user: User): Promise<Order | null> => {
    await delay(600);
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product || !product.buyNowPrice) return null;
    
    product.endDate = new Date().toISOString();
    return createOrder(product, user.id, product.buyNowPrice);
  },
  
  // Cart API
  getCart: async (userId: number): Promise<CartItem[]> => {
      await delay(200);
      return MOCK_CART[userId] || [];
  },
  addToCart: async (userId: number, product: Product, quantity: number): Promise<CartItem[]> => {
      await delay(200);
      if (!MOCK_CART[userId]) MOCK_CART[userId] = [];
      const existingItem = MOCK_CART[userId].find(item => item.product.id === product.id);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          MOCK_CART[userId].push({ product, quantity });
      }
      return MOCK_CART[userId];
  },
  removeFromCart: async (userId: number, productId: string): Promise<CartItem[]> => {
      await delay(200);
      if (MOCK_CART[userId]) {
          MOCK_CART[userId] = MOCK_CART[userId].filter(item => item.product.id !== productId);
      }
      return MOCK_CART[userId] || [];
  },
  checkout: async (userId: number): Promise<Order[]> => {
      await delay(1000);
      const cart = MOCK_CART[userId];
      if (!cart || cart.length === 0) return [];

      const ordersBySeller: { [sellerId: number]: CartItem[] } = {};
      cart.forEach(item => {
          if (!ordersBySeller[item.product.userId]) {
              ordersBySeller[item.product.userId] = [];
          }
          ordersBySeller[item.product.userId].push(item);
      });
      
      const newOrders: Order[] = [];
      Object.values(ordersBySeller).forEach(sellerCart => {
          sellerCart.forEach(item => {
              const order = createOrder(item.product, userId, item.product.currentPrice * item.quantity);
              newOrders.push(order);
          });
      });
      
      MOCK_CART[userId] = []; // Clear cart
      return newOrders;
  },
  
  getWatchlistByUserId: async (userId: number): Promise<string[]> => {
    await delay(200);
    return MOCK_WATCHLIST.filter(item => item.userId === userId).map(item => item.productId);
  },
  addToWatchlist: async (userId: number, productId: string): Promise<boolean> => {
    await delay(200);
    if (!MOCK_WATCHLIST.some(item => item.userId === userId && item.productId === productId)) {
      MOCK_WATCHLIST.push({ userId, productId });
    }
    return true;
  },
  removeFromWatchlist: async (userId: number, productId: string): Promise<boolean> => {
    await delay(200);
    MOCK_WATCHLIST = MOCK_WATCHLIST.filter(item => !(item.userId === userId && item.productId === productId));
    return true;
  },

  getNotificationsByUserId: async (userId: number): Promise<Notification[]> => {
    await delay(400);
    return MOCK_NOTIFICATIONS.filter(n => n.userId === userId).sort((a,b) => +new Date(b.timestamp) - +new Date(a.timestamp));
  },
  markNotificationAsRead: async (notificationId: string): Promise<boolean> => {
    await delay(100);
    const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);
    if (notification) {
        notification.isRead = true;
    }
    return !!notification;
  },
  markAllNotificationsAsRead: async (userId: number): Promise<boolean> => {
    await delay(300);
    MOCK_NOTIFICATIONS.forEach(n => {
        if (n.userId === userId) {
            n.isRead = true;
        }
    });
    return true;
  },
  checkForNotifications: async (userId: number): Promise<void> => {
    await delay(100);
    const userWatchlist = MOCK_WATCHLIST.filter(w => w.userId === userId).map(w => w.productId);
    
    MOCK_PRODUCTS.forEach(product => {
        const alreadyNotifiedEnding = MOCK_NOTIFICATIONS.some(n => n.userId === userId && n.relatedId === product.id && n.type === NotificationType.ENDING_SOON);
        if (userWatchlist.includes(product.id) && !alreadyNotifiedEnding) {
            const timeLeft = +new Date(product.endDate) - Date.now();
            const hoursLeft = timeLeft / (1000 * 60 * 60);
            if (hoursLeft > 0 && hoursLeft <= 24) {
                MOCK_NOTIFICATIONS.unshift({
                    id: `noti-${Date.now()}-${product.id}`,
                    userId,
                    type: NotificationType.ENDING_SOON,
                    message: `The auction for "${product.title}" is ending soon!`,
                    relatedId: product.id,
                    title: product.title,
                    isRead: false,
                    timestamp: new Date().toISOString(),
                });
            }
        }

        const alreadyNotifiedWon = MOCK_NOTIFICATIONS.some(n => n.userId === userId && n.relatedId === product.id && n.type === NotificationType.WON);
        const auctionEnded = +new Date(product.endDate) < Date.now();
      
        if (auctionEnded && product.listingType === ListingType.AUCTION && product.bids.length > 0) {
            const winner = product.bids.sort((a,b) => b.maxBid - a.maxBid)[0];
            createOrder(product, winner.userId, product.currentPrice);
            
            if (winner.userId === userId && !alreadyNotifiedWon) {
               MOCK_NOTIFICATIONS.unshift({
                    id: `noti-won-${product.id}-${userId}`,
                    userId,
                    type: NotificationType.WON,
                    message: `Congratulations! You won the auction for "${product.title}".`,
                    relatedId: product.id,
                    title: product.title,
                    isRead: false,
                    timestamp: new Date().toISOString(),
                });
            }
        }
    });
  },

  getOrdersByUserId: async(userId: number): Promise<Order[]> => {
    await delay(500);
    return MOCK_ORDERS.filter(o => o.buyerId === userId || o.sellerId === userId)
      .sort((a,b) => +new Date(b.purchaseDate) - +new Date(a.purchaseDate));
  },
  addReview: async (orderId: string, reviewer: User, revieweeId: number, rating: number, comment: string): Promise<Review | null> => {
    await delay(500);
    const order = MOCK_ORDERS.find(o => o.id === orderId);
    if (!order) return null;
    
    if (order.buyerId === reviewer.id && order.reviewLeftByBuyer) return null;
    if (order.sellerId === reviewer.id && order.reviewLeftBySeller) return null;

    const newReview: Review = {
        id: `review-${orderId}-${reviewer.id}`,
        orderId,
        reviewerId: reviewer.id,
        reviewerUsername: reviewer.username,
        revieweeId,
        rating,
        comment,
        timestamp: new Date().toISOString(),
    };

    MOCK_REVIEWS.unshift(newReview);
    if (order.buyerId === reviewer.id) order.reviewLeftByBuyer = true;
    if (order.sellerId === reviewer.id) order.reviewLeftBySeller = true;

    return newReview;
  },

  // Messaging API
  getConversations: async(userId: number): Promise<Conversation[]> => {
      if (API_URL) {
          try {
            const list = await http<Conversation[]>(`/api/users/${userId}/conversations`);
            // normalize lastMessage to avoid undefined access
            return list.map(c => ({ ...c, lastMessage: c.lastMessage || { id: '', senderId: 0, text: '', timestamp: new Date().toISOString() } as any }));
          } catch { /* fall back */ }
      }
      await delay(400);
      return MOCK_CONVERSATIONS.filter(c => c.participantIds.includes(userId));
  },
  getMessages: async (conversationId: string): Promise<Message[]> => {
      if (API_URL) {
          try {
            const msgs = await http<Message[]>(`/api/conversations/${conversationId}/messages`);
            return Array.isArray(msgs) ? msgs : [];
          } catch { /* fall back */ }
      }
      await delay(200);
      return (MOCK_MESSAGES[conversationId] || []).map(m => ({...m}));
  },
  sendMessage: async (conversationId: string | null, senderId: number, text: string, recipientId: number, productId: string | null): Promise<Conversation> => {
      if (API_URL) {
          try { return await http<Conversation>(`/api/messages`, { method: 'POST', body: JSON.stringify({ conversationId, senderId, text, recipientId, productId }) }); } catch { /* fall back */ }
      }
      await delay(200);
      let convo: Conversation | undefined;
      if (conversationId) {
          convo = MOCK_CONVERSATIONS.find(c => c.id === conversationId);
      } else {
          // Find existing conversation for this product between these users
          if (productId) {
              convo = MOCK_CONVERSATIONS.find(c => c.productId === productId && c.participantIds.includes(senderId) && c.participantIds.includes(recipientId));
          } else {
              const dmKey = `dm-${[senderId, recipientId].sort().join('-')}`;
              convo = MOCK_CONVERSATIONS.find(c => c.productId === dmKey);
          }
      }

      const sender = MOCK_USERS.find(u => u.id === senderId)!;
      const recipient = MOCK_USERS.find(u => u.id === recipientId)!;
      const product = productId ? MOCK_PRODUCTS.find(p => p.id === productId) : null;

      const newMessage: Message = { id: `msg-${Date.now()}`, senderId, text, timestamp: new Date().toISOString(), isRead: false };
      
      if (convo) {
          MOCK_MESSAGES[convo.id].push(newMessage);
          convo.lastMessage = newMessage;
      } else {
          const newConvoId = `convo-${Date.now()}`;
          convo = {
              id: newConvoId,
              participantIds: [senderId, recipientId],
              participantUsernames: { [senderId]: sender.username, [recipientId]: recipient.username },
              lastMessage: newMessage,
              productId: product ? product.id : `dm-${[senderId, recipientId].sort().join('-')}`,
              productTitle: product ? product.title : 'Direct message',
          };
          MOCK_CONVERSATIONS.unshift(convo);
          MOCK_MESSAGES[newConvoId] = [newMessage];
          MOCK_TYPING[newConvoId] = null;
      }
      
      // Notify recipient
      MOCK_NOTIFICATIONS.unshift({
        id: `noti-${Date.now()}`,
        userId: recipientId,
        type: NotificationType.NEW_MESSAGE,
        message: product ? `You have a new message from ${sender.username} regarding "${product.title}"` : `You have a new direct message from ${sender.username}`,
        relatedId: convo.id,
        title: 'New Message',
        isRead: false,
        timestamp: new Date().toISOString(),
      });

      return convo;
  },

  // Realtime helpers (Socket.IO)
  socketConnect: () => {
    if (!API_URL) return null;
    // dynamic import from importmap
    // @ts-ignore
    return import('socket.io-client').then(mod => mod.io(API_URL));
  },

  // Read receipts
  markConversationRead: async(conversationId: string, readerId: number): Promise<void> => {
      await delay(100);
      const msgs = MOCK_MESSAGES[conversationId];
      if (!msgs) return;
      msgs.forEach(m => { if (m.senderId !== readerId) m.isRead = true; });
  },

  // Typing indicators
  setTyping: async(conversationId: string, userId: number | null): Promise<void> => {
      await delay(50);
      MOCK_TYPING[conversationId] = userId;
  },
  getTyping: async(conversationId: string): Promise<number | null> => {
      await delay(50);
      return MOCK_TYPING[conversationId] ?? null;
  },

  // Category API
  getCategories: async (): Promise<{ id: string; name: string; description?: string }[]> => {
    if (API_URL) {
      try {
        return await http<{ id: string; name: string; description?: string }[]>(`/api/categories`);
      } catch (e) {
        console.error('Failed to fetch categories from backend:', e);
        // fall back to mock
      }
    }
    await delay(300);
    // Mock categories for fallback
    return [
      { id: '1', name: 'Electronics', description: 'Electronic devices and gadgets' },
      { id: '2', name: 'Fashion', description: 'Clothing and accessories' },
      { id: '3', name: 'Home & Garden', description: 'Home improvement and gardening items' },
      { id: '4', name: 'Sports', description: 'Sports equipment and gear' },
      { id: '5', name: 'Books', description: 'Books and educational materials' },
    ];
  },
  createCategory: async (name: string, description?: string): Promise<{ id: string; name: string; description?: string } | null> => {
    if (API_URL) {
      try {
        return await http<{ id: string; name: string; description?: string }>(`/api/categories`, { 
          method: 'POST', 
          body: JSON.stringify({ name, description }) 
        });
      } catch (e) {
        console.error('Failed to create category:', e);
        return null;
      }
    }
    await delay(300);
    // Mock creation for fallback
    return { id: String(Date.now()), name, description };
  },
  updateCategory: async (id: string, name: string, description?: string): Promise<{ id: string; name: string; description?: string } | null> => {
    if (API_URL) {
      try {
        return await http<{ id: string; name: string; description?: string }>(`/api/categories/${id}`, { 
          method: 'PATCH', 
          body: JSON.stringify({ name, description }) 
        });
      } catch (e) {
        console.error('Failed to update category:', e);
        return null;
      }
    }
    await delay(300);
    return { id, name, description };
  },
  deleteCategory: async (id: string): Promise<boolean> => {
    if (API_URL) {
      try {
        await http(`/api/categories/${id}`, { method: 'DELETE' });
        return true;
      } catch (e) {
        console.error('Failed to delete category:', e);
        return false;
      }
    }
    await delay(300);
    return true;
  },

  // Dispute API
  createDispute: async (orderId: string, userId: number, reason: string): Promise<Dispute | null> => {
      await delay(500);
      const order = MOCK_ORDERS.find(o => o.id === orderId);
      if (!order) return null;

      const newDispute: Dispute = {
          id: `dispute-${orderId}`,
          orderId,
          productTitle: order.productTitle,
          userId,
          reason,
          status: DisputeStatus.OPEN,
          createdAt: new Date().toISOString(),
      };
      MOCK_DISPUTES.unshift(newDispute);
      order.status = OrderStatus.DISPUTED;
      return newDispute;
  },
  getDisputes: async (userId: number): Promise<Dispute[]> => {
      await delay(400);
      return MOCK_DISPUTES.filter(d => d.userId === userId);
  }
};

// News & Ads minimal client
export const contentApi = {
  // Public
  getNews: async (): Promise<any[]> => {
    try { return await http<any[]>(`/api/news`); } catch { return []; }
  },
  getNewsBySlug: async (slug: string): Promise<any | null> => {
    try { return await http<any>(`/api/news/${slug}`); } catch { return null; }
  },
  getAds: async (): Promise<any[]> => {
    try { return await http<any[]>(`/api/ads`); } catch { return []; }
  },
  trackImpression: async (id: string): Promise<void> => {
    try { await http(`/api/ads/${id}/impression`, { method: 'POST' }); } catch {}
  },
  trackClick: async (id: string): Promise<void> => {
    try { await http(`/api/ads/${id}/click`, { method: 'POST' }); } catch {}
  },
  // Admin
  admin: {
    listNews: async (): Promise<any[]> => {
      const token = localStorage.getItem('auth_token') || '';
      return await http<any[]>(`/api/admin/news`, { headers: { 'Authorization': `Bearer ${token}` } });
    },
    createNews: async (data: any): Promise<any> => {
      const token = localStorage.getItem('auth_token') || '';
      return await http<any>(`/api/admin/news`, { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    },
    updateNews: async (id: string, data: any): Promise<any> => {
      const token = localStorage.getItem('auth_token') || '';
      return await http<any>(`/api/admin/news/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    },
    deleteNews: async (id: string): Promise<boolean> => {
      const token = localStorage.getItem('auth_token') || '';
      await http(`/api/admin/news/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      return true;
    },
    listAds: async (): Promise<any[]> => {
      const token = localStorage.getItem('auth_token') || '';
      return await http<any[]>(`/api/admin/ads`, { headers: { 'Authorization': `Bearer ${token}` } });
    },
    createAd: async (data: any): Promise<any> => {
      const token = localStorage.getItem('auth_token') || '';
      return await http<any>(`/api/admin/ads`, { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    },
    updateAd: async (id: string, data: any): Promise<any> => {
      const token = localStorage.getItem('auth_token') || '';
      return await http<any>(`/api/admin/ads/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
    },
    deleteAd: async (id: string): Promise<boolean> => {
      const token = localStorage.getItem('auth_token') || '';
      await http(`/api/admin/ads/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      return true;
    }
  }
};