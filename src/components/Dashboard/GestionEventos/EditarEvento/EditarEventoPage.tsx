import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import EventoForm from "@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm";
import { useEditarEventoStore } from "./store/useEditarEventoStore";
import { editarEventoSchema } from "./validations/editarEvento.validation";
import { EventoData, FormValues } from "./interfaces/editarEvento.interface";

const EditarEventoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const eventoData = location.state?.eventoData as EventoData;

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
        navigate("/dashboard/editareventos");
      }
    },
  });

  if (!eventoData) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-white hover:text-secondary"
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </button>

      <h1 className="mb-8 text-3xl font-bold text-secondary">Editar Evento</h1>

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
    </div>
  );
};

export default EditarEventoPage;
