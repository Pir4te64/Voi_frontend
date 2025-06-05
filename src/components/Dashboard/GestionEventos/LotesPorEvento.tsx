import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TicketLotsForm from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";

const LotesPorEvento: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-white hover:text-secondary"
        >
          <FaArrowLeft className="mr-2" />
          Volver
        </button>
        <h1 className="text-3xl font-bold text-white">Lotes por Evento</h1>
      </div>

      <div className="rounded-lg bg-primary p-6 text-white">
        {/* ---------- Contenido ---------- */}
        <div className="grid grid-cols-1 gap-6">
          <TicketLotsForm />
        </div>
      </div>
    </div>
  );
};

export default LotesPorEvento;
