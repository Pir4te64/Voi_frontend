// src/components/Eventos/EventCard.tsx
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export interface EventCardProps {
    id: string | number;
    image: string;
    category: string;
    date: string;
    title: string;
    location: string;
    city: string;
}

const EventCard: React.FC<EventCardProps> = ({
    id,
    image,
    category,
    date,
    title,
    location,
    city,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navega a /eventos/:id y pasa los datos del evento en state
        navigate(`/eventos/${id}`, {
            state: { id, image, category, date, title, location, city },
        });
    };

    return (
        <div className="mx-auto h-[776px] max-w-xl overflow-hidden bg-transparent">
            <div className="relative overflow-hidden rounded-2xl">
                <div
                    className="h-[528px] rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <span className="absolute right-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-semibold text-black shadow-sm">
                    {category}
                </span>
            </div>
            <div className="space-y-4 px-6 py-5 text-center">
                <p className="text-base font-semibold text-secondary">{date}</p>
                <h3 className="text-4xl font-bold text-white">{title}</h3>
                <p className="text-sm text-white/70">{location}</p>
                <p className="flex items-center justify-center text-sm text-secondary">
                    <FaMapMarkerAlt className="mr-1" /> {city}
                </p>
                <button
                    onClick={handleClick}
                    className="mt-4 rounded-full border border-white px-6 py-2 text-white transition hover:bg-secondary hover:text-primary"
                >
                    Más Info
                </button>
            </div>
        </div>
    );
};

export default EventCard;
