// src/components/Eventos/EventDetail.tsx
import React, { useRef, useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { staticEvents } from "@/components/Eventos/SeccionEventos/EventosEstaticos";
import { useEventsStore } from "@/components/heroEvents/store/useEventsStore";
import { useCarritoStore } from "@/components/SidebarCompras/store/useCarritoStore";
import { FaMapMarkerAlt, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify';
import {
  RemoteEvent,
  StaticEventDetail,
  TicketType,
} from "@/components/Eventos/SeccionEventos/data/Interfaces";

// Nombres de meses para formateo
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

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = parseInt(id!, 10);
  const { addToCart, isAuthenticated, getItemQuantity, updateQuantity } = useCarritoStore();

  // Slider
  const swiperRef = useRef<any>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showMap, setShowMap] = useState(false);

  // Fetch remoto
  const remoteEvents = useEventsStore((s) => s.events) as RemoteEvent[];
  const fetchEvents = useEventsStore((s) => s.fetchEvents);

  useEffect(() => {
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
        ? raw.lotes.map((lote): TicketType => ({
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
  const event = mappedRemote ?? staticEvents.find((e) => e.id === numericId);

  // Estado de ticket seleccionado - movido antes de la condición
  const [selectedTicket, setSelectedTicket] = useState<string>(() => {
    if (!event) return "";
    return event.defaultTicket || event.ticketTypes[0]?.type || "";
  });

  // Inicializar quantity con la cantidad del carrito si existe
  const [quantity, setQuantity] = useState(() => {
    if (!event) return 1;
    const defaultTicket = event.defaultTicket || event.ticketTypes[0]?.type;
    if (!defaultTicket) return 1;
    return getItemQuantity(event.id, defaultTicket) || 1;
  });

  // Actualizar quantity cuando cambia el tipo de ticket
  useEffect(() => {
    if (!event) return;
    setQuantity(getItemQuantity(event.id, selectedTicket) || 1);
  }, [selectedTicket, event]);

  // Función para actualizar la cantidad
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);

    if (!event) return;

    // Si el usuario está autenticado, actualizar el carrito en tiempo real
    if (isAuthenticated()) {
      const selectedTicketType = event.ticketTypes.find(t => t.type === selectedTicket);
      if (!selectedTicketType) return;

      if (newQuantity > 0) {
        updateQuantity(event.id, selectedTicket, newQuantity);
      }
    }
  };

  // Calcular total
  const total = useMemo(() => {
    if (!event) return 0;
    const ticket = event.ticketTypes.find((t) => t.type === selectedTicket);
    return (ticket?.price ?? 0) * quantity;
  }, [selectedTicket, quantity, event]);

  // URL para el iframe de mapa
  const mapSrc = useMemo(() => {
    if (!event) return "";
    return `https://www.google.com/maps?q=${encodeURIComponent(
      event.mapUrl ?? event.address
    )}&output=embed`;
  }, [event]);

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para agregar items al carrito');
      return;
    }

    if (!event) {
      toast.error('Error al agregar al carrito: Evento no encontrado');
      return;
    }

    const selectedTicketType = event.ticketTypes.find(t => t.type === selectedTicket);
    if (!selectedTicketType) {
      toast.error('Error al agregar al carrito: Tipo de entrada no encontrado');
      return;
    }

    addToCart({
      eventId: event.id,
      title: event.title,
      ticketType: selectedTicket,
      quantity,
      price: selectedTicketType.price
    });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para realizar la compra');
      return;
    }

    handleAddToCart();
    navigate('/checkout');
  };

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

            {/* Entrada y Cantidad */}
            <section className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="w-full space-y-2">
                <h2 className="text-sm font-semibold uppercase text-secondary">
                  Tipo de Entrada
                </h2>
                <select
                  value={selectedTicket}
                  onChange={(e) => setSelectedTicket(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-primary px-3 py-2 text-sm text-white md:px-4 md:text-base"
                >
                  {event.ticketTypes.map((t) => (
                    <option key={t.type} value={t.type} disabled={!t.available}>
                      {t.type}
                      {t.available ? "" : " (SOLD OUT)"} — $
                      {t.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full space-y-2">
                <h2 className="text-sm font-semibold uppercase text-secondary">
                  Cantidad
                </h2>
                <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-600">
                  <button
                    className="px-3 py-2 text-white md:px-4"
                    onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={quantity}
                    className="w-10 bg-primary px-2 py-2 text-center text-sm text-white focus:outline-none md:w-12 md:px-4 md:text-base"
                  />
                  <button
                    className="px-3 py-2 text-white md:px-4"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </section>

            {/* Total */}
            <div className="mt-4">
              <p className="text-sm font-semibold uppercase">Total</p>
              <p className="text-3xl font-bold text-white md:text-4xl">
                ${total.toLocaleString()}
              </p>
            </div>

            {/* Botones */}
            <div className="mt-4 flex flex-col gap-3 md:gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-primary transition hover:text-white md:py-3 md:text-base"
              >
                Añadir al Carrito
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full rounded-xl border border-secondary px-4 py-2.5 text-sm font-semibold text-secondary transition hover:text-white md:py-3 md:text-base"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
