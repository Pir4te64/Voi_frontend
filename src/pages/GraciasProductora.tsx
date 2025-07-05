import GraciasProductora from "@/components/Gracias/GraciasProductora"
import { usePageTitle } from '@/context/usePageTitle';

const GraciasProductoraPage = () => {
    usePageTitle('Gracias por tu ingreso');
    return (
        <GraciasProductora />
    )
}

export default GraciasProductoraPage