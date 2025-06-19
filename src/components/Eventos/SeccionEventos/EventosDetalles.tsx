// src/components/Eventos/EventDetail.tsx
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { staticEvents } from "@/components/Eventos/SeccionEventos/EventosEstaticos";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  RemoteEvent,
  StaticEventDetail,
} from "@/components/Eventos/SeccionEventos/data/Interfaces";
import EventoDetallesComprar from "./EventoDetallesComprar";

// Nombres de meses para formateo
const monthNames = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = parseInt(id!, 10);

  // Slider
  const swiperRef = useRef<any>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showMap, setShowMap] = useState(false);

  // Fetch remoto
  const remoteEvents = useEventsStore((s) => s.events) as RemoteEvent[];
  const fetchEvents = useEventsStore((s) => s.fetchEvents);

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Mapear remoto a StaticEventDetail si existe
  const raw = remoteEvents.find((e) => e.id === numericId);
  const mappedRemote: StaticEventDetail | undefined = raw
    ? {
      ...staticEvents[0], // plantilla para campos faltantes
      id: raw.id,
      title: raw.nombre,
      description: raw.descripcion,
      address: raw.address.street
        ? `${raw.address.street}, ${raw.address.city}, ${raw.address.state}`
        : `${raw.address.city}, ${raw.address.state}`,
      fullDate: (() => {
        const [y1, m1, d1] = raw.fechaInicio.split("T")[0].split("-");
        const [y2, m2, d2] = raw.fechaFin.split("T")[0].split("-");
        const day1 = parseInt(d1, 10),
          mon1 = monthNames[parseInt(m1, 10) - 1];
        const day2 = parseInt(d2, 10),
          mon2 = monthNames[parseInt(m2, 10) - 1];
        return `${day1} ${mon1} ${y1} – ${day2} ${mon2} ${y2}`;
      })(),
      gallery: raw.galeriaUrls,
      ticketTypes: raw.lotes.length > 0
        ? raw.lotes.map((lote) => ({
          type: lote.nombre,
          price: lote.precio,
          available: lote.ticketsDisponibles > 0
        }))
        : staticEvents[0].ticketTypes,
      defaultTicket: raw.lotes[0]?.nombre ?? staticEvents[0].defaultTicket,
      mapUrl: raw.address.latitude && raw.address.longitude
        ? `${raw.address.latitude},${raw.address.longitude}`
        : undefined
    }
    : undefined;

  // Elegir datos: remoto o estático
  const event = (mappedRemote ?? staticEvents.find((e) => e.id === numericId)) as StaticEventDetail;

  // URL para el iframe de mapa
  const mapSrc = React.useMemo(() => {
    if (!event) return "";
    return `https://www.google.com/maps?q=${encodeURIComponent(
      event.mapUrl ?? event.address
    )}&output=embed`;
  }, [event]);

  if (!event) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Evento no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-primary">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-secondary opacity-30 blur-3xl filter md:left-0 md:top-1/2 md:-translate-y-1/2 md:transform" />

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-6">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Carrusel */}
          <div>
            <Swiper
              modules={[A11y]}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              onSlideChange={(s) => setActiveIdx(s.realIndex)}
              slidesPerView={1}
              spaceBetween={20}
              className="overflow-hidden rounded-2xl"
            >
              {event.gallery?.map((imgSrc, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={imgSrc}
                    alt={`${event.title} slide ${idx + 1}`}
                    className="h-[300px] w-full rounded-2xl object-cover md:h-[680px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-4 flex justify-center gap-2">
              {event.gallery?.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                  className={`h-2 w-2 rounded-full transition-colors md:h-3 md:w-3 ${activeIdx === idx ? "bg-white" : "bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {event.title}
            </h1>

            <section>
              <h2 className="mb-1 text-sm font-semibold uppercase text-secondary">
                Descripción
              </h2>
              <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                {event.description}
              </p>
            </section>

            <section>
              <h2 className="mb-1 text-sm font-semibold uppercase text-secondary">
                Fecha y Horario
              </h2>
              <p className="text-sm text-white md:text-base">
                {event.fullDate}
              </p>
            </section>

            <section>
              <h2 className="mb-1 text-sm font-semibold uppercase text-secondary">
                Dirección
              </h2>
              <p className="text-sm text-white md:text-base">{event.address}</p>
              <button
                onClick={() => setShowMap((prev) => !prev)}
                className="mt-2 flex items-center text-base text-secondary md:text-lg"
              >
                <FaMapMarkerAlt className="mr-2" /> Ver Mapa
              </button>
              {showMap && (
                <div className="mt-4 h-48 w-full overflow-hidden rounded-lg transition-all duration-300 md:h-64">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    className="border-0"
                    allowFullScreen
                  />
                </div>
              )}
            </section>

            {/* Sección de compra */}
            <EventoDetallesComprar event={event} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
