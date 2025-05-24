import { FaEye, FaEyeSlash, FaGoogle, FaArrowLeft } from 'react-icons/fa'
import logoPequeno from '@/assets/Logo.svg'
import { Link } from 'react-router-dom'
import Separador from '@/components/LoginUser/Separador'
import Logos from '@/components/LoginUser/Logos'
import { useLogin } from '@/components/LoginUser/store/useLogin'
import FloatingField from '@/components/Dashboard/ComponentesReutilizables/FloatingField'
import { ToastContainer } from 'react-toastify'

const Login: React.FC = () => {
  const { showPassword, setShowPassword, formik } = useLogin()

  return (
    <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
      <Logos />
      <ToastContainer />
      <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
        {/* Logo pequeño top-right */}
        <div className="absolute right-4 top-4">
          <Link to="/" className="relative h-8 w-8 md:h-16 md:w-16">
            <span className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-secondary opacity-80 blur-3xl filter md:h-52 md:w-52 md:blur-3xl" />
            <img
              src={logoPequeno}
              alt="Logo Pequeño"
              className="relative z-10 w-full cursor-pointer object-cover"
            />
          </Link>
        </div>

        {/* Formulario */}
        <form
          onSubmit={formik.handleSubmit}
          className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
        >
          {/* Back button */}
          <Link
            to="/"
            className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 md:-top-64 md:left-6 md:h-10 md:w-10 lg:-top-28 lg:left-8 lg:h-8 lg:w-8"
          >
            <FaArrowLeft className="text-lg md:text-xl lg:text-xl" />
          </Link>

          <h2 className="text-center text-3xl font-bold text-secondary md:text-5xl">
            Hey! Venís?
          </h2>

          {/* Email */}
          <FloatingField label="Email*">
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.email}
              </p>
            )}
          </FloatingField>

          {/* Contraseña */}
          <FloatingField label="Contraseña*">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
              className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
            <span
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-xl text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.password}
              </p>
            )}
          </FloatingField>

          {/* Botón Iniciar */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
          >
            {formik.isSubmitting ? 'Iniciando…' : 'Iniciar Sesión'}
          </button>

          <div className="text-center">
            <Link to="/register">
              ¿No tenés una cuenta?{' '}
              <strong className="text-secondary underline">Registrate</strong>
            </Link>
          </div>

          <Separador />

          <button
            type="button"
            className="flex w-full items-center justify-center rounded-xl border border-gray-600 py-3 transition hover:bg-gray-700"
          >
            <FaGoogle className="mr-2 text-xl" />
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
