import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import PainPoints from '../components/landing/PainPoints';
import Features from '../components/landing/Features';
import UseCases from '../components/landing/UseCases';
import Advantages from '../components/landing/Advantages';
import CTASection from '../components/landing/CTASection';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PainPoints />
      <Features />
      <UseCases />
      <Advantages />
      <CTASection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
