import { useState } from 'react';
import { ArrowRight, CakeSlice, Heart, Leaf, MapPin, Phone, Truck, X } from 'lucide-react';
import { allProducts, IMG } from '../data';
import { useShop } from '../store';
import { Reveal, SectionTitle } from '../components/ui';

const galleryImgs = [
  { img: IMG.hero, label: 'Chocolate Truffle' }, { img: IMG.floral, label: 'Floral Anniversary' },
  { img: IMG.heart, label: 'Love You Heart Cake' }, { img: IMG.theme, label: 'Rainbow Theme Cake' },
  { img: IMG.redVelvet, label: 'Red Velvet' }, { img: IMG.hamperHero, label: 'Gift Hamper' },
  { img: IMG.strawberry, label: 'Strawberry Cake' }, { img: IMG.blackForest, label: 'Black Forest' },
  { img: IMG.pineapple, label: 'Pineapple Cake' }, { img: IMG.butterscotch, label: 'Butterscotch' },
  { img: IMG.cupcakesChoc, label: 'Cupcake Box' }, { img: IMG.vanilla, label: 'Vanilla Floral' },
];

export function Gallery() {
  const { setQuickView } = useShop();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openProduct = (label: string) => {
    const p = allProducts.find(x => label.toLowerCase().includes(x.flavour.toLowerCase()) || x.name.toLowerCase().includes(label.split(' ')[0].toLowerCase()));
    if (p) setQuickView(p);
    setLightbox(null);
  };
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <Reveal><SectionTitle eyebrow="OUR GALLERY" title="Sweet Moments Gallery" /></Reveal>
      <Reveal><p className="mx-auto mt-3 max-w-md text-center text-[13px] text-choco/60">A little peek into our kitchen — tap any photo to see it up close, and order the cake you fall in love with.</p></Reveal>
      <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {galleryImgs.map((g, i) => (
          <button key={i} onClick={() => setLightbox(i)} className="card-lift group relative block w-full overflow-hidden rounded-3xl border border-rose-100 text-left shadow-sm">
            <img src={g.img} alt={g.label} loading="lazy" className={`card-img w-full object-cover ${i % 3 === 0 ? 'h-72' : 'h-52'}`} />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-choco/70 to-transparent px-4 pb-3 pt-10 text-[13px] font-semibold text-white opacity-0 transition-all duration-400 group-hover:opacity-100">{g.label}<span className="font-hand text-lg text-rose-200">view ♡</span></span>
          </button>
        ))}
      </div>
      {lightbox !== null && (
        <div className="anim-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-choco/70 p-4 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="anim-pop-in relative w-full max-w-2xl overflow-hidden rounded-[26px] bg-cream shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="heart-btn absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-choco shadow-lg" aria-label="Close"><X size={17} /></button>
            <img src={galleryImgs[lightbox].img} alt={galleryImgs[lightbox].label} className="h-[380px] w-full object-cover" />
            <div className="flex items-center justify-between px-6 py-5">
              <div><h3 className="font-serif text-xl font-bold text-choco">{galleryImgs[lightbox].label}</h3><p className="text-xs text-choco/55">Handcrafted at DA Sweet City • 100% Eggless</p></div>
              <button onClick={() => openProduct(galleryImgs[lightbox].label)} className="btn-anim btn-rose flex items-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-semibold"><span>Order This</span><ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export function About() {
  const { setCustomOpen, go } = useShop();
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-2 to-blush">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:px-8 lg:grid-cols-2">
          <div className="anim-slide-left">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-choco/70">OUR STORY</p>
            <h1 className="mt-3 font-serif text-[42px] font-bold leading-[1.08] text-choco sm:text-5xl">Sweetness in<br />Every Bite <Heart className="anim-heartbeat inline text-rose" size={26} /></h1>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-choco/70">DA Sweet City began with one simple belief — every celebration deserves a cake made with love. From our ovens in Kaithal and Hansi, we bake 100% eggless cakes, handcrafted bakes and thoughtful hampers, fresh every single day.</p>
            <div className="mt-7 grid max-w-md grid-cols-3 gap-4 text-center">
              {[['2000+', 'Happy Customers'], ['500+', 'Custom Designs'], ['4.9★', 'Average Rating']].map(([n, t]) => (
                <div key={t} className="card-lift rounded-2xl border border-rose-100 bg-white/80 px-2 py-4"><p className="font-serif text-xl font-bold text-rose">{n}</p><p className="mt-0.5 text-[10.5px] font-medium text-choco/60">{t}</p></div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => setCustomOpen(true)} className="btn-anim btn-choco flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"><span>Order a Cake</span><ArrowRight size={15} /></button>
              <button onClick={() => go('orders')} className="btn-anim btn-outline rounded-full px-6 py-3 text-sm font-semibold"><span>See Customer Orders</span></button>
            </div>
          </div>
          <div className="anim-fade-up relative">
            <img src={IMG.floral} alt="About DA Sweet City" className="h-[380px] w-full rounded-[32px] object-cover shadow-2xl" />
            <span className="anim-float absolute -bottom-4 left-6 rounded-2xl bg-white px-4 py-3 font-hand text-[22px] text-choco shadow-xl">Baked fresh, with love <span className="text-rose">♡</span></span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[{ i: Leaf, t: '100% Eggless, Always', d: 'Every recipe is crafted eggless without compromising on softness or taste.' }, { i: CakeSlice, t: 'Freshly Baked Daily', d: 'We bake on order, so your cake reaches you oven-fresh and beautiful.' }, { i: Truck, t: 'Safe & On-Time Delivery', d: 'Careful packaging and punctual delivery across Kaithal and Hansi.' }].map((f, i) => (
            <Reveal key={f.t} delay={i * 90}>
              <div className="card-lift h-full rounded-3xl border border-rose-100 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush text-rose"><f.i size={25} /></span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-choco">{f.t}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-choco/60">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 grid gap-6 rounded-[28px] bg-choco p-8 text-white md:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl font-semibold">Visit Our Outlets</h3>
              <ul className="mt-4 space-y-3 text-[13px] text-white/75">
                <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-rose-2" /> Kaithal — Call: 7404965669</li>
                <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-rose-2" /> Hansi — Cakes: 98125-42172 • Hampers: 70155-00426</li>
                <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-rose-2" /> Open all days • Fresh batches every morning</li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="font-hand text-[30px] leading-tight text-rose-200">Let's create something sweet together ♡</p>
              <button onClick={() => setCustomOpen(true)} className="btn-anim btn-rose mt-4 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"><span>Place Your Custom Order</span><ArrowRight size={15} /></button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
