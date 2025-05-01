// src/components/Faqs.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
    {
        question: "¿Qué es VOI?",
        answer:
            "VOI es una plataforma de ticketing que te permite comprar entradas para fiestas, eventos de música electrónica y eventos sociales de manera rápida y segura. También ofrecemos a los organizadores de eventos herramientas para gestionar la venta de entradas, la seguridad, la promoción y, próximamente, el alquiler de equipos y servicios adicionales para eventos.",
    },
    {
        question: "¿Cómo compro entradas a través de VOI?",
        answer: "Aquí va la respuesta sobre cómo comprar entradas…",
    },
    {
        question: "¿Es seguro comprar entradas en VOI?",
        answer: "Aquí va la respuesta sobre la seguridad de la plataforma…",
    },
    {
        question: "¿Qué hago si no recibo mi entrada después de la compra?",
        answer: "Aquí va la respuesta sobre problemas de entrega de entradas…",
    },
    {
        question: "¿Puedo solicitar un reembolso si no puedo asistir al evento?",
        answer: "Aquí va la explicación de la política de reembolsos…",
    },
    {
        question:
            "¿Qué servicios adicionales ofrece VOI para los organizadores de eventos?",
        answer:
            "Aquí va la descripción de servicios extra para organizadores…",
    },
    {
        question: "¿Cómo me aseguro de que mi evento sea exitoso en VOI?",
        answer:
            "Aquí van las recomendaciones para maximizar el éxito de tu evento…",
    },
    {
        question: "¿Qué tipos de eventos puedo encontrar en VOI?",
        answer: "Aquí va la lista de tipos de eventos disponibles…",
    },
    {
        question: "¿Cuándo estarán disponibles los servicios adicionales de VOI?",
        answer: "Aquí va la fecha o el roadmap de nuevos servicios…",
    },
];

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (idx) =>
        setOpenIndex(openIndex === idx ? null : idx);

    return (
        <section className="bg-primary py-12 px-4">
            <div className="max-w-3xl mx-auto  rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                    PREGUNTAS FRECUENTES ¿?
                </h2>

                <ul className="space-y-4">
                    {faqData.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <li
                                key={idx}
                                className="rounded"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full flex justify-between bg-back rounded-t-md items-center px-4 py-3 focus:outline-none"
                                >
                                    <span
                                        className={
                                            isOpen
                                                ? "text-secondary font-medium"
                                                : "text-white font-medium"
                                        }
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
                                    <div className="px-4 pb-4">
                                        <p className="text-gray-300 text-sm leading-relaxed">
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
