export interface Ticket {
    id: string;
    evento: string;
    estado: string;
    tipoTicket?: string;
    fechaEvento: string;
    fechaCompra: string;
    qrCode?: string;
}

export interface TablaComprasUsuarioProps {
    titulo?: string;
    tipo?: 'compras' | 'ventas';
}

export const estadoColors: Record<string, string> = {
    RESERVADO: 'bg-yellow-500/20 text-yellow-500',
    PAGADO: 'bg-green-500/20 text-green-500',
    UTILIZADO: 'bg-blue-500/20 text-blue-500',
    CANCELADO: 'bg-red-500/20 text-red-500',
}; 