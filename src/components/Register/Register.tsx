import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import logoGrande from "@/assets/LogoGrande.svg"
import logoPequeno from "@/assets/Logo.svg"
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="min-h-screen flex bg-primary text-white">
      {/* Left: Large logo section */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <img
          src={logoGrande}
          alt="Logo Grande"
          className="w-[32rem] h-auto mb-4"
        />
      </div>

      {/* Right: Form section */}
      <div className="w-1/2 relative flex items-center justify-center p-8">
        {/* Small logo top-right with link */}
        <Link to="/">
          <img
            src={logoPequeno}
            alt="Logo Pequeño"
            className="absolute top-4 right-4 w-16 h-auto cursor-pointer"
          />
        </Link>

        {/* Form container */}
        <form className="w-full max-w-xl bg-primary bg-opacity-80 p-6 rounded-lg">
          <h2 className="text-5xl font-bold mb-6 text-secondary text-center">Hey! Venís?</h2>

          <label className="block mb-4">
            <span className="text-sm">Email*</span>
            <input
              type="email"
              placeholder="tu@email.com"
              className="mt-1 block w-full px-4 py-2 bg-back border border-gray-600 rounded-xl focus:outline-none"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm">Contraseña*</span>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className="block w-full px-4 py-2 bg-back border border-gray-600 rounded-xl focus:outline-none"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>

          <label className="block mb-6">
            <span className="text-sm">Ingreso como*</span>
            <select className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none">
              <option>Productora</option>
              <option>Consumidor</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full py-2 mb-4 bg-secondary rounded-xl hover:bg-secondary/80 transition"
          >
            Iniciar Sesión
          </button>

          <div className="text-center mb-4">
            ¿No tenés una cuenta?{' '}
            <a href="/register" className="text-secondary underline">
              Registrate
            </a>
          </div>

          <button
            type="button"
            className="w-full py-2 border border-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-700 transition"
          >
            <span className="mr-2">G</span>Continuar con Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
