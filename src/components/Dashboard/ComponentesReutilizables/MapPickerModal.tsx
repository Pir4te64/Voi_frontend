// src/components/Dashboard/ComponentesReutilizables/MapPickerModal.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { FiX } from "react-icons/fi";

interface Props {
  lat?: number;
  lon?: number;
  onClose: () => void;
  // Ahora solo devuelve lat y lon:
  onSave: (data: { lat: number; lon: number }) => void;
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

  const handleSave = () => {
    if (!pos) return;
    // Solo pasamos lat y lon, sin geocoding extra:
    onSave({ lat: pos[0], lon: pos[1] });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
      <div className="relative w-[90vw] max-w-3xl rounded-xl bg-back p-4">
        <header className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary">
            Selecciona la ubicación
          </h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-white/10">
            <FiX size={22} />
          </button>
        </header>

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

        <footer className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Cancelar
          </button>
          <button
            disabled={!pos}
            onClick={handleSave}
            className="rounded bg-secondary px-4 py-2 font-semibold text-black hover:opacity-90 disabled:opacity-40"
          >
            Guardar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MapPickerModal;
