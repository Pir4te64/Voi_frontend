import Register from "@/components/Register/Register"
import { ToastContainer } from "react-toastify"
import { usePageTitle } from '@/context/usePageTitle';

const RegisterPage = () => {
    usePageTitle('Registro');
    return (
        <div>
            <ToastContainer />
            <Register />
        </div>
    )
}

export default RegisterPage