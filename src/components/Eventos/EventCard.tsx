// src/components/EventCard.tsx
import React from 'react';

export interface EventCardProps {
    image: string;
    category: string;
    date: string;     // "DD MMM YYYY"
    title: string;
    location: string;
    city: string;
    onInfoClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    image, category, date, title, location, city, onInfoClick,
}) => {
    const [day, month, year] = date.split(' ');
    return (
        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
            {/* Imagen + overlay */}
            <div
                className="h-64 bg-center bg-cover"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Pill de categoría */}
            <span className="absolute top-2 right-2 bg-secondary px-2 py-1 text-xs font-semibold text-white rounded">
                {category}
            </span>

            {/* Contenido */}
            <div className="p-4 flex flex-col space-y-2">
                <div className="text-secondary font-bold text-sm">
                    {day} – {month} <span className="block">{year}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-white/80">{location}</p>
                <p className="text-sm text-white/60 flex items-center">
                    <svg
                        className="w-4 h-4 mr-1 text-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6z" />
                    </svg>
                    {city}
                </p>
                <button
                    onClick={onInfoClick}
                    className="mt-2 self-start px-4 py-1 text-sm border border-secondary rounded text-secondary hover:bg-secondary hover:text-primary transition"
                >
                    Más Info
                </button>
            </div>
        </div>
    );
};

export default EventCard;
