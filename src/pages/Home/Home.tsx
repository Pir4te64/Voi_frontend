// src/pages/Home.tsx
import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import HeroEvents from '@/components/heroEvents/HeroEvents';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <HeroEvents />
    </>
  );
};

export default Home;
