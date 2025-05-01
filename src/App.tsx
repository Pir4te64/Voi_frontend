// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/Login";
import RegisterPage from "@/pages/Register/Register";
import FaqPage from "@/pages/Faq/Faq";
import QuienesSomosPage from "@/pages/QuienesSomos/QuienesSomos";

import DashboardLayout from "@/pages/Dashboard/DashboardLayout";
import Index from "@/pages/Dashboard/Index";
import CrearPerfil from "@/components/Dashboard/CrearPerfil/CrearPerfil";
import Miperfil from "@/components/Dashboard/Sidebar/MiPerfil/Miperfil";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/sobre-voi" element={<QuienesSomosPage />} />

      {/* Dashboard con layout y rutas hijas */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Ruta index: carga <Index /> al visitar /dashboard */}
        <Route index element={<Index />} />
        <Route path="crearperfil" element={<CrearPerfil />} />
        <Route path="miperfil" element={<Miperfil />} />
      </Route>
    </Routes>
  );
}

export default App;
