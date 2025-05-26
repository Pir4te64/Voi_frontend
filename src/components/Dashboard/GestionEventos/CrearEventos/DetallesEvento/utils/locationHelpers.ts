/** ------------------------------------------------------------------
 *  Helpers de ubicación:
 *   • reverseGeocode → devuelve JSON completo de Nominatim
 *   • fetchElevation → usa el proxy /elevacion configurado en Vite
 * -----------------------------------------------------------------*/

export const reverseGeocode = async (lat: number, lon: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "CruzNegraEventos/1.0 (+https://cruznegra.com)",
    },
  });
  if (!res.ok) throw new Error("Nominatim error");
  return res.json(); // ← devolvemos el JSON entero
};

export const fetchElevation = async (lat: number, lon: number) => {
  // Vite proxy: /elevacion → https://api.opentopodata.org/v1/srtm90m
  const url = `/elevacion?locations=${lat},${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Elevation API error");
  const data = await res.json();
  return data.results[0].elevation as number; // metros
};
