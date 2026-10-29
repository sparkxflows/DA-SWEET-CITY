import { useEffect, useMemo, useState } from 'react';
import { CakeSlice, ChevronDown, Funnel, Heart, Leaf, SearchX, Sparkles, Star, Truck, Wheat } from 'lucide-react';
import { cakes, IMG } from '../data';
import { useShop } from '../store';
import { ProductCard, Reveal } from '../components/ui';

const pillCats = ['All', 'Birthday', 'Anniversary', 'Love & Romance', 'Theme Cakes', 'Cupcakes'];
const priceRanges = [
  { label: 'Under ₹499', test: (p: number) => p < 499 },
  { label: '₹500 – ₹999', test: (p: number) => p >= 500 && p <= 999 },
  { label: '₹1000 – ₹1499', test: (p: number) => p >= 1000 && p <= 1499 },
  { label: '₹1500+', test: (p: number) => p >= 1500 },
];
const flavours = ['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Strawberry', 'Pineapple', 'Mix Fruit'];
const occasions = ['Birthday', 'Anniversary', 'Love & Romance', 'Theme Cakes', 'Custom Cakes'];
const sorts = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Most Reviewed'];

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="check-anim flex cursor-pointer items-center gap-2.5 text-[13px] text-choco/75">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-[17px] w-[17px] cursor-pointer rounded" />
      {label}
    </label>
  );
}

