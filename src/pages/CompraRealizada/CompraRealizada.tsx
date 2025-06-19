import { useLocation, useNavigate } from 'react-router-dom';
import ComprasRealizadaInfo from '@/components/Compras/ComprasrealizadaInfo';
import Layout from '@/Layout';

const CompraRealizada = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ordenCompra = location.state?.ordenCompra;

    if (!ordenCompra) {
        navigate('/');
        return null;
    }

    return (
        <Layout>
            <ComprasRealizadaInfo ordenCompra={ordenCompra} />
        </Layout>
    );
};

export default CompraRealizada; 