import { useMemo, useState } from 'react';
import { ArrowRight, Cake, Gem, Gift, Heart, Leaf, PackageCheck, PartyPopper, Sparkles, Star, Truck } from 'lucide-react';
import { hampers, IMG } from '../data';
import { useShop } from '../store';
import { ProductCard, Reveal, SectionTitle, Stars } from '../components/ui';

const hamperCats = [
  { name: 'Birthday Hampers', icon: Cake },
  { name: 'Anniversary Hampers', icon: Heart },
  { name: 'Wedding Hampers', icon: Gem },
  { name: 'Festive Hampers', icon: Gift },
  { name: 'Custom Hampers', icon: Star },
];

export default function Hampers() {
  const { go, setCustomOpen, showToast } = useShop();
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const list = useMemo(() => activeCat ? hampers.filter(h => h.occasions.includes(activeCat)) : hampers, [activeCat]);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-2 to-blush">
        <div className="relative mx-auto grid max-w-7xl items-center px-4 md:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="anim-slide-left py-10 lg:py-14">
            <p className="text-xs text-choco/60"><button onClick={() => go('home')} className="transition hover:text-rose">Home</button> <span className="mx-1">/</span> <span className="font-medium text-choco">Hampers</span></p>
            <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] text-choco/70">THOUGHTFUL GIFTS <Heart size={12} className="text-rose" fill="currentColor" /> SWEET SURPRISES</p>
            <h1 className="mt-3 font-serif text-[40px] font-bold leading-[1.08] text-choco sm:text-[54px]">Beautiful<br />Hampers for <Heart className="anim-heartbeat inline text-rose" size={26} strokeWidth={1.5} /><br />Every Occasion</h1>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-choco/70">From birthdays to celebrations, our handcrafted hampers bring sweetness, love and joy to every moment.</p>
            <div className="mt-7 grid max-w-md grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[{ i: PackageCheck, t1: 'Premium', t2: 'Quality' }, { i: Cake, t1: 'Freshly Baked', t2: 'Delights' }, { i: Sparkles, t1: 'Customisable', t2: 'Options' }, { i: Truck, t1: 'Delivery', t2: 'Available' }].map(f => (
                <span key={f.t1} className="flex flex-col items-start gap-1.5">
                  <f.i size={21} className="text-choco transition-transform duration-300 hover:scale-125 hover:-rotate-6" strokeWidth={1.6} />
                  <span className="text-[10.5px] leading-snug text-choco/70"><b className="block text-[11.5px] text-choco">{f.t1}</b>{f.t2}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="anim-fade-up relative hidden lg:block">
            <p className="anim-float-slow absolute right-8 top-5 z-20 rotate-[-3deg] text-right font-hand text-[26px] leading-[1.15] text-choco/75">Because<br />Sweetness<br />Makes Life<br />Special <span className="text-rose">♡</span></p>
            <div className="relative overflow-hidden lg:rounded-bl-[90px]">
              <img src={IMG.hamperHero} alt="Beautiful gift hampers" className="h-[380px] w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream/85 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY STRIP ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-8 md:px-8">
        <Reveal>
          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-rose-100 bg-white/70 sm:grid-cols-5">
            {hamperCats.map((c, i) => (
              <button key={c.name} onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}
                className={`group flex flex-col items-center gap-2.5 px-3 py-6 transition-all duration-300 hover:bg-blush ${i !== 0 ? 'border-l border-rose-100/70' : ''} ${activeCat === c.name ? 'bg-blush' : ''}`}>
                <span className={`grid h-14 w-14 place-items-center rounded-full transition-all duration-400 group-hover:scale-110 group-hover:-rotate-6 ${activeCat === c.name ? 'bg-rose text-white shadow-lg shadow-rose/40' : 'bg-blush text-rose'}`}>
                  <c.icon size={23} strokeWidth={1.6} />
                </span>
                <span className={`text-[12px] font-semibold transition group-hover:text-rose ${activeCat === c.name ? 'text-rose' : 'text-choco'}`}>{c.name}</span>
                {activeCat === c.name && <span className="text-[10px] font-medium text-rose">Tap again to clear</span>}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= POPULAR HAMPERS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <Reveal>
          <div className="relative">
            <SectionTitle eyebrow="OUR HAMPERS" title="Our Popular Hampers" />
            <button onClick={() => { setActiveCat(null); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="btn-anim btn-outline absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold md:flex"><span>View All Hampers</span><ArrowRight size={14} /></button>
          </div>
          <p className="mx-auto mt-3 max-w-md text-center text-[13px] leading-relaxed text-choco/60">Handpicked with love, these hampers are perfect for making every occasion extra special.</p>
        </Reveal>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" key={activeCat ?? 'all'}>
          {list.map((p, i) => (
            <div key={p.id} className="anim-fade-up" style={{ animationDelay: `${i * 70}ms` }}><ProductCard p={p} /></div>
          ))}
        </div>
        {list.length === 0 && <p className="py-10 text-center text-sm text-choco/50">No hampers in this category yet.</p>}
      </section>

      {/* ================= BUILD YOUR OWN ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blush via-cream-2 to-blush">
        <div className="mx-auto grid max-w-7xl items-center px-4 md:px-8 lg:grid-cols-[1fr_1.2fr_1fr]">
          <p className="anim-float-slow hidden rotate-[-5deg] py-10 text-center font-hand text-[30px] leading-[1.2] text-choco/75 lg:block">Perfect<br />Gifts for<br />Every Moment <span className="text-rose">♡</span></p>
          <div className="py-11 lg:pl-8">
            <Reveal>
              <h3 className="font-serif text-[28px] font-semibold leading-tight text-choco md:text-[32px]">Create Your Own<br />Custom Hamper</h3>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-choco/65">Choose your favourite treats, add a personal message and make it truly special.</p>
              <button onClick={() => { setCustomOpen(true); showToast('Tell us your hamper idea!'); }} className="btn-anim btn-rose mt-5 flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"><span>Build Your Own Hamper</span><ArrowRight size={15} /></button>
            </Reveal>
          </div>
          <div className="relative hidden h-full min-h-[220px] lg:block">
            <img src={IMG.hamperHero} alt="Custom hamper" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-cream-2 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-7xl px-4 py-13 py-12 md:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-choco/60">WHY CHOOSE US</p>
            <h3 className="mt-2 font-serif text-[30px] font-semibold text-choco">More Than Just Hampers</h3>
            <p className="mt-2 text-[13px] text-choco/60">Thoughtful. Fresh. Beautiful. That's what we deliver.</p>
            <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[{ i: Leaf, t: '100% Eggless' }, { i: Cake, t: 'Premium Ingredients' }, { i: Gift, t: 'Beautifully Packed' }, { i: Truck, t: 'On-Time Delivery' }].map(f => (
                <div key={f.t} className="group border-rose-100 sm:border-r sm:pr-4 last:border-0">
                  <f.i size={26} strokeWidth={1.4} className="text-choco transition-all duration-300 group-hover:scale-125 group-hover:-rotate-6 group-hover:text-rose" />
                  <p className="mt-2 text-[12px] font-semibold text-choco">{f.t}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex gap-3">
              <button onClick={() => go('cakes')} className="btn-anim btn-choco flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"><span>Explore Cakes</span><ArrowRight size={14} /></button>
              <button onClick={() => setCustomOpen(true)} className="btn-anim btn-outline rounded-full px-6 py-3 text-[13px] font-semibold"><span>Custom Order</span></button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-lift relative rounded-3xl border border-rose-100 bg-white p-6 shadow-[0_16px_36px_-20px_rgba(120,55,40,.35)]">
              <PartyPopper className="absolute -left-3 -top-3 rotate-[-12deg] text-rose" size={26} />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-rose-2 to-rose font-serif text-[15px] font-bold text-white">P</span>
                <div><p className="text-[13px] font-semibold text-choco">Priya Sharma</p><Stars rating={5} size={11} /></div>
              </div>
              <p className="mt-3 text-[13px] italic leading-relaxed text-choco/75">"The hamper was absolutely beautiful and tasted amazing! Highly recommend DA Sweet City."</p>
              <p className="mt-2 text-[11px] font-medium text-choco/50">— Verified Hamper Order, Kaithal</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
