import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { api_url } from "@/api/api";
import { useAuth } from "@/context/AuthContext";

// Esquemas de validación
const requestValidationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
});

const recoverValidationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  newPassword: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
    )
    .required("La nueva contraseña es requerida"),
  code: Yup.string()
    .length(4, "El código debe tener 4 caracteres")
    .required("El código es requerido"),
});

export const useRecuperarPassword = () => {
  const [step, setStep] = useState<"request" | "recover">("request");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  // Formulario para solicitar el código
  const requestFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: requestValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${api_url.request_retrieve}?email=${encodeURIComponent(
            values.email
          )}`
        );

        if (
          response.status === 202 &&
          response.data.description.includes("ACCEPTED")
        ) {
          toast.success(
            "Se ha enviado un código de verificación a tu correo electrónico",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
          setStep("recover");
        }
      } catch (error) {
        console.error("Error al solicitar código:", error);
        toast.error(
          "Error al enviar el código. Por favor, intenta nuevamente.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    },
  });

  // Formulario para recuperar la contraseña
  const recoverFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      code: "",
    },
    validationSchema: recoverValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${api_url.recuperar_password}`,
          values
        );

        if (
          response.status === 202 &&
          response.data.description.includes("ACCEPTED")
        ) {
          // Intentar hacer login automático con las nuevas credenciales
          try {
            const loginResponse = await axios.post(api_url.login, {
              email: values.email,
              password: values.newPassword,
            });

            const { idUser, idProfile, userType, accessToken, refreshToken } =
              loginResponse.data;

            // Usar el hook de autenticación para hacer login
            login({ idUser, idProfile, userType, accessToken, refreshToken });

            toast.success("Contraseña actualizada exitosamente", {
              position: "top-right",
              autoClose: 3000,
              onClose: () => {
                window.location.href = "/";
              },
            });
          } catch (loginError) {
            console.error("Error al iniciar sesión:", loginError);
            toast.error(
              "La contraseña se actualizó pero no se pudo iniciar sesión automáticamente. Por favor, inicia sesión manualmente.",
              {
                position: "top-right",
                autoClose: 5000,
                onClose: () => {
                  window.location.href = "/login";
                },
              }
            );
          }
        }
      } catch (error) {
        console.error("Error al recuperar contraseña:", error);
        const axiosError = error as AxiosError<any>;
        toast.error(
          axiosError.response?.data?.error?.description?.[0] ||
            "Error al recuperar la contraseña. Por favor, intenta nuevamente.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    },
  });

  return {
    step,
    setStep,
    showPassword,
    setShowPassword,
    requestFormik,
    recoverFormik,
  };
};
