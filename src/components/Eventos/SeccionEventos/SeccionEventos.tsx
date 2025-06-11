// src/components/SeccionEventos.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import EventCard from "@/components/Eventos/EventCard";
import EventsFiltersSidebar from "@/components/Eventos/SeccionEventos/EventsFiltersSidebar";
import GlowWrapper from "@/components/GlowWrapper";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { CardData } from "@/components/Eventos/SeccionEventos/data/Interfaces";

const ordersList = [
  "Aleatorio",
  "Últimos Eventos Publicados",
  "Primeros Eventos Publicados",
];
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

const SeccionEventos: React.FC = () => {
  /* filtros */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [order, setOrder] = useState("Aleatorio");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [randomSeed] = useState(() => Math.random());

  /* swiper */
  const swiperRef = useRef<any>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* datos remotos */
  const rawRemote = useEventsStore((s) => s.events);
  const fetchEvents = useEventsStore((s) => s.fetchEvents);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  /* mapear remoto a CardData */
  const mappedEvents: CardData[] = rawRemote.map((ev) => {
    const [y, m, d] = ev.fechaInicio.split("-");
    return {
      id: ev.id,
      image: ev.sliderImageUrl,
      category: ev.categoriaNombre,
      date: `${parseInt(d, 10)} ${monthNames[parseInt(m, 10) - 1]} ${y}`,
      title: ev.nombre,
      location: ev.address.street ?? ev.address.city,
      city: ev.address.city,
      createdAt: ev.fechaInicio,
    };
  });

  /* Precargar imágenes */
  useEffect(() => {
    if (mappedEvents.length > 0 && !imagesLoaded) {
      const imagePromises = mappedEvents.map((event) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = event.image;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch((error) => {
          console.error("Error precargando imágenes:", error);
          setImagesLoaded(true); // Continuamos aunque haya errores
        });
    }
  }, [mappedEvents, imagesLoaded]);

  /* categorías dinámicas */
  const categoriesList = useMemo(() => {
    const cats = Array.from(new Set(mappedEvents.map((ev) => ev.category)));
    return ["Todos", ...cats];
  }, [mappedEvents]);

  /* filtrar + ordenar */
  const events = useMemo(() => {
    let evts = [...mappedEvents];
    if (category !== "Todos")
      evts = evts.filter((e) => e.category === category);
    if (province)
      evts = evts.filter((e) =>
        e.location.toLowerCase().includes(province.toLowerCase())
      );
    if (city)
      evts = evts.filter((e) =>
        e.city.toLowerCase().includes(city.toLowerCase())
      );
    if (search)
      evts = evts.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );

    if (order === "Aleatorio") {
      // Usar un algoritmo de shuffle determinístico basado en el seed
      evts.sort((a, b) => {
        const hash = ((a.id + b.id) * randomSeed) % 1;
        return hash - 0.5;
      });
    } else if (order === "Últimos Eventos Publicados") {
      evts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else {
      evts.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    return evts;
  }, [search, category, order, province, city, mappedEvents, randomSeed]);

  return (
    <GlowWrapper reverse intensity={52}>
      <section className="flex min-h-screen w-full flex-col gap-10 bg-primary px-4 py-12 text-white md:flex-row md:px-16">
        <EventsFiltersSidebar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          order={order}
          setOrder={setOrder}
          province={province}
          setProvince={setProvince}
          city={city}
          setCity={setCity}
          categories={categoriesList}
          orders={ordersList}
        />

        <div className="min-w-0 flex-1">
          {!imagesLoaded ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-400">
              No se encontraron eventos 🤷‍♂️
            </p>
          ) : (
            <>
              <Swiper
                modules={[A11y]}
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => setActiveIdx(s.realIndex)}
                slidesPerView={1}
                spaceBetween={40}
                speed={500}
                watchSlidesProgress={true}
                observer={true}
                observeParents={true}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 1 },
                }}
                className="mb-6 overflow-hidden"
              >
                {events.map((ev) => (
                  <SwiperSlide
                    key={`event-${ev.id}-${ev.title}`}
                    className="opacity-0 transition-opacity duration-300"
                    style={{ opacity: imagesLoaded ? 1 : 0 }}
                    data-event-id={ev.id}
                  >
                    <div className="h-full w-full">
                      <EventCard {...ev} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex justify-center gap-2">
                {events.map((ev, idx) => (
                  <button
                    key={`dot-${ev.id}`}
                    onClick={() => swiperRef.current?.slideToLoop(idx)}
                    className={`
                      w-2 h-2 rounded-full transition-colors
                      ${activeIdx === idx ? "bg-white" : "bg-white/40"}
                    `}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </GlowWrapper>
  );
};

export default SeccionEventos;
