import { Gift, MapPin, Phone, Heart } from 'lucide-react';
import { useShop, type Page } from '../store';
import { Logo } from './ui';

const InstagramIcon = (p: { size?: number }) => (<svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>);
const FacebookIcon = (p: { size?: number }) => (<svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h2.5V4.5H14A4.5 4.5 0 0 0 9.5 9v2H7v3.5h2.5V21H13v-6.5h2.5l.5-3.5h-3V9a1 1 0 0 1 1-1Z" /></svg>);
const YoutubeIcon = (p: { size?: number }) => (<svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" stroke="none" /></svg>);

export default function Footer({ dark = false }: { dark?: boolean }) {
  const { go, setCustomOpen } = useShop();
  const quick: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' }, { label: 'Cakes', page: 'cakes' }, { label: 'Custom Orders', page: 'orders' },
    { label: 'Hampers', page: 'hampers' }, { label: 'Gallery', page: 'gallery' }, { label: 'About', page: 'about' },
  ];
  const socials = [InstagramIcon, FacebookIcon, YoutubeIcon];
  return (
    <footer className={dark ? 'bg-choco text-white' : 'bg-cream'}>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo light={dark} />
            <p className={`mt-4 font-hand text-[22px] leading-none ${dark ? 'text-rose-200' : 'text-rose'}`}>Sweetness in every bite <Heart size={13} className="inline text-rose" fill="currentColor" /></p>
            <p className={`mt-3 max-w-[240px] text-xs leading-relaxed ${dark ? 'text-white/60' : 'text-choco/60'}`}>Beautiful cakes, handcrafted bakes and thoughtful hampers for every celebration.</p>
          </div>
          <div>
            <h4 className={`text-[13px] font-semibold ${dark ? 'text-white' : 'text-choco'}`}>Our Outlets</h4>
            <ul className={`mt-3 space-y-3 text-xs leading-relaxed ${dark ? 'text-white/70' : 'text-choco/70'}`}>
              <li className="flex gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-rose" /><span>Kaithal<br />7404965669</span></li>
              <li className="flex gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-rose" /><span>Hansi<br />98125-42172 <span className="opacity-70">(Hampers: 70155-00426)</span></span></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-[13px] font-semibold ${dark ? 'text-white' : 'text-choco'}`}>Contact Us</h4>
            <ul className={`mt-3 space-y-2.5 text-xs ${dark ? 'text-white/70' : 'text-choco/70'}`}>
              <li className="flex items-center gap-2 transition hover:translate-x-1 hover:text-rose"><Phone size={13} className="text-rose" /> Cakes: 98125-42172</li>
              <li className="flex items-center gap-2 transition hover:translate-x-1 hover:text-rose"><Gift size={13} className="text-rose" /> Hampers: 70155-00426</li>
              <li><button onClick={() => setCustomOpen(true)} className="btn-anim btn-rose mt-2 rounded-full px-4 py-2 text-[11px] font-semibold"><span>Order Custom Cake →</span></button></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-[13px] font-semibold ${dark ? 'text-white' : 'text-choco'}`}>Quick Links</h4>
            <ul className={`mt-3 space-y-2 text-xs ${dark ? 'text-white/70' : 'text-choco/70'}`}>
              {quick.map(q => <li key={q.label}><button onClick={() => go(q.page)} className="transition-all hover:translate-x-1 hover:text-rose">{q.label}</button></li>)}
            </ul>
          </div>
          <div>
            <h4 className={`text-[13px] font-semibold ${dark ? 'text-white' : 'text-choco'}`}>Follow Us</h4>
            <div className="mt-3 flex gap-2.5">
              {socials.map((Icon, i) => (
                <button key={i} className={`icon-btn grid h-9 w-9 place-items-center rounded-full ${dark ? 'bg-white/10 text-white hover:bg-rose' : 'bg-choco text-white hover:bg-rose'}`} aria-label="Social link"><Icon size={16} /></button>
              ))}
              <button className={`icon-btn grid h-9 w-9 place-items-center rounded-full font-serif text-[13px] font-bold ${dark ? 'bg-white/10 text-white hover:bg-rose' : 'bg-choco text-white hover:bg-rose'}`} aria-label="Pinterest">P</button>
            </div>
            <p className={`mt-4 text-[11px] leading-relaxed ${dark ? 'text-white/50' : 'text-choco/50'}`}>Tag @dasweetcity and get featured on our Customer Orders page!</p>
          </div>
        </div>
      </div>
      <div className={dark ? 'bg-[#2a130b]' : 'border-t border-rose-100 bg-cream-2/60'}>
        <div className={`mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] md:flex-row md:px-8 ${dark ? 'text-white/60' : 'text-choco/60'}`}>
          <span>© 2025 DA SWEET CITY. All rights reserved.</span>
          <span className="tracking-[0.18em]">CAKES • BAKES • HAPPINESS <Heart size={10} className="inline text-rose" fill="currentColor" /></span>
        </div>
      </div>
    </footer>
  );
}
