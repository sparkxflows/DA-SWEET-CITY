import { useMemo, useState } from 'react';
import { ArrowRight, CakeSlice, CalendarDays, ChevronDown, Heart, Quote, Star, Truck, User, Weight } from 'lucide-react';
import { IMG, orders, reviews } from '../data';
import { useShop } from '../store';
import { Reveal, Stars } from '../components/ui';

const cats = ['All Orders', 'Birthday', 'Anniversary', 'Wedding', 'Baby Shower', 'Custom Designs', 'Corporate', 'Festive'];

export default function Orders() {
  const { setCustomOpen } = useShop();
  const [active, setActive] = useState('All Orders');
  const [sort, setSort] = useState('Newest First');
  const [expanded, setExpanded] = useState(false);

  const list = useMemo(() => {
    let l = orders.filter(o => active === 'All Orders' || o.category === active);
    if (sort === 'Oldest First') l = [...l].reverse();
    return expanded ? l : l;
  }, [active, sort, expanded]);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-2 to-blush">
        <div className="relative mx-auto grid max-w-7xl items-center px-4 md:px-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="anim-slide-left py-10 lg:py-14">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-choco/70">REAL PEOPLE&nbsp;&nbsp;/&nbsp;&nbsp;REAL ORDERS</p>
            <h1 className="mt-3 font-serif text-[42px] font-bold leading-[1.08] text-choco sm:text-6xl">Our Customer<br />Orders <Heart className="anim-heartbeat inline text-rose" size={30} strokeWidth={1.5} /></h1>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-choco/70">Every cake tells a story — and we're so grateful to be a part of yours.</p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4">
              {[{ i: Heart, t1: 'Customised', t2: 'as per your wish' }, { i: Star, t1: 'Freshly Baked', t2: 'with Love' }, { i: Truck, t1: 'On-Time', t2: 'Delivery' }].map(f => (
                <span key={f.t1} className="flex items-start gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-rose shadow-sm transition-transform duration-300 hover:scale-110 hover:-rotate-6"><f.i size={18} /></span>
                  <span className="text-[11.5px] leading-snug text-choco/75"><b className="block text-[12.5px] text-choco">{f.t1}</b>{f.t2}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="anim-fade-up relative hidden lg:block">
            <p className="anim-float-slow absolute left-2 top-5 z-20 rotate-[-5deg] font-hand text-[26px] leading-[1.1] text-choco/70">Thank you<br />for your love <span className="text-rose">♡</span></p>
            <div className="relative overflow-hidden lg:rounded-bl-[90px]">
              <img src={IMG.floral} alt="Customer thank you cake" className="h-[360px] w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream/85 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTERS + GRID ================= */}
      <section className="mx-auto max-w-7xl px-4 py-9 md:px-8">
        <div className="flex flex-wrap items-center gap-2.5">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} className={`pill-btn rounded-full border px-4 py-2 text-[12.5px] font-medium ${active === c ? 'active' : 'border-rose-200 bg-white text-choco'}`}>{c}</button>
          ))}
          <div className="relative ml-auto">
            <select value={sort} onChange={e => setSort(e.target.value)} className="cursor-pointer appearance-none rounded-full border border-rose-200 bg-white py-2 pl-4 pr-9 text-[12.5px] font-medium text-choco">
              <option>Newest First</option><option>Oldest First</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-choco/60" />
          </div>
        </div>

        {list.length === 0 ? (
          <div className="anim-pop-in mt-8 rounded-3xl border border-dashed border-rose-200 bg-white/70 px-6 py-16 text-center">
            <span className="anim-float mx-auto grid h-16 w-16 place-items-center rounded-full bg-blush text-rose"><CakeSlice size={28} /></span>
            <p className="mt-3 font-serif text-xl font-semibold text-choco">No orders here yet</p>
            <p className="mx-auto mt-1 max-w-xs text-xs text-choco/60">Be the first in this category — place a custom order and get featured here!</p>
            <button onClick={() => setCustomOpen(true)} className="btn-anim btn-rose mt-4 rounded-full px-6 py-2.5 text-[13px] font-semibold"><span>Order Custom Cake →</span></button>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" key={active + sort}>
            {list.map((o, i) => (
              <article key={o.id} className="card-lift anim-fade-up group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-[0_6px_24px_-12px_rgba(120,55,40,.18)]" style={{ animationDelay: `${i * 70}ms` }} onClick={() => setCustomOpen(true)}>
                <div className="relative overflow-hidden">
                  <img src={o.img} alt={o.title} loading="lazy" className="card-img h-48 w-full object-cover" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10.5px] font-semibold text-choco opacity-0 shadow transition-all duration-300 group-hover:opacity-100">Order something like this →</span>
                </div>
                <div className="flex flex-1 flex-col p-4.5 p-4">
                  <h3 className="text-[15px] font-semibold text-choco transition-colors group-hover:text-rose">{o.title}</h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-choco/55">
                    <span className="flex items-center gap-1"><User size={11} /> {o.customer}</span>
                    <span className="flex items-center gap-1"><CalendarDays size={11} /> {o.date}</span>
                  </div>
                  <p className="mt-2.5 flex gap-1.5 text-[12px] italic leading-relaxed text-choco/70"><Quote size={13} className="mt-0.5 shrink-0 rotate-180 text-rose/60" /> {o.quote}</p>
                  <div className="mt-auto flex gap-2 pt-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 text-[11px] font-medium text-choco/80"><CakeSlice size={12} className="text-rose" /> {o.flavour}</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 text-[11px] font-medium text-choco/80"><Weight size={12} className="text-rose" /> {o.weight}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8">
        <Reveal>
          <div className="rounded-[28px] bg-gradient-to-br from-blush to-cream-2 p-7 md:p-9">
            <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_2fr]">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] text-choco/60">KIND WORDS</p>
                <h3 className="mt-2 font-serif text-[30px] font-semibold leading-tight text-choco">What Our Customers Say <Heart className="inline text-rose" size={19} /></h3>
                <p className="mt-3 text-[13px] leading-relaxed text-choco/65">Your happiness is our biggest reward. Here's what our lovely customers have to say.</p>
                <button onClick={() => setExpanded(v => !v)} className="btn-anim btn-rose mt-5 flex items-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-semibold"><span>{expanded ? 'Show Less' : 'Read More Reviews'}</span><ArrowRight size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} /></button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {(expanded ? [...reviews, ...reviews] : reviews).map((r, i) => (
                  <div key={i} className="anim-fade-up card-lift rounded-3xl bg-white p-5 shadow-sm" style={{ animationDelay: `${i * 80}ms` }}>
                    <Stars rating={5} size={13} />
                    <p className="mt-2.5 text-[12px] leading-relaxed text-choco/75">“{r.text}”</p>
                    <div className="mt-4 flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-2 to-rose font-serif text-[13px] font-bold text-white">{r.name.charAt(0)}</span>
                      <span><span className="block text-[12px] font-semibold text-choco">{r.name}</span><span className="text-[11px] text-choco/50">{r.city}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="relative overflow-hidden bg-choco">
        <Heart className="anim-float pointer-events-none absolute right-[24%] top-6 text-rose/40" size={30} strokeWidth={1} />
        <div className="relative mx-auto grid max-w-7xl items-center px-4 md:px-8 lg:grid-cols-[0.8fr_1.1fr_1fr]">
          <p className="anim-float-slow hidden rotate-[-5deg] py-10 text-center font-hand text-[34px] leading-[1.15] text-rose-200 lg:block">Let's Create<br />Something Sweet <span className="text-rose">♡</span></p>
          <div className="py-11">
            <h3 className="font-serif text-[26px] font-semibold text-white">Place Your Custom Order</h3>
            <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-white/65">Whether it's a birthday, anniversary, or just because — we're here to make it extra special.</p>
            <button onClick={() => setCustomOpen(true)} className="btn-anim btn-rose mt-5 flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"><span>Order Custom Cake</span><ArrowRight size={15} /></button>
          </div>
          <div className="relative hidden h-full min-h-[190px] lg:block">
            <img src={IMG.floral} alt="Custom cake with love" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-choco via-choco/20 to-transparent" />
            <span className="anim-float absolute bottom-6 right-8 rotate-[-3deg] rounded-lg bg-cream px-3.5 py-2 text-center font-hand text-[19px] leading-tight text-choco shadow-xl">Made<br />with Love <span className="text-rose">♡</span></span>
          </div>
        </div>
      </section>
    </main>
  );
}
