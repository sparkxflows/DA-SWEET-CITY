import { useEffect, useState } from 'react';
import { ArrowRight, Heart, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useShop, type Page } from '../store';
import { Logo } from './ui';

const links: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Cakes', page: 'cakes' },
  { label: 'Customer Orders', page: 'orders' },
  { label: 'Hampers', page: 'hampers' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'About', page: 'about' },
];

export default function Header() {
  const { page, go, cartCount, wishlist, setCartOpen, setSearchOpen, setCustomOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn); fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { if (cartCount > 0) { setBump(true); const t = setTimeout(() => setBump(false), 450); return () => clearTimeout(t); } }, [cartCount]);

  const navTo = (p: Page) => { go(p); setMobile(false); };

  return (
    <header className={`sticky top-0 z-40 border-b transition-all duration-500 ${scrolled ? 'border-rose-100 bg-cream/90 shadow-[0_10px_30px_-18px_rgba(61,29,18,.35)] backdrop-blur-xl' : 'border-transparent bg-cream'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(l => {
            const label = page === 'orders' && l.page === 'orders' ? 'Customer Orders' : l.label;
            return (
              <button key={l.page} onClick={() => navTo(l.page)} className={`nav-link text-[13.5px] ${page === l.page ? 'active' : 'text-choco/80'}`}>{label}</button>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 md:gap-3">
          <button className="icon-btn relative grid h-9 w-9 place-items-center rounded-full text-choco" onClick={() => setSearchOpen(true)} aria-label="Search cakes">
            <Search size={19} />
          </button>
          <button className="icon-btn relative grid h-9 w-9 place-items-center rounded-full text-choco" onClick={() => go('cakes')} aria-label="Wishlist">
            <Heart size={19} className={wishlist.length ? 'text-rose' : ''} fill={wishlist.length ? '#df4c78' : 'none'} />
            {wishlist.length > 0 && <span className="anim-badge-pop absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose px-1 text-[10px] font-bold text-white">{wishlist.length}</span>}
          </button>
          <button className="icon-btn relative grid h-9 w-9 place-items-center rounded-full text-choco" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingCart size={19} />
            {cartCount > 0 && <span key={cartCount} className={`absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose px-1 text-[10px] font-bold text-white ${bump ? 'anim-badge-pop' : ''}`}>{cartCount}</span>}
          </button>
          <button onClick={() => setCustomOpen(true)} className="btn-anim btn-choco ml-1 hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold md:flex">
            <span>Order a Cake</span> <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="icon-btn grid h-9 w-9 place-items-center rounded-full text-choco lg:hidden" onClick={() => setMobile(v => !v)} aria-label="Menu">
            {mobile ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="anim-fade-in border-t border-rose-100 bg-cream px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l, i) => (
              <button key={l.page} onClick={() => navTo(l.page)} className={`anim-fade-up rounded-xl px-4 py-2.5 text-left text-sm font-medium transition hover:bg-blush hover:text-rose ${page === l.page ? 'bg-blush text-rose' : 'text-choco'}`} style={{ animationDelay: `${i * 60}ms` }}>
                {page === 'orders' && l.page === 'orders' ? 'Customer Orders' : l.label}
              </button>
            ))}
            <button onClick={() => { setMobile(false); setCustomOpen(true); }} className="btn-anim btn-choco mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">
              <span>Order a Cake</span> <ArrowRight size={15} />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
