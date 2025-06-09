import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import EventoForm from '@/components/Dashboard/GestionEventos/CrearEventos/DetallesEvento/EventForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { api_url } from '@/api/api';
import axios from 'axios';



interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
}

interface Lote {
    id: number;
    nombre: string;
    tipoComision: 'PORCENTAJE' | 'MONTO_FIJO';
    precio: number;
    cantidadTickets: number;
    ticketsDisponibles: number;
    estado: string;
}

interface Revendedor {
    id: number;
    nombre: string;
    apellido: string;
    phoneNumber: string;
    email: string;
}

interface EventoData {
    id: number;
    productorId: number;
    nombre: string;
    descripcion: string;
    categoriaId: number;
    categoriaNombre: string;
    linkRedSocial1: string;
    linkRedSocial2?: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
    sliderImageUrl?: string;
    galeriaUrls?: string[];
    lotes?: Lote[];
    revendedores?: Revendedor[];
    address: Address;
}

const EditarEventoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const eventoData = location.state?.eventoData as EventoData;


    const [sliderImage, setSliderImage] = useState<File | null>(null);
    const [eventImages, setEventImages] = useState<File[]>([]);
    const [resetKey, _] = useState<number>(0);

    // Si no hay datos en la navegación, redirigimos al listado
    useEffect(() => {
        if (!eventoData) {
            toast.error('No se encontraron datos del evento', {
                position: "top-right",
                autoClose: 3000
            });
            navigate('/dashboard/eventos');
        }
    }, [eventoData, navigate]);

    const getAuthHeaders = () => {
        const auth = localStorage.getItem("auth");
        if (!auth) {
            throw new Error("No hay token de autenticación");
        }
        return {
            Authorization: `Bearer ${JSON.parse(auth).accessToken}`,
        };
    };

    const formik = useFormik({
        initialValues: {
            name: eventoData?.nombre || '',
            description: eventoData?.descripcion || '',
            startDate: eventoData?.fechaInicio?.split('T')[0] || '',
            endDate: eventoData?.fechaFin?.split('T')[0] || '',
            latitud: eventoData?.address?.latitude || '',
            longitud: eventoData?.address?.longitude || '',
            category: eventoData?.categoriaId || 0,
            social1: eventoData?.linkRedSocial1 || '',
            social2: eventoData?.linkRedSocial2 || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es requerido'),
            description: Yup.string().required('La descripción es requerida'),
            startDate: Yup.date().required('La fecha de inicio es requerida'),
            endDate: Yup.date()
                .min(Yup.ref('startDate'), 'La fecha de fin debe ser posterior a la fecha de inicio')
                .required('La fecha de fin es requerida'),
            latitud: Yup.string().required('La ubicación es requerida'),
            longitud: Yup.string().required('La ubicación es requerida'),
            category: Yup.number().required('La categoría es requerida'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();

                // Construir el objeto de evento con la estructura correcta
                const eventoUpdate = {
                    nombre: values.name,
                    descripcion: values.description,
                    latitud: values.latitud,
                    longitud: values.longitud,
                    categoriaId: Number(values.category),
                    linkRedSocial1: values.social1,
                    linkRedSocial2: values.social2 || '',
                    fechaInicio: values.startDate,
                    fechaFin: values.endDate
                };

                console.log('Objeto evento a enviar:', eventoUpdate);

                // Agregar el evento al FormData
                formData.append('evento', JSON.stringify(eventoUpdate));

                // Solo agregar la imagen del slider si el usuario seleccionó una nueva
                if (sliderImage && sliderImage instanceof File) {
                    console.log('Nueva imagen del slider seleccionada, agregando:', sliderImage.name);
                    formData.append('sliderImage', sliderImage);
                } else {
                    console.log('No se seleccionó nueva imagen para el slider, manteniendo la existente:', eventoData?.sliderImageUrl);
                }

                // Solo agregar imágenes de galería si el usuario seleccionó nuevas
                if (eventImages.length > 0 && eventImages.some(img => img instanceof File)) {
                    const newImages = eventImages.filter(img => img instanceof File);
                    newImages.forEach((image, index) => {
                        console.log(`Nueva imagen de galería ${index + 1} agregada:`, image.name);
                        formData.append('galeria', image);
                    });
                } else {
                    console.log('No se seleccionaron nuevas imágenes para la galería, manteniendo las existentes:', eventoData?.galeriaUrls);
                }

                // Log del FormData completo
                console.log('FormData entries:');
                for (let [key, value] of formData.entries()) {
                    if (value instanceof Blob) {
                        console.log(key, ':', value.type, value.size + ' bytes');
                    } else {
                        console.log(key, ':', value);
                    }
                }

                console.log('URL de la petición:', `${api_url.editar_evento}?eventoId=${id}`);

                // Realizar la petición PUT con el eventoId como query parameter
                const response = await axios.put(`${api_url.editar_evento}?eventoId=${id}`, formData, {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status !== 200) throw new Error('Error al actualizar el evento');

                console.log('Respuesta del servidor:', response.data);

                toast.success('Evento actualizado exitosamente', {
                    position: "top-right",
                    autoClose: 3000
                });
                navigate('/dashboard/crearevento');
            } catch (error) {
                console.error('Error al actualizar el evento:', error);
                if (axios.isAxiosError(error)) {
                    console.log('Error response:', error.response?.data);
                    toast.error(error.response?.data?.message || 'Error al actualizar el evento', {
                        position: "top-right",
                        autoClose: 3000
                    });
                }
            }
        },
    });

    if (!eventoData) {
        return null; // O un componente de carga si prefieres
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

            <h1 className="mb-8 text-3xl font-bold text-white">Editar Evento</h1>

            <EventoForm
                resetKey={resetKey}
                sliderImage={sliderImage}
                setSliderImage={setSliderImage}
                eventImages={eventImages}
                setEventImages={setEventImages}
                formik={formik}
                categories={[{ id: eventoData.categoriaId, nombre: eventoData.categoriaNombre }]}
                existingSliderUrl={eventoData?.sliderImageUrl}
                existingGalleryUrls={eventoData?.galeriaUrls}
            />
        </div>
    );
};

export default EditarEventoPage;