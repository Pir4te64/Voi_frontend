import Login from "@/components/LoginUser/Login"
import { usePageTitle } from '@/context/usePageTitle';

const LoginPage = () => {
  usePageTitle('Login');
  return (
    <Login />
  )
}

export default LoginPage