// src/components/EventosEstaticos.ts
import sliderImage from "@/assets/SliderEvent/Slider.png";
import { EventCardProps } from "@/components/Eventos/EventCard";

/**
 * Extiende lo que necesita EventCard, y añade campos extra
 */
export interface Event extends Omit<EventCardProps, "onInfoClick"> {
  id: number;
  createdAt: string;

  // Descripción extensa (puede ser párrafo o HTML markdown)
  description: string;
  // Fecha y horario completo
  fullDate: string;        // p.ej. "22 Mar 2025 • 18:00 hs – 05:30 hs"
  // Dirección detallada
  address: string;
  // Link opcional a Google Maps
  mapUrl?: string;
  // Tipos de tickets disponibles
  ticketTypes: Array<{
    type: string;
    price: number;
    available: boolean;
  }>;
  // Ticket por defecto seleccionado
  defaultTicket?: string;
  // Galería de imágenes extra para el detalle
  gallery?: string[];
}

export const staticEvents: Event[] = [
  {
    id: 1,
    image: sliderImage,
    category: "Electrónica",
    date: "22 Mar 2025",
    title: "Garden Rituals",
    location: "Tambor de Tacuarí 8160",
    city: "Posadas (Misiones)",
    createdAt: "2025-03-01",

    description: `
      Llega la EDICIÓN XXI de GARDEN RITUALS con MAXI DEGRASSI, DJ y productor argentino
      reconocido por su versatilidad. También tendremos grandes talentos locales como
      GASTÓN DC, GIAN LUCAS, JAY C, KONGBROS y MARTINIANO VISSER. ¡No te lo podés perder! 🎶
    `.trim(),
    fullDate: "22 Mar 2025 • 18:00 hs – 05:30 hs",
    address: "Tambor de Tacuarí 8160, Posadas (Misiones)",
    mapUrl: "-27.368865959886943, -55.89753393427119",
    ticketTypes: [
      { type: "Early Bird (sin límite de horario)", price: 10000, available: false },
      { type: "General", price: 15000, available: true },
      { type: "VIP", price: 25000, available: true },
    ],
    defaultTicket: "General",
    gallery: [
      sliderImage,
      sliderImage,
      sliderImage,
    ],
  },
  {
    id: 2,
    image: sliderImage,
    category: "Fiestas",
    date: "30 Abr 2025",
    title: "Sunset Beats",
    location: "Av. Costanera 1234",
    city: "Posadas (Misiones)",
    createdAt: "2025-03-20",

    description: `
      Disfruta de una puesta de sol única con Sunset Beats: DJs nacionales e internacionales
      que mezclarán música electrónica y house al atardecer. Actuarán DJ LUNA, BEAT MASTER,
      SOUND WAVE y más artistas sorpresa. 🌅🎧
    `.trim(),
    fullDate: "30 Abr 2025 • 17:00 hs – 23:00 hs",
    address: "Av. Costanera 1234, Posadas (Misiones)",
    mapUrl: "-27.368865959886943, -55.89753393427119",
    ticketTypes: [
      { type: "Early Bird", price: 12000, available: true },
      { type: "General", price: 18000, available: true },
      { type: "VIP", price: 30000, available: true },
    ],
    defaultTicket: "Early Bird",
    gallery: [
      sliderImage,
      sliderImage,
      sliderImage,
    ],
  },
  {
    id: 3,
    image: sliderImage,
    category: "Sociales",
    date: "10 May 2025",
    title: "City Vibes",
    location: "Rivadavia 567",
    city: "Posadas (Misiones)",
    createdAt: "2025-04-02",

    description: `
      City Vibes es un festival que celebra la energía urbana: música en vivo,
      arte callejero y propuestas gastronómicas te esperan en el corazón de la ciudad.
      Cultura, arte y mucho ritmo. 🏙️🎨🎶
    `.trim(),
    fullDate: "10 May 2025 • 20:00 hs – 02:00 hs",
    address: "Rivadavia 567, Posadas (Misiones)",
    mapUrl: "-27.368865959886943, -55.89753393427119",
    ticketTypes: [
      { type: "Early Bird", price: 8000, available: true },
      { type: "General", price: 12000, available: true },
      { type: "VIP", price: 20000, available: true },
    ],
    defaultTicket: "General",
    gallery: [
      sliderImage,
      sliderImage,
      sliderImage,
    ],
  },
  {
    id: 4,
    image: sliderImage,
    category: "Electrónica",
    date: "18 Jun 2025",
    title: "Deep House Night",
    location: "Ruta 12 km 8",
    city: "Posadas (Misiones)",
    createdAt: "2025-04-15",

    description: `
      Sumérgete en los ritmos envolventes del Deep House con productores
      nacionales e internacionales. Un viaje sonoro que te llevará hasta el amanecer.
      🔊🌌
    `.trim(),
    fullDate: "18 Jun 2025 • 22:00 hs – 04:00 hs",
    address: "Ruta 12 km 8, Posadas (Misiones)",
    mapUrl: "-27.368865959886943, -55.89753393427119",
    ticketTypes: [
      { type: "Early Bird", price: 9000, available: true },
      { type: "General", price: 14000, available: true },
      { type: "VIP", price: 24000, available: true },
    ],
    defaultTicket: "General",
    gallery: [
      sliderImage,
      sliderImage,
      sliderImage,
    ],
  },
];
