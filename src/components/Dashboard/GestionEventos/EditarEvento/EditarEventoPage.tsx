import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import GestionarLoteUI from "@/components/Dashboard/GestionEventos/CrearEventos/LotesEntrada/LotesEntrada";
import AsignarRevendedor from "@/components/Dashboard/GestionEventos/AsignarRevendedor/AsignarRevendedor";
import { useEditarEventoStore } from "@/components/Dashboard/GestionEventos/EditarEvento/store/useEditarEventoStore";
import { editarEventoSchema } from "@/components/Dashboard/GestionEventos/EditarEvento/validations/editarEvento.validation";
import { EventoData, FormValues } from "@/components/Dashboard/GestionEventos/EditarEvento/interfaces/editarEvento.interface";

const EditarEventoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const eventoData = location.state?.eventoData as EventoData;
  const [active, setActive] = useState(0);

  const {
    sliderImage,
    eventImages,
    resetKey,
    setSliderImage,
    setEventImages,
    updateEvento,
  } = useEditarEventoStore();

  useEffect(() => {
    if (!eventoData) {
      toast.error("No se encontraron datos del evento", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/dashboard/eventos");
    }
  }, [eventoData, navigate]);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: eventoData?.nombre || "",
      description: eventoData?.descripcion || "",
      startDate: eventoData?.fechaInicio?.split("T")[0] || "",
      endDate: eventoData?.fechaFin?.split("T")[0] || "",
      latitud: eventoData?.address?.latitude || "",
      longitud: eventoData?.address?.longitude || "",
      category: eventoData?.categoriaId || 0,
      social1: eventoData?.linkRedSocial1 || "",
      social2: eventoData?.linkRedSocial2 || "",
    },
    validationSchema: editarEventoSchema,
    onSubmit: async (values) => {
      const success = await updateEvento(values, id!, eventoData);
      if (success) {
        setActive(1); // Avanzar a la siguiente pestaña después de guardar
      }
    },
  });

  if (!eventoData) {
    return null;
  }

  const createSteps = () => [
    {
      label: "Detalles del Evento",
      content: (
        <EventoForm
          resetKey={resetKey}
          sliderImage={sliderImage}
          setSliderImage={setSliderImage}
          eventImages={eventImages}
          setEventImages={setEventImages}
          formik={formik}
          categories={[
            { id: eventoData.categoriaId, nombre: eventoData.categoriaNombre },
          ]}
          existingSliderUrl={eventoData?.sliderImageUrl}
          existingGalleryUrls={eventoData?.galeriaUrls}
        />
      ),
    },
    {
      label: "Lotes de Entrada",
      content: (
        <GestionarLoteUI
          eventId={Number(id)}
          eventName={eventoData.nombre}
          prevStep={() => setActive(0)}
          nextStep={() => setActive(2)}
          active={active}
          stepsLength={3}
        />
      ),
    },
    {
      label: "Revendedores",
      content: (
        <AsignarRevendedor
          eventId={Number(id)}
          eventName={eventoData.nombre}
        />
      ),
    },
  ];

  const steps = createSteps();

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-white hover:text-secondary sm:mb-8"
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </button>

      <h1 className="mb-6 text-2xl font-bold text-secondary sm:mb-8 sm:text-3xl">Editar Evento</h1>
      <div className="rounded-lg bg-back p-4 text-white sm:p-6">
        {/* Pestañas de navegación */}
        <div className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto rounded-xl bg-black/40 p-2 sm:mb-8 sm:gap-4">
          {steps.map(({ label }, idx) => (
            <button
              key={label}
              onClick={() => {
                if (idx > 0 && !formik.isValid && active === 0) {
                  formik.handleSubmit();
                  return;
                }
                setActive(idx);
              }}
              className={`whitespace-nowrap rounded px-3 py-2 text-sm font-semibold transition flex-shrink-0 sm:px-6 sm:py-4 sm:text-md
              ${active === idx
                  ? "bg-secondary text-black font-bold"
                  : "bg-[#1c1c1c] hover:bg-gray-800 font-normal"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {steps[active].content}
        </div>
      </div>
    </div>
  );
};

export default EditarEventoPage;
