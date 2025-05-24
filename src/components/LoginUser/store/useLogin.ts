// src/hooks/useLogin.ts
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    loginInitialValues,
    loginValidationSchema
} from '@/components/LoginUser/store/login.schema'
import { api_url } from '@/api/api'

export const useLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: loginValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post(api_url.login, values)
                const { idUser, idProfile, userType, accessToken, refreshToken } = response.data

                // 1. Guardar en localStorage
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ idUser, idProfile, userType, accessToken, refreshToken })
                )

                // 2. Mostrar notificación de éxito y redirigir después de que desaparezca
                toast.success('Se inició sesión correctamente', {
                    position: 'top-right',
                    autoClose: 2000,
                    onClose: () => navigate('/'),
                })
            } catch (error: any) {
                console.error('Login error:', error)
                toast.error(error.response?.data?.message || 'No se pudo iniciar sesión', {
                    position: 'top-right',
                    autoClose: 3000,
                })
            } finally {
                setSubmitting(false)
            }
        }
    })

    return { showPassword, setShowPassword, formik }
}
