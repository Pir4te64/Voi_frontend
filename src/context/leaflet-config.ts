// src/utils/leaflet-config.ts
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa directamente los archivos de imagen para que Vite los procese
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Borra la función interna que buscaba las imágenes en rutas fijas
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Fusiona tus imports con las opciones por defecto
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
