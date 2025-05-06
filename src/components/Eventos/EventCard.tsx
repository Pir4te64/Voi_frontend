// src/components/EventCard.tsx
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
    id, image, category, date, title, location, city
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/eventos/${id}`);
    };

    return (
        <div className="overflow-hidden bg-transparent max-w-xl h-[776px] mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
                <div
                    className="h-[528px] bg-center bg-cover rounded-2xl"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <span className="absolute top-4 right-4 bg-white text-black text-xs px-3 py-1 rounded-md font-semibold shadow-sm">
                    {category}
                </span>
            </div>
            <div className="px-6 py-5 text-center space-y-4">
                <p className="text-secondary font-semibold text-base">{date}</p>
                <h3 className="text-white text-4xl font-bold">{title}</h3>
                <p className="text-white/70 text-sm">{location}</p>
                <p className="flex items-center justify-center text-secondary text-sm">
                    <FaMapMarkerAlt className="mr-1" /> {city}
                </p>
                <button
                    onClick={handleClick}
                    className="mt-4 px-6 py-2 border border-white text-white rounded-full hover:bg-secondary hover:text-primary transition"
                >
                    Más Info
                </button>
            </div>
        </div>
    );
};

export default EventCard;
