import React from "react";
import { FaTimes, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

type TicketStatus = 'valid' | 'used' | 'error';

interface QRValidationResultProps {
    status: TicketStatus;
    ticketInfo: any;
    errorMsg: string | null;
    onScanAnother: () => void;
    onClose?: () => void;
}

const QRValidationResult: React.FC<QRValidationResultProps> = ({ status, ticketInfo, errorMsg, onScanAnother, onClose }) => {
    // Usar los datos reales del ticket
    const ticket = ticketInfo || {};
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative mx-auto flex w-full max-w-xs flex-col items-center rounded-lg border border-secondary bg-[#18171c] p-6 shadow-lg">
                {onClose && (
                    <button className="absolute right-2 top-2 text-white hover:text-secondary" onClick={onClose}>
                        <FaTimes className="h-6 w-6" />
                    </button>
                )}
                {status === 'valid' && (
                    <div className="flex w-full flex-col items-center">
                        <div className="mb-2 flex items-center gap-2 text-lg font-bold text-green-400">
                            <FaCheckCircle className="text-2xl" /> Entrada sin validar
                        </div>
                        <div className="mb-4 w-full rounded-lg bg-[#23232a] p-4 text-white">
                            <div className="mb-2 font-bold">Lote: {ticket.lote || '-'}</div>
                            <div>Nombre: <span className="font-semibold">{ticket.nombre || '-'} {ticket.apellido || '-'}</span></div>
                            <div>DNI: <span className="font-semibold">{ticket.dni || '-'}</span></div>
                            <div>N° Orden: <span className="font-semibold">{ticket.numOrden || '-'}</span></div>
                            <div>Estado: <span className="font-semibold">{ticket.estado || '-'}</span></div>
                        </div>
                        <button className="mb-2 w-full rounded bg-secondary py-2 font-bold text-white" onClick={onScanAnother}>Escanear otro QR</button>
                    </div>
                )}
                {status === 'used' && (
                    <div className="flex w-full flex-col items-center">
                        <div className="mb-2 flex items-center gap-2 text-lg font-bold text-red-400">
                            <FaExclamationTriangle className="text-2xl" /> Entrada validada
                        </div>
                        <div className="mb-4 w-full rounded-lg bg-[#23232a] p-4 text-white">
                            <div className="mb-2 font-bold">Lote: {ticket.lote || '-'}</div>
                            <div>Nombre: <span className="font-semibold">{ticket.nombre || '-'} {ticket.apellido || '-'}</span></div>
                            <div>DNI: <span className="font-semibold">{ticket.dni || '-'}</span></div>
                            <div>N° Orden: <span className="font-semibold">{ticket.numOrden || '-'}</span></div>
                            <div>Estado: <span className="font-semibold">{ticket.estado || '-'}</span></div>
                        </div>
                        <button className="mb-2 w-full rounded bg-secondary py-2 font-bold text-white" onClick={onScanAnother}>Escanear otro QR</button>
                    </div>
                )}
                {status === 'error' && (
                    <div className="flex w-full flex-col items-center">
                        <div className="mb-2 flex items-center gap-2 text-lg font-bold text-red-400">
                            <FaExclamationTriangle className="text-2xl" /> Error al validar
                        </div>
                        <div className="mb-4 w-full rounded-lg bg-[#23232a] p-4 text-white">
                            <div className="mb-2 font-bold">{errorMsg || 'Ocurrió un error al validar el ticket.'}</div>
                        </div>
                        <button className="mb-2 w-full rounded bg-secondary py-2 font-bold text-white" onClick={onScanAnother}>Escanear otro QR</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRValidationResult; 