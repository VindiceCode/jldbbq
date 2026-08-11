'use client';
import React, { useState, type ReactNode } from 'react';
import { BUNDLE, BUNDLE_INCLUDES, BUNDLE_STEPS, CONTACT, DELIVERY, PARTY_STEPS, SEASON_NOTE, SERVICE_LEVELS } from './JLDContent';
import { Btn, Icon, SectionLabel, useViewport } from './JLDShared';
type Step = {
  title: string;
  body: string;
};
const Timeline = ({
  steps,
  tone,
  aligned
}: {
  steps: Step[];
  tone: 'brick' | 'ember';
  aligned: boolean;
}) => {
  const node = tone === 'brick' ? 'bg-[#7B241C] text-[#F5F0E4]' : 'bg-[#C4622D] text-[#1A1310]';
  return <ol className={aligned ? 'grid' : 'flex flex-col gap-6'} style={aligned ? {
    gridTemplateRows: 'subgrid',
    gridRow: 'span 3 / span 3'
  } : undefined}>
      {steps.map((s, i) => <li key={s.title} className="relative pl-14">
          {i < steps.length - 1 && <span className="absolute -bottom-6 left-[19px] top-11 w-[2px] bg-[#C9BEA8]" aria-hidden="true" />}

          <span className={`jld-display absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#191512] text-base leading-none ${node}`}>
            {i + 1}
          </span>
          <h4 className="jld-heading pt-2 text-base font-bold uppercase tracking-[0.06em] text-[#191512]">
            {s.title}
          </h4>
          <p className="mt-1.5 leading-relaxed text-[#5A5148]">{s.body}</p>
        </li>)}
    </ol>;
};
const DeliveryMap = () => <div className="flex items-center gap-4">
    <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0" role="img" aria-label={`Free delivery within ${DELIVERY.radius} miles of ${DELIVERY.base}`}>
      <circle cx="60" cy="60" r="56" fill="none" stroke="#C9BEA8" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="40" fill="#7B241C" fillOpacity="0.12" stroke="#7B241C" strokeWidth="2" />
      <circle cx="60" cy="60" r="5" fill="#7B241C" />
      <path d="M60 55 L60 44" stroke="#7B241C" strokeWidth="2" strokeLinecap="round" />
      <text x="60" y="34" textAnchor="middle" fill="#7B241C" fontSize="9" fontWeight="700" letterSpacing="1">
        {DELIVERY.radius} MI
      </text>
      <text x="60" y="112" textAnchor="middle" fill="#8A7C67" fontSize="7" letterSpacing="1">
        FARTHER? ASK.
      </text>
    </svg>
    <div className="min-w-0">
      <p className="jld-heading text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#7B241C]">
        Delivery
      </p>
      <p className="mt-1.5 text-[0.85rem] leading-relaxed text-[#4A413A]">
        Anything within{' '}
        <strong className="text-[#191512]">
          {DELIVERY.radius} miles of {DELIVERY.base}
        </strong>{' '}
        delivers at no extra charge. Farther out, Dad quotes a fee based on distance and order size
        — or you meet him partway. Either way it gets settled on the phone in about a minute.
      </p>
    </div>
  </div>;
const TrackCard = ({
  aligned,
  badge,
  badgeClass,
  title,
  sub,
  icon,
  steps,
  tone,
  extras,
  cta
}: {
  aligned: boolean;
  badge: string;
  badgeClass: string;
  title: ReactNode;
  sub: string;
  icon: ReactNode;
  steps: Step[];
  tone: 'brick' | 'ember';
  extras: ReactNode;
  cta: ReactNode;
}) => <div className={`rounded-sm border-2 border-[#191512] bg-[#F5F1E8] p-5 sm:p-7 shadow-[6px_6px_0_0_#19151220] ${aligned ? 'grid gap-6' : 'flex flex-col gap-6'}`} style={aligned ? {
  gridTemplateRows: 'subgrid',
  gridRow: 'span 6 / span 6'
} : undefined}>

    <div className="flex items-start justify-between gap-3">
      <div>
        <span className={`jld-heading inline-block rounded-sm px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] ${badgeClass}`}>
          {badge}
        </span>
        <h3 className="jld-display mt-3 text-[1.3rem] sm:text-[1.7rem] leading-tight text-[#191512]">
          {title}
        </h3>
        <p className="mt-1.5 text-[0.9rem] text-[#6B635A]">{sub}</p>
      </div>
      {icon}
    </div>

    <Timeline steps={steps} tone={tone} aligned={aligned} />

    <div>{extras}</div>

    <div className="self-end">{cta}</div>
  </div>;
