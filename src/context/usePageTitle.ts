import { useEffect } from 'react';

/**
 * Hook personalizado para establecer el título de la página
 * @param title - El título de la página (se agregará automáticamente el prefijo "VOI - ")
 */
export const usePageTitle = (title: string) => {
    useEffect(() => {
        const fullTitle = `VOI - ${title}`;
        document.title = fullTitle;

        // Opcional: restaurar el título original cuando el componente se desmonte
        return () => {
            document.title = 'VOI';
        };
    }, [title]);
};

export default usePageTitle; 