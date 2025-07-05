// src/pages/Home.tsx
import React from 'react';
import HeroEvents from '@/components/heroEvents/HeroEvents';
import Eventos from '@/components/Eventos/Eventos';
import Layout from '@/Layout';
import { usePageTitle } from '@/context/usePageTitle';

const Home: React.FC = () => {
  usePageTitle('Inicio');

  return (
    <Layout>
      <HeroEvents />
      <Eventos />
    </Layout>
  );
};

export default Home;