export const HowItWorks = ({
  onBookBundle,
  onBookCustom
}: {
  onBookBundle: () => void;
  onBookCustom: () => void;
}) => {
  const {
    wide
  } = useViewport();
  const [level, setLevel] = useState(SERVICE_LEVELS[1].key);
  const active = SERVICE_LEVELS.find(l => l.key === level) ?? SERVICE_LEVELS[1];
  const bundleExtras = <>
      <div className="rounded-sm bg-[#E7DFCE] p-4">
        <p className="jld-heading text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#4A413A]">
          What actually shows up
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {BUNDLE_INCLUDES.map(x => <li key={x} className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-[#3A322A]">
              <Icon.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7B241C]" />
              {x}
            </li>)}
        </ul>
      </div>
      <div className="mt-4 border-t border-[#DFD5C1] pt-4">
        <DeliveryMap />
      </div>
    </>;
  const partyExtras = <>
      <div className="rounded-sm bg-[#E7DFCE] p-4">
        <p className="jld-heading text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#4A413A]">
          Pick your service level
        </p>
        <div className="mt-3 flex gap-1.5 rounded-sm border-2 border-[#191512] bg-[#F5F1E8] p-1">
          {SERVICE_LEVELS.map(l => <button key={l.key} type="button" onClick={() => setLevel(l.key)} aria-pressed={level === l.key} className={`jld-heading flex-1 rounded-sm px-2 py-2 text-[0.6rem] font-bold uppercase leading-tight tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C4622D] ${level === l.key ? 'bg-[#7B241C] text-[#F5F0E4]' : 'text-[#4A413A] hover:bg-[#E7DFCE]'}`}>

              {l.name}
            </button>)}
        </div>
        <div className="mt-3" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <span className="jld-heading text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7B241C]">
              {active.tag}
            </span>
            <span className="jld-heading text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#8A7C67]">
              {active.note}
            </span>
          </div>
          <p className="mt-1.5 text-[0.85rem] leading-relaxed text-[#3A322A]">{active.body}</p>
        </div>
      </div>
      <div className="mt-4 rounded-sm border-l-4 border-[#C4622D] bg-[#F6EFE2] p-3.5">
        <p className="jld-heading text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#7B241C]">
          Book early
        </p>
        <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[#3A322A]">{SEASON_NOTE}</p>
      </div>
    </>;
  return <section id="how" className="w-full bg-[#EDE7DC] py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="jld-display mt-4 text-[1.6rem] sm:text-[2.4rem] leading-tight text-[#191512]">
            Two ways to eat
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[#5A5148]">
            Grab the bundle and be done in a minute, or get Dad on the phone and build the whole
            thing. Either way you know the price before you commit and a real person calls you back.
          </p>
        </div>

        <div className={`mt-10 ${wide ? 'grid grid-cols-2 gap-6' : 'flex flex-col gap-6'}`} style={wide ? {
        gridTemplateRows: 'repeat(6, auto)'
      } : undefined}>

          <TrackCard aligned={wide} badge="Option one" badgeClass="bg-[#7B241C] text-[#F5F0E4]" title="Order the bundle" sub={`$${BUNDLE.price} · feeds ${BUNDLE.feeds} · three minutes of your day`} icon={<Icon.Box className="hidden h-9 w-9 shrink-0 text-[#C4622D] sm:block" />} steps={BUNDLE_STEPS} tone="brick" extras={bundleExtras} cta={<Btn variant="primary" size="lg" full onClick={onBookBundle}>
                Order The Bundle
              </Btn>} />


          <TrackCard aligned={wide} badge="Option two" badgeClass="bg-[#C4622D] text-[#1A1310]" title={<>What&rsquo;s it like to party with Dad?</>} sub="Catered your way, at your budget, on your date" icon={<Icon.Flame className="hidden h-9 w-9 shrink-0 text-[#C4622D] sm:block" />} steps={PARTY_STEPS} tone="ember" extras={partyExtras} cta={<div className="flex flex-col gap-2">
                <Btn variant="primary" size="lg" full onClick={onBookCustom}>
                  Plan My Event
                </Btn>
                <a href={CONTACT.phoneHref} className="jld-heading inline-flex items-center justify-center gap-2 rounded-sm border-2 border-[#191512] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D]">

                  <Icon.Phone className="h-4 w-4" />
                  Call {CONTACT.phone}
                </a>
              </div>} />

        </div>

        <p className="mt-8 text-center text-[0.85rem] leading-relaxed text-[#6B635A]">
          No deposit taken on this website, ever. Dad tells you the number on the phone before
          anything is owed.
        </p>
      </div>
    </section>;
};