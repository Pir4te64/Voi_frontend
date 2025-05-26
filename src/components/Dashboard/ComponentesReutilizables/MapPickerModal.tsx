import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { FiX } from "react-icons/fi";
import {
  reverseGeocode,
  fetchElevation,
} from "../GestionEventos/CrearEventos/DetallesEvento/utils/locationHelpers";

interface Props {
  lat?: number;
  lon?: number;
  onClose: () => void;
  onSave: (data: {
    lat: number;
    lon: number;
    geo: any; // JSON completo de Nominatim
    elevacion: number;
  }) => void;
}

const LocationMarker: React.FC<{
  pos: [number, number] | null;
  setPos: (p: [number, number]) => void;
}> = ({ pos, setPos }) => {
  useMapEvents({
    click(e) {
      setPos([e.latlng.lat, e.latlng.lng]);
    },
  });
  return pos ? <Marker position={pos} /> : null;
};

const MapPickerModal: React.FC<Props> = ({ lat, lon, onClose, onSave }) => {
  const [pos, setPos] = useState<[number, number] | null>(
    lat && lon ? [lat, lon] : null
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!pos) return;
    setLoading(true);
    try {
      const [geo, elevacion] = await Promise.all([
        reverseGeocode(pos[0], pos[1]), // JSON completo
        fetchElevation(pos[0], pos[1]),
      ]);
      onSave({
        lat: pos[0],
        lon: pos[1],
        geo,
        elevacion,
      });
    } catch (e) {
      alert("No se pudo obtener la dirección/elevación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
      <div className="relative w-[90vw] max-w-3xl rounded-xl bg-back p-4">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary">
            Selecciona la ubicación
          </h3>
          <button
            onClick={onClose}
            className="rounded p-1 transition hover:bg-white/10"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Mapa */}
        <MapContainer
          center={pos ?? [-27.42, -55.92]}
          zoom={13}
          style={{ height: "60vh", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker pos={pos} setPos={setPos} />
        </MapContainer>

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded bg-black px-4 py-2 text-white transition hover:bg-gray-800"
          >
            Cancelar
          </button>
          <button
            disabled={!pos || loading}
            onClick={handleSave}
            className="rounded bg-secondary px-4 py-2 font-semibold text-black transition hover:opacity-90 disabled:opacity-40"
          >
            {loading ? "Obteniendo…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPickerModal;
