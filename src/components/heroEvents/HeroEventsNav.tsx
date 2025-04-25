// src/components/HeroEventsNav.tsx
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface HeroEventsNavProps {
    swiperRef: React.RefObject<any>;
}

const HeroEventsNav: React.FC<HeroEventsNavProps> = ({ swiperRef }) => (
    <div className="absolute hidden sm:flex right-4 bottom-4 lg:bottom-4 space-x-4">
        <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-transparent text-secondary border border-secondary p-3 rounded-full hover:opacity-90 transition-opacity"
        >
            <FaArrowLeft className="w-5 h-5" />
        </button>
        <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-transparent text-secondary border border-secondary p-3 rounded-full hover:opacity-90 transition-opacity"
        >
            <FaArrowRight className="w-5 h-5" />
        </button>
    </div>
);

export default HeroEventsNav;
