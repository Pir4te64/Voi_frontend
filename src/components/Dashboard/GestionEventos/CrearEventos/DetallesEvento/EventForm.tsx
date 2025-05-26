// src/components/Dashboard/GestionEventos/CrearEventos/EventoForm.tsx
import React, { useState } from "react";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import ImageUpload from "@/components/Dashboard/ComponentesReutilizables/ImageUpload";
import { EventoFormProps } from "@/components/Dashboard/GestionEventos/CrearEventos/data/Interface";
import LoaderOverlay from "@/components/Dashboard/ComponentesReutilizables/LoaderOverlay";
import GalleryUpload from "@/components/Dashboard/GestionEventos/CrearEventos/UI/MultiImageUpload";
import MapPickerModal from "@/components/Dashboard/ComponentesReutilizables/MapPickerModal";

const MAX_DESC = 200;

const EventoForm: React.FC<EventoFormProps> = ({
  resetKey,
  setSliderImage,
  setEventImages,
  formik,
  categories,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;
  const [modalOpen, setModalOpen] = useState(false);
  const [locationLabel, setLocationLabel] = useState("");
  return (
    <>
      {/* Loader */}
      {isSubmitting && <LoaderOverlay />}

      <form
        className="space-y-6 rounded-lg bg-back p-6"
        onSubmit={handleSubmit}
      >
        {/* Nombre del Evento */}
        <FloatingField label="Nombre del Evento" htmlFor="name">
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </FloatingField>

        {/* Descripción */}
        <FloatingField label="Descripción" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={4}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_DESC}
            placeholder=" "
            className="w-full resize-none rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
          />
          <div className="flex justify-between text-sm">
            <p className="text-red-400">
              {touched.description && errors.description && errors.description}
            </p>
            <p className="text-gray-400">
              {values.description.length}/{MAX_DESC}
            </p>
          </div>
        </FloatingField>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Fecha de Inicio */}
          <FloatingField label="Fecha de Inicio" htmlFor="startDate">
            <input
              id="startDate"
              name="startDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={values.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
            />
            {touched.startDate && errors.startDate && (
              <p className="mt-1 text-sm text-red-400">{errors.startDate}</p>
            )}
          </FloatingField>

          {/* Fecha de Finalización */}
          <FloatingField label="Fecha de Finalización" htmlFor="endDate">
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={values.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              min={values.startDate || undefined}
              className="w-full rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none [&::-webkit-calendar-picker-indicator]:invert"
            />
            {touched.endDate && errors.endDate && (
              <p className="mt-1 text-sm text-red-400">{errors.endDate}</p>
            )}
          </FloatingField>

          {/* Lugar */}
          <div className="col-span-full">
            <label className="mb-1 block text-xs uppercase">
              Ubicación (clic para elegir en el mapa)
            </label>
            <input
              type="text"
              readOnly
              onClick={() => setModalOpen(true)}
              value={
                locationLabel ||
                (values.latitud && values.longitud
                  ? `${values.latitud.toFixed(5)}, ${values.longitud.toFixed(
                      5
                    )}`
                  : "")
              }
              placeholder="Haz clic para seleccionar"
              className="w-full cursor-pointer rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
            />
            {(touched.latitud || touched.longitud) &&
              (errors.latitud || errors.longitud) && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.latitud || errors.longitud}
                </p>
              )}
          </div>

          {/* Categoría */}
          <FloatingField label="Categoría" htmlFor="category">
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="z-50 w-full appearance-none rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
            >
              <option value="">Selecciona categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            {touched.category && errors.category && (
              <p className="mt-1 text-sm text-red-400">{errors.category}</p>
            )}
          </FloatingField>

          {/* Redes Sociales */}
          <FloatingField label="Link a Red Social 1" htmlFor="social1">
            <input
              id="social1"
              name="social1"
              type="url"
              value={values.social1}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=" "
              className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
            />
            {touched.social1 && errors.social1 && (
              <p className="mt-1 text-sm text-red-400">{errors.social1}</p>
            )}
          </FloatingField>

          <FloatingField
            label="Link a Red Social 2 (opcional)"
            htmlFor="social2"
          >
            <input
              id="social2"
              name="social2"
              type="url"
              value={values.social2}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder=" "
              className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
            />
            {touched.social2 && errors.social2 && (
              <p className="mt-1 text-sm text-red-400">{errors.social2}</p>
            )}
          </FloatingField>
        </div>
      </form>

      {/* Upload de imágenes */}
      <div className="mt-6 space-y-6 rounded-lg bg-back p-6">
        <ImageUpload
          key={`slider-${resetKey}`}
          label="Imagen para el Slider Home"
          description={
            <>
              La imagen debe tener 1920 x 1080 px con un peso máximo de 10 Mb.
            </>
          }
          maxImageSize={10 * 1024 * 1024}
          onFileSelect={setSliderImage}
        />

        <GalleryUpload
          onSlotChange={(file) => {
            setEventImages([...values.eventImages, file]);
          }}
        />
      </div>

      {/* Botón Guardar Cambios, visible en todos los tamaños */}
      <div className="z-50 mt-6">
        <button
          type="button"
          onClick={() => formik.handleSubmit()}
          disabled={isSubmitting}
          className="w-full rounded-xl py-3 text-xl font-semibold text-secondary underline transition hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Guardando…" : "Guardar Cambios"}
        </button>
      </div>
      {modalOpen && (
        <MapPickerModal
          lat={values.latitud}
          lon={values.longitud}
          onClose={() => setModalOpen(false)}
          onSave={({ lat, lon, geo }) => {
            // 1. Guarda coords para el payload
            formik.setFieldValue("latitud", lat);
            formik.setFieldValue("longitud", lon);

            // 2. Muestra en consola todo el JSON
            console.log("👉 Geo devuelto:", geo);

            // 3. Construye etiqueta "Calle Nº"
            const road = geo.address?.road ?? "";
            const number = geo.address?.house_number ?? "";
            const etiqueta =
              road || number
                ? `${road} ${number}`.trim()
                : `${lat.toFixed(5)}, ${lon.toFixed(5)}`;

            setLocationLabel(etiqueta);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default EventoForm;
