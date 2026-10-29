import { ArrowRight, ArrowUpRight, CakeSlice, Heart, Leaf, Truck } from 'lucide-react';
import { cakes as defaultCakes, IMG } from '../data';
import { useShop } from '../store';
import { ProductCard, Reveal, SectionTitle, Stars } from '../components/ui';

const categories = [
  { name: 'Birthday Cakes', img: IMG.hero, filter: 'Birthday' },
  { name: 'Anniversary Cakes', img: IMG.floral, filter: 'Anniversary' },
  { name: 'Love & Romance', img: IMG.heart, filter: 'Love & Romance' },
  { name: 'Theme Cakes', img: IMG.theme, filter: 'Theme Cakes' },
  { name: 'Hampers & Cupcakes', img: IMG.cupcakesChoc, filter: 'Cupcakes' },
];

const features = [
  { icon: Leaf, title: '100% Eggless', green: true },
  { icon: CakeSlice, title: 'Freshly Baked Daily', green: false },
  { icon: Heart, title: 'Made with Love', green: false },
  { icon: Truck, title: 'Safe & On-Time Delivery', green: false },
];

export default function Home() {
  const { go, setCustomOpen, setQuickView, cakes: dynamicCakes } = useShop();
  const currentCakes = dynamicCakes.length ? dynamicCakes : defaultCakes;
  const truffle = currentCakes[0] || defaultCakes[0];

  const goCategory = (filter: string) => { localStorage.setItem('cakeCategory', filter); go('cakes'); };

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-2 to-blush">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-40 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl" />
        <Heart className="anim-float pointer-events-none absolute left-[46%] top-24 hidden text-rose/25 lg:block" size={26} fill="currentColor" />
        <Heart className="anim-float-slow pointer-events-none absolute bottom-24 left-[4%] hidden text-rose/20 lg:block" size={20} fill="currentColor" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-14 pt-10 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:pb-0 lg:pt-0">
          <div className="anim-slide-left py-4 lg:py-16">
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-choco/80">
              FRESHLY BAKED <Leaf size={14} className="text-emerald-600" /> 100% EGGLESS
            </p>
            <h1 className="mt-4 font-serif text-[44px] font-bold leading-[1.05] text-choco sm:text-6xl lg:text-[68px]">
              Make Every<br />Moment
              <span className="mt-1 block font-script text-[56px] font-normal leading-[0.9] text-rose sm:text-7xl lg:text-[84px]">Sweeter<span className="align-top text-[34px]">♡</span></span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-choco/70">Beautiful cakes, handcrafted bakes and thoughtful hampers for every celebration.</p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <button onClick={() => go('cakes')} className="btn-anim btn-choco flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"><span>Explore Cakes</span><ArrowRight size={16} /></button>
              <button onClick={() => setCustomOpen(true)} className="btn-anim btn-outline rounded-full px-7 py-3.5 text-sm font-semibold"><span>Custom Order</span></button>
            </div>
            <div className="mt-9 flex items-center gap-6 text-[11px] font-medium text-choco/60">
              <span className="flex items-center gap-1.5"><Stars rating={5} size={12} /> 4.9 rated by 2000+ sweethearts</span>
            </div>
          </div>

          <div className="anim-fade-up relative">
            <p className="anim-float-slow absolute -top-3 right-6 z-20 rotate-[-4deg] font-hand text-[26px] leading-[1.05] text-choco/75 md:right-16 md:text-[30px]">Sweet<br />Moments,<br />Always <span className="text-rose">♡</span></p>
            <div className="relative overflow-hidden lg:rounded-bl-[90px]">
              <img src={truffle.img} alt={truffle.name} className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[540px]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/70 via-transparent to-transparent lg:from-cream" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream/80 to-transparent" />
            </div>
            <button onClick={() => setQuickView(truffle)} className="card-lift anim-float group absolute bottom-8 right-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-3.5 text-left shadow-[0_18px_38px_-14px_rgba(61,29,18,.45)] backdrop-blur md:right-10">
              <img src={truffle.img} alt={truffle.name} className="h-14 w-16 rounded-xl object-cover" />
              <span>
                <span className="block text-[13px] font-semibold text-choco">{truffle.shortName || truffle.name}</span>
                <span className="mt-0.5 flex items-center gap-1.5"><Stars rating={5} size={11} /><span className="text-[11px] font-medium text-choco/60">{truffle.rating} ({truffle.reviews}+)</span></span>
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-choco text-white transition-all duration-300 group-hover:rotate-[-35deg] group-hover:bg-rose"><ArrowUpRight size={17} /></span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-y border-rose-100/70 bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90} className={`flex flex-col items-center gap-2 px-4 py-7 text-center ${i !== 0 ? 'border-l border-rose-100/80' : ''} ${i >= 2 ? 'max-lg:border-t max-lg:border-rose-100/80' : ''} ${i === 2 ? 'max-lg:border-l-0' : ''}`}>
              <f.icon size={30} strokeWidth={1.4} className={`${f.green ? 'text-emerald-600' : 'text-choco'} transition-transform duration-500 hover:scale-125 hover:-rotate-6`} />
              <p className={`text-[13px] font-semibold ${f.green ? 'text-emerald-700' : 'text-choco'}`}>{f.title}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <Reveal><SectionTitle eyebrow="OUR COLLECTION" title="Find Your Perfect Cake" /></Reveal>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <button onClick={() => goCategory(c.filter)} className="card-lift group block w-full overflow-hidden rounded-2xl border border-rose-100 bg-white text-left shadow-[0_6px_24px_-12px_rgba(120,55,40,.18)]">
                <div className="relative overflow-hidden">
                  <img src={c.img} alt={c.name} loading="lazy" className="card-img h-40 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-choco/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <span className="flex items-center justify-between px-4 py-3.5">
                  <span className="text-[13.5px] font-semibold text-choco transition-colors group-hover:text-rose">{c.name}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-choco/25 text-choco transition-all duration-300 group-hover:rotate-[-35deg] group-hover:border-rose group-hover:bg-rose group-hover:text-white"><ArrowUpRight size={14} /></span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="bg-gradient-to-b from-blush/80 via-blush/50 to-cream py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal><SectionTitle eyebrow="BEST SELLERS" title="Our Most Loved Cakes" /></Reveal>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {currentCakes.slice(0, 5).map((p, i) => (
              <Reveal key={p.id} delay={i * 80}><ProductCard p={p} compact /></Reveal>
            ))}
          </div>
          <Reveal className="mt-9 text-center">
            <button onClick={() => go('cakes')} className="btn-anim btn-outline rounded-full px-7 py-3 text-sm font-semibold"><span>View All Cakes →</span></button>
          </Reveal>
        </div>
      </section>

      {/* ================= CUSTOM ORDER BANNER ================= */}
      <section className="relative overflow-hidden bg-choco">
        <div className="pointer-events-none absolute -left-10 top-0 h-full w-72 bg-gradient-to-r from-rose/15 to-transparent" />
        <Heart className="anim-float pointer-events-none absolute left-[6%] top-8 text-rose/40" size={44} strokeWidth={1} />
        <Heart className="anim-float-slow pointer-events-none absolute bottom-8 left-[11%] text-rose/30" size={26} strokeWidth={1} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 md:px-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="py-12 lg:py-14">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-rose-200">CUSTOM ORDERS <span className="h-px w-10 bg-rose-200/50" /></p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-white md:text-[38px]">A Cake Made Just for You</h2>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/70">From birthdays to weddings and special occasions,<br className="hidden md:block" /> we create cakes that make your moments unforgettable.</p>
              <button onClick={() => setCustomOpen(true)} className="btn-anim btn-rose mt-6 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"><span>Order Custom Cake</span><ArrowRight size={15} /></button>
            </Reveal>
          </div>
          <div className="relative hidden h-full min-h-[240px] lg:block">
            <img src={IMG.floral} alt="Custom floral cake" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-choco via-choco/25 to-transparent" />
            <p className="anim-float-slow absolute right-8 top-8 rotate-[-3deg] text-right font-hand text-[25px] leading-[1.1] text-white/95 drop-shadow">Your<br />Dream Cake<br />Our Passion <span className="text-rose-200">♡</span></p>
          </div>
        </div>
      </section>
    </main>
  );
}
