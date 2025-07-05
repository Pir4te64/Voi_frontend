import TablaComprasUsuario from '@/components/Dashboard/Compras/TablaComprasUsuario';
import { usePageTitle } from '@/context/usePageTitle';

export default function MisCompras() {
    usePageTitle('Mis compras');
    return <TablaComprasUsuario />;
} 