import { Dispatch, SetStateAction } from "react";

export interface EventoFormProps {
  resetKey: number;
  sliderImage: File | null;
  setSliderImage: (f: File) => void;
  eventImages: File[];
  setEventImages: Dispatch<SetStateAction<File[]>>;
  formik: any;
  categories: { id: number; nombre: string }[];
}

export interface MultiImageUploadProps {
  /** Texto de la etiqueta sobre el recuadro */
  label: string;
  /** Callback al seleccionar archivos válidos */
  onFilesSelect: (files: File[], previewUrls: string[]) => void;
  /** Texto o fragmento HTML para debajo del recuadro */
  description?: React.ReactNode;
  /** Tamaño máximo en bytes (por defecto 5 MB) */
  maxImageSize?: number;
}
