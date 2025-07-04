import { useState } from "react";
import QRScannerModal from "./QRScannerModal";
import QRValidationResult from "./QRValidationResult";
import axios from "axios";
import { api_url } from "../../../api/api";

type TicketStatus = 'idle' | 'valid' | 'used' | 'error';

const QRValidator = () => {
    const [modalOpen, setModalOpen] = useState(true);
    const [resultOpen, setResultOpen] = useState(false);
    const [status, setStatus] = useState<TicketStatus>('idle');
    const [ticketInfo, setTicketInfo] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleScanResult = async (hash: string) => {
        console.log('QR detectado, hash:', hash);
        setLoading(true);
        setErrorMsg(null);
        try {
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;
            if (!token) throw new Error("No autenticado");
            console.log('Enviando PUT a:', api_url.validar_ticket(hash));
            const response = await axios.put(
                api_url.validar_ticket(hash),
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Respuesta de la API:', response.data);
            setTicketInfo(response.data);
            if (response.data?.estado === 'UTILIZADO' || response.data?.ticket?.validado) {
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
            console.log('Error en la petición PUT:', err, msg);
            setStatus('error');
            setErrorMsg(msg);
        } finally {
            setLoading(false);
            setModalOpen(false);
            setResultOpen(true);
        }
    };

    const handleScanAnother = () => {
        setStatus('idle');
        setTicketInfo(null);
        setErrorMsg(null);
        setModalOpen(true);
        setResultOpen(false);
    };

    const handleResultClose = () => {
        setResultOpen(false);
        setStatus('idle');
        setTicketInfo(null);
        setErrorMsg(null);
    };

    return (
        <div>
            <QRScannerModal open={modalOpen} onClose={handleResultClose} onResult={handleScanResult} />
            {resultOpen && status !== 'idle' && (
                <QRValidationResult
                    status={status}
                    ticketInfo={ticketInfo}
                    errorMsg={errorMsg}
                    onScanAnother={handleScanAnother}
                    onClose={handleResultClose}
                />
            )}
            {loading && <div className="mt-4 text-center text-white">Validando QR...</div>}
        </div>
    );
};

export default QRValidator; 