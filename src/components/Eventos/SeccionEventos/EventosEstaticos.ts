import sliderImage from "@/assets/SliderEvent/Slider.png";
import { EventCardProps } from "../EventCard";
interface Event extends Omit<EventCardProps, "onInfoClick"> {
  id: number;
  createdAt: string;
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
  },
];
