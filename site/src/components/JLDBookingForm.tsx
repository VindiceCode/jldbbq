'use client';
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { BUNDLE, CONTACT, MAX_TRAYS, ROTATING_WORDS } from './JLDContent';
import { Btn, Icon, SectionLabel, useViewport } from './JLDShared';
import { readSource, submitBooking } from '@/lib/submitBooking';

const CONSENT_WORDING =
  'Okay to text or email me about specials and seasonal menus. We never sell your information, and you can tell Dad to stop any time.';
export type Prefill = {
  orderType: 'bundle' | 'custom';
  qty: number;
  nonce: number;
};
type Values = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  date: string;
  orderType: 'bundle' | 'custom';
  qty: number;
  headcount: string;
  notes: string;
  consent: boolean;
};
type Errors = Partial<Record<'name' | 'phone' | 'email', string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digits = (s: string) => s.replace(/\D/g, '');
const formatPhone = (raw: string) => {
  const d = digits(raw).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};
const Label = ({
  htmlFor,
  children,
  optional
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) => <label htmlFor={htmlFor} className="jld-heading mb-1.5 flex items-baseline gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#4A413A]">
  
    {children}
    {optional && <span className="font-medium normal-case tracking-normal text-[#8A7C67]">optional</span>}
  </label>;
const fieldClass = (bad?: boolean) => `w-full rounded-sm border-2 bg-[#FBF8F1] px-3.5 py-3 text-[#191512] placeholder:text-[#A99C88] transition-colors focus:outline-none focus:border-[#7B241C] focus:ring-2 focus:ring-[#C4622D]/30 ${bad ? 'border-[#B3322A] bg-[#FBEFEC]' : 'border-[#C9BEA8]'}`;
const FieldError = ({
  id,
  msg
}: {
  id: string;
  msg?: string;
}) => msg ? <p id={id} role="alert" className="mt-1.5 text-[0.78rem] font-medium text-[#B3322A]">
      {msg}
    </p> : null;
const VCARD = ['BEGIN:VCARD', 'VERSION:3.0', 'N:;Just Like Dad’s Barbecue;;;', 'FN:Just Like Dad’s Barbecue', 'ORG:Just Like Dad’s Barbecue Catering', `TEL;TYPE=CELL,VOICE:${CONTACT.phone.replace(/\D/g, '').replace(/^/, '+1')}`, `EMAIL;TYPE=INTERNET:${CONTACT.email}`, 'ADR;TYPE=WORK:;;;Northwest Ohio;OH;;USA', 'NOTE:Barbecue catering across Northwest Ohio. Game Day Bundle — 15 lbs\\, feeds 12\\, $200.', 'END:VCARD'].join('\r\n');
const ContactActions = () => {
  const [saved, setSaved] = useState(false);
  const saveContact = () => {
    const blob = new Blob([VCARD], {
      type: 'text/vcard;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'just-like-dads-barbecue.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };
  return <>
      <p className="text-[0.85rem] leading-relaxed text-[#3A322A]">
        You can also pick up the phone and call or text any time. We&rsquo;re here for you.
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <a href={CONTACT.phoneHref} className="jld-heading inline-flex items-center justify-center gap-2 rounded-sm bg-[#7B241C] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#F5F0E4] shadow-[0_2px_0_0_#4A0F0A] transition-colors hover:bg-[#8E2A21] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D]">

          <Icon.Phone className="h-3.5 w-3.5" />
          Call {CONTACT.phone}
        </a>
        <div className="flex gap-2">
          <a href={CONTACT.smsHref} className="jld-heading inline-flex flex-1 items-center justify-center gap-2 rounded-sm border-2 border-[#191512] px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D]">

            <Icon.Message className="h-3.5 w-3.5" />
            Text
          </a>
          <button type="button" onClick={saveContact} className="jld-heading inline-flex flex-1 items-center justify-center gap-2 rounded-sm border-2 border-[#7B241C] px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7B241C] transition-colors hover:bg-[#7B241C] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C4622D]">

            {saved ? <>
                <Icon.Check className="h-3.5 w-3.5" />
                Saved
              </> : <>
                <Icon.Download className="h-3.5 w-3.5" />
                Save
              </>}
          </button>
        </div>
      </div>
      <p className="mt-2 text-[0.7rem] leading-snug text-[#8A7C67]" aria-live="polite">
        {saved ? 'Contact card downloaded — open it to add Dad to your phone.' : 'Saves Dad straight to your phone contacts.'}
      </p>
    </>;
};
const ContactBadge = ({
  floating
}: {
  floating: boolean;
}) => {
  const [open, setOpen] = useState(false);
  if (!floating) {
    return <div className="mb-5 rounded-sm border-2 border-dashed border-[#C4622D] bg-[#F6EFE2] p-4">
        <p className="jld-heading text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#7B241C]">
          Don&rsquo;t forget
        </p>
        <div className="mt-1.5">
          <ContactActions />
        </div>
      </div>;
  }
  return <div className="absolute -top-4 right-4 z-20" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>

      <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} className={`jld-heading inline-flex items-center gap-2 rounded-sm border-2 border-dashed px-3.5 py-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] shadow-[2px_2px_0_0_#7B241C25] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] ${open ? 'border-[#7B241C] bg-[#7B241C] text-[#F5F0E4]' : 'border-[#C4622D] bg-[#F6EFE2] text-[#7B241C] hover:bg-[#F0E3D3]'}`}>

        <Icon.Phone className="h-3.5 w-3.5" />
        Call or text anytime
      </button>

      {open && <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-sm border-2 border-[#191512] bg-[#F6EFE2] p-4 shadow-[4px_4px_0_0_#19151230]">
          <p className="jld-heading text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#7B241C]">
            Don&rsquo;t forget
          </p>
          <div className="mt-1.5">
            <ContactActions />
          </div>
        </div>}
    </div>;
};
export const BookingForm = ({
  prefill
}: {
  prefill: Prefill;
}) => {
  const {
    wide
  } = useViewport();
  const [v, setV] = useState<Values>({
    name: '',
    phone: '',
    email: '',
    occasion: '',
    date: '',
    orderType: 'bundle',
    qty: 1,
    headcount: '',
    notes: '',
    consent: false
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Values | null>(null);
  const [sending, setSending] = useState(false);
  const [atCap, setAtCap] = useState(false);
  const [company, setCompany] = useState('');
  const [sendError, setSendError] = useState('');
  const renderedAt = useRef<number>(Date.now());
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (prefill.nonce === 0) return;
    setV(prev => ({
      ...prev,
      orderType: prefill.orderType,
      qty: prefill.qty
    }));
  }, [prefill]);
  const set = <K extends keyof Values,>(k: K, value: Values[K]) => {
    setV(prev => ({
      ...prev,
      [k]: value
    }));
    if (k === 'name' || k === 'phone' || k === 'email') {
      setErrors(prev => ({
        ...prev,
        [k]: undefined
      }));
    }
  };
  const validate = (): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = 'We need a name to put on the order.';
    if (!v.phone.trim()) e.phone = 'A phone number is how Dad reaches you.';else if (digits(v.phone).length !== 10) e.phone = 'Enter a 10-digit phone number.';
    if (!v.email.trim()) e.email = 'An email address is required.';else if (!EMAIL_RE.test(v.email.trim())) e.email = 'That email address does not look right.';
    return e;
  };
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.getElementById(`jld-${Object.keys(e)[0]}`);
      first?.focus();
      return;
    }
    setSending(true);
    setSendError('');
    submitBooking({
      name: v.name.trim(),
      phone: v.phone.trim(),
      email: v.email.trim(),
      occasion: v.occasion,
      eventDate: v.date,
      orderType: v.orderType,
      trays: v.orderType === 'bundle' ? v.qty : 0,
      headcount: v.headcount,
      notes: v.notes.trim(),
      consent: v.consent,
      consentWording: v.consent ? CONSENT_WORDING : '',
      source: readSource(),
      company,
      elapsedMs: Date.now() - renderedAt.current
    }).then(res => {
      setSending(false);
      if (res.ok) {
        setSubmitted(v);
      } else {
        setSendError('That did not go through. Please try again, or call us — we are right here.');
      }
    }).catch(() => {
      setSending(false);
      setSendError('That did not go through. Please try again, or call us — we are right here.');
    });
  };
  const reset = () => {
    setSubmitted(null);
    setV({
      name: '',
      phone: '',
      email: '',
      occasion: '',
      date: '',
      orderType: 'bundle',
      qty: 1,
      headcount: '',
      notes: '',
      consent: false
    });
    window.setTimeout(() => nameRef.current?.focus(), 50);
  };
  const total = BUNDLE.price * v.qty;
  const feeds = BUNDLE.feeds * v.qty;
  return <section id="book" className="w-full bg-[#EDE7DC] py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-8">
        {submitted ? <div className="rounded-sm border-2 border-[#191512] bg-[#F5F1E8] p-7 sm:p-10 text-center shadow-[6px_6px_0_0_#7B241C]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7B241C] text-[#F5F0E4]">
              <Icon.Check className="h-7 w-7" />
            </div>
            <h2 className="jld-display mt-5 text-[1.5rem] sm:text-[1.9rem] leading-tight text-[#191512]">
              Thanks, {submitted.name.split(' ')[0]}.
            </h2>
            <p className="mt-3 leading-relaxed text-[#3A322A]">
              We&rsquo;ll reach out within 24 hours for a quick call about your order details.
            </p>

            <dl className="mt-6 divide-y divide-[#DFD5C1] border-y border-[#DFD5C1] text-left">
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="jld-heading text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6B635A]">
                  Order
                </dt>
                <dd className="text-right text-[0.9rem] text-[#191512]">
                  {submitted.orderType === 'bundle' ? `${BUNDLE.name} — ${submitted.qty} ${submitted.qty === 1 ? 'tray' : 'trays'} ($${BUNDLE.price * submitted.qty}, feeds ${BUNDLE.feeds * submitted.qty})` : 'Something custom — Dad will build it with you'}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="jld-heading text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6B635A]">
                  Reaching you at
                </dt>
                <dd className="text-right text-[0.9rem] text-[#191512]">
                  {submitted.phone}
                  <br />
                  <span className="text-[#6B635A]">{submitted.email}</span>
                </dd>
              </div>
              {submitted.date && <div className="flex justify-between gap-4 py-2.5">
                  <dt className="jld-heading text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6B635A]">
                    Event date
                  </dt>
                  <dd className="text-right text-[0.9rem] text-[#191512]">{submitted.date}</dd>
                </div>}
            </dl>

            <div className="mt-7 text-left">
              <ContactBadge floating={false} />
            </div>

            <div className="mt-7">
              <Btn variant="outline" size="sm" onClick={reset}>
                Submit another request
              </Btn>
            </div>
          </div> : <>
            <div className="flex flex-col items-center text-center">
              <SectionLabel>Book with us</SectionLabel>
              <h2 className="jld-display mt-4 text-[1.6rem] sm:text-[2.4rem] leading-tight text-[#191512]">
                Tell us about your event
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-[#5A5148]">
                No payment now. We&rsquo;ll call you within 24 hours to sort out the details.
              </p>
            </div>

            <div className="relative mt-9">
              <ContactBadge floating={wide} />
              <form onSubmit={onSubmit} noValidate className="rounded-sm border-2 border-[#191512] bg-[#F5F1E8] p-5 pt-7 sm:p-8 shadow-[6px_6px_0_0_#19151220]">
            
              <fieldset className="border-0 p-0 m-0">
                <legend className="jld-heading mb-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#4A413A]">
                  What are you ordering?
                </legend>
                <div className={`grid gap-3 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  <label className={`flex cursor-pointer gap-3 rounded-sm border-2 p-4 transition-colors ${v.orderType === 'bundle' ? 'border-[#7B241C] bg-[#F6E9E3]' : 'border-[#C9BEA8] bg-[#FBF8F1] hover:border-[#A99C88]'}`}>
                  
                    <input type="radio" name="orderType" value="bundle" checked={v.orderType === 'bundle'} onChange={() => set('orderType', 'bundle')} className="mt-1 h-4 w-4 shrink-0 accent-[#7B241C]" />
                  
                    <span className="min-w-0">
                      <span className="jld-heading block text-sm font-bold uppercase tracking-[0.08em] text-[#191512]">
                        {BUNDLE.name}
                      </span>
                      <span className="mt-1 block text-[0.82rem] leading-snug text-[#6B635A]">
                        ${BUNDLE.price} &middot; {BUNDLE.totalWeight} lbs &middot; feeds {BUNDLE.feeds}
                      </span>
                    </span>
                  </label>

                  <label className={`flex cursor-pointer gap-3 rounded-sm border-2 p-4 transition-colors ${v.orderType === 'custom' ? 'border-[#7B241C] bg-[#F6E9E3]' : 'border-[#C9BEA8] bg-[#FBF8F1] hover:border-[#A99C88]'}`}>
                  
                    <input type="radio" name="orderType" value="custom" checked={v.orderType === 'custom'} onChange={() => set('orderType', 'custom')} className="mt-1 h-4 w-4 shrink-0 accent-[#7B241C]" />
                  
                    <span className="min-w-0">
                      <span className="jld-heading block text-sm font-bold uppercase tracking-[0.08em] text-[#191512]">
                        Something custom
                      </span>
                      <span className="mt-1 block text-[0.82rem] leading-snug text-[#6B635A]">
                        Talk it through with the chef
                      </span>
                    </span>
                  </label>
                </div>

                {v.orderType === 'bundle' && <>
                    <div className="mt-3 flex flex-wrap items-center gap-3 rounded-sm bg-[#E7DFCE] p-3.5">
                      <span className="jld-heading text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#4A413A]">
                        How many trays?
                      </span>
                      <div className="flex items-center rounded-sm border-2 border-[#191512] bg-[#F5F1E8]">
                        <button type="button" onClick={() => {
                      setAtCap(false);
                      set('qty', Math.max(1, v.qty - 1));
                    }} disabled={v.qty <= 1} aria-label="Fewer trays" className="px-3 py-1.5 text-lg leading-none text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191512] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C4622D]">

                          &minus;
                        </button>
                        <span className="jld-heading min-w-[2.5rem] text-center text-sm font-bold text-[#191512]">{v.qty}</span>
                        <button type="button" onClick={() => {
                      if (v.qty >= MAX_TRAYS) {
                        setAtCap(true);
                        return;
                      }
                      set('qty', v.qty + 1);
                    }} aria-label={v.qty >= MAX_TRAYS ? 'More than four trays — talk to us' : 'More trays'} className="px-3 py-1.5 text-lg leading-none text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C4622D]">

                          +
                        </button>
                      </div>
                      <span className="jld-heading text-[0.8rem] font-semibold text-[#7B241C]" aria-live="polite">
                        ${total} &middot; feeds {feeds}
                      </span>
                    </div>

                    {atCap && <div className="mt-3 rounded-sm border-2 border-[#7B241C] bg-[#F6E9E3] p-3.5" role="status">
                        <p className="jld-heading text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#7B241C]">
                          More than {MAX_TRAYS * BUNDLE.feeds} people?
                        </p>
                        <p className="mt-1.5 text-[0.82rem] leading-snug text-[#3A322A]">
                          Bigger than the bundle handles. Switch to custom and Dad will build the
                          spread with you on the phone.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Btn variant="primary" size="sm" onClick={() => {
                      setAtCap(false);
                      set('orderType', 'custom');
                    }}>
                            Switch To Custom
                          </Btn>
                          <a href={CONTACT.phoneHref} className="jld-heading inline-flex items-center gap-2 rounded-sm border-2 border-[#191512] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#191512] transition-colors hover:bg-[#191512] hover:text-[#F5F0E4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D]">

                            <Icon.Phone className="h-3.5 w-3.5" />
                            {CONTACT.phone}
                          </a>
                        </div>
                      </div>}
                  </>}
              </fieldset>

              <div className="my-6 h-px bg-[#DFD5C1]" />

              <div className={`grid gap-4 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div className={wide ? 'col-span-2' : ''}>
                  <Label htmlFor="jld-name">Your name</Label>
                  <input id="jld-name" ref={nameRef} type="text" autoComplete="name" value={v.name} onChange={e => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} placeholder="Pat Sullivan" className={fieldClass(!!errors.name)} />
                
                  <FieldError id="err-name" msg={errors.name} />
                </div>

                <div>
                  <Label htmlFor="jld-phone">Phone</Label>
                  <input id="jld-phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={e => set('phone', formatPhone(e.target.value))} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} placeholder="(419) 555-0123" className={fieldClass(!!errors.phone)} />
                
                  <FieldError id="err-phone" msg={errors.phone} />
                </div>

                <div>
                  <Label htmlFor="jld-email">Email</Label>
                  <input id="jld-email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={e => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} placeholder="you@example.com" className={fieldClass(!!errors.email)} />
                
                  <FieldError id="err-email" msg={errors.email} />
                </div>

                <div>
                  <Label htmlFor="jld-occasion" optional>
                    Occasion
                  </Label>
                  <select id="jld-occasion" value={v.occasion} onChange={e => set('occasion', e.target.value)} className={fieldClass()}>
                  
                    <option value="">Choose one</option>
                    {ROTATING_WORDS.map(w => <option key={w} value={w}>
                        {w}
                      </option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="jld-date" optional>
                    Event date
                  </Label>
                  <input id="jld-date" type="date" value={v.date} onChange={e => set('date', e.target.value)} className={fieldClass()} />
                
                </div>

                <div className={wide ? 'col-span-2' : ''}>
                  <Label htmlFor="jld-headcount" optional>
                    How many people
                  </Label>
                  <input id="jld-headcount" type="number" min={1} inputMode="numeric" value={v.headcount} onChange={e => set('headcount', e.target.value)} placeholder="12" className={fieldClass()} />
                
                </div>

                <div className={wide ? 'col-span-2' : ''}>
                  <Label htmlFor="jld-notes" optional>
                    Anything else
                  </Label>
                  <textarea id="jld-notes" rows={3} value={v.notes} onChange={e => set('notes', e.target.value)} placeholder="Drop-off time, allergies, where to park the trailer…" className={`${fieldClass()} resize-y`} />
                
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer gap-3 rounded-sm bg-[#E7DFCE] p-4">
                <input type="checkbox" checked={v.consent} onChange={e => set('consent', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#7B241C]" />
              
                <span className="text-[0.85rem] leading-relaxed text-[#3A322A]">
                  Okay to text or email me about specials and seasonal menus. We never sell your
                  information, and you can tell Dad to stop any time.
                </span>
              </label>

              <div className="jld-hp" aria-hidden="true">
                <label htmlFor="jld-company">Company</label>
                <input id="jld-company" type="text" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={e => setCompany(e.target.value)} />
              </div>

              {sendError && <p role="alert" className="mt-5 rounded-sm border-2 border-[#B3322A] bg-[#FBEFEC] p-3.5 text-[0.85rem] font-medium text-[#B3322A]">
                  {sendError}
                </p>}

              <div className="mt-6">
                <Btn variant="primary" size="lg" full type="submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Request My Booking'}
                </Btn>
                <p className="mt-3 text-center text-[0.78rem] text-[#6B635A]">
                  Limited bookings each weekend — the sooner you send this, the better your odds.
                </p>
              </div>

              </form>
            </div>
          </>}
      </div>
    </section>;
};