// src/components/EventCard.tsx
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export interface EventCardProps {
    image: string;
    category: string;
    date: string;     // Ej: "22 Mar 2025"
    title: string;
    location: string;
    city: string;
    onInfoClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    image,
    category,
    date,
    title,
    location,
    city,
    onInfoClick,
}) => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-xl bg-transparent">
            {/* Imagen con overlay y pill */}
            <div className="relative">
                <div
                    className="h-64 bg-center bg-cover"
                    style={{ backgroundImage: `url(${image})` }}
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Pill de categoría */}
                <span className="absolute top-4 right-4 bg-white text-black text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                    {category}
                </span>
            </div>

            {/* Detalles */}
            <div className="px-6 py-5 text-center space-y-2">
                {/* Fecha */}
                <p className="text-secondary font-semibold text-base">
                    {date}
                </p>
                {/* Título */}
                <h3 className="text-white text-2xl font-bold">
                    {title}
                </h3>
                {/* Ubicación */}
                <p className="text-white/70 text-sm">
                    {location}
                </p>
                <p className="flex items-center justify-center text-secondary text-sm">
                    <FaMapMarkerAlt className="mr-1" /> {city}
                </p>
                {/* Botón Más Info */}
                <button
                    onClick={onInfoClick}
                    className="mt-4 px-6 py-2 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-primary transition"
                >
                    Más Info
                </button>
            </div>
        </div>
    );
};

export default EventCard;
