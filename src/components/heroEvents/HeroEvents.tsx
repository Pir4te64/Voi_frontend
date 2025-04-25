// src/components/HeroEvents.tsx
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import sliderImage from '@/assets/SliderEvent/Slider.png';
import HeroEventsNav from '@/components/heroEvents/HeroEventsNav';

interface Event {
  id: number;
  image: string;
  title: string;
  date: string;      // formato "DD MMM YYYY"
  location: string;
  artist: string;
}

const events: Event[] = [
  {
    id: 1,
    image: sliderImage,
    title: 'Garden Rituals',
    date: '22 Mar 2025',
    location: 'Tambor de Tacuarí 8160',
    artist: 'MAXI DEGRASSI',
  },
  {
    id: 2,
    image: sliderImage,
    title: 'Garden Rituals',
    date: '22 Mar 2025',
    location: 'Tambor de Tacuarí 8160',
    artist: 'MAXI DEGRASSI',
  },
  // …más eventos…
];

const HeroEvents: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-primary overflow-hidden p-8 md:py-28 md:px-16">
      <Swiper
        modules={[A11y]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={0}
        slidesPerView={1}
        loop
        className="h-[60vh] md:h-[80vh] rounded-md"
      >
        {events.map((ev) => {
          const [day, month, year] = ev.date.split(' ');
          return (
            <SwiperSlide key={ev.id}>
              <div className="relative h-full">
                {/* Imagen de fondo */}
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${ev.image})` }}
                />
                {/* Gradiente overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

                {/* Tarjeta principal */}
                <div className="
                  absolute left-0 top-0
                  sm:top-1/2 sm:transform sm:-translate-y-1/2
                  w-1/2 h-64 md:h-auto md:w-full sm:max-w-2xl
                  bg-secondary bg-opacity-30 backdrop-blur-lg
                  border border-white border-opacity-50
                  rounded-xl
                  p-4 md:p-8
                  flex flex-col items-center justify-center
                  text-white space-y-4
                ">
                  <h2 className="text-xl sm:text-5xl md:text-6xl font-bold text-center">
                    {ev.title}
                  </h2>

                  <div className="
                    flex flex-col items-center justify-center w-full space-y-4
                    sm:flex-row sm:space-y-0 sm:space-x-4
                  ">
                    {/* Fecha */}
                    <div className="
                      bg-primary px-6 py-4 rounded-lg text-center
                      text-secondary font-bold
                    ">
                      <span className="block text-md sm:text-4xl font-semibold">
                        {day} – {month}
                      </span>
                      <span className="block text-md sm:text-4xl">
                        {year}
                      </span>
                    </div>

                    {/* Ubicación */}
                    <div className="text-sm sm:text-base md:text-lg font-bold text-center">
                      {ev.location}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Flechas de navegación en desktop/tablet */}
      <HeroEventsNav swiperRef={swiperRef} />

      {/* Dots de navegación solo en mobile */}
      <div className="flex sm:hidden justify-center mt-4 space-x-2">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${activeIndex === idx ? 'bg-white' : 'bg-white/50'}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroEvents;
