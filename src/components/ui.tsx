import React, { useEffect, useRef } from 'react';
import { Heart, ShoppingCart, Star, StarHalf } from 'lucide-react';
import { inr, type Product } from '../data';
import { useShop } from '../store';

/* Scroll reveal wrapper */
export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { el.classList.add('revealed'); ob.disconnect(); } }), { threshold: 0.12 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  return (
    <span className="inline-flex items-center gap-[1px] text-amber-400">
      {Array.from({ length: full }).map((_, i) => <Star key={i} size={size} fill="currentColor" strokeWidth={0} />)}
      {half && <span className="relative inline-flex"><Star size={size} className="text-amber-200" fill="currentColor" strokeWidth={0} /><StarHalf size={size} fill="currentColor" strokeWidth={0} className="absolute left-0 top-0" /></span>}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => <Star key={'e' + i} size={size} className="text-amber-200" fill="currentColor" strokeWidth={0} />)}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-rose/50" />
        <span className={`text-[11px] font-semibold tracking-[0.3em] ${light ? 'text-rose-200' : 'text-choco/70'}`}>{eyebrow}</span>
        <span className="h-px w-10 bg-rose/50" />
      </div>
      <h2 className={`mt-2 font-serif text-3xl font-semibold md:text-[40px] md:leading-tight ${light ? 'text-white' : 'text-choco'}`}>{title}</h2>
      <div className="mt-1 flex justify-center"><Heart size={15} className="anim-heartbeat text-rose" fill="currentColor" /></div>
    </div>
  );
}

export function Logo({ light = false, center = false }: { light?: boolean; center?: boolean }) {
  const { go } = useShop();
  return (
    <button onClick={() => go('home')} className={`group flex items-center gap-2.5 text-left ${center ? 'flex-col text-center gap-1' : ''}`} aria-label="DA Sweet City home">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
        <svg viewBox="0 0 48 48" className={`h-11 w-11 ${light ? 'text-white' : 'text-choco'}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 22h20l-2.2 16.2a3 3 0 0 1-3 2.6H19.2a3 3 0 0 1-3-2.6L14 22Z" />
          <path d="M17 28.5h14M18.2 34h11.6" opacity=".55" />
          <path d="M12.5 22c-2 0-3.2-1.5-3.2-3.2C9.3 16.6 11 15 13 15c.4-2.3 2.3-4 4.7-4 .7-1.6 2.3-2.6 4-2.4C22.6 6.9 24 6 24 6s1.4.9 2.3 2.6c1.7-.2 3.3.8 4 2.4 2.4 0 4.3 1.7 4.7 4 2 .1 3.7 1.6 3.7 3.8 0 1.7-1.3 3.2-3.2 3.2" />
          <path d="M24 6c0-1.8 1.2-3 3-3.4C27.2 4.4 26 6 24 6Z" fill="#df4c78" stroke="#df4c78" />
          <circle cx="24" cy="12.2" r="1.4" fill="#df4c78" stroke="none" />
        </svg>
      </span>
      <span>
        <span className={`block font-serif text-[19px] font-bold leading-none tracking-wide ${light ? 'text-white' : 'text-choco'}`}>DA SWEET CITY</span>
        <span className={`mt-1 block text-[8px] font-medium tracking-[0.32em] ${light ? 'text-rose-200' : 'text-choco/60'}`}>CAKES • BAKES • HAPPINESS</span>
      </span>
    </button>
  );
}

/* Product card — clicking the card/image opens the quick-view popup */
export function ProductCard({ p, compact = false }: { p: Product; compact?: boolean }) {
  const { addToCart, toggleWish, wished, setQuickView } = useShop();
  const isW = wished(p.id);
  const isOutOfStock = p.inStock === false;

  return (
    <div
      className="card-lift group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-[0_6px_24px_-12px_rgba(120,55,40,.18)]"
      onClick={() => setQuickView(p)}
    >
      <div className="relative overflow-hidden">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className={`card-img w-full object-cover ${compact ? 'h-40' : 'h-48'} ${
            isOutOfStock ? 'opacity-70 grayscale' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-choco/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold text-choco opacity-0 shadow-lg backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          Quick View • Tap to open
        </span>
        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-choco/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur">
            {p.tag}
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute left-3 bottom-3 rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-bold text-white shadow">
            Out of Stock
          </span>
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWish(p.id);
          }}
          className={`heart-btn absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-rose shadow-md ${
            isW ? 'wished' : ''
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={15} fill={isW ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-center">
        <h3 className="text-[15px] font-semibold text-choco transition-colors group-hover:text-rose">
          {compact ? p.shortName ?? p.name : p.name}
        </h3>
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <Stars rating={p.rating} />
          <span className="text-[11px] font-medium text-choco/60">
            {p.rating} ({p.reviews}+)
          </span>
        </div>
        <p className="mt-1.5 text-[15px] font-bold text-rose">
          {inr(p.price)}
          {p.type === 'cake' && <span className="ml-1 text-[10px] font-medium text-choco/50">/ 500g</span>}
        </p>
        <button
          disabled={isOutOfStock}
          onClick={e => {
            e.stopPropagation();
            if (!isOutOfStock) addToCart(p);
          }}
          className={`mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition ${
            isOutOfStock
              ? 'bg-rose-100/60 text-choco/40 cursor-not-allowed'
              : 'btn-anim btn-rose'
          }`}
        >
          <ShoppingCart size={15} /> <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
