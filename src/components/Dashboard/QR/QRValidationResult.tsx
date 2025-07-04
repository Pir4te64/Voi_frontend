import React from "react";
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

type TicketStatus = 'valid' | 'used' | 'error';

interface QRValidationResultProps {
    status: TicketStatus;
    ticketInfo: any;
    errorMsg: string | null;
    onScanAnother: () => void;
    onClose?: () => void;
}

const QRValidationResult: React.FC<QRValidationResultProps> = ({ status, ticketInfo, errorMsg, onScanAnother, onClose }) => {
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
                    <>
                        <div className="mb-4 flex w-full items-center justify-start gap-2 text-lg font-bold">
                            <FaCheckCircle className="text-2xl text-green-400" /> Entrada sin validar
                        </div>
                        <div className="mb-6 w-full rounded-lg bg-[#23232a] p-4 text-white">
                            <div className="mb-2 font-bold">"Ej: Entrada General"</div>
                            <div>Precio: <span className="font-semibold">$0000</span></div>
                            <div>Evento: <span className="font-semibold">Nombre del Evento</span></div>
                            <div>Validez: <span className="font-semibold">QR válido para cualquier día del evento.</span></div>
                            <div>Nombre: <span className="font-semibold">Nombre y Apellido del Comprador</span></div>
                            <div>Email: <span className="font-semibold">comprador@gmail.com</span></div>
                            <div>DNI: <span className="font-semibold">00000000</span></div>
                        </div>
                        <button className="w-full rounded border border-white py-2 text-white" onClick={onScanAnother}>Escanear otro QR</button>
                    </>
                )}
                {status === 'used' && (
                    <>
                        <div className="mb-4 flex w-full items-center justify-start gap-2 text-lg font-bold">
                            <FaRegCheckCircle className="text-2xl text-green-500" /> Entrada validada
                        </div>
                        <div className="mb-6 w-full rounded-lg bg-[#23232a] p-4 text-white">
                            <div className="mb-2 font-bold">Lote: {ticket.lote || '-'}</div>
                            <div>Nombre: <span className="font-semibold">{ticket.nombre || '-'} {ticket.apellido || '-'}</span></div>
                            <div>DNI: <span className="font-semibold">{ticket.dni || '-'}</span></div>
                            <div>N° Orden: <span className="font-semibold">{ticket.numOrden || '-'}</span></div>
                            <div>Estado: <span className="font-semibold">{ticket.estado || '-'}</span></div>
                        </div>
                        <button className="w-full rounded border border-white py-2 text-white" onClick={onScanAnother}>Escanear otro QR</button>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <div className="mb-4 flex w-full items-center justify-start gap-2 text-lg font-bold">
                            <FaExclamationTriangle className="text-2xl text-red-400" /> Error al validar
                        </div>
                        <div className="mb-6 w-full rounded-lg bg-[#23232a] p-4 text-white">
                            <div className="mb-2 font-bold">{errorMsg || 'Ocurrió un error al validar el ticket.'}</div>
                        </div>
                        <button className="w-full rounded border border-white py-2 text-white" onClick={onScanAnother}>Escanear otro QR</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QRValidationResult; 