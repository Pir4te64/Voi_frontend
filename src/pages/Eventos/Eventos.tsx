import SeccionEventos from "@/components/Eventos/SeccionEventos/SeccionEventos"
import Layout from "@/Layout"
import { usePageTitle } from '@/context/usePageTitle';

const EventosPage = () => {
    usePageTitle('Eventos');
    return (
        <Layout>
            <SeccionEventos />
        </Layout>
    )
}

export default EventosPage