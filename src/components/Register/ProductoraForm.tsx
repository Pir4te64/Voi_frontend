// src/components/LoginUser/ProductoraForm.tsx
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Logos from "@/components/LoginUser/Logos";
import SmallLogo from "@/components/Register/SmallLogo";
import logoPequeno from "@/assets/Logo.svg";
import { FloatingField } from "@/components/Dashboard/ComponentesReutilizables/FloatingField";
import { useProductoraRegistration } from "./storeLogin/useLoginUsuarioProductoraRegular";

interface ProductoraFormProps {
    onBack: () => void;
}

const ProductoraForm: React.FC<ProductoraFormProps> = ({ onBack }) => {
    const { formik } = useProductoraRegistration(onBack);
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
    } = formik;

    return (
        <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-primary text-white md:flex-row">
            <Logos />
            <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
                <SmallLogo src={logoPequeno} />

                <form
                    onSubmit={handleSubmit}
                    className="relative mt-6 w-full max-w-md space-y-6 rounded-lg bg-opacity-80 p-4 md:mt-0 md:p-6 lg:max-w-xl"
                >
                    {/* Botón Volver */}
                    <button
                        type="button"
                        onClick={() => {
                            formik.resetForm();
                            onBack();
                        }}
                        className="absolute -top-5 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white text-white hover:bg-white/10"
                    >
                        <FaArrowLeft />
                    </button>

                    <h2 className="text-center text-3xl font-bold text-secondary md:text-4xl">
                        Registro Productora
                    </h2>



                    {/* Nombre legal/razón social */}
                    <FloatingField label="Nombre legal/razón social*" htmlFor="razonSocial">
                        <input
                            id="razonSocial"
                            name="razonSocial"
                            value={values.razonSocial}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.razonSocial && errors.razonSocial && (
                            <p className="mt-1 text-sm text-red-400">{errors.razonSocial}</p>
                        )}
                    </FloatingField>

                    {/* CUIT/CUIL */}
                    <FloatingField label="Nº de CUIT/CUIL*" htmlFor="cuit">
                        <input
                            id="cuit"
                            name="cuit"
                            value={values.cuit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.cuit && errors.cuit && (
                            <p className="mt-1 text-sm text-red-400">{errors.cuit}</p>
                        )}
                    </FloatingField>

                    {/* DNI */}
                    <FloatingField label="DNI del responsable*" htmlFor="dni">
                        <input
                            id="dni"
                            name="dni"
                            value={values.dni}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.dni && errors.dni && (
                            <p className="mt-1 text-sm text-red-400">{errors.dni}</p>
                        )}
                    </FloatingField>

                    {/* Dirección */}
                    <FloatingField label="Dirección legal*" htmlFor="direccion">
                        <input
                            id="direccion"
                            name="direccion"
                            value={values.direccion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.direccion && errors.direccion && (
                            <p className="mt-1 text-sm text-red-400">{errors.direccion}</p>
                        )}
                    </FloatingField>

                    {/* CBU */}
                    <FloatingField label="Nº CBU para pagos*" htmlFor="cbu">
                        <input
                            id="cbu"
                            name="cbu"
                            value={values.cbu}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.cbu && errors.cbu && (
                            <p className="mt-1 text-sm text-red-400">{errors.cbu}</p>
                        )}
                    </FloatingField>
                    {/* Email */}
                    <FloatingField label="Email*" htmlFor="email">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.email && errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                    </FloatingField>

                    {/* Contraseña */}
                    <FloatingField label="Contraseña*" htmlFor="password">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.password && errors.password && (
                            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                        )}
                    </FloatingField>

                    {/* Repetir Contraseña */}
                    <FloatingField label="Repetir Contraseña*" htmlFor="repeatPassword">
                        <input
                            id="repeatPassword"
                            name="repeatPassword"
                            type="password"
                            value={values.repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full rounded-xl border border-gray-600 bg-back px-4 py-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                        />
                        {touched.repeatPassword && errors.repeatPassword && (
                            <p className="mt-1 text-sm text-red-400">{errors.repeatPassword}</p>
                        )}
                    </FloatingField>
                    {/* Términos y Condiciones */}
                    <div className="flex flex-col items-center space-x-2">
                        <div className="mb-4 flex items-center space-x-2">
                            <input
                                id="termsAccepted"
                                name="termsAccepted"
                                type="checkbox"
                                checked={values.termsAccepted}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="h-4 w-4 appearance-none rounded border border-white bg-transparent checked:border-secondary checked:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                            />
                            <label htmlFor="termsAccepted" className="text-sm underline">
                                Ver Términos y Condiciones
                            </label>
                        </div>
                        <label htmlFor="termsAccepted" className="text-sm">
                            Acepto los Términos y Condiciones
                        </label>
                        {touched.termsAccepted && errors.termsAccepted && (
                            <p className="text-sm text-red-400">{errors.termsAccepted}</p>
                        )}
                    </div>

                    {/* Crear Cuenta */}
                    <button
                        type="submit"
                        disabled={!values.termsAccepted || !isValid}
                        className="w-full rounded-xl bg-secondary py-3 hover:bg-secondary/80 disabled:opacity-50"
                    >
                        Crear Cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductoraForm;
