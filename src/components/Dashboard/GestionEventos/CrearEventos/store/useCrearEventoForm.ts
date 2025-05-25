// src/components/Dashboard/GestionEventos/CrearEventos/store/useCrearEventoForm.ts
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import {
    crearEventoInitialValues,
    crearEventoValidationSchema,
} from "@/components/Dashboard/GestionEventos/CrearEventos/store/crearEvento.schema";

export const useCrearEventoForm = () => {
    const [sliderImage, setSliderImage] = useState<File | null>(null);
    const [eventImages, setEventImages] = useState<File[]>([]);
    const [resetKey, setResetKey] = useState(0);

    // 1) Estado para las categorías
    const [categories, setCategories] = useState<
        { id: number; nombre: string }[]
    >([]);

    // 2) Al montar, pedimos las categorías
    useEffect(() => {
        axios
            .get<{ id: number; nombre: string }[]>(api_url.get_categorias, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')!).accessToken}`
                }
            })
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("Error al cargar categorías:", err);
                toast.error(
                    "No se pudieron cargar las categorías",
                    { position: "top-right", autoClose: 3000 }
                );
            });
    }, []);

    const formik = useFormik({
        initialValues: crearEventoInitialValues,
        validationSchema: crearEventoValidationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            if (!sliderImage) {
                toast.error("Debes cargar la imagen para el slider");
                setSubmitting(false);
                return;
            }
            if (eventImages.length === 0) {
                toast.error("Debes cargar al menos una imagen para la galería");
                setSubmitting(false);
                return;
            }

            const evento = {
                nombre: values.name,
                descripcion: values.description,
                lugar: values.location,
                categoriaId: Number(values.category),
                linkRedSocial1: values.social1,
                linkRedSocial2: values.social2,
                fechaInicio: values.startDate,
                fechaFin: values.endDate,
            };

            console.log("📤 Payload a enviar:", {
                evento,
                sliderImage,
                galeria: eventImages,
            });

            try {
                const formData = new FormData();
                formData.append("evento", JSON.stringify(evento));
                formData.append("sliderImage", sliderImage);
                eventImages.forEach((file) => formData.append("galeria", file));

                await axios.post(api_url.crear_evento, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')!).accessToken}`
                    },
                });

                toast.success("Evento creado correctamente", {
                    position: "top-right",
                    autoClose: 3000,
                });

                resetForm();
                setSliderImage(null);
                setEventImages([]);
                setResetKey((k) => k + 1);
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message || "Error al crear el evento",
                    { position: "top-right", autoClose: 3000 }
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return {
        sliderImage,
        setSliderImage,
        eventImages,
        setEventImages,
        categories,
        resetKey,
        formik,
    };
};
