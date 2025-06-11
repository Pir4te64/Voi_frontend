import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { FormikProps } from "formik";

interface RecoverPasswordFormProps {
  formik: FormikProps<{
    email: string;
    newPassword: string;
    code: string;
  }>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  onBack: () => void;
}

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = ({
  formik,
  showPassword,
  setShowPassword,
  onBack,
}) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 md:-top-64 md:left-6 md:h-10 md:w-10 lg:-top-28 lg:left-8 lg:h-8 lg:w-8"
      >
        <FaArrowLeft className="text-lg md:text-xl lg:text-xl" />
      </button>

      <h2 className="text-center text-3xl font-bold text-secondary md:text-5xl">
        Cambiar Contraseña
      </h2>

      <p className="text-center text-gray-300">
        Ingresa tus datos y el código de verificación para cambiar tu contraseña
      </p>

      {/* Email */}
      <FloatingField label="Email*">
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
        )}
      </FloatingField>

      {/* Código */}
      <FloatingField label="Código de Verificación*">
        <input
          id="code"
          type="text"
          maxLength={4}
          {...formik.getFieldProps("code")}
          className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
        />
        {formik.touched.code && formik.errors.code && (
          <p className="mt-1 text-sm text-red-400">{formik.errors.code}</p>
        )}
      </FloatingField>

      {/* Nueva Contraseña */}
      <div>
        <FloatingField label="Nueva Contraseña*">
          <div className="relative">
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("newPassword")}
              className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="mt-1 text-sm text-red-400">
              {formik.errors.newPassword}
            </p>
          )}
        </FloatingField>
        <p className="mt-2 text-sm text-gray-400">
          La contraseña debe contener al menos 8 caracteres, una mayúscula, una
          minúscula, un número y un carácter especial.
          <br />
          <span className="text-secondary">Importante: </span>
          La nueva contraseña no debe ser igual a la anterior.
        </p>
      </div>

      {/* Botón Recuperar */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
      >
        {formik.isSubmitting ? "Procesando…" : "Cambiar Contraseña"}
      </button>

      <div className="text-center">
        <Link to="/login">
          ¿Recordaste tu contraseña?{" "}
          <strong className="text-secondary underline">Iniciar Sesión</strong>
        </Link>
      </div>
    </form>
  );
};

export default RecoverPasswordForm;
