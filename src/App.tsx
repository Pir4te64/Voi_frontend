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
import CrearEventos from "@/components/Dashboard/GestionEventos/CrearEventos";
import ModificarEventos from "@/components/Dashboard/GestionEventos/ModificarEventos";
import GestionarLotes from "@/components/Dashboard/GestionEventos/GestionarLotes";
import { MisVentas } from "@/components/Dashboard/Misventas/MisVentas";
import Web from "@/components/Dashboard/Misventas/Web";
import Revendedores from "@/components/Dashboard/Misventas/Revendedores";
import Lote from "@/components/Dashboard/Misventas/Lote";
import RevendedoresR from "@/components/Dashboard/Revendedores/RevendedoresR";
import RevenededoresEventos from "@/components/Dashboard/Revendedores/RevenededoresEventos";
import AgregarRevendedor from "@/components/Dashboard/Revendedores/AgregarRevendedor";
import RevendedorPerfiles from "@/components/Dashboard/Revendedores/RevendedorPerfiles";
import RevendedoresLotes from "@/components/Dashboard/Revendedores/RevendedoresLotes";
import AgregarComision from "@/components/Dashboard/Revendedores/AgregarComision";
import ErrorNotFound from "@/pages/404";
import EventosPage from "./pages/Eventos/Eventos";
import DetallesPage from "./pages/Eventos/Detalles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/sobre-voi" element={<QuienesSomosPage />} />
      <Route path="/eventos" element={<EventosPage />} />
      <Route path="/eventos/:id" element={<DetallesPage />} />
      <Route path="*" element={<ErrorNotFound />} />
      {/* Dashboard con layout y rutas hijas */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Ruta index: carga <Index /> al visitar /dashboard */}
        <Route index element={<Index />} />
        <Route path="crearperfil" element={<CrearPerfil />} />
        <Route path="miperfil" element={<Miperfil />} />
        <Route path="crearevento" element={<CrearEventos />} />
        <Route path="modificarevento" element={<ModificarEventos />} />
        <Route path="gestionarlotes" element={<GestionarLotes />} />
        <Route path="misventas" element={<MisVentas />} />
        <Route path="misventas/web" element={<Web />} />
        <Route path="misventas/revendedores" element={<Revendedores />} />
        <Route path="misventas/lote" element={<Lote />} />
        <Route path="revendedores" element={<RevendedoresR />} />
        <Route path="revendedores/eventos" element={<RevenededoresEventos />} />
        <Route path="revendedores/agregar-revendedores" element={<AgregarRevendedor />} />
        <Route path="revendedores/perfiles" element={<RevendedorPerfiles />} />
        <Route path="revendedores/lotes" element={<RevendedoresLotes />} />
        <Route path="revendedores/agregar-comision-por-lotes" element={<AgregarComision />} />
      </Route>
    </Routes>
  );
}

export default App;
