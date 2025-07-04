import { useState, useEffect } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';
import { FaTimes } from "react-icons/fa";

interface QRScannerModalProps {
    open: boolean;
    onClose: () => void;
    onResult: (hash: string) => void;
    resetKey?: number;
}

const QRScannerModal: React.FC<QRScannerModalProps> = ({ open, onClose, onResult, resetKey }) => {
    const [scanned, setScanned] = useState(false);

    // Reiniciar el estado cuando cambie resetKey
    useEffect(() => {
        setScanned(false);
    }, [resetKey]);
    const handleScan = (codes: any[]) => {
        if (codes.length > 0 && codes[0].rawValue && !scanned) {
            setScanned(true);
            onResult(codes[0].rawValue);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative flex w-[90vw] max-w-xs flex-col items-center rounded-lg border border-secondary bg-[#18171c] p-6 shadow-lg">
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
                            onError={() => { }}
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
                        {scanned && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
                                <span className="text-lg font-semibold text-white">Procesando QR...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScannerModal; 