// src/components/HeroEvents.tsx
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import HeroEventsNav from "@/components/heroEvents/HeroEventsNav";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import sliderImage from "@/assets/SliderEvent/Slider.png";

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

interface APIEvent {
  id: number;
  nombre: string;
  lugar: string;
  fechaInicio: string; // "YYYY-MM-DD"
  sliderImageUrl: string;
  address?: {
    street: string;
  };
}

// Eventos estáticos por defecto
const staticEvents: APIEvent[] = [
  {
    id: 1,
    nombre: "Garden Rituals",
    lugar: "Tambor de Tacuarí 8160",
    fechaInicio: "2025-03-22",
    sliderImageUrl: sliderImage,
  },
  {
    id: 2,
    nombre: "Sunset Beats",
    lugar: "Av. Costanera 1234",
    fechaInicio: "2025-04-30",
    sliderImageUrl: sliderImage,
  },
  {
    id: 3,
    nombre: "City Vibes",
    lugar: "Rivadavia 567",
    fechaInicio: "2025-05-10",
    sliderImageUrl: sliderImage,
  },
  {
    id: 4,
    nombre: "Deep House Night",
    lugar: "Ruta 12 km 8",
    fechaInicio: "2025-06-18",
    sliderImageUrl: sliderImage,
  },
];

const HeroEvents: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const remoteEvents = useEventsStore((s) => s.events) as APIEvent[];
  const fetchEvents = useEventsStore((s) => s.fetchEvents);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Si la petición no ha traído nada, usamos los estáticos
  const dataSource = remoteEvents.length > 0 ? remoteEvents : staticEvents;
  return (
    <section
      className="relative overflow-hidden bg-primary p-8 md:px-16 md:pb-14"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <Swiper
        modules={[A11y]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={0}
        slidesPerView={1}
        loop
        className="h-[60vh] rounded-md md:h-[80vh]"
      >
        {dataSource.map((ev) => {
          const [year, monthNum, dayStr] = ev.fechaInicio.split("-");
          const day = parseInt(dayStr, 10).toString();
          const month = monthNames[parseInt(monthNum, 10) - 1];

          return (
            <SwiperSlide key={ev.id}>
              <div className="relative h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${ev.sliderImageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

                <div className="absolute left-0 top-0 flex h-64 w-1/2 flex-col items-center justify-center space-y-4 rounded-xl border border-white border-opacity-50 bg-secondary bg-opacity-30 p-4 text-white backdrop-blur-lg sm:top-1/2 sm:max-w-2xl sm:-translate-y-1/2 sm:transform md:h-auto md:w-full md:p-8">
                  <h2 className="text-center text-xl font-bold sm:text-5xl md:text-6xl">
                    {ev.nombre}
                  </h2>

                  <div className="flex w-full flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="rounded-lg bg-primary px-6 py-4 text-center font-bold text-secondary">
                      <span className="text-md block font-semibold sm:text-4xl">
                        {day} – {month}
                      </span>
                      <span className="text-md block sm:text-4xl">{year}</span>
                    </div>

                    <div className="text-center text-sm font-bold sm:text-base md:text-lg">
                      {ev.address?.street}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <HeroEventsNav swiperRef={swiperRef} />

      {/* Dots de navegación en mobile */}
      <div className="mt-4 flex justify-center space-x-2 sm:hidden">
        {dataSource.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeIndex === idx ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroEvents;
