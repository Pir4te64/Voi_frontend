import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import LoteCard from "./LoteCard";
import { Lote } from "./types/evento.types";

interface EventoInfoGridProps {
    lotes: Lote[];
    loteIndex: number;
    setLoteIndex: (idx: number) => void;
    dia: string;
    mes: string;
    anio: number;
    hora: string;
    fechaFinHora: string;
    addressStreet?: string;
    addressCity?: string;
    addressState?: string;
}

const EventoInfoGrid: React.FC<EventoInfoGridProps> = ({
    lotes,
    loteIndex,
    setLoteIndex,
    dia,
    mes,
    anio,
    hora,
    fechaFinHora,
    addressStreet,
    addressCity,
    addressState
}) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Lotes */}
            <LoteCard lotes={lotes} loteIndex={loteIndex} setLoteIndex={setLoteIndex} />
            {/* Fecha */}
            <div className="flex min-h-[90px] flex-col gap-2 rounded-lg bg-[#232326] p-4">
                <div className="mb-1 flex items-center gap-2">
                    <FaCalendarAlt className="text-lg text-secondary" />
                    <span className="text-base font-semibold text-white">Fecha</span>
                </div>
                <span className="text-base font-bold text-white">{dia} - {mes} {anio}</span>
                <span className="text-xs text-white/80">{hora} hs a {fechaFinHora} hs</span>
            </div>
            {/* Locación */}
            <div className="flex min-h-[90px] flex-col gap-2 rounded-lg bg-[#232326] p-4">
                <div className="mb-1 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-lg text-secondary" />
                    <span className="text-base font-semibold text-white">Locación</span>
                </div>
                <span className="text-base font-bold text-white">{addressStreet}</span>
                <span className="text-xs text-white/80">{addressCity} {addressState ? `- ${addressState}` : ""}</span>
            </div>
        </div>
    );
};

export default EventoInfoGrid; 