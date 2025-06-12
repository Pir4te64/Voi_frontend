export interface ProductoraPendiente {
    id: number;
    userId: number;
    razonSocial: string;
    cuit: string;
    dni: string;
    direccion: string;
    cbu: string;
    email: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
} 