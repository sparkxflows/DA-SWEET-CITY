import { useEffect, useState } from 'react';

function WhatsAppIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`text-white shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.47 0-2.92-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a7.994 7.994 0 0 1-1.23-4.28c0-4.41 3.59-8 8.01-8 2.14 0 4.15.83 5.66 2.34a7.962 7.962 0 0 1 2.35 5.66c0 4.42-3.59 8-8.01 8zm4.39-5.99c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phoneNumber = '919812542172',
  defaultMessage = "Hi Da Sweet City! I'd like to place an order.",
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoExpanded, setIsAutoExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      // Wait 3.5s then expand
      timer = setTimeout(() => {
        if (!active) return;
        setIsAutoExpanded(true);

        // Keep expanded for 2.6s, then collapse and repeat
        timer = setTimeout(() => {
          if (!active) return;
          setIsAutoExpanded(false);
          cycle();
        }, 2600);
      }, 3500);
    };

    // Initial trigger after 2 seconds
    timer = setTimeout(() => {
      if (!active) return;
      setIsAutoExpanded(true);
      timer = setTimeout(() => {
        if (!active) return;
        setIsAutoExpanded(false);
        cycle();
      }, 2600);
    }, 2000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const isExpanded = isHovered || isAutoExpanded;
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-5 left-4 sm:left-6 z-50 select-none"
    >
      <div className="relative">
        {/* Subtle glowing halo */}
        <div className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366]/25 blur-md" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex h-14 sm:h-16 items-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          aria-label="Chat with us on WhatsApp"
        >
          {/* Pulsing online indicator dot */}
          <span className="absolute right-2.5 top-2.5 flex h-3 w-3 z-10 pointer-events-none">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#25D366] bg-white shadow-sm" />
          </span>

          {/* Icon Box */}
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center">
            <WhatsAppIcon size={26} className="transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Animated Text Container: expands and collapses every 3-4s or on hover */}
          <div
            className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isExpanded ? 'max-w-[190px] opacity-100 pr-5 sm:pr-6' : 'max-w-0 opacity-0 pr-0'
            }`}
          >
            <div className="flex flex-col text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 leading-tight">
                QUICK ORDER
              </p>
              <h4 className="text-[15px] font-bold text-white leading-tight mt-0.5">
                Chat on WhatsApp
              </h4>
            </div>
          </div>
        </a>
      </div>
    </aside>
  );
}
