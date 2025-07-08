import React, { useEffect, useMemo } from 'react';
import { useComprasStore } from '@/components/Dashboard/Compras/store/useComprasStore';
import QRModal from '@/components/Dashboard/Compras/components/QRModal';
import TablaHeader from '@/components/Dashboard/Compras/components/TablaHeader';
import TablaBody from '@/components/Dashboard/Compras/components/TablaBody';
import TablaStates from '@/components/Dashboard/Compras/components/TablaStates';

interface TablaComprasUsuarioProps {
    titulo?: string;
    tipo?: 'compras' | 'ventas';
}

const TablaComprasUsuario: React.FC<TablaComprasUsuarioProps> = ({ titulo, tipo = 'compras' }) => {
    const {
        tickets,
        loading,
        error,
        page,
        totalPages,
        qrModal,
        filtros,
        setTipo,
        setTitulo,
        setQrModal,
        setPage,
        setFiltros,
        fetchTickets
    } = useComprasStore();

    // Extraer valores únicos para los filtros
    const estadosDisponibles = useMemo(() => {
        const estados = [...new Set(tickets.map(ticket => ticket.estado))];
        return estados.sort();
    }, [tickets]);

    const tiposDisponibles = useMemo(() => {
        const tipos = [...new Set(tickets.map(ticket => ticket.tipoTicket).filter((tipo): tipo is string => Boolean(tipo)))];
        return tipos.sort();
    }, [tickets]);

    // Configurar el tipo y título cuando cambian las props
    useEffect(() => {
        setTipo(tipo);
        if (titulo) {
            setTitulo(titulo);
        }
    }, [tipo, titulo, setTipo, setTitulo]);

    useEffect(() => {
        fetchTickets(page);
    }, [page, filtros, fetchTickets]);

    // Manejar cambios en los filtros
    const handleFiltrosChange = (nuevosFiltros: {
        estado: string;
        tipoTicket: string;
        nombreEvento: string;
        nombreLote: string;
    }) => {
        setFiltros(nuevosFiltros);
    };

    const safeTickets = Array.isArray(tickets) ? tickets : [];

    // Modal QR
    const closeModal = () => setQrModal(null);

    return (
        <div className="container mx-auto bg-[#131315] px-4 py-4 sm:py-8">
            <TablaHeader
                titulo={titulo}
                tipo={tipo}
                filtros={filtros}
                onFiltrosChange={handleFiltrosChange}
                estadosDisponibles={estadosDisponibles}
                tiposDisponibles={tiposDisponibles}
            />

            <TablaStates
                loading={loading}
                error={error}
                hasData={safeTickets.length > 0}
                tipo={tipo}
            />

            {!loading && !error && safeTickets.length > 0 && (
                <TablaBody
                    tickets={safeTickets}
                    tipo={tipo}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    onQrClick={setQrModal}
                />
            )}

            {/* Modal QR */}
            {qrModal && (
                <QRModal qrCode={qrModal} onClose={closeModal} />
            )}
        </div>
    );
};

export default TablaComprasUsuario; 