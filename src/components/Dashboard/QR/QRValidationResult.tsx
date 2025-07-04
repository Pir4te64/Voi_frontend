import React from "react";

type TicketStatus = 'valid' | 'used' | 'error';

interface QRValidationResultProps {
    status: TicketStatus;
    ticketInfo: any;
    errorMsg: string | null;
    onScanAnother: () => void;
}

const QRValidationResult: React.FC<QRValidationResultProps> = ({ status, ticketInfo, errorMsg, onScanAnother }) => {
    // Usar los datos reales del ticket
    const ticket = ticketInfo || {};
    return (
        <div className="flex flex-col items-center w-full max-w-xs mx-auto rounded-lg border border-secondary bg-[#18171c] p-6 shadow-lg min-h-[500px] mt-8">
            {status === 'valid' && (
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-lg mb-2">
                        <span className="text-2xl">✔️</span> Entrada sin validar
                    </div>
                    <div className="w-full bg-[#23232a] rounded-lg p-4 text-white mb-4">
                        <div className="font-bold mb-2">Lote: {ticket.lote || '-'}</div>
                        <div>Nombre: <span className="font-semibold">{ticket.nombre || '-'} {ticket.apellido || '-'}</span></div>
                        <div>DNI: <span className="font-semibold">{ticket.dni || '-'}</span></div>
                        <div>N° Orden: <span className="font-semibold">{ticket.numOrden || '-'}</span></div>
                        <div>Estado: <span className="font-semibold">{ticket.estado || '-'}</span></div>
                    </div>
                    <button className="w-full bg-secondary text-white font-bold py-2 rounded mb-2">Validar</button>
                    <button className="w-full border border-white text-white py-2 rounded" onClick={onScanAnother}>Escanear otro QR</button>
                </div>
            )}
            {status === 'used' && (
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-lg mb-2">
                        <span className="text-2xl">⚠️</span> Entrada validada
                    </div>
                    <div className="w-full bg-[#23232a] rounded-lg p-4 text-white mb-4">
                        <div className="font-bold mb-2">Lote: {ticket.lote || '-'}</div>
                        <div>Nombre: <span className="font-semibold">{ticket.nombre || '-'} {ticket.apellido || '-'}</span></div>
                        <div>DNI: <span className="font-semibold">{ticket.dni || '-'}</span></div>
                        <div>N° Orden: <span className="font-semibold">{ticket.numOrden || '-'}</span></div>
                        <div>Estado: <span className="font-semibold">{ticket.estado || '-'}</span></div>
                    </div>
                    <button className="w-full bg-gray-700 text-white font-bold py-2 rounded mb-2" disabled>Validar</button>
                    <button className="w-full border border-white text-white py-2 rounded" onClick={onScanAnother}>Escanear otro QR</button>
                </div>
            )}
            {status === 'error' && (
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-lg mb-2">
                        <span className="text-2xl">⚠️</span> Error al validar
                    </div>
                    <div className="w-full bg-[#23232a] rounded-lg p-4 text-white mb-4">
                        <div className="font-bold mb-2">{errorMsg || 'Ocurrió un error al validar el ticket.'}</div>
                    </div>
                    <button className="w-full border border-white text-white py-2 rounded" onClick={onScanAnother}>Escanear otro QR</button>
                </div>
            )}
        </div>
    );
};

export default QRValidationResult; 