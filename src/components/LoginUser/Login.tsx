import { FaEye, FaEyeSlash, FaGoogle, FaArrowLeft } from 'react-icons/fa'
import logoPequeno from "@/assets/Logo.svg"

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Separador from './Separador'
import Logos from './Logos'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row overflow-hidden bg-primary text-white">
      {/* Logo grande: debajo del form en mobile (con mt), a la izquierda en desktop */}
      <Logos />
      {/* Formulario */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-8 relative">
        {/* Logo pequeño top-right */}
        <div className="absolute top-4 right-4">
          <Link to="/" className="relative w-8 h-8 md:w-16 md:h-16">
            {/* Glow detrás: visible en all breakpoints */}
            <span
              className="
                absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4
                w-32 h-32
                md:w-52 md:h-52
                bg-secondary rounded-full
                filter blur-3xl md:blur-3xl opacity-80
                pointer-events-none
              "
            />
            <img
              src={logoPequeno}
              alt="Logo Pequeño"
              className="w-full cursor-pointer relative z-10 object-cover"
            />
          </Link>
        </div>

        <form className="w-full max-w-md lg:max-w-xl bg-opacity-80 p-4 md:p-6 mt-6 md:mt-0 rounded-lg relative space-y-6">
          {/* Back button */}
          <Link
            to="/"
            className="
              absolute -top-5 md:-top-64 lg:-top-28 left-4 md:left-6 lg:left-8
              w-8 h-8 md:w-10 md:h-10 lg:w-8 lg:h-8
              border border-white rounded-full
              flex items-center justify-center
              text-white hover:bg-white/10 transition
            "
          >
            <FaArrowLeft className="text-lg md:text-xl lg:text-xl" />
          </Link>

          <h2 className="text-3xl md:text-5xl font-bold text-secondary text-center">
            Hey! Venís?
          </h2>

          {/* Email */}
          <div className="group">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2  group-focus-within:text-secondary transition-colors"
            >
              Email*
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 bg-back border border-gray-600 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            />
          </div>

          {/* Contraseña */}
          <div className="relative group">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2  group-focus-within:text-secondary transition-colors"
            >
              Contraseña*
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-3 bg-back border border-gray-600 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            />
            <span
              className="absolute inset-y-0 right-3 top-5 flex items-center text-xl cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Ingreso como */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-2">
              Ingreso como*
            </label>
            <select
              id="role"
              className="w-full px-4 py-3 bg-back border border-gray-600 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            >
              <option>Productora</option>
              <option>Consumidor</option>
            </select>
          </div>

          {/* Botón Iniciar */}
          <button
            type="submit"
            className="w-full py-3 md:py-3 bg-secondary rounded-xl hover:bg-secondary/80 transition"
          >
            Iniciar Sesión
          </button>

          {/* ¿No tenés cuenta? */}
          <div className="text-center">
            <Link to="/register" className="">
              ¿No tenés una cuenta? <strong className='underline text-secondary'>Registrate</strong>
            </Link>
          </div>

          {/* Separador con "o" */}
          <Separador />

          {/* Continuar con Google */}
          <button
            type="button"
            className="w-full py-3 md:py-4 border border-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-700 transition"
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
