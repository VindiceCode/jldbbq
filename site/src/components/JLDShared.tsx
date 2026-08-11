'use client';
import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode, type RefObject } from 'react';
export type ViewMode = 'mobile' | 'desktop';
type ViewportValue = {
  width: number;
  wide: boolean;
  mode: ViewMode;
};
const ViewportContext = createContext<ViewportValue>({
  width: 390,
  wide: false,
  mode: 'mobile'
});
export const ViewportProvider = ({
  value,
  children
}: {
  value: ViewportValue;
  children: ReactNode;
}) => <ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>;
export const useViewport = () => useContext(ViewportContext);
export function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [width, setWidth] = useState(390);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
export function useScrollToSection() {
  return useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start'
    });
  }, []);
}
export const Icon = {
  Phone: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>,
  Mail: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>,
  Pin: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>,
  Check: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>,
  Close: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={p.className} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>,
  Menu: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={p.className} aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>,
  Left: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>,
  Right: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>,
  Down: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>,
  Star: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden="true">
      <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8Z" />
    </svg>,
  Camera: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="M3 8a2 2 0 0 1 2-2h2.5l1.2-2h6.6l1.2 2H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>,
  Flame: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden="true">
      <path d="M12 2c.6 3.2-1.3 4.6-2.7 6C7.6 9.6 6 11.2 6 14a6 6 0 0 0 12 0c0-2.3-1-3.9-2.2-5.4-.6 1-1.3 1.6-2.1 1.9.7-2.6-.2-5.7-1.7-8.5Z" />
    </svg>,
  Message: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.1 9.1 0 0 1-3.7-.8L3 21l1.9-5.2A8.2 8.2 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />
    </svg>,
  Box: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5Z" />
      <path d="m3 8.5 9 4.5 9-4.5M12 13v7" />
    </svg>,
  Download: (p: {
    className?: string;
  }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={p.className} aria-hidden="true">
      <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
};
export const Logo = ({
  size = 'md',
  tone = 'ink'
}: {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'ink' | 'cream';
}) => {
  const script = size === 'lg' ? 'text-xl sm:text-2xl' : size === 'md' ? 'text-base' : 'text-[0.8rem]';
  const dads = size === 'lg' ? 'text-[2.9rem] sm:text-[3.9rem]' : size === 'md' ? 'text-2xl' : 'text-lg';
  const bbq = size === 'lg' ? 'text-base sm:text-lg' : size === 'md' ? 'text-[0.65rem]' : 'text-[0.5rem]';
  const primary = tone === 'cream' ? 'text-[#F3ECDE]' : 'text-[#191512]';
  const accent = tone === 'cream' ? 'text-[#E8A87C]' : 'text-[#7B241C]';
  return <div className="flex flex-col items-center leading-none">
      <span className={`jld-script ${script} ${primary} -mb-1 rotate-[-3deg]`}>Just Like</span>
      <span className={`jld-display ${dads} ${primary} tracking-tight`}>DAD&rsquo;S</span>
      <span className={`jld-heading ${bbq} ${accent} font-bold tracking-[0.28em] mt-0.5`}>BARBECUE</span>
      {size === 'lg' && <span className={`jld-heading text-[0.65rem] ${tone === 'cream' ? 'text-[#C8BCA6]' : 'text-[#6B635A]'} tracking-[0.35em] mt-1.5`}>
          — CATERING —
        </span>}
    </div>;
};
export const Btn = ({
  children,
  onClick,
  variant = 'primary',
  full = false,
  type = 'button',
  disabled = false,
  size = 'md'
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'cream' | 'ghost';
  full?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const base = 'jld-heading inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.12em] rounded-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D] disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-px';
  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4'
  }[size];
  const variants = {
    primary: 'bg-[#7B241C] text-[#F5F0E4] shadow-[0_2px_0_0_#4A0F0A] hover:bg-[#8E2A21] hover:shadow-[0_3px_0_0_#4A0F0A] hover:-translate-y-px',
    outline: 'border-2 border-[#191512] text-[#191512] hover:bg-[#191512] hover:text-[#F5F0E4]',
    cream: 'bg-[#F3ECDE] text-[#191512] shadow-[0_2px_0_0_#00000040] hover:bg-white hover:-translate-y-px',
    ghost: 'text-[#7B241C] hover:text-[#4A0F0A] underline underline-offset-4 decoration-[#C4622D]'
  }[variant];
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes} ${variants} ${full ? 'w-full' : ''}`}>
      
      {children}
    </button>;
};
export const SectionLabel = ({
  children,
  tone = 'ink'
}: {
  children: ReactNode;
  tone?: 'ink' | 'cream';
}) => <div className="flex items-center gap-3">
    <span className={`h-px w-8 ${tone === 'cream' ? 'bg-[#C4622D]' : 'bg-[#7B241C]'}`} />
    <span className={`jld-heading text-[0.68rem] font-bold uppercase tracking-[0.32em] ${tone === 'cream' ? 'text-[#E8A87C]' : 'text-[#7B241C]'}`}>
    
      {children}
    </span>
  </div>;
export const SauceDivider = ({
  flip = false
}: {
  flip?: boolean;
}) => <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="w-full h-6 sm:h-8 block">
      <path fill="#4A0F0A" d="M0 0h1200v14c-38 0-38 10-76 10s-38-8-76-8-38 12-76 12-38-6-76-6-38 9-76 9-38-11-76-11-38 7-76 7-38-10-76-10-38 12-76 12-38-8-76-8-38 6-76 6-38-9-76-9-38 11-76 11-38-7-76-7Z" />
    
      <circle fill="#4A0F0A" cx="180" cy="38" r="4" />
      <circle fill="#4A0F0A" cx="520" cy="42" r="3" />
      <circle fill="#4A0F0A" cx="860" cy="39" r="4.5" />
      <circle fill="#4A0F0A" cx="1060" cy="43" r="2.5" />
    </svg>
  </div>;
export const PendingTile = ({
  label,
  className = ''
}: {
  label: string;
  className?: string;
}) => <div className={`flex flex-col items-center justify-center gap-2 bg-[#E3DACA] border-2 border-dashed border-[#B9A98F] text-[#8A7C67] p-4 text-center ${className}`}>
  
    <Icon.Camera className="w-6 h-6" />
    <span className="jld-heading text-[0.6rem] font-semibold uppercase tracking-[0.2em] leading-snug">
      {label}
    </span>
  </div>;