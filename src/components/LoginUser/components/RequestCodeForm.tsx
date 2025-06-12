import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FloatingField from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { FormikProps } from "formik";

interface RequestCodeFormProps {
  formik: FormikProps<{
    email: string;
  }>;
}

const RequestCodeForm: React.FC<RequestCodeFormProps> = ({ formik }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
    >
      {/* Back button */}
      <Link
        to="/login"
        className="absolute -top-10 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10 md:-top-64 md:left-6 md:h-10 md:w-10 lg:-top-10 lg:left-8 lg:h-8 lg:w-8"
      >
        <FaArrowLeft className="text-lg md:text-xl lg:text-xl" />
      </Link>

      <h2 className="text-center text-3xl font-bold text-secondary md:text-5xl">
        Recuperar Contraseña
      </h2>

      <p className="text-center text-gray-300">
      Introducí tu correo y te enviaremos instrucciones para restablecer tu contraseña.
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

      {/* Botón Enviar Código */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full rounded-xl bg-secondary py-3 transition hover:bg-secondary/80 disabled:opacity-50"
      >
        {formik.isSubmitting ? "Enviando…" : "Enviar Código"}
      </button>

      <div className="text-center">
        <Link to="/login">
          Volver a {" "}
          <strong className="text-secondary underline">Iniciar Sesión</strong>
        </Link>
      </div>
    </form>
  );
};

export default RequestCodeForm;
