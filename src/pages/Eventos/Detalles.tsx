import EventDetail from '@/components/Eventos/SeccionEventos/EventosDetalles'
import Layout from '@/Layout'
import { usePageTitle } from '@/context/usePageTitle';

const DetallesPage = () => {
    usePageTitle('Detalles del evento');
    return (
        <Layout>
            <EventDetail />
        </Layout>
    )
}

export default DetallesPage