// src/pages/Home.tsx
import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeroEvents from '@/components/heroEvents/HeroEvents';
import Eventos from '@/components/Eventos/Eventos';
import Footer from '@/components/Footer/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroEvents />
      <Eventos />
      <Footer />
    </>
  );
};

export default Home;
