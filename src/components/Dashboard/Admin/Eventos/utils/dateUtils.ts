export interface FormattedDate {
    dia: string;
    mes: string;
    anio: number;
    diaSemana: string;
    hora: string;
}

/**
 * Formatea una fecha completa en español con todos sus componentes
 * @param fechaStr - Fecha en formato string (ISO o similar)
 * @returns Objeto con los componentes formateados de la fecha
 */
export function formatFechaCompleta(fechaStr: string): FormattedDate {
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = fecha.toLocaleString("es-ES", { month: "short" });
    const anio = fecha.getFullYear();
    const diaSemana = fecha.toLocaleString("es-ES", { weekday: "long" });
    const hora = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

    return { dia, mes, anio, diaSemana, hora };
}

/**
 * Formatea una fecha en formato corto (dd/mm/yyyy)
 * @param fechaStr - Fecha en formato string
 * @returns Fecha formateada como string
 */
export function formatFechaCorta(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

/**
 * Formatea solo la hora de una fecha
 * @param fechaStr - Fecha en formato string
 * @returns Hora formateada como string
 */
export function formatHora(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

/**
 * Formatea una fecha en formato largo (dd de mes de yyyy)
 * @param fechaStr - Fecha en formato string
 * @returns Fecha formateada como string
 */
export function formatFechaLarga(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
} 