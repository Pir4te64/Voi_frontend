// src/components/HeroEvents.tsx
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import sliderImage from '@/assets/SliderEvent/Slider.png';

interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
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

  return (
    <section className="relative bg-primary overflow-hidden p-8 md:py-28 md:px-16">
      <Swiper
        modules={[A11y]}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        spaceBetween={0}
        slidesPerView={1}
        loop
       
        className="h-[60vh] md:h-[80vh] rounded-md"
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            <div className="relative h-full">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${ev.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
              <div className="absolute top-8 left-8 bg-secondary bg-opacity-90 p-6 rounded-lg max-w-xs text-white">
                <h2 className="text-2xl font-bold mb-2">{ev.title}</h2>
                <div className="bg-black bg-opacity-70 inline-block px-3 py-1 rounded mb-2">
                  <span className="text-sm">{ev.date}</span>
                </div>
                <p className="text-sm">{ev.location}</p>
              </div>
              <h1 className="absolute bottom-8 left-8 text-5xl md:text-7xl font-extrabold uppercase text-white drop-shadow-lg">
                {ev.artist}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flechas personalizadas abajo derecha */}
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-primary text-secondary border border-secondary p-3 rounded-full hover:opacity-90 transition-opacity"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-primary text-secondary border border-secondary p-3 rounded-full hover:opacity-90 transition-opacity"
        >
          <FaArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroEvents;
