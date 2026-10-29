import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  allProducts as defaultAllProducts,
  initialAdminOrders,
  initialCustomers,
  type AdminOrder,
  type Customer,
  type Product,
} from './data';

export type Page = 'home' | 'cakes' | 'orders' | 'hampers' | 'gallery' | 'about' | 'admin';

export interface CartItem { product: Product; weight: string; qty: number; }

interface ShopCtx {
  page: Page;
  go: (p: Page) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (p: Product, weight?: string, qty?: number, silent?: boolean) => void;
  updateQty: (id: string, weight: string, delta: number) => void;
  removeItem: (id: string, weight: string) => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  wished: (id: string) => boolean;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  customOpen: boolean;
  setCustomOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  orderPlaced: boolean;
  setOrderPlaced: (v: boolean) => void;
  placeOrder: (customerInfo?: { name?: string; phone?: string; address?: string }) => void;

  // Products management (Maal & Stock)
  products: Product[];
  cakes: Product[];
  hampers: Product[];
  addProduct: (p: Omit<Product, 'id'> & { id?: string }) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  setStockCount: (id: string, count: number) => void;
  autoStockAll: () => void;
  resetProductsToDefault: () => void;

  // Customer management
  customers: Customer[];
  addCustomer: (c: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Order management
  adminOrders: AdminOrder[];
  addAdminOrder: (order: Omit<AdminOrder, 'id' | 'orderNumber'>) => void;
  updateAdminOrderStatus: (id: string, status: AdminOrder['status']) => void;
  updateAdminOrder: (id: string, updates: Partial<AdminOrder>) => void;
  deleteAdminOrder: (id: string) => void;
  recordCustomOrder: (orderData: { name: string; phone: string; occasion: string; date: string; flavour: string; weight: string; note: string }) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const Ctx = createContext<ShopCtx | null>(null);
export const useShop = () => { const c = useContext(Ctx); if (!c) throw new Error('shop ctx'); return c; };

export const isCurrentPathAdmin = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();
  return (
    path.endsWith('/admin') ||
    path.includes('/admin') ||
    hash === '#admin' ||
    hash === '#/admin' ||
    hash.startsWith('#admin')
  );
};

const getInitialPage = (): Page => {
  return isCurrentPathAdmin() ? 'admin' : 'home';
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>(getInitialPage);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with browser URL navigation
  useEffect(() => {
    const handleUrlChange = () => {
      if (isCurrentPathAdmin()) {
        setPage('admin');
      } else {
        setPage(prev => (prev === 'admin' ? 'home' : prev));
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('da_admin_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  // Products state (persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('da_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return defaultAllProducts;
  });

  // Customers state (persisted)
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('da_customers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading customers from localStorage', e);
    }
    return initialCustomers;
  });

  // Admin Orders state (persisted)
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem('da_admin_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading admin orders from localStorage', e);
    }
    return initialAdminOrders;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('da_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('da_customers', JSON.stringify(customers));
    } catch {}
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('da_admin_orders', JSON.stringify(adminOrders));
    } catch {}
  }, [adminOrders]);

  const cakes = useMemo(() => products.filter(p => p.type === 'cake'), [products]);
  const hampers = useMemo(() => products.filter(p => p.type === 'hamper'), [products]);

  const go = useCallback((p: Page) => {
    setPage(p);
    if (typeof window !== 'undefined') {
      const isSubpath = window.location.pathname.toLowerCase().includes('/da-sweet-city');
      const rootPrefix = isSubpath ? '/DA-SWEET-CITY' : '';
      if (p === 'admin') {
        if (!isCurrentPathAdmin()) {
          window.history.pushState(null, '', `${rootPrefix}/admin`);
        }
      } else {
        if (isCurrentPathAdmin()) {
          window.history.pushState(null, '', `${rootPrefix}/`);
        }
      }
    }
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback((p: Product, weight = '500g', qty = 1, silent = false) => {
    if (p.inStock === false) {
      showToast(`${p.name} is currently out of stock`);
      return;
    }
    setCart(prev => {
      const i = prev.findIndex(ci => ci.product.id === p.id && ci.weight === weight);
      if (i >= 0) { const copy = [...prev]; copy[i] = { ...copy[i], qty: copy[i].qty + qty }; return copy; }
      return [...prev, { product: p, weight, qty }];
    });
    if (!silent) showToast(`${p.name} added to cart`);
  }, [showToast]);

  const updateQty = useCallback((id: string, weight: string, delta: number) => {
    setCart(prev => prev.map(ci => ci.product.id === id && ci.weight === weight ? { ...ci, qty: Math.max(0, ci.qty + delta) } : ci).filter(ci => ci.qty > 0));
  }, []);

  const removeItem = useCallback((id: string, weight: string) => {
    setCart(prev => prev.filter(ci => !(ci.product.id === id && ci.weight === weight)));
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist(prev => {
      const has = prev.includes(id);
      if (!has) showToast('Added to your wishlist');
      return has ? prev.filter(x => x !== id) : [...prev, id];
    });
  }, [showToast]);

  const wished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartTotal = cart.reduce((s, ci) => {
    const mult = ci.product.type === 'cake' ? ({ '500g': 1, '1 kg': 1.8, '1.5 kg': 2.6, '2 kg': 3.4 }[ci.weight] ?? 1) : 1;
    return s + ci.product.price * mult * ci.qty;
  }, 0);

  // Admin Auth handlers
  const loginAdmin = useCallback((password: string): boolean => {
    if (password.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('da_admin_logged_in', 'true');
      } catch {}
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('da_admin_logged_in');
    } catch {}
  }, []);

  // Products & Stock operations
  const addProduct = useCallback((p: Omit<Product, 'id'> & { id?: string }) => {
    const id = p.id || 'prod-' + Date.now();
    const newProd: Product = {
      ...p,
      id,
      rating: p.rating ?? 4.8,
      reviews: p.reviews ?? 24,
      inStock: p.inStock ?? true,
      stockCount: p.stockCount ?? 15,
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added ${newProd.name} to menu`);
  }, [showToast]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully');
  }, [showToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from menu');
  }, [showToast]);

  const toggleStock = useCallback((id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const next = p.inStock === false;
        return { ...p, inStock: next, stockCount: next ? (p.stockCount && p.stockCount > 0 ? p.stockCount : 10) : 0 };
      }
      return p;
    }));
  }, []);

  const setStockCount = useCallback((id: string, count: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const c = Math.max(0, count);
        return { ...p, stockCount: c, inStock: c > 0 };
      }
      return p;
    }));
  }, []);

  const autoStockAll = useCallback(() => {
    setProducts(prev => prev.map(p => ({ ...p, inStock: true, stockCount: p.stockCount && p.stockCount > 0 ? p.stockCount : 15 })));
    showToast('⚡ All products restocked successfully!');
  }, [showToast]);

  const resetProductsToDefault = useCallback(() => {
    setProducts(defaultAllProducts);
    showToast('Menu reset to defaults');
  }, [showToast]);

  // Customer operations
  const addCustomer = useCallback((c: Omit<Customer, 'id'>) => {
    const newCust: Customer = {
      ...c,
      id: 'c-' + Date.now(),
    };
    setCustomers(prev => [newCust, ...prev]);
    showToast(`Customer ${c.name} added`);
  }, [showToast]);

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    showToast('Customer details updated');
  }, [showToast]);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    showToast('Customer removed');
  }, [showToast]);

  // Admin Orders operations
  const addAdminOrder = useCallback((order: Omit<AdminOrder, 'id' | 'orderNumber'>) => {
    const id = 'ord-' + Date.now();
    const orderNumber = 'DSC-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: AdminOrder = {
      ...order,
      id,
      orderNumber,
    };
    setAdminOrders(prev => [newOrder, ...prev]);

    // Also update/add customer
    setCustomers(prev => {
      const idx = prev.findIndex(c => c.phone.trim() === order.customerPhone.trim() || c.name.toLowerCase() === order.customerName.toLowerCase());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          totalOrders: copy[idx].totalOrders + 1,
          lastOrderDate: 'Today',
        };
        return copy;
      }
      return [
        {
          id: 'c-' + Date.now(),
          name: order.customerName,
          phone: order.customerPhone,
          city: order.customerCity || 'Kaithal',
          totalOrders: 1,
          lastOrderDate: 'Today',
          status: 'New',
          notes: order.notes,
        },
        ...prev,
      ];
    });

    showToast(`New Order ${orderNumber} created!`);
  }, [showToast]);

  const updateAdminOrderStatus = useCallback((id: string, status: AdminOrder['status']) => {
    setAdminOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast(`Order status updated to ${status}`);
  }, [showToast]);

  const updateAdminOrder = useCallback((id: string, updates: Partial<AdminOrder>) => {
    setAdminOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    showToast('Order details updated');
  }, [showToast]);

  const deleteAdminOrder = useCallback((id: string) => {
    setAdminOrders(prev => prev.filter(o => o.id !== id));
    showToast('Order deleted');
  }, [showToast]);

  // Checkout placeOrder: creates an active order in adminOrders
  const placeOrder = useCallback((customerInfo?: { name?: string; phone?: string; address?: string }) => {
    if (cart.length > 0) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const orderId = 'ord-' + Date.now();
      const orderNum = 'DSC-' + Math.floor(1000 + Math.random() * 9000);
      const deliveryFee = cartTotal >= 999 ? 0 : 49;

      const newOrder: AdminOrder = {
        id: orderId,
        orderNumber: orderNum,
        customerName: customerInfo?.name?.trim() || 'Website Customer',
        customerPhone: customerInfo?.phone?.trim() || '98125-99881',
        customerCity: customerInfo?.address || 'Kaithal / Hansi',
        items: cart.map(ci => {
          const mult = ci.product.type === 'cake' ? ({ '500g': 1, '1 kg': 1.8, '1.5 kg': 2.6, '2 kg': 3.4 }[ci.weight] ?? 1) : 1;
          return {
            productId: ci.product.id,
            productName: ci.product.name,
            weight: ci.weight,
            qty: ci.qty,
            price: Math.round(ci.product.price * mult),
          };
        }),
        totalAmount: cartTotal + deliveryFee,
        orderDate: 'Today',
        orderTime: timeStr,
        isToday: true,
        status: 'Pending',
        type: 'online',
        deliveryAddress: customerInfo?.address || 'Local Home Delivery',
        notes: 'Placed via Website Cart Checkout',
      };

      setAdminOrders(prev => [newOrder, ...prev]);

      // Update customers
      setCustomers(prev => {
        const phone = newOrder.customerPhone;
        const idx = prev.findIndex(c => c.phone === phone);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], totalOrders: copy[idx].totalOrders + 1, lastOrderDate: 'Today' };
          return copy;
        }
        return [
          {
            id: 'c-' + Date.now(),
            name: newOrder.customerName,
            phone: newOrder.customerPhone,
            city: newOrder.customerCity || 'Kaithal',
            totalOrders: 1,
            lastOrderDate: 'Today',
            status: 'New',
          },
          ...prev,
        ];
      });
    }

    setCart([]);
    setCartOpen(false);
    setOrderPlaced(true);
  }, [cart, cartTotal]);

  // Custom Order record
  const recordCustomOrder = useCallback((data: { name: string; phone: string; occasion: string; date: string; flavour: string; weight: string; note: string }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const orderId = 'ord-' + Date.now();
    const orderNum = 'DSC-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder: AdminOrder = {
      id: orderId,
      orderNumber: orderNum,
      customerName: data.name,
      customerPhone: data.phone,
      customerCity: 'Kaithal / Hansi',
      items: [
        {
          productId: 'custom-cake',
          productName: `Custom ${data.occasion} Cake (${data.flavour})`,
          weight: data.weight,
          qty: 1,
          price: 1200,
        },
      ],
      totalAmount: 1200,
      orderDate: 'Today',
      orderTime: timeStr,
      isToday: true,
      status: 'Pending',
      type: 'custom',
      notes: `Event Date: ${data.date}. Details: ${data.note || 'None specified'}`,
    };

    setAdminOrders(prev => [newOrder, ...prev]);

    setCustomers(prev => {
      const idx = prev.findIndex(c => c.phone.trim() === data.phone.trim());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], totalOrders: copy[idx].totalOrders + 1, lastOrderDate: 'Today' };
        return copy;
      }
      return [
        {
          id: 'c-' + Date.now(),
          name: data.name,
          phone: data.phone,
          city: 'Kaithal',
          totalOrders: 1,
          lastOrderDate: 'Today',
          status: 'New',
          notes: `Custom cake inquiry for ${data.occasion}`,
        },
        ...prev,
      ];
    });
  }, []);

  const cartCount = cart.reduce((s, ci) => s + ci.qty, 0);

  return (
    <Ctx.Provider
      value={{
        page,
        go,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateQty,
        removeItem,
        wishlist,
        toggleWish,
        wished,
        quickView,
        setQuickView,
        cartOpen,
        setCartOpen,
        customOpen,
        setCustomOpen,
        searchOpen,
        setSearchOpen,
        toast,
        showToast,
        orderPlaced,
        setOrderPlaced,
        placeOrder,

        products,
        cakes,
        hampers,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        setStockCount,
        autoStockAll,
        resetProductsToDefault,

        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,

        adminOrders,
        addAdminOrder,
        updateAdminOrderStatus,
        updateAdminOrder,
        deleteAdminOrder,
        recordCustomOrder,

        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
