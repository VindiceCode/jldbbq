'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AWARD, BANNER_ITEMS, BUNDLE, CONTACT, CUSTOM_ITEMS, DIFFERENTIATORS, GALLERY, GALLERY_CATEGORIES, MAX_TRAYS, NAV_LINKS, ROTATING_WORDS, TESTIMONIALS, type GalleryCategory } from './JLDContent';
import { Btn, Icon, Logo, SauceDivider, SectionLabel, usePrefersReducedMotion, useScrollToSection, useViewport } from './JLDShared';
const LONGEST_WORD = ROTATING_WORDS.reduce((a, b) => b.length > a.length ? b : a, '');
function scallopPath(cx: number, cy: number, r: number, teeth: number) {
  const step = Math.PI * 2 / teeth;
  const rr = r * step / 2 * 1.25;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = (i + 1) * step;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    if (i === 0) d += `M${x0.toFixed(2)} ${y0.toFixed(2)}`;
    d += ` A${rr.toFixed(2)} ${rr.toFixed(2)} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d + 'Z';
}
export const AwardRibbon = () => {
  const {
    wide
  } = useViewport();
  return <div className={`flex items-center gap-5 ${wide ? 'flex-row' : 'flex-col text-center'}`}>
      <div className="relative shrink-0" style={{
      width: 156,
      height: 196
    }}>
        <svg viewBox="0 0 156 196" className="absolute inset-0 h-full w-full" role="img" aria-label={`${AWARD.title}, ${AWARD.school} ${AWARD.where} ${AWARD.years}`}>
          <path d="M52 118 L38 190 L62 176 L78 194 L78 118Z" fill="#5A1913" />
          <path d="M104 118 L118 190 L94 176 L78 194 L78 118Z" fill="#7B241C" />
          <path d={scallopPath(78, 74, 68, 18)} fill="#7B241C" />
          <path d={scallopPath(78, 74, 60, 18)} fill="#8E2A21" />
          <circle cx="78" cy="74" r="54" fill="#F5F1E8" stroke="#4A0F0A" strokeWidth="2.5" />
          <circle cx="78" cy="74" r="47" fill="none" stroke="#C4622D" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{
        paddingBottom: 48
      }}>
          <div className="flex gap-0.5 text-[#C4622D]">
            {[0, 1, 2, 3, 4].map(s => <Icon.Star key={s} className="h-2 w-2" />)}
          </div>
          <span className="jld-heading mt-1 text-[0.44rem] font-bold uppercase tracking-[0.2em] text-[#7B241C]">
            Voted Best
          </span>
          <span className="jld-display text-[2rem] leading-none text-[#191512] tracking-tight">
            {AWARD.school}
          </span>
          <span className="jld-heading text-[0.46rem] font-bold uppercase tracking-[0.24em] text-[#4A413A]">
            {AWARD.where}
          </span>
          <span className="mt-1 h-px w-10 bg-[#C4622D]" />
          <span className="jld-heading mt-1 text-[0.56rem] font-bold tracking-[0.1em] text-[#7B241C]">
            {AWARD.years}
          </span>
        </div>
      </div>

      <div className={`max-w-xs ${wide ? 'text-left' : 'text-center'}`}>
        <p className="jld-heading text-base font-bold uppercase tracking-[0.06em] leading-tight text-[#191512]">{AWARD.title}</p>
        <p className="jld-heading mt-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#8A7C67]">
          Featured at {AWARD.school} {AWARD.where} since {AWARD.since}
        </p>
      </div>
    </div>;
};
export const OfferBanner = () => {
  const scrollTo = useScrollToSection();
  const strip = <div className="flex shrink-0 items-center">
      {BANNER_ITEMS.map((item, i) => <span key={i} className="flex items-center">
          <span className="jld-heading text-base sm:text-xl font-bold uppercase tracking-[0.14em] px-6 sm:px-8 whitespace-nowrap">
            {item}
          </span>
          <Icon.Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#C4622D] shrink-0" />
        </span>)}
    </div>;
  return <button type="button" onClick={() => scrollTo('book')} className="jld-marquee group relative z-10 w-full overflow-hidden bg-[#4A0F0A] text-[#F3ECDE] py-4 sm:py-5 cursor-pointer border-y-4 border-[#7B241C] transition-colors hover:bg-[#5A1913] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#C4622D]" aria-label="Limited weekend bookings for the Game Day Bundle. Jump to the booking form.">

      <div className="jld-marquee-track flex w-max">
        {strip}
        {strip}
      </div>
    </button>;
};
export const TopNav = () => {
  const {
    wide
  } = useViewport();
  const scrollTo = useScrollToSection();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!wide) return;
    setOpen(false);
  }, [wide]);
  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };
  return <header className="sticky top-0 z-30 w-full bg-[#EDE7DC]/95 backdrop-blur-sm border-b border-[#D6CBB6]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <button type="button" onClick={() => go('top')} className="shrink-0 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]" aria-label="Just Like Dad's Barbecue — back to top">

          <Logo size="sm" />
        </button>

        {wide ? <nav className="flex items-center gap-1">
            {NAV_LINKS.map(l => <button key={l.id} type="button" onClick={() => go(l.id)} className="jld-heading text-xs font-semibold uppercase tracking-[0.16em] text-[#3A322A] px-3 py-2 rounded-sm transition-colors hover:text-[#7B241C] hover:bg-[#E3DACA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

                {l.label}
              </button>)}
            <a href={CONTACT.phoneHref} className="jld-heading ml-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#7B241C] border-2 border-[#7B241C] px-4 py-2 rounded-sm transition-colors hover:bg-[#7B241C] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

              <Icon.Phone className="w-3.5 h-3.5" />
              {CONTACT.phone}
            </a>
          </nav> : <div className="flex items-center gap-2">
            <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`} className="p-2.5 rounded-sm border-2 border-[#7B241C] text-[#7B241C] transition-colors hover:bg-[#7B241C] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

              <Icon.Phone className="w-4 h-4" />
            </a>
            <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="p-2.5 rounded-sm border-2 border-[#191512] text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

              {open ? <Icon.Close className="w-4 h-4" /> : <Icon.Menu className="w-4 h-4" />}
            </button>
          </div>}
      </div>

      {!wide && open && <nav className="border-t border-[#D6CBB6] bg-[#EDE7DC] px-4 pb-3 pt-1">
          {NAV_LINKS.map(l => <button key={l.id} type="button" onClick={() => go(l.id)} className="jld-heading block w-full text-left text-sm font-semibold uppercase tracking-[0.16em] text-[#3A322A] py-3 border-b border-[#DFD5C1] last:border-0 transition-colors hover:text-[#7B241C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

              {l.label}
            </button>)}
        </nav>}
    </header>;
};
const useRotatingWord = () => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(ROTATING_WORDS[0].length);
  const [growing, setGrowing] = useState(true);
  useEffect(() => {
    if (reduced) {
      const t = setInterval(() => setIndex(v => (v + 1) % ROTATING_WORDS.length), 3200);
      return () => clearInterval(t);
    }
    const full = ROTATING_WORDS[index];
    let delay = 72;
    if (growing && len >= full.length) delay = 1700;else if (!growing && len <= 0) delay = 220;else if (!growing) delay = 34;
    const t = setTimeout(() => {
      if (growing) {
        if (len >= full.length) setGrowing(false);else setLen(len + 1);
      } else if (len <= 0) {
        setGrowing(true);
        setIndex(v => (v + 1) % ROTATING_WORDS.length);
      } else {
        setLen(len - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [len, growing, index, reduced]);
  const word = ROTATING_WORDS[index];
  return {
    text: reduced ? word : word.slice(0, len),
    reduced
  };
};
export const Hero = ({
  onViewBundles,
  onBook,
  onExpect
}: {
  onViewBundles: () => void;
  onBook: () => void;
  onExpect: () => void;
}) => {
  const {
    wide
  } = useViewport();
  const {
    text,
    reduced
  } = useRotatingWord();
  return <section id="top" className="relative w-full overflow-hidden bg-[#191512]">
      <img src="/photos/smoker.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-45" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#191512]/85 via-[#191512]/70 to-[#191512]/95" />

      <div className="relative mx-auto w-full max-w-4xl px-5 sm:px-8 py-14 sm:py-20 flex flex-col items-center text-center">
        <Logo size="lg" tone="cream" />

        <div className="mt-9 sm:mt-11 w-full">
          <h1 className="jld-display text-[#F3ECDE] leading-[1.08] text-[1.7rem] sm:text-[2.7rem]">
            <span className="block">Book your best</span>
            <span className="relative mt-2 block">
              <span className="invisible block select-none" aria-hidden="true">
                {LONGEST_WORD}
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#E8A87C]">{text}</span>
                {!reduced && <span className="jld-caret ml-1 inline-block w-[3px] h-[0.85em] bg-[#C4622D]" aria-hidden="true" />}
              </span>
            </span>
          </h1>
          <p className="sr-only">
            Book your best game day, corporate event, holiday, or graduation party.
          </p>
        </div>

        <p className="mt-6 max-w-xl text-[#D8CEBB] text-base sm:text-lg leading-relaxed">
          Barbecue catering across {CONTACT.area}. Cooked fresh for your event, delivered ready to
          serve.
        </p>

        <div className={`mt-9 flex w-full gap-3 ${wide ? 'flex-row justify-center' : 'flex-col'}`}>
          <Btn variant="cream" size="lg" onClick={onViewBundles} full={!wide}>
            View Bundles
          </Btn>
          <Btn variant="primary" size="lg" onClick={onBook} full={!wide}>
            Book With Us
          </Btn>
        </div>

        <button type="button" onClick={onExpect} className="jld-heading mt-5 inline-flex items-center gap-2 rounded-sm border border-[#8A7C67] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#D8CEBB] transition-colors hover:border-[#C4622D] hover:text-[#F3ECDE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

          What to expect with Dad&rsquo;s
          <Icon.Down className="h-3.5 w-3.5" />
        </button>

        <p className="jld-heading mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#A99C88]">
          {CONTACT.years} across {CONTACT.area}
        </p>
      </div>
      <SauceDivider />
    </section>;
};
const CustomSpread = ({
  onBook
}: {
  onBook: () => void;
}) => {
  const {
    wide
  } = useViewport();
  return <div className="mt-10 rounded-sm border-2 border-[#191512] bg-[#F5F1E8] p-5 sm:p-8 shadow-[6px_6px_0_0_#7B241C25]">
      <div className={`flex gap-5 ${wide ? 'flex-row items-end justify-between' : 'flex-col'}`}>
        <div className="max-w-xl">
          <SectionLabel>Not just the bundle</SectionLabel>
          <h3 className="jld-display mt-3 text-[1.4rem] sm:text-[1.9rem] leading-tight text-[#191512]">
            Want something else?
          </h3>
          <p className="mt-2.5 leading-relaxed text-[#4A413A]">
            Dad builds it with you on the phone — any of these, any combination, any size crowd.
          </p>
        </div>
        {wide && <div className="shrink-0">
            <Btn variant="primary" size="lg" onClick={onBook}>
              Build My Own Spread
            </Btn>
          </div>}
      </div>

      <ul className={`mt-6 grid gap-3 sm:gap-4 ${wide ? 'grid-cols-6' : 'grid-cols-3'}`}>
        {CUSTOM_ITEMS.map(item => <li key={item.name}>
            <button type="button" onClick={onBook} className="group block w-full text-left focus:outline-none" aria-label={`Ask about ${item.name}`}>

              <span className="block overflow-hidden rounded-sm border-2 border-[#191512] transition-colors group-hover:border-[#7B241C] group-focus-visible:border-[#C4622D]">
                <img src={item.src} alt="" aria-hidden="true" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" />

              </span>
              <span className="jld-heading mt-2 block text-[0.68rem] font-bold uppercase leading-tight tracking-[0.1em] text-[#191512] transition-colors group-hover:text-[#7B241C]">
                {item.name}
              </span>
            </button>
          </li>)}
      </ul>

      {!wide && <div className="mt-6">
          <Btn variant="primary" size="lg" full onClick={onBook}>
            Build My Own Spread
          </Btn>
        </div>}
    </div>;
};
export const BundleSection = ({
  onBook,
  onExpect
}: {
  onBook: (qty: number, orderType: 'bundle' | 'custom') => void;
  onExpect: () => void;
}) => {
  const [atCap, setAtCap] = useState(false);
  const {
    wide
  } = useViewport();
  const [qty, setQty] = useState(1);
  const total = BUNDLE.price * qty;
  const feeds = BUNDLE.feeds * qty;
  const perHead = (BUNDLE.price / BUNDLE.feeds).toFixed(2);
  return <section id="bundles" className="w-full bg-[#EDE7DC] py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>This week&rsquo;s bundle</SectionLabel>
          <h2 className="jld-display mt-4 text-[1.6rem] sm:text-[2.4rem] text-[#191512] leading-tight">
            {BUNDLE.name}
          </h2>
          <p className="mt-3 max-w-lg text-[#5A5148] leading-relaxed">
            One tray, three dishes, fifteen pounds of food. It feeds twelve people and it takes you
            about four seconds to order.
          </p>
        </div>

        <div className={`mt-10 grid gap-8 ${wide ? 'grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start' : 'grid-cols-1'}`}>
          <div className="relative">
            <div className="relative aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden rounded-sm border-4 border-[#191512] bg-[#241E19] shadow-[8px_8px_0_0_#7B241C]">
              <img src="/photos/pulled-pork.jpg" alt="A full pan of hand-pulled pork" className="absolute inset-0 h-full w-full object-cover" />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F0C0A] via-[#0F0C0A]/80 to-transparent p-4 pt-12">
                <span className="jld-heading inline-flex items-center gap-1.5 rounded-sm bg-[#C4622D] px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#1A1310]">
                  <Icon.Camera className="w-3 h-3" />
                  Video coming
                </span>
                <p className="jld-heading mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#F3ECDE]">
                  Pulled by hand, the morning of
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border-2 border-[#191512] bg-[#F5F1E8] p-5 sm:p-7 shadow-[6px_6px_0_0_#19151220]">
            <div className="flex items-end justify-between gap-4 border-b-2 border-[#191512] pb-4">
              <div>
                <p className="jld-heading text-[0.62rem] font-bold uppercase tracking-[0.26em] text-[#7B241C]">
                  Bundle price
                </p>
                <p className="jld-display text-[1.9rem] sm:text-[2.4rem] text-[#191512] leading-none mt-1">
                  ${total}
                </p>
              </div>
              <div className="text-right">
                <p className="jld-display text-lg sm:text-xl text-[#7B241C] leading-none">
                  Feeds {feeds}
                </p>
                <p className="jld-heading mt-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#191512]">
                  ${perHead} a head
                </p>
                <p className="jld-heading text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#6B635A] mt-1">
                  {BUNDLE.totalWeight * qty} lbs total
                </p>
              </div>
            </div>

            <ul className="mt-5 flex flex-col gap-4">
              {BUNDLE.items.map(item => <li key={item.key} className="flex items-center gap-4">
                  <img src={item.src} alt={item.name} className="h-16 w-16 shrink-0 rounded-sm object-cover border-2 border-[#191512]" />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="jld-heading text-sm font-bold uppercase tracking-[0.1em] text-[#191512]">
                        {item.name}
                      </span>
                      <span className="jld-heading text-sm font-bold tracking-[0.06em] text-[#7B241C] shrink-0">
                        {qty > 1 ? `${5 * qty} lbs` : item.weight}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.8rem] leading-snug text-[#6B635A]">{item.note}</p>
                  </div>
                </li>)}
            </ul>

            <div className="mt-6 rounded-sm bg-[#E7DFCE] p-4">
              <p className="jld-heading text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#4A413A]">
                Feeding a bigger crowd?
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-sm border-2 border-[#191512] bg-[#F5F1E8]">
                  <button type="button" onClick={() => {
                  setAtCap(false);
                  setQty(q => Math.max(1, q - 1));
                }} disabled={qty <= 1} aria-label="Fewer trays" className="px-3 py-2 text-[#191512] text-lg leading-none transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191512] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C4622D]">

                    &minus;
                  </button>
                  <span className="jld-heading min-w-[3.5rem] text-center text-sm font-bold uppercase tracking-[0.08em] text-[#191512]" aria-live="polite">
                    {qty} {qty === 1 ? 'tray' : 'trays'}
                  </span>
                  <button type="button" onClick={() => {
                  if (qty >= MAX_TRAYS) {
                    setAtCap(true);
                    return;
                  }
                  setQty(q => q + 1);
                }} aria-label={qty >= MAX_TRAYS ? 'More than four trays — talk to us' : 'More trays'} className="px-3 py-2 text-[#191512] text-lg leading-none transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C4622D]">

                    +
                  </button>
                </div>
                <p className="text-[0.8rem] leading-snug text-[#6B635A]">
                  Serves {feeds} &middot; ${total}
                </p>
              </div>

              {atCap && <div className="mt-3 rounded-sm border-2 border-[#7B241C] bg-[#F6E9E3] p-3.5" role="status">
                  <p className="jld-heading text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#7B241C]">
                    More than {MAX_TRAYS * BUNDLE.feeds} people?
                  </p>
                  <p className="mt-1.5 text-[0.82rem] leading-snug text-[#3A322A]">
                    That&rsquo;s past what the bundle is built for. Dad will put together a spread
                    that actually fits your crowd — it&rsquo;s a two-minute phone call.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Btn variant="primary" size="sm" onClick={() => onBook(qty, 'custom')}>
                      Talk To Us
                    </Btn>
                    <a href={CONTACT.phoneHref} className="jld-heading inline-flex items-center gap-2 rounded-sm border-2 border-[#191512] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

                      <Icon.Phone className="h-3.5 w-3.5" />
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>}
            </div>

            <div className="mt-6">
              <Btn variant="primary" size="lg" full onClick={() => onBook(qty, 'bundle')}>
                Book This Bundle
              </Btn>
              <div className="mt-2.5">
                <Btn variant="outline" full onClick={onExpect}>
                  What To Expect With Dad&rsquo;s
                </Btn>
              </div>
              <p className="mt-3 text-center text-[0.75rem] text-[#6B635A]">
                Limited bookings each weekend. No payment now — we call you first.
              </p>
            </div>
          </div>
        </div>

        <CustomSpread onBook={() => onBook(1, 'custom')} />

        <div className="mt-10 flex justify-start">
          <AwardRibbon />
        </div>
      </div>
    </section>;
};
export const WhySection = () => {
  const {
    wide
  } = useViewport();
  return <section id="why" className="w-full bg-[#191512] py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel tone="cream">Why Just Like Dad&rsquo;s</SectionLabel>
          <h2 className="jld-display mt-4 text-[1.6rem] sm:text-[2.4rem] text-[#F3ECDE] leading-tight max-w-2xl">
            Don&rsquo;t blow your budget on big-name barbecue
          </h2>
        </div>

        <div className={`mt-10 grid gap-5 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {DIFFERENTIATORS.map((d, i) => <div key={d.title} className="group rounded-sm border border-[#3A322A] bg-[#221C18] p-6 transition-colors hover:border-[#7B241C] hover:bg-[#261F1A]">

              <span className="jld-display text-2xl text-[#7B241C] transition-colors group-hover:text-[#C4622D]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="jld-heading mt-3 text-lg font-bold uppercase tracking-[0.08em] text-[#F3ECDE]">
                {d.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-[#A99C88]">{d.body}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export const GallerySection = () => {
  const {
    wide
  } = useViewport();
  const [cat, setCat] = useState<GalleryCategory | 'All'>('All');
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const firstPaint = useRef(true);
  const shown = useMemo(() => cat === 'All' ? GALLERY : GALLERY.filter(g => g.category === cat), [cat]);
  const active = shown[Math.min(i, shown.length - 1)];
  const go = (next: number) => setI((next + shown.length) % shown.length);
  useEffect(() => {
    setI(0);
  }, [cat]);
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.querySelector<HTMLElement>(`[data-idx="${i}"]`);
    if (!strip || !el) return;
    // Scroll the strip itself, never scrollIntoView. scrollIntoView walks up
    // to the document and drags the whole page to the gallery on first paint,
    // which on a phone dumps the visitor mid-page instead of at the hero.
    const stripBox = strip.getBoundingClientRect();
    const elBox = el.getBoundingClientRect();
    const delta = elBox.left + elBox.width / 2 - (stripBox.left + stripBox.width / 2);
    if (Math.abs(delta) < 1) return;
    strip.scrollBy({
      left: delta,
      behavior: firstPaint.current ? 'auto' : 'smooth'
    });
    firstPaint.current = false;
  }, [i]);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, i, shown.length]);
  return <section id="photos" className="w-full bg-[#EDE7DC] py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="jld-display mt-4 text-[1.6rem] sm:text-[2.4rem] text-[#191512] leading-tight">
            Look at Dad&rsquo;s pictures
          </h2>
          <p className="mt-3 max-w-lg text-[#5A5148] leading-relaxed">
            All of these came off his phone at real events.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {(['All', ...GALLERY_CATEGORIES] as const).map(c => {
          const count = c === 'All' ? GALLERY.length : GALLERY.filter(g => g.category === c).length;
          return <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={`jld-heading rounded-sm border-2 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D] ${cat === c ? 'border-[#191512] bg-[#191512] text-[#F5F0E4]' : 'border-[#C9BEA8] bg-[#F5F1E8] text-[#4A413A] hover:border-[#7B241C] hover:text-[#7B241C]'}`}>

                {c}
                <span className={`ml-2 ${cat === c ? 'text-[#C4622D]' : 'text-[#A99C88]'}`}>{count}</span>
              </button>;
        })}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-sm border-2 border-[#191512] bg-[#241E19] shadow-[8px_8px_0_0_#7B241C25]">
          <button type="button" onClick={() => setZoom(true)} className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#C4622D]" aria-label={`Enlarge: ${active.caption}`}>

            <img src={active.src} alt={active.alt} className="aspect-[4/3] w-full object-cover" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#0F0C0A] via-[#0F0C0A]/70 to-transparent p-4 pt-16">
            <div>
              <span className="jld-heading block text-[0.55rem] font-bold uppercase tracking-[0.24em] text-[#C4622D]">
                {active.category}
              </span>
              <span className="jld-heading block text-base font-semibold uppercase tracking-[0.08em] leading-tight text-[#F3ECDE] sm:text-lg">
                {active.caption}
              </span>
            </div>
            <span className="jld-heading shrink-0 text-[0.62rem] font-bold tracking-[0.16em] text-[#A99C88]">
              {Math.min(i, shown.length - 1) + 1} / {shown.length}
            </span>
          </div>

          <button type="button" onClick={() => go(i - 1)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm border-2 border-[#F3ECDE]/40 bg-[#0F0C0A]/60 p-2.5 text-[#F3ECDE] backdrop-blur transition-colors hover:border-[#C4622D] hover:bg-[#7B241C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] sm:left-4 sm:p-3">

            <Icon.Left className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border-2 border-[#F3ECDE]/40 bg-[#0F0C0A]/60 p-2.5 text-[#F3ECDE] backdrop-blur transition-colors hover:border-[#C4622D] hover:bg-[#7B241C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] sm:right-4 sm:p-3">

            <Icon.Right className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div ref={stripRef} className="jld-strip mt-4 flex gap-2.5 overflow-x-auto pb-2" role="listbox" aria-label="Choose a photo">
          {shown.map((g, idx) => <button key={g.src} data-idx={idx} type="button" role="option" aria-selected={idx === i} onClick={() => setI(idx)} className={`shrink-0 overflow-hidden rounded-sm border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D] ${idx === i ? 'border-[#7B241C] opacity-100' : 'border-[#C9BEA8] opacity-60 hover:opacity-100'}`} style={{
          width: wide ? 104 : 76
        }}>

              <img src={g.src} alt={g.caption} className="aspect-square w-full object-cover" />
            </button>)}
        </div>
      </div>

      {zoom && <div role="dialog" aria-modal="true" aria-label={active.caption} onClick={() => setZoom(false)} className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0F0C0A]/92 p-4">

          <button type="button" onClick={() => setZoom(false)} aria-label="Close photo" className="absolute right-4 top-4 rounded-sm border border-[#5C5044] p-2.5 text-[#F3ECDE] transition-colors hover:bg-[#7B241C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

            <Icon.Close className="h-5 w-5" />
          </button>
          <figure onClick={e => e.stopPropagation()} className="max-h-full max-w-3xl">
            <img src={active.src} alt={active.alt} className="max-h-[75vh] w-auto rounded-sm border-2 border-[#3A322A] object-contain" />

            <figcaption className="jld-heading mt-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#A99C88]">
              {active.caption}
            </figcaption>
          </figure>
        </div>}
    </section>;
};
export const TrustSection = () => {
  const {
    wide
  } = useViewport();
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return <section id="reviews" className="w-full bg-[#7B241C] py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[#E8A87C]">
            {[0, 1, 2, 3, 4].map(s => <Icon.Star key={s} className="w-4 h-4" />)}
          </div>
          <h2 className="jld-display mt-4 text-[1.5rem] sm:text-[2.1rem] text-[#F5F0E4] leading-tight">
            Hundreds of satisfied neighbors
          </h2>
          <p className="jld-heading mt-2 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-[#EBC3A5]">
            {CONTACT.years} of tailgates, graduations &amp; church suppers
          </p>
        </div>

        <div className="mt-10 rounded-sm bg-[#F5F1E8] p-6 sm:p-9">
          <blockquote className="text-center text-lg sm:text-xl leading-relaxed text-[#191512]">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-5 flex flex-col items-center gap-1">
            <span className="jld-heading text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#7B241C]">
              {t.name}
            </span>
            <span className="text-[0.75rem] text-[#8A7C67]">{t.detail}</span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={() => setI(v => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous review" className="rounded-sm border-2 border-[#191512] p-2 text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

              <Icon.Left className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, d) => <button key={d} type="button" onClick={() => setI(d)} aria-label={`Review ${d + 1}`} aria-current={d === i} className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] ${d === i ? 'w-6 bg-[#7B241C]' : 'w-2 bg-[#C9BEA8] hover:bg-[#A99C88]'}`} />)}
            </div>
            <button type="button" onClick={() => setI(v => (v + 1) % TESTIMONIALS.length)} aria-label="Next review" className="rounded-sm border-2 border-[#191512] p-2 text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

              <Icon.Right className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className={`mt-8 text-center text-[#EBC3A5] ${wide ? 'text-base' : 'text-sm'}`}>
          Hundreds of satisfied customers across {CONTACT.area}.
        </p>
      </div>
    </section>;
};
export const Footer = () => {
  const {
    wide
  } = useViewport();
  return <footer className="w-full bg-[#191512] pt-12 pb-28 sm:pb-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className={`flex gap-9 ${wide ? 'flex-row items-start justify-between' : 'flex-col items-center text-center'}`}>
          <Logo size="md" tone="cream" />

          <div className={`flex flex-col gap-3 ${wide ? 'items-start' : 'items-center'}`}>
            <a href={CONTACT.phoneHref} className="jld-heading inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.08em] text-[#F3ECDE] transition-colors hover:text-[#E8A87C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] rounded-sm">

              <Icon.Phone className="w-4 h-4 text-[#C4622D]" />
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="jld-heading inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.08em] text-[#F3ECDE] transition-colors hover:text-[#E8A87C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] rounded-sm">

              <Icon.Mail className="w-4 h-4 text-[#C4622D]" />
              {CONTACT.email}
            </a>
            <span className="jld-heading inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.08em] text-[#A99C88]">
              <Icon.Pin className="w-4 h-4 text-[#C4622D]" />
              {CONTACT.area}
            </span>
          </div>

          <div className={`max-w-xs ${wide ? 'text-right' : 'text-center'}`}>
            <p className="text-[0.8rem] leading-relaxed text-[#8A7C67]">
              Serving {CONTACT.area} for {CONTACT.years}.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[#3A322A] pt-5 text-center">
          <p className="jld-heading text-[0.6rem] uppercase tracking-[0.24em] text-[#5C5044]">
            Just Like Dad&rsquo;s Barbecue &mdash; Catering
          </p>
        </div>
      </div>
    </footer>;
};
export const MobileCtaBar = ({
  onBook
}: {
  onBook: () => void;
}) => <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#4A0F0A] bg-[#EDE7DC]/97 backdrop-blur-sm px-4 py-3 shadow-[0_-4px_16px_#00000025]">
    <div className="mx-auto flex max-w-md items-center gap-3">
      <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`} className="shrink-0 rounded-sm border-2 border-[#7B241C] p-3 text-[#7B241C] transition-colors hover:bg-[#7B241C] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

        <Icon.Phone className="w-5 h-5" />
      </a>
      <div className="flex-1">
        <Btn variant="primary" full onClick={onBook}>
          Book With Us
        </Btn>
      </div>
    </div>
  </div>;