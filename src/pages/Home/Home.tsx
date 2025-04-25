// src/pages/Home.tsx
import React from 'react';
import HeroEvents from '@/components/heroEvents/HeroEvents';
import Eventos from '@/components/Eventos/Eventos';
import Layout from '@/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <HeroEvents />
      <Eventos />
    </Layout>
  );
};

export default Home;
