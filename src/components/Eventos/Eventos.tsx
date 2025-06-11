// src/components/EventsSection.tsx
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

import EventCard, { EventCardProps } from "@/components/Eventos/EventCard";
import HeaderEvent from "@/components/Eventos/HeaderEvent";
import GlowWrapper from "@/components/GlowWrapper";
import EventsNav from "@/components/Eventos/EventsNav";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { Link } from "react-router-dom";

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

const EventsSection: React.FC = () => {
  const [activeCat, setActiveCat] = useState<string>("Todos");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  // Datos remotos de Zustand
  const eventsFromStore = useEventsStore((state) => state.events);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);

  // Cargar al montar
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Transformar datos remotos al shape de EventCardProps
  const mappedEvents: EventCardProps[] = eventsFromStore.map((ev) => {
    const [year, monthNum, dayStr] = ev.fechaInicio.split("-");
    const day = parseInt(dayStr, 10).toString();
    const month = monthNames[parseInt(monthNum, 10) - 1];
    return {
      id: ev.id,
      image: ev.sliderImageUrl,
      category: ev.categoriaNombre,
      date: `${day} ${month} ${year}`,
      title: ev.nombre,
      location: ev.address.street ?? ev.address.city,
      city: ev.address.city,
    };
  });

  // Obtener categorías únicas de los eventos
  const categories = [
    "Todos",
    ...Array.from(new Set(mappedEvents.map((ev) => ev.category))),
  ];

  // Filtrar según categoría activa
  const filtered =
    activeCat === "Todos"
      ? mappedEvents
      : mappedEvents.filter((ev) => ev.category === activeCat);

  return (
    <GlowWrapper className="bg-primary px-4 py-12 text-white md:px-16">
      <section className="relative w-full overflow-hidden text-white">
        <HeaderEvent />

        {/* Filtros + Ver Todos desktop */}
        <div className="mb-8 flex flex-wrap justify-between gap-2">
          <div className="space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`
                  px-4 py-2 text-md rounded-2xl transition uppercase
                  ${
                    activeCat === cat
                      ? "bg-secondary text-primary"
                      : "bg-back text-white hover:bg-white/30"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
          <Link to="/eventos">
            <button className="mt-4 hidden rounded border border-white px-4 py-2 transition hover:bg-white hover:text-primary sm:inline-block md:mt-0">
              Ver Todos
            </button>
          </Link>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mb-4"
        >
          {filtered.map((ev) => (
            <SwiperSlide key={ev.id}>
              <EventCard {...ev} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flechas de navegación */}
        <EventsNav swiperRef={swiperRef} />

        {/* Dots mobile */}
        <div className=" flex justify-center space-x-2 sm:hidden">
          {filtered.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeIndex === idx ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Ver Todos mobile */}
        <div className="my-8 flex justify-center sm:hidden">
          <Link to="/eventos">
            <button className="rounded border border-white px-4 py-2 transition hover:bg-white hover:text-primary">
              Ver Todos
            </button>
          </Link>
        </div>
      </section>
    </GlowWrapper>
  );
};

export default EventsSection;
