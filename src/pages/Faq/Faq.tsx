import Faqs from '@/components/Faq/Faqs'
import Layout from '@/Layout'
import { usePageTitle } from '@/context/usePageTitle';

const FaqPage = () => {
    usePageTitle('Preguntas frecuentes');
    return (
        <Layout>
            <Faqs />
        </Layout>
    )
}

export default FaqPage