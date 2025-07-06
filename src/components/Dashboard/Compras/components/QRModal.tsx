import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface QRModalProps {
    qrCode: string;
    onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ qrCode, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={onClose}
        >
            <div
                className="relative flex flex-col items-center rounded-lg bg-[#232326] p-4 shadow-lg sm:p-6"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute right-2 top-2 text-lg text-gray-400 hover:text-white sm:text-xl"
                    onClick={onClose}
                    title="Cerrar"
                >
                    <FaTimes />
                </button>
                <img
                    src={qrCode}
                    alt="QR grande"
                    className="mb-2 h-48 w-48 object-contain sm:h-64 sm:w-64"
                />
                <span className="text-xs text-gray-400 text-center">
                    Escanea este código QR para tu entrada
                </span>
            </div>
        </div>
    );
};

export default QRModal; 