import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { api_url } from "@/api/api";
import { EventoData, FormValues } from "../interfaces/editarEvento.interface";
import { Dispatch, SetStateAction } from "react";

interface EditarEventoState {
    sliderImage: File | null;
    eventImages: File[];
    resetKey: number;
    setSliderImage: Dispatch<SetStateAction<File | null>>;
    setEventImages: Dispatch<SetStateAction<File[]>>;
    updateEvento: (values: FormValues, id: string, eventoData: EventoData) => Promise<boolean>;
    getAuthHeaders: () => { Authorization: string };
}

export const useEditarEventoStore = create<EditarEventoState>((set, get) => ({
    sliderImage: null,
    eventImages: [],
    resetKey: 0,

    setSliderImage: (image) => set({ sliderImage: typeof image === 'function' ? image(get().sliderImage) : image }),
    setEventImages: (images) => set({ eventImages: typeof images === 'function' ? images(get().eventImages) : images }),

    getAuthHeaders: () => {
        const auth = localStorage.getItem("auth");
        if (!auth) {
            throw new Error("No hay token de autenticación");
        }
        return {
            Authorization: `Bearer ${JSON.parse(auth).accessToken}`,
        };
    },

    updateEvento: async (values, id, eventoData) => {
        try {
            const formData = new FormData();

            const eventoUpdate = {
                nombre: values.name,
                descripcion: values.description,
                latitud: values.latitud,
                longitud: values.longitud,
                categoriaId: Number(values.category),
                linkRedSocial1: values.social1,
                linkRedSocial2: values.social2 || "",
                fechaInicio: values.startDate,
                fechaFin: values.endDate,
            };

            formData.append("evento", JSON.stringify(eventoUpdate));

            const { sliderImage, eventImages } = get();

            if (sliderImage && sliderImage instanceof File) {
                formData.append("sliderImage", sliderImage);
            }

            if (eventImages.length > 0 && eventImages.some((img) => img instanceof File)) {
                const newImages = eventImages.filter((img) => img instanceof File);
                newImages.forEach((image) => {
                    formData.append("galeria", image);
                });
            }

            const response = await axios.put(
                `${api_url.editar_evento}?eventoId=${id}`,
                formData,
                {
                    headers: {
                        ...get().getAuthHeaders(),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error("Error al actualizar el evento");
            }

            toast.success("Evento actualizado exitosamente", {
                position: "top-right",
                autoClose: 3000,
            });

            return true;
        } catch (error) {
            console.error("Error al actualizar el evento:", error);
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Error al actualizar el evento",
                    {
                        position: "top-right",
                        autoClose: 3000,
                    }
                );
            }
            return false;
        }
    },
})); 