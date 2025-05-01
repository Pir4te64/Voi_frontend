import { FaEye, FaEyeSlash, FaGoogle, FaArrowLeft } from 'react-icons/fa'
import logoGrande from "@/assets/LogoGrande.svg"
import logoPequeno from "@/assets/Logo.svg"
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex overflow-hidden bg-primary text-white">
      {/* Left: Large logo section */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 relative">
        {/* Glow bajo el logo grande */}
        <span
          className="
            absolute -bottom-10 left-56
            w-80 h-52
            bg-secondary rounded-full
            filter blur-3xl opacity-80
            pointer-events-none
          "
        />
        <img
          src={logoGrande}
          alt="Logo Grande"
          className="w-[36rem] h-auto mb-4 relative z-10"
        />
      </div>

      {/* Right: Form section */}
      <div className="w-1/2 relative flex items-center justify-center p-8 space-y-5">
        {/* Small logo top-right with glow */}
        <div className="absolute top-4 right-4">
          <div className="relative w-16 h-16">
            <span
              className="
                absolute -top-10 -right-10
                w-52 h-52
                bg-secondary rounded-full
                filter blur-3xl opacity-80
                pointer-events-none
              "
            />
            <Link to="/">
              <img
                src={logoPequeno}
                alt="Logo Pequeño"
                className="w-16 h-auto cursor-pointer relative z-10"
              />
            </Link>
          </div>
        </div>

        {/* Form container */}
        <form className="w-full max-w-xl  bg-opacity-80 p-6 rounded-lg relative">
          {/* Back button above the heading */}
          <Link
            to="/"
            className="
              absolute -top-36 left-6
              w-10 h-10
              border border-white rounded-full
              flex items-center justify-center
              text-white hover:bg-white/10
              transition
            "
          >
            <FaArrowLeft />
          </Link>

          <h2 className="text-5xl font-bold mb-6 text-secondary text-center">
            Hey! Venís?
          </h2>

          {/* Email */}
          <div className="mb-4 group">
            <label
              htmlFor="email"
              className="
                block text-sm font-medium mb-1 text-gray-400
                group-focus-within:text-secondary transition-colors
              "
            >
              Email*
            </label>
            <input
              id="email"
              type="email"
              className="
                block w-full px-4 py-3
                bg-gray-700 border border-gray-600 rounded-xl
                focus:outline-none
                focus:border-secondary focus:ring-1 focus:ring-secondary
                transition-colors
              "
            />
          </div>

          {/* Contraseña */}
          <div className="mb-6 relative group">
            <label
              htmlFor="password"
              className="
                block text-sm font-medium mb-1 text-gray-400
                group-focus-within:text-secondary transition-colors
              "
            >
              Contraseña*
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="
                block w-full px-4 py-3
                bg-gray-700 border border-gray-600 rounded-xl
                focus:outline-none
                focus:border-secondary focus:ring-1 focus:ring-secondary
                transition-colors
              "
            />
            <span
              className="
                absolute inset-y-0 right-3 top-6 flex items-center
                cursor-pointer text-xl text-gray-400 hover:text-gray-200
              "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Ingreso como */}
          <label className="block mb-6">
            <span className="text-sm">Ingreso como*</span>
            <select
              className="
                mt-1 block w-full px-4 py-4
                bg-gray-700 border border-gray-600 rounded-xl
                focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary
              "
            >
              <option>Productora</option>
              <option>Consumidor</option>
            </select>
          </label>

          <button
            type="submit"
            className="
              w-full py-4 mb-4
              bg-secondary rounded-xl hover:bg-secondary/80
              transition
            "
          >
            Iniciar Sesión
          </button>

          {/* ¿No tenés una cuenta? */}
          <div className="text-center mt-6">
            ¿No tenés una cuenta?{' '}
            <Link to="/register" className="text-secondary underline font-bold">
              Registrate
            </Link>
          </div>

          {/* Separador con "o" */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-400">o</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Continuar con Google */}
          <button
            type="button"
            className="
              w-full py-4 border border-gray-600 rounded-xl
              flex items-center justify-center
              hover:bg-gray-700 transition
            "
          >
            <FaGoogle className="mr-2 text-xl" />
            Continuar con Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
