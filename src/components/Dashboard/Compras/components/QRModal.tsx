import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface QRModalProps {
    qrCode: string;
    onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ qrCode, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onClose}
        >
            <div
                className="relative flex flex-col items-center rounded-lg bg-[#232326] p-6 shadow-lg"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute right-2 top-2 text-xl text-gray-400 hover:text-white"
                    onClick={onClose}
                    title="Cerrar"
                >
                    <FaTimes />
                </button>
                <img src={qrCode} alt="QR grande" className="mb-2 h-64 w-64 object-contain" />
                <span className="text-xs text-gray-400">Escanea este código QR para tu entrada</span>
            </div>
        </div>
    );
};

export default QRModal; 