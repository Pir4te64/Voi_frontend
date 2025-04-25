// src/pages/Home.tsx
import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeroEvents from '@/components/heroEvents/HeroEvents';
import Eventos from '@/components/Eventos/Eventos';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroEvents />
      <Eventos />
    </>
  );
};

export default Home;
