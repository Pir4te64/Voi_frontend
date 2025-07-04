import React from "react";
import { FaTicketAlt } from "react-icons/fa";

interface Lote {
    id: number;
    nombre: string;
    precio: number;
    ticketsVendidos: number;
}

interface LoteResumenProps {
    lote: Lote;
}

const LoteResumen: React.FC<LoteResumenProps> = React.memo(({ lote }) => {
    return (
        <div className="mt-8 w-full">
            <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg bg-secondary p-6">
                <div className="flex flex-1 flex-col items-center border-r border-black/30">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="font-bold">$</span>
                        <span className="text-xs font-semibold tracking-wider">INGRESO TOTAL</span>
                    </div>
                    <span className="text-3xl font-extrabold">${lote.precio}</span>
                </div>
                <div className="flex flex-1 flex-col items-center">
                    <div className="mb-1 flex items-center gap-2">
                        <FaTicketAlt className="text-lg" />
                        <span className="text-xs font-semibold tracking-wider">TICKETS VENDIDOS</span>
                    </div>
                    <span className="text-3xl font-extrabold">{lote.ticketsVendidos}</span>
                </div>
            </div>
        </div>
    );
});

LoteResumen.displayName = 'LoteResumen';

export default LoteResumen; 