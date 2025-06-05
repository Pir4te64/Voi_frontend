import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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

      {/* Content */}
      <div className="rounded-lg bg-back p-6">
        <p className="text-white">Contenido de Lotes por Evento</p>
      </div>
    </div>
  );
};

export default LotesPorEvento;
