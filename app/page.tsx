'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <CustomCursor />
      <div className="noise-overlay"></div>
      <Navigation />
      <div className="page-transition"></div>

      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Gallery />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
