export interface Lote {
    id: number;
    nombre: string;
    precio: number;
    fechaValidez: string;
    cantidadTickets: number;
    ticketsDisponibles: number;
    estado: string;
    tipoComision: "MONTO_FIJO" | "PORCENTAJE";
    montoComision: number;
    porcentajeComision: number;
    eventoId: number;
} 