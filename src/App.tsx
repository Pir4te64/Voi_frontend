// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import Home from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/Login";
import RegisterPage from "@/pages/Register/Register";
import FaqPage from "@/pages/Faq/Faq";
import QuienesSomosPage from "@/pages/QuienesSomos/QuienesSomos";
import EventosPage from "@/pages/Eventos/Eventos";
import DetallesPage from "@/pages/Eventos/Detalles";
import GraciasProductoraPage from "@/pages/GraciasProductora";
import ErrorNotFound from "@/pages/404";

import DashboardLayout from "@/pages/Dashboard/DashboardLayout";
import Index from "@/pages/Dashboard/Index";
import CrearPerfil from "@/components/Dashboard/CrearPerfil/CrearPerfil";
import Miperfil from "@/components/Dashboard/Sidebar/MiPerfil/Miperfil";
import CrearEventos from "@/components/Dashboard/GestionEventos/ListarYCrearEventos";
import ModificarEventos from "@/components/Dashboard/GestionEventos/ModificarEventos";
import EditarEventoPage from "@/components/Dashboard/GestionEventos/EditarEvento/EditarEventoPage";
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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/sobre-voi" element={<QuienesSomosPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/eventos/:id" element={<DetallesPage />} />
        <Route path="/gracias-productora" element={<GraciasProductoraPage />} />
        <Route path="*" element={<ErrorNotFound />} />

        {/* Rutas protegidas de Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Index />} />
          <Route path="crearperfil" element={<CrearPerfil />} />
          <Route path="miperfil" element={<Miperfil />} />
          <Route path="crearevento" element={<CrearEventos />} />
          <Route path="editarevento/:id" element={<EditarEventoPage />} />
          <Route path="modificarevento" element={<ModificarEventos />} />
          <Route path="misventas" element={<MisVentas />} />
          <Route path="misventas/web" element={<Web />} />
          <Route path="misventas/revendedores" element={<Revendedores />} />
          <Route path="misventas/lote" element={<Lote />} />
          <Route path="revendedores" element={<RevendedoresR />} />
          <Route
            path="revendedores/eventos"
            element={<RevenededoresEventos />}
          />
          <Route
            path="revendedores/agregar-revendedores"
            element={<AgregarRevendedor />}
          />
          <Route
            path="revendedores/perfiles"
            element={<RevendedorPerfiles />}
          />
          <Route path="revendedores/lotes" element={<RevendedoresLotes />} />
          <Route
            path="revendedores/agregar-comision-por-lotes"
            element={<AgregarComision />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
