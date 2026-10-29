import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, CakeSlice, Check, Clock3, Heart, Leaf, Minus, Plus, Search, ShoppingCart, Sparkles, Trash2, Truck, X } from 'lucide-react';
import { allProducts, inr, weightMultiplier, weights } from '../data';
import { useShop } from '../store';
import { Stars } from './ui';

function Overlay({ children, onClose, wide = false }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="anim-fade-in fixed inset-0 z-[80] flex items-end justify-center bg-choco/55 p-0 backdrop-blur-[3px] sm:items-center sm:p-4" onClick={onClose}>
      <div className={`anim-pop-in relative max-h-[92vh] w-full overflow-y-auto rounded-t-[26px] bg-cream shadow-2xl sm:rounded-[26px] ${wide ? 'max-w-3xl' : 'max-w-lg'}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

const CloseBtn = ({ onClose }: { onClose: () => void }) => (
  <button onClick={onClose} className="heart-btn absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white text-choco shadow-lg" aria-label="Close popup"><X size={17} /></button>
);

/* ---------------- Quick View popup (cake pe click) ---------------- */
export function QuickViewModal() {
  const { quickView: p, setQuickView, addToCart, toggleWish, wished, setCartOpen } = useShop();
  const [weight, setWeight] = useState('500g');
  const [qty, setQty] = useState(1);
  const [burst, setBurst] = useState(0);

  useEffect(() => { if (p) { setWeight(p.type === 'cake' ? '500g' : 'Standard'); setQty(1); } }, [p]);
  if (!p) return null;

  const mult = p.type === 'cake' ? (weightMultiplier[weight] ?? 1) : 1;
  const price = p.price * mult;
  const isW = wished(p.id);

  const doAdd = (openCart = false) => {
    addToCart(p, weight, qty, true);
    setBurst(b => b + 1);
    if (openCart) { setQuickView(null); setCartOpen(true); }
  };

  return (
    <Overlay wide onClose={() => setQuickView(null)}>
      <CloseBtn onClose={() => setQuickView(null)} />
      <div className="grid md:grid-cols-2">
        <div className="relative overflow-hidden">
          <img src={p.img} alt={p.name} className="h-64 w-full object-cover md:h-full md:min-h-[480px]" />
          <span className="anim-float absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-emerald-700 shadow"><Leaf size={13} /> 100% Eggless</span>
          {p.tag && <span className="absolute bottom-4 left-4 rounded-full bg-choco/85 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">{p.tag}</span>}
          <span className="absolute bottom-4 right-4 font-hand text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.5)]">Made with Love ♡</span>
        </div>
        <div className="relative p-6 md:p-7">
          {burst > 0 && (
            <div key={burst} className="pointer-events-none absolute right-24 top-16 z-10">
              {['#df4c78', '#f5b942', '#7bc47f', '#e85d8a'].map((c, i) => (
                <span key={i} className="confetti-dot" style={{ background: c, left: i * 14 - 20, animationDelay: `${i * 70}ms` }} />
              ))}
            </div>
          )}
          <p className="text-[10px] font-semibold tracking-[0.28em] text-rose">{p.type === 'cake' ? p.category.toUpperCase() + ' CAKE' : 'GIFT HAMPER'}</p>
          <h3 className="mt-1.5 font-serif text-[28px] font-bold leading-tight text-choco">{p.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={p.rating} size={15} />
            <span className="text-xs font-semibold text-choco">{p.rating}</span>
            <span className="text-xs text-choco/50">({p.reviews}+ reviews)</span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-choco/70">{p.desc}</p>

          {p.type === 'cake' && (
            <>
              <p className="mt-5 text-xs font-semibold tracking-wide text-choco">SELECT WEIGHT</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {weights.map(w => (
                  <button key={w} onClick={() => setWeight(w)} className={`pill-btn rounded-full border px-4 py-2 text-xs font-semibold ${weight === w ? 'active border-transparent' : 'border-rose-200 bg-white text-choco'}`}>{w}</button>
                ))}
              </div>
            </>
          )}

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-medium text-choco/50">Total Price</p>
              <p className="text-[26px] font-bold leading-none text-rose">{inr(price * qty)}</p>
              {p.type === 'cake' && <p className="mt-1 text-[11px] text-choco/50">{inr(price)} × {weight}</p>}
            </div>
            <div className="flex items-center gap-1 rounded-full border border-rose-200 bg-white p-1">
              <button className="heart-btn grid h-8 w-8 place-items-center rounded-full text-choco hover:bg-blush" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity"><Minus size={15} /></button>
              <span className="w-6 text-center text-sm font-bold">{qty}</span>
              <button className="heart-btn grid h-8 w-8 place-items-center rounded-full text-choco hover:bg-blush" onClick={() => setQty(q => Math.min(9, q + 1))} aria-label="Increase quantity"><Plus size={15} /></button>
            </div>
          </div>

          <div className="mt-5 flex gap-2.5">
            <button onClick={() => doAdd(false)} className="btn-anim btn-rose flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"><ShoppingCart size={16} /><span>Add to Cart</span></button>
            <button onClick={() => toggleWish(p.id)} className={`heart-btn grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border-2 ${isW ? 'wished border-transparent' : 'border-rose-200 bg-white text-rose'}`} aria-label="Wishlist"><Heart size={18} fill={isW ? 'currentColor' : 'none'} /></button>
          </div>
          <button onClick={() => doAdd(true)} className="btn-anim btn-choco mt-2.5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"><span>Buy Now</span><ArrowRight size={16} /></button>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-dashed border-rose-200 pt-4 text-center">
            {[{ i: Leaf, t: '100% Eggless' }, { i: Truck, t: 'On-Time Delivery' }, { i: Clock3, t: 'Baked Fresh Today' }].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-choco/70"><f.i size={17} className="text-rose" /><span className="text-[10px] font-medium leading-tight">{f.t}</span></div>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------------- Cart drawer ---------------- */
export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQty, removeItem, cartTotal, placeOrder, go } = useShop();
  useEffect(() => { document.body.style.overflow = cartOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [cartOpen]);
  if (!cartOpen) return null;
  const freeAbove = 999;
  const progress = Math.min(100, (cartTotal / freeAbove) * 100);
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="anim-fade-in absolute inset-0 bg-choco/55 backdrop-blur-[3px]" onClick={() => setCartOpen(false)} />
      <aside className="anim-slide-right absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-rose-100 px-6 py-5">
          <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-choco"><ShoppingCart size={20} className="text-rose" /> Your Cart</h3>
          <button onClick={() => setCartOpen(false)} className="heart-btn grid h-9 w-9 place-items-center rounded-full bg-white text-choco shadow" aria-label="Close cart"><X size={17} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="anim-pop-in flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="anim-float grid h-20 w-20 place-items-center rounded-full bg-blush text-rose"><CakeSlice size={36} /></span>
            <p className="font-serif text-xl font-semibold text-choco">Your cart is feeling light!</p>
            <p className="text-xs leading-relaxed text-choco/60">Add some sweetness — freshly baked cakes and hampers are waiting for you.</p>
            <button onClick={() => { setCartOpen(false); go('cakes'); }} className="btn-anim btn-rose mt-2 rounded-full px-6 py-3 text-sm font-semibold"><span>Explore Cakes →</span></button>
          </div>
        ) : (
          <>
            <div className="border-b border-rose-100 px-6 py-3">
              <p className="text-[11px] font-medium text-choco/70">{cartTotal >= freeAbove ? '🎉 You unlocked FREE delivery!' : `Add ${inr(freeAbove - cartTotal)} more for FREE delivery`}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-blush-2"><div className="h-full rounded-full bg-gradient-to-r from-rose-2 to-rose transition-all duration-700" style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {cart.map((ci, idx) => {
                const mult = ci.product.type === 'cake' ? (weightMultiplier[ci.weight] ?? 1) : 1;
                return (
                  <div key={ci.product.id + ci.weight} className="anim-fade-up flex gap-3 rounded-2xl border border-rose-100 bg-white p-3 shadow-sm" style={{ animationDelay: `${idx * 70}ms` }}>
                    <img src={ci.product.img} alt={ci.product.name} className="h-[74px] w-[74px] shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-[13px] font-semibold text-choco">{ci.product.name}</p>
                        <button onClick={() => removeItem(ci.product.id, ci.weight)} className="heart-btn text-choco/40 hover:text-rose" aria-label="Remove item"><Trash2 size={15} /></button>
                      </div>
                      <p className="text-[11px] text-choco/50">{ci.weight} • {inr(ci.product.price * mult)} each</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-rose-100 bg-cream p-0.5">
                          <button className="heart-btn grid h-6 w-6 place-items-center rounded-full hover:bg-blush" onClick={() => updateQty(ci.product.id, ci.weight, -1)}><Minus size={12} /></button>
                          <span className="w-5 text-center text-xs font-bold">{ci.qty}</span>
                          <button className="heart-btn grid h-6 w-6 place-items-center rounded-full hover:bg-blush" onClick={() => updateQty(ci.product.id, ci.weight, 1)}><Plus size={12} /></button>
                        </div>
                        <p className="text-sm font-bold text-rose">{inr(ci.product.price * mult * ci.qty)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-rose-100 bg-white px-6 py-5">
              <div className="flex justify-between text-sm"><span className="text-choco/60">Subtotal</span><span className="font-bold text-choco">{inr(cartTotal)}</span></div>
              <div className="mt-1 flex justify-between text-sm"><span className="text-choco/60">Delivery</span><span className="font-semibold text-emerald-600">{cartTotal >= freeAbove ? 'FREE' : inr(49)}</span></div>
              <div className="mt-3 flex justify-between border-t border-dashed border-rose-200 pt-3 text-base font-bold text-choco"><span>Total</span><span>{inr(cartTotal + (cartTotal >= freeAbove ? 0 : 49))}</span></div>
              <button onClick={placeOrder} className="btn-anim btn-rose mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"><span>Place Order</span><ArrowRight size={16} /></button>
              <p className="mt-2.5 text-center text-[11px] text-choco/50">100% Eggless • Freshly Baked • Safe & On-Time Delivery</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------------- Custom Order popup ---------------- */
export function CustomOrderModal() {
  const { customOpen, setCustomOpen, showToast } = useShop();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', occasion: 'Birthday', date: '', flavour: 'Chocolate', weight: '1 kg', note: '' });
  useEffect(() => { if (customOpen) setSent(false); }, [customOpen]);
  if (!customOpen) return null;
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = 'w-full rounded-xl border border-rose-200 bg-white px-3.5 py-2.5 text-[13px] text-choco placeholder:text-choco/35 transition';
  return (
    <Overlay onClose={() => setCustomOpen(false)}>
      <CloseBtn onClose={() => setCustomOpen(false)} />
      {sent ? (
        <div className="anim-pop-in px-8 py-12 text-center">
          <span className="anim-check mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-rose-2 to-rose text-white shadow-xl shadow-rose/40"><Check size={38} strokeWidth={3} /></span>
          <h3 className="mt-5 font-serif text-2xl font-bold text-choco">Order Request Sent!</h3>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-choco/65">Thank you, {form.name.split(' ')[0] || 'friend'}! Our cake artists will call you on <b>{form.phone || 'your number'}</b> shortly to design your dream cake.</p>
          <p className="mt-3 font-hand text-2xl text-rose">Let's create something sweet ♡</p>
          <button onClick={() => setCustomOpen(false)} className="btn-anim btn-choco mt-6 rounded-full px-8 py-3 text-sm font-semibold"><span>Continue Shopping</span></button>
        </div>
      ) : (
        <div className="p-6 md:p-8">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.28em] text-rose"><Sparkles size={13} /> CUSTOM ORDERS</p>
          <h3 className="mt-1 font-serif text-[26px] font-bold text-choco">A Cake Made Just for You</h3>
          <p className="mt-1 text-xs text-choco/60">Tell us your dream cake — we will bake it fresh, 100% eggless.</p>
          <form className="mt-5 grid grid-cols-2 gap-3" onSubmit={e => { e.preventDefault(); setSent(true); showToast('Custom order request sent!'); }}>
            <input required placeholder="Your name" className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} />
            <input required placeholder="Phone number" className={inputCls} value={form.phone} onChange={e => set('phone', e.target.value)} />
            <select className={inputCls} value={form.occasion} onChange={e => set('occasion', e.target.value)}>{['Birthday', 'Anniversary', 'Wedding', 'Baby Shower', 'Corporate', 'Festive', 'Just Because'].map(o => <option key={o}>{o}</option>)}</select>
            <input required type="date" className={inputCls} value={form.date} onChange={e => set('date', e.target.value)} />
            <select className={inputCls} value={form.flavour} onChange={e => set('flavour', e.target.value)}>{['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Strawberry', 'Pineapple', 'Mix Fruit'].map(o => <option key={o}>{o}</option>)}</select>
            <select className={inputCls} value={form.weight} onChange={e => set('weight', e.target.value)}>{weights.map(o => <option key={o}>{o}</option>)}</select>
            <textarea placeholder="Describe your dream cake — theme, colours, message on cake..." rows={3} className={`${inputCls} col-span-2 resize-none`} value={form.note} onChange={e => set('note', e.target.value)} />
            <button type="submit" className="btn-anim btn-rose col-span-2 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"><span>Order Custom Cake</span><ArrowRight size={16} /></button>
          </form>
          <p className="mt-3 text-center text-[11px] text-choco/50">Or call us: Cakes 98125-42172 • Hansi 7404965669</p>
        </div>
      )}
    </Overlay>
  );
}

/* ---------------- Search popup ---------------- */
export function SearchModal() {
  const { searchOpen, setSearchOpen, setQuickView } = useShop();
  const [q, setQ] = useState('');
  const results = useMemo(() => q.trim() ? allProducts.filter(p => (p.name + p.flavour + p.category).toLowerCase().includes(q.toLowerCase())).slice(0, 6) : allProducts.slice(0, 4), [q]);
  useEffect(() => { if (searchOpen) setQ(''); }, [searchOpen]);
  if (!searchOpen) return null;
  return (
    <Overlay onClose={() => setSearchOpen(false)}>
      <CloseBtn onClose={() => setSearchOpen(false)} />
      <div className="p-6">
        <h3 className="font-serif text-[22px] font-bold text-choco">Search Sweetness</h3>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-3 shadow-inner">
          <Search size={17} className="shrink-0 text-rose" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Try ‘Red Velvet’, ‘Chocolate’, ‘Hamper’..." className="w-full bg-transparent text-sm text-choco placeholder:text-choco/40" style={{ boxShadow: 'none', border: 'none' }} />
        </div>
        <p className="mt-4 text-[10px] font-semibold tracking-[0.25em] text-choco/50">{q ? 'RESULTS' : 'POPULAR RIGHT NOW'}</p>
        <div className="mt-2 divide-y divide-rose-50">
          {results.map((p, i) => (
            <button key={p.id} onClick={() => { setSearchOpen(false); setQuickView(p); }} className="anim-fade-up group flex w-full items-center gap-3 py-3 text-left" style={{ animationDelay: `${i * 60}ms` }}>
              <img src={p.img} alt={p.name} className="h-12 w-12 rounded-xl object-cover transition-transform duration-300 group-hover:scale-110" />
              <span className="flex-1"><span className="block text-[13px] font-semibold text-choco transition group-hover:text-rose">{p.name}</span><span className="text-[11px] text-choco/50">{p.flavour} • ★ {p.rating}</span></span>
              <span className="text-[13px] font-bold text-rose">{inr(p.price)}</span>
            </button>
          ))}
          {results.length === 0 && <p className="py-6 text-center text-sm text-choco/50">No matches found — try ‘Chocolate’ 🍫</p>}
        </div>
      </div>
    </Overlay>
  );
}

/* ---------------- Order placed success ---------------- */
export function OrderSuccessModal() {
  const { orderPlaced, setOrderPlaced, go } = useShop();
  if (!orderPlaced) return null;
  return (
    <Overlay onClose={() => setOrderPlaced(false)}>
      <div className="anim-pop-in px-8 py-12 text-center">
        <span className="anim-check mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl shadow-emerald-500/30"><BadgeCheck size={38} /></span>
        <h3 className="mt-5 font-serif text-[26px] font-bold text-choco">Order Placed Successfully!</h3>
        <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-choco/65">Your cakes are being baked fresh with love. We will deliver them safely and on time.</p>
        <p className="mt-3 font-hand text-[26px] text-rose">Sweet moments, always ♡</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { setOrderPlaced(false); go('orders'); }} className="btn-anim btn-outline rounded-full px-6 py-3 text-sm font-semibold"><span>See Customer Orders</span></button>
          <button onClick={() => setOrderPlaced(false)} className="btn-anim btn-rose rounded-full px-6 py-3 text-sm font-semibold"><span>Done</span></button>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------------- Toast ---------------- */
export function Toast() {
  const { toast, setCartOpen } = useShop();
  if (!toast) return null;
  return (
    <button onClick={() => setCartOpen(true)} className="anim-toast fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-choco py-3 pl-4 pr-5 text-[13px] font-medium text-white shadow-2xl">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-rose"><Check size={14} strokeWidth={3} /></span>
      {toast} <span className="font-semibold text-rose-200 underline underline-offset-2">View Cart</span>
    </button>
  );
}
