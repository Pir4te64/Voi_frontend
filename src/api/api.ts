import axios from "axios";

// URL base de la API de producción
const baseUrl = "https://voi-gateway-production.up.railway.app/api";

/**
 * Objeto que contiene todas las URLs de los endpoints de la API
 * Organizado por funcionalidad:
 * - auth: Endpoints de autenticación
 * - eventos: Endpoints relacionados con eventos
 */
export const api_url = {
  // Endpoints públicos de autenticación
  login: `${baseUrl}/auth/public/v1/login`,
  register_user: `${baseUrl}/auth/public/v1/register/usuario`,
  register_productora: `${baseUrl}/auth/public/v1/register/productora`,
  register_revendedor: `${baseUrl}/auth/public/v1/register/revendedor`,

  // Endpoints protegidos que requieren autenticación
  get_me: `${baseUrl}/auth/user/v1/get-me`,
  admin_solicitudes_get: `${baseUrl}/auth/admin/v1/productoras/pending`,
  admin_solicitudes_put: `${baseUrl}/auth/admin/v1/productoras/status`,
  crear_evento: `${baseUrl}/eventos/user/v1/eventos`,
  get_eventos: `${baseUrl}/eventos/public/v1/eventos`,

  // Endpoints de categorias
  get_categorias: `${baseUrl}/eventos/user/v1/categorias/get-all`,

  //Endpoint actualizar perfil
  update_profile: `${baseUrl}/auth/user/v1/profile/update`,
};

/**
 * Función para obtener los datos del usuario autenticado
 * @returns Promise con la respuesta de la API
 * @throws Error si no hay token o si la petición falla
 */
export const GETME = () => {
  // Obtiene el token de autenticación del localStorage
  const token = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')!).accessToken
    : null;

  // Realiza la petición GET con el token en los headers
  return axios.get(api_url.get_me, {
    headers: { Authorization: `Bearer ${token}` },
  });
};