export const reverseGeocode = async (lat: number, lon: number) => {
  // fetchElevation
  const url = `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`;

  const res = await fetch(url, {
    headers: {
      // recomendación de Nominatim: identifica tu app
      "User-Agent": "CruzNegraEventos/1.0 (https://cruznegra.com)",
    },
  });
  if (!res.ok) throw new Error("Nominatim error");
  const data = await res.json();
  return data.display_name as string; // Ej. "Av. Mitre 1234, Posadas..."
};

export const fetchElevation = async (lat: number, lon: number) => {
  const url = `https://api.opentopodata.org/v1/srtm90m?locations=${lat},${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Elevation API error");
  const data = await res.json();
  return data.results[0].elevation as number; // metros
};
