'use client';

import React, { useRef, useState } from 'react';
import { BookingForm, type Prefill } from './JLDBookingForm';
import { HowItWorks } from './JLDHowItWorks';
import {
  BundleSection,
  Footer,
  GallerySection,
  Hero,
  MobileCtaBar,
  OfferBanner,
  TopNav,
  TrustSection,
  WhySection,
} from './JLDSections';
import { ViewportProvider, useElementWidth, useScrollToSection } from './JLDShared';

const WIDE_AT = 860;

export const JLDLanding = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(frameRef);
  const wide = width >= WIDE_AT;
  const scrollTo = useScrollToSection();

  const [prefill, setPrefill] = useState<Prefill>({
    orderType: 'bundle',
    qty: 1,
    nonce: 0,
  });

  const bookBundle = (qty: number, orderType: 'bundle' | 'custom' = 'bundle') => {
    setPrefill((p) => ({ orderType, qty, nonce: p.nonce + 1 }));
    scrollTo('book');
  };

  const book = () => scrollTo('book');

  return (
    <div className="jld-root flex min-h-screen w-full flex-col items-center bg-[#EDE7DC]">
      <div ref={frameRef} className="w-full max-w-[1440px] bg-[#EDE7DC]">
        <ViewportProvider value={{ width, wide, mode: wide ? 'desktop' : 'mobile' }}>
          <TopNav />
          <Hero
            onViewBundles={() => scrollTo('bundles')}
            onBook={book}
            onExpect={() => scrollTo('how')}
          />
          <OfferBanner />
          <BundleSection onBook={bookBundle} onExpect={() => scrollTo('how')} />
          <WhySection />
          <HowItWorks
            onBookBundle={() => bookBundle(1, 'bundle')}
            onBookCustom={() => bookBundle(1, 'custom')}
          />
          <GallerySection />
          <TrustSection />
          <BookingForm prefill={prefill} />
          <Footer />
          {!wide && <MobileCtaBar onBook={book} />}
        </ViewportProvider>
      </div>
    </div>
  );
};
