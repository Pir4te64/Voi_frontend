import { useState } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import { FaTimes } from "react-icons/fa";
import axios from "axios";

interface QRScannerModalProps {
    open: boolean;
    onClose: () => void;
    onResult?: (result: string) => void;
}

type TicketStatus = 'idle' | 'valid' | 'used' | 'error';

const baseUrl = "https://voi-gateway-production.up.railway.app/api";

const QRScannerModal: React.FC<QRScannerModalProps> = ({ open, onClose }) => {
    const [qrResult, setQrResult] = useState<string | null>(null);
    const [status, setStatus] = useState<TicketStatus>('idle');
    const [ticketInfo, setTicketInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const reset = () => {
        setQrResult(null);
        setStatus('idle');
        setTicketInfo(null);
        setErrorMsg(null);
    };

    const handleScan = async (codes: any[]) => {
        if (codes.length > 0 && codes[0].rawValue && status === 'idle') {
            const hash = codes[0].rawValue;
            setQrResult(hash);
            setLoading(true);
            setErrorMsg(null);
            try {
                const token = localStorage.getItem("auth")
                    ? JSON.parse(localStorage.getItem("auth")!).accessToken
                    : null;
                if (!token) throw new Error("No autenticado");
                const response = await axios.put(
                    `${baseUrl}/eventos/user/v1/tickets/utilizar/hash?hash=${hash}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                // Suponiendo que la respuesta trae info del ticket y su estado
                setTicketInfo(response.data);
                if (response.data?.ticket?.validado) {
                    setStatus('used');
                } else {
                    setStatus('valid');
                }
            } catch (err: any) {
                let msg = 'Error al validar el ticket';
                if (err?.response?.data?.error?.description) {
                    msg = Array.isArray(err.response.data.error.description)
                        ? err.response.data.error.description.join(' ')
                        : err.response.data.error.description;
                } else if (err?.response?.data?.message) {
                    msg = err.response.data.message;
                }
                setStatus('error');
                setErrorMsg(msg);
            } finally {
                setLoading(false);
            }
        }
    };

    if (!open) return null;

    // UI de ticket sin validar
    const ValidTicket = () => (
        <div className="flex w-full flex-col items-center">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold text-green-400">
                <span className="text-2xl">✔️</span> Entrada sin validar
            </div>
            <button className="absolute right-2 top-2 text-white hover:text-secondary" onClick={onClose}>
                <FaTimes className="h-6 w-6" />
            </button>
            <div className="mb-4 w-full rounded-lg bg-[#23232a] p-4 text-white">
                <div className="mb-2 font-bold">"Ej: Entrada General"</div>
                <div>Precio: $0000</div>
                <div>Evento: <span className="font-semibold">Nombre del Evento</span></div>
                <div>Validez: <span className="font-semibold">QR válido para cualquier día del evento.</span></div>
                <div>Nombre: <span className="font-semibold">Nombre y apellido del Comprador</span></div>
                <div>Email: <span className="font-semibold">comprador@gmail.com</span></div>
                <div>DNI: 00000000</div>
            </div>
            <button className="mb-2 w-full rounded bg-secondary py-2 font-bold text-white">Validar</button>
            <button className="w-full rounded border border-white py-2 text-white" onClick={reset}>Escanear otro QR</button>
        </div>
    );

    // UI de ticket ya validado o error
    const UsedTicket = () => (
        <div className="flex w-full flex-col items-center">
            <div className="mb-2 flex items-center gap-2 text-lg font-bold text-red-400">
                <span className="text-2xl">⚠️</span> Entrada validada
            </div>
            <button className="absolute right-2 top-2 text-white hover:text-secondary" onClick={onClose}>
                <FaTimes className="h-6 w-6" />
            </button>
            <div className="mb-4 w-full rounded-lg bg-[#23232a] p-4 text-white">
                <div className="mb-2 font-bold">"Ej: Entrada General"</div>
                <div>Precio: $0000</div>
                <div>Evento: <span className="font-semibold">Nombre del Evento</span></div>
                <div>Validez: <span className="font-semibold">QR válido para cualquier día del evento.</span></div>
                <div>Nombre: <span className="font-semibold">Nombre y apellido del Comprador</span></div>
                <div>Email: <span className="font-semibold">comprador@gmail.com</span></div>
                <div>DNI: 00000000</div>
            </div>
            <button className="mb-2 w-full rounded bg-gray-700 py-2 font-bold text-white" disabled>Validar</button>
            <button className="w-full rounded border border-white py-2 text-white" onClick={reset}>Escanear otro QR</button>
            {errorMsg && <div className="mt-2 text-red-400">{errorMsg}</div>}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative flex min-h-[500px] w-[90vw] max-w-xs flex-col items-center rounded-lg border border-secondary bg-[#18171c] p-6 shadow-lg">
                {status === 'idle' && (
                    <>
                        <button className="absolute right-2 top-2 text-white hover:text-secondary" onClick={onClose}>
                            <FaTimes className="h-6 w-6" />
                        </button>
                        <h2 className="mb-2 w-full text-center text-lg font-semibold text-secondary">Escanear QRs</h2>
                        <p className="mb-4 w-full text-center text-sm text-white">Ingrese el Código QR</p>
                        <div className="relative flex w-full items-center justify-center">
                            {/* Contenedor de la cámara */}
                            <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-lg border-2 border-secondary bg-black">
                                <Scanner
                                    onScan={handleScan}
                                    onError={() => setQrResult('Error al acceder a la cámara')}
                                    classNames={{
                                        video: 'absolute inset-0 h-full w-full object-cover',
                                    }}
                                />
                                {/* Animación de línea de escaneo con cuadros */}
                                <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 gap-2">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`animate-scan-bar h-7 w-7 rounded bg-white/90`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {loading && <div className="mt-4 text-center text-white">Validando QR...</div>}
                        {qrResult && <div className="mt-4 text-center text-white">Hash: {qrResult}</div>}
                    </>
                )}
                {status === 'valid' && <ValidTicket />}
                {(status === 'used' || status === 'error') && <UsedTicket />}
            </div>
        </div>
    );
};

export default QRScannerModal; 