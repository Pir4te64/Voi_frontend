import QuienesSomos from "@/components/QuienesSomos/QuienesSomos"
import Layout from "@/Layout"
import { usePageTitle } from '@/context/usePageTitle';

const QuienesSomosPage = () => {
    usePageTitle('Quienes somos');
    return (
        <Layout>
            <QuienesSomos />
        </Layout>
    )
}

export default QuienesSomosPage