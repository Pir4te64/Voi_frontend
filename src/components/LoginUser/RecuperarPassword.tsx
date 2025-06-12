import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logoPequeno from "@/assets/Logo.svg";
import logoGrande from "@/assets/LogoGrande.svg";
import { useRecuperarPassword } from "@/components/LoginUser/store/useRecuperarPassword";
import RequestCodeForm from "@/components/LoginUser/components/RequestCodeForm";
import RecoverPasswordForm from "@/components/LoginUser/components/RecoverPasswordForm";

const RecuperarPassword: React.FC = () => {
  const {
    step,
    setStep,
    showPassword,
    setShowPassword,
    requestFormik,
    recoverFormik,
  } = useRecuperarPassword();

  return (
    <div className="flex min-h-screen flex-col-reverse overflow-x-hidden bg-primary text-white md:flex-row">
      <ToastContainer />
      {/* Columna del logo grande */}
      <div className="hidden h-screen md:flex md:w-1/2 md:items-center md:justify-center">
        <div className="relative w-full max-w-lg p-8">
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-secondary opacity-20 blur-3xl filter"></div>
          <img
            src={logoGrande}
            alt="Logo Grande"
            className="relative z-10 w-full"
          />
        </div>
      </div>

      {/* Columna del formulario */}
      <div className="flex h-screen w-full items-center justify-center md:w-1/2">
        <div className="relative w-full px-6 py-8 md:px-8">
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

          {/* Formularios */}
          {step === "request" ? (
            <RequestCodeForm formik={requestFormik} />
          ) : (
            <RecoverPasswordForm
              formik={recoverFormik}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onBack={() => setStep("request")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;