export default function Cakes() {
  const { go, setCustomOpen } = useShop();
  const [activeCat, setActiveCat] = useState('All');
  const [selPrice, setSelPrice] = useState<string[]>([]);
  const [selFlavour, setSelFlavour] = useState<string[]>([]);
  const [selOccasion, setSelOccasion] = useState<string[]>([]);
  const [sort, setSort] = useState('Featured');
  const [applied, setApplied] = useState({ price: [] as string[], flavour: [] as string[], occasion: [] as string[] });
  const [justApplied, setJustApplied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cakeCategory');
    if (saved) { setActiveCat(saved); localStorage.removeItem('cakeCategory'); }
  }, []);

  const toggle = (list: string[], v: string, set: (x: string[]) => void) => set(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    let list = cakes.filter(p => {
      if (activeCat !== 'All') {
        if (activeCat === 'Cupcakes') { if (p.category !== 'Cupcakes' && !p.occasions.includes('Birthday')) return false; }
        else if (p.category !== activeCat && !p.occasions.includes(activeCat)) return false;
      }
      if (applied.price.length && !applied.price.some(l => priceRanges.find(r => r.label === l)?.test(p.price))) return false;
      if (applied.flavour.length && !applied.flavour.includes(p.flavour)) return false;
      if (applied.occasion.length && !applied.occasion.some(o => p.occasions.includes(o))) return false;
      return true;
    });
    if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'Rating: High to Low') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'Most Reviewed') list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [activeCat, applied, sort]);

  const apply = () => {
    setApplied({ price: selPrice, flavour: selFlavour, occasion: selOccasion });
    setJustApplied(true);
    setTimeout(() => setJustApplied(false), 1200);
  };
  const clearAll = () => { setSelPrice([]); setSelFlavour([]); setSelOccasion([]); setApplied({ price: [], flavour: [], occasion: [] }); setActiveCat('All'); };

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-2 to-blush">
        <div className="relative mx-auto grid max-w-7xl items-center px-4 md:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="anim-slide-left py-10 lg:py-14">
            <p className="text-xs text-choco/60"><button onClick={() => go('home')} className="transition hover:text-rose">Home</button> <span className="mx-1">/</span> <span className="font-medium text-choco">Cakes</span></p>
            <h1 className="mt-3 font-serif text-[42px] font-bold leading-[1.05] text-choco sm:text-6xl">Our<br />Delicious Cakes <Heart className="anim-heartbeat inline text-rose" size={30} strokeWidth={1.5} /></h1>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-choco/70">Freshly baked, beautifully crafted and made with love for every occasion.</p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-[12px] font-medium text-choco/80">
              <span className="flex items-center gap-2"><Leaf size={19} className="text-emerald-600" /> 100% Eggless</span>
              <span className="flex items-center gap-2"><CakeSlice size={19} className="text-rose" /> Premium Ingredients</span>
              <span className="flex items-center gap-2"><Heart size={19} className="text-rose" fill="#df4c78" /> Made with Love</span>
            </div>
            <p className="mt-5 text-[11px] font-semibold tracking-wide text-choco/50">{filtered.length} cakes found — tap any cake to see it up close ♡</p>
          </div>
          <div className="anim-fade-up relative hidden lg:block">
            <p className="anim-float-slow absolute right-10 top-4 z-20 rotate-[-4deg] text-right font-hand text-[27px] leading-[1.1] text-choco/75">Life is<br />Sweeter<br />with Cake <span className="text-rose">♡</span></p>
            <div className="relative overflow-hidden lg:rounded-bl-[90px]">
              <img src={IMG.hero} alt="Our Delicious Cakes" className="h-[380px] w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream/85 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOP ================= */}
      <section className="mx-auto max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <aside className="mb-8 h-fit rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-[0_10px_30px_-18px_rgba(120,55,40,.25)] backdrop-blur lg:sticky lg:top-24">
          <h3 className="font-serif text-lg font-bold text-choco">Filter By</h3>
          <div className="mt-5">
            <p className="text-[13px] font-semibold text-choco">Price Range</p>
            <div className="mt-2.5 space-y-2">{priceRanges.map(r => <CheckRow key={r.label} label={r.label} checked={selPrice.includes(r.label)} onChange={() => toggle(selPrice, r.label, setSelPrice)} />)}</div>
          </div>
          <div className="mt-6">
            <p className="text-[13px] font-semibold text-choco">Flavour</p>
            <div className="mt-2.5 space-y-2">{flavours.map(f => <CheckRow key={f} label={f} checked={selFlavour.includes(f)} onChange={() => toggle(selFlavour, f, setSelFlavour)} />)}</div>
          </div>
          <div className="mt-6">
            <p className="text-[13px] font-semibold text-choco">Occasion</p>
            <div className="mt-2.5 space-y-2">{occasions.map(o => <CheckRow key={o} label={o} checked={selOccasion.includes(o)} onChange={() => toggle(selOccasion, o, setSelOccasion)} />)}</div>
          </div>
          <button onClick={apply} className={`btn-anim mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[13px] font-semibold ${justApplied ? 'bg-emerald-500 text-white' : 'btn-rose'}`}>
            {justApplied ? <><Sparkles size={15} /><span>Filters Applied!</span></> : <><Funnel size={14} /><span>Apply Filters</span></>}
          </button>
          {(applied.price.length + applied.flavour.length + applied.occasion.length > 0) && (
            <button onClick={clearAll} className="mt-2.5 w-full text-center text-[11.5px] font-medium text-rose underline-offset-2 transition hover:underline">Clear all filters</button>
          )}
        </aside>

        {/* Grid */}
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            {pillCats.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} className={`pill-btn rounded-full border px-4.5 px-4 py-2 text-[12.5px] font-medium ${activeCat === c ? 'active' : 'border-rose-200 bg-white text-choco'}`}>{c}</button>
            ))}
            <div className="relative ml-auto">
              <select value={sort} onChange={e => setSort(e.target.value)} className="cursor-pointer appearance-none rounded-full border border-rose-200 bg-white py-2 pl-4 pr-9 text-[12.5px] font-medium text-choco transition">
                {sorts.map(s => <option key={s}>Sort by: {s === 'Featured' ? 'Featured' : s}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-choco/60" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="anim-pop-in mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-rose-200 bg-white/70 px-6 py-16 text-center">
              <span className="anim-float grid h-16 w-16 place-items-center rounded-full bg-blush text-rose"><SearchX size={28} /></span>
              <p className="font-serif text-xl font-semibold text-choco">No cakes match those filters</p>
              <p className="max-w-xs text-xs text-choco/60">Try removing a filter or two — sweetness is still waiting for you.</p>
              <button onClick={clearAll} className="btn-anim btn-rose mt-1 rounded-full px-6 py-2.5 text-[13px] font-semibold"><span>Clear Filters</span></button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" key={activeCat + sort + JSON.stringify(applied)}>
              {filtered.map((p, i) => (
                <div key={p.id} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}><ProductCard p={p} /></div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CUSTOM BANNER ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-blush via-[#fdf3ec] to-blush">
            <div className="grid items-center lg:grid-cols-[1.15fr_1fr_0.9fr]">
              <div className="p-8 md:p-10">
                <p className="text-[10px] font-semibold tracking-[0.3em] text-choco/60">CUSTOM CAKES</p>
                <h3 className="mt-2 font-serif text-[28px] font-semibold leading-tight text-choco md:text-[34px]">Make It Special<br />With a Custom Cake <Heart className="inline text-rose" size={20} /></h3>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-choco/65">From birthdays to weddings, we create cakes that match your dreams.</p>
                <button onClick={() => setCustomOpen(true)} className="btn-anim btn-rose mt-5 flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"><span>Order Custom Cake</span><span>→</span></button>
              </div>
              <div className="relative hidden h-full min-h-[230px] lg:block">
                <img src={IMG.floral} alt="Custom cake" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#fdf3ec] via-transparent to-transparent" />
              </div>
              <ul className="space-y-4 p-8 text-[13px] font-medium text-choco/80 md:p-10">
                {[{ i: Sparkles, t: 'Personalised Designs' }, { i: CakeSlice, t: 'Any Shape & Size' }, { i: Wheat, t: 'Fresh Ingredients' }, { i: Truck, t: 'On-Time Delivery' }].map(f => (
                  <li key={f.t} className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1.5 hover:text-rose"><span className="grid h-9 w-9 place-items-center rounded-full bg-white text-rose shadow-sm"><f.i size={16} /></span>{f.t}</li>
                ))}
                <li className="flex items-center gap-3 text-choco/50"><Star size={14} className="text-amber-400" fill="currentColor" /> Loved by 2000+ customers</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
