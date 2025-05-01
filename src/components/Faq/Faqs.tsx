// src/components/Faqs.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData: FaqItem[] = [
    {
        question: "¿Qué es VOI?",
        answer:
            "VOI es una plataforma de ticketing que te permite comprar entradas para fiestas, eventos de música electrónica y eventos sociales de manera rápida y segura. También ofrecemos a los organizadores de eventos herramientas para gestionar la venta de entradas, la seguridad, la promoción y, próximamente, el alquiler de equipos y servicios adicionales para eventos.",
    },
    {
        question: "¿Cómo compro entradas a través de VOI?",
        answer: "Es muy sencillo. Solo debes ingresar a nuestra web, seleccionar el evento al que deseas asistir, elegir la cantidad de entradas y el método de pago (MercadoPago, tarjetas de débito o crédito). Luego recibirás un comprobante y tu entrada electrónica por correo.",
    },
    {
        question: "¿Es seguro comprar entradas en VOI?",
        answer: "Sí, garantizamos total seguridad en las transacciones a través de métodos de pago confiables como MercadoPago.",
    },
    {
        question: "¿Qué hago si no recibo mi entrada después de la compra?",
        answer: "Si no recibes tu entrada en el correo electrónico registrado, verifica tu carpeta de spam o comunícate con nuestro equipo de soporte técnico a través del formulario de contacto en nuestra web. Estaremos encantados de ayudarte.",
    },
    {
        question: "¿Puedo solicitar un reembolso si no puedo asistir al evento?",
        answer: "Las políticas de reembolso corresponden al productor del evento. Te recomendamos revisar los términos y condiciones de cada evento antes de realizar la compra.",
    },
    {
        question:
            "¿Qué servicios adicionales ofrece VOI para los organizadores de eventos?",
        answer:
            "Además de la venta de entradas, VOI ofrecerá próximamente el alquiler de carpas beduinas, mesas de mezclas completas para DJs, y pulseras con identificador para compras en la barra de cada evento. Estos servicios, junto con nuestro equipo de seguridad y soporte técnico, brindan una solución integral para la organización de eventos.",
    },
    {
        question: "¿Cómo me aseguro de que mi evento sea exitoso en VOI?",
        answer:
            "VOI te proporciona todas las herramientas para gestionar tu evento: desde la promoción hasta la venta de entradas, la seguridad, y ahora también el alquiler de equipos esenciales.",
    },
    {
        question: "¿Qué tipos de eventos puedo encontrar en VOI?",
        answer: "En VOI nos especializamos en fiestas, eventos de música electrónica y eventos sociales. Siempre encontrarás eventos destacados y cuidadosamente seleccionados para ofrecer las mejores experiencias a nuestros usuarios.",
    },
    {
        question: "¿Cuándo estarán disponibles los servicios adicionales de VOI?",
        answer: "Estamos trabajando para incorporar muy pronto el servicio de alquiler de carpas, mesas de mezclas para DJs y pulseras con identificador para compras en barra. Mantente atento a las actualizaciones en nuestra web y redes sociales (próximamente).",
    },
];

interface FaqItem {
    question: string;
    answer: string;
}
const Faqs = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);


    const toggle = (idx: number): void =>
        setOpenIndex(openIndex === idx ? null : idx);

    return (
        <section className="relative bg-primary py-12 px-4 overflow-visible">
            {/* Glow superior derecho */}
            <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full filter blur-3xl opacity-30 
                     bg-gradient-to-tr from-secondary to-secondary 
                     transform translate-x-1/3 -translate-y-1/3"
            />
            {/* Glow inferior derecho */}
            <div
                className="absolute bottom-0 right-0 w-80 h-80 rounded-full filter blur-3xl opacity-30 
                     bg-gradient-to-br from-secondary to-secondary
                     transform translate-x-1/4 translate-y-1/4 z-0"
            />

            <div className="relative  mx-auto rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-white text-left mb-8">
                    PREGUNTAS FRECUENTES ¿?
                </h2>

                <ul className="space-y-4 w-full">
                    {faqData.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <li key={idx} className="w-full rounded">
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex justify-between items-center bg-back rounded-t-md px-4 py-3 focus:outline-none"
                                >
                                    <span
                                        className={`font-medium text-left ${isOpen ? "text-secondary" : "text-white"
                                            }`}
                                    >
                                        {item.question}
                                    </span>
                                    {isOpen ? (
                                        <FaChevronUp className="text-white" />
                                    ) : (
                                        <FaChevronDown className="text-white" />
                                    )}
                                </button>

                                {isOpen && (
                                    <div className="w-full px-4 py-4 rounded-b-md bg-primary">
                                        <p className="text-gray-300 text-sm leading-relaxed text-left">
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Faqs;
