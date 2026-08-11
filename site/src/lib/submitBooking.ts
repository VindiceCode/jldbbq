export type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  eventDate: string;
  orderType: 'bundle' | 'custom';
  trays: number;
  headcount: string;
  notes: string;
  consent: boolean;
  consentWording: string;
  source: string;
  /** Honeypot. Real people leave this empty. */
  company: string;
  /** Milliseconds between form render and submit. */
  elapsedMs: number;
};

export type BookingResult = { ok: boolean };

const SCRIPT_URL = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL ?? '';
const BACKEND = process.env.NEXT_PUBLIC_BOOKING_BACKEND ?? 'script';

/**
 * The only place that knows where bookings go. Swapping to a Vercel route
 * later is a change to this file and nothing else.
 */
export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  if (BACKEND === 'api') {
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  }

  if (!SCRIPT_URL) {
    // No endpoint configured yet — don't pretend it worked.
    throw new Error('NEXT_PUBLIC_BOOKING_SCRIPT_URL is not set');
  }

  // text/plain keeps this a "simple request" so the browser skips the CORS
  // preflight, which Apps Script cannot answer. Never use mode:'no-cors' here:
  // the response would be opaque and we could not tell success from failure.
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });

  if (!res.ok) return { ok: false };
  const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  return { ok: data?.ok !== false };
}

export function readSource(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('s') ?? 'direct';
}
