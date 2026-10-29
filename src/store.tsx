import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { Product } from './data';

export type Page = 'home' | 'cakes' | 'orders' | 'hampers' | 'gallery' | 'about';

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
  placeOrder: () => void;
}

const Ctx = createContext<ShopCtx | null>(null);
export const useShop = () => { const c = useContext(Ctx); if (!c) throw new Error('shop ctx'); return c; };

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((p: Page) => {
    setPage(p);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback((p: Product, weight = '500g', qty = 1, silent = false) => {
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

  const placeOrder = useCallback(() => {
    setCart([]);
    setCartOpen(false);
    setOrderPlaced(true);
  }, []);

  const cartCount = cart.reduce((s, ci) => s + ci.qty, 0);
  const cartTotal = cart.reduce((s, ci) => {
    const mult = ci.product.type === 'cake' ? ({ '500g': 1, '1 kg': 1.8, '1.5 kg': 2.6, '2 kg': 3.4 }[ci.weight] ?? 1) : 1;
    return s + ci.product.price * mult * ci.qty;
  }, 0);

  return (
    <Ctx.Provider value={{ page, go, cart, cartCount, cartTotal, addToCart, updateQty, removeItem, wishlist, toggleWish, wished, quickView, setQuickView, cartOpen, setCartOpen, customOpen, setCustomOpen, searchOpen, setSearchOpen, toast, showToast, orderPlaced, setOrderPlaced, placeOrder }}>
      {children}
    </Ctx.Provider>
  );
}
