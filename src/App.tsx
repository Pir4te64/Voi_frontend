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
import RecuperarPassword from '@/components/LoginUser/RecuperarPassword'
import CompraRealizada from '@/pages/CompraRealizada/CompraRealizada';

import DashboardLayout from "@/pages/Dashboard/DashboardLayout";
import Index from "@/pages/Dashboard/Index";
import CrearPerfil from "@/components/Dashboard/CrearPerfil/CrearPerfil";
import Miperfil from "@/components/Dashboard/Sidebar/MiPerfil/Miperfil";
import EditarEventoPage from "@/components/Dashboard/GestionEventos/EditarEvento/EditarEventoPage";
import GestionLotes from "@/components/Dashboard/GestionLotes/GestionLotes";
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
import ListarEventos from "@/components/Dashboard/GestionEventos/ListaEventos/ListarEventos";
import CrearEvento from "@/components/Dashboard/GestionEventos/CrearEventos/CrearEvento";
import ListarEventosParaEditar from "@/components/Dashboard/GestionEventos/EditarEvento/ListarEventosParaEditar";
import SolicitudAlta from "@/components/Dashboard/Admin/SolicitudAlta/SolicitudAlta";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/sobre-voi" element={<QuienesSomosPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/eventos/:id" element={<DetallesPage />} />
        <Route path="/gracias-productora" element={<GraciasProductoraPage />} />
        <Route path="/compra-realizada" element={<CompraRealizada />} />
        <Route path="*" element={<ErrorNotFound />} />

        {/* Rutas protegidas de Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Index />} />
          <Route path="crearperfil" element={<CrearPerfil />} />
          <Route path="miperfil" element={<Miperfil />} />
          <Route path="eventos" element={<ListarEventos />} />
          <Route path="crearevento" element={<CrearEvento />} />
          <Route path="editareventos" element={<ListarEventosParaEditar />} />
          <Route path="editarevento/:id" element={<EditarEventoPage />} />
          <Route path="lotes" element={<GestionLotes />} />
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
          <Route path="productoras" element={<SolicitudAlta />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
