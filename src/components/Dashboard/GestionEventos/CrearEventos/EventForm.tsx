// src/components/Dashboard/GestionEventos/CrearEventos/EventoForm.tsx
import React from "react";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import ImageUpload from "@/components/Dashboard/ComponentesReutilizables/ImageUpload";
import MultiImageUpload from "@/components/Dashboard/GestionEventos/CrearEventos/MultiImageUpload";
import { EventoFormProps } from "@/components/Dashboard/GestionEventos/CrearEventos/data/Interface";

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

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
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

                {/* Descripción con límite */}
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

                {/* Fecha de Inicio */}
                <FloatingField label="Fecha de Inicio" htmlFor="startDate">
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
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
                        className="w-full rounded-xl border border-gray-700 bg-back px-3 py-4 transition focus:border-secondary focus:outline-none"
                    />
                    {touched.endDate && errors.endDate && (
                        <p className="mt-1 text-sm text-red-400">{errors.endDate}</p>
                    )}
                </FloatingField>

                {/* Lugar */}
                <FloatingField label="Lugar" htmlFor="location">
                    <input
                        id="location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        className="w-full rounded-xl border border-gray-700 bg-back px-3 pb-2 pt-6 transition focus:border-secondary focus:outline-none"
                    />
                    {touched.location && errors.location && (
                        <p className="mt-1 text-sm text-red-400">{errors.location}</p>
                    )}
                </FloatingField>

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
                        <option value=""  >
                            Selecciona categoría
                        </option>
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

                {/* Link a Redes Sociales */}
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

                {/* Botón de escritorio */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 hidden w-full rounded-xl bg-secondary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50 md:block"
                >
                    {isSubmitting ? "Creando…" : "Crear Evento"}
                </button>
            </form>

            {/* Upload de imágenes */}
            <div className="mt-6 space-y-6">
                <ImageUpload
                    key={`slider-${resetKey}`}
                    label="Imagen para el Slider Home"
                    description={
                        <>
                            La imagen debe tener 1920 x 1080 px
                            <br />
                            con un peso máximo de 5 Mb.
                        </>
                    }
                    maxImageSize={5 * 1024 * 1024}
                    onFileSelect={setSliderImage}
                />

                <MultiImageUpload
                    key={`gallery-${resetKey}`}
                    label="Imágenes del Evento"
                    description={
                        <>
                            Selecciona una o más imágenes
                            <br />
                            Cada imagen máximo 5 MB.
                        </>
                    }
                    maxImageSize={5 * 1024 * 1024}
                    onFilesSelect={setEventImages}
                />
            </div>

            {/* Botón móvil */}
            <div className="mt-6 md:hidden">
                <button
                    type="button"
                    onClick={() => formik.handleSubmit()}
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-secondary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {isSubmitting ? "Creando…" : "Crear Evento"}
                </button>
            </div>
        </>
    );
};

export default EventoForm;
