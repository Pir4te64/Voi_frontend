import React from "react";
import { MdEventSeat } from "react-icons/md";

interface Lote {
    id: number;
    nombre: string;
    porcentajeComision: number;
    montoComision: number;
    precio: number;
    cantidadTickets: number;
    ticketsDisponibles: number;
    ticketsVendidos: number;
    estado: string;
}

interface LoteCardProps {
    lotes: Lote[];
    loteIndex: number;
    setLoteIndex: (idx: number) => void;
}

const LoteCard: React.FC<LoteCardProps> = ({ lotes, loteIndex, setLoteIndex }) => {
    const handleLoteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newIndex = Number(e.target.value);
        setLoteIndex(newIndex);
    };

    return (
        <div className="flex min-h-[90px] flex-col gap-2 rounded-lg bg-[#232326] p-4">
            <div className="mb-1 flex items-center gap-2">
                <MdEventSeat className="text-lg text-secondary" />
                <span className="text-base font-semibold text-white">Lotes</span>
            </div>
            {lotes.length > 1 ? (
                <select
                    className="appearance-none rounded border border-gray-700 bg-[#18181b] px-3 py-2 text-sm text-white focus:outline-none"
                    value={loteIndex}
                    onChange={handleLoteChange}
                >
                    <option disabled>Ej: Early Bird</option>
                    {lotes.map((lote, idx) => (
                        <option key={lote.id} value={idx}>{lote.nombre}</option>
                    ))}
                </select>
            ) : (
                <div className="rounded border border-gray-700 bg-[#18181b] px-3 py-2 text-sm text-white">{lotes[0]?.nombre || "Ej: Early Bird"}</div>
            )}
            {lotes.length > 0 && (
                <>
                    <span className="text-xs text-gray-400">Precio: <span className="font-bold text-white">${lotes[loteIndex].precio}</span></span>
                    <span className="text-xs text-gray-400">Cantidad: <span className="font-bold text-white">{lotes[loteIndex].cantidadTickets}</span></span>
                    <span className="text-xs text-gray-400">Vendidos: <span className="font-bold text-white">{lotes[loteIndex].ticketsVendidos}</span></span>
                    <span className="text-xs text-gray-400">Disponibles: <span className="font-bold text-white">{lotes[loteIndex].ticketsDisponibles}</span></span>
                </>
            )}
        </div>
    );
};

export default LoteCard; 