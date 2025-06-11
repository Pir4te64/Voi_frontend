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
  get_eventos_productora: `${baseUrl}/eventos/user/v1/productora/listar-eventos`,
  delete_evento: `${baseUrl}/eventos/user/v1/eventos`,
  editar_evento: `${baseUrl}/eventos/user/v1/eventos`,
  // Endpoints de categorias
  get_categorias: `${baseUrl}/eventos/user/v1/categorias/get-all`,

  //Endpoint actualizar perfil
  update_profile: `${baseUrl}/auth/user/v1/profile/update`,


  // Endpoints de lotes
  crear_lote: `${baseUrl}/eventos/user/v1/lotes/eventos/lotes`,
  get_lotes_evento: (eventoId: number) => `${baseUrl}/eventos/user/v1/lotes/evento?eventoId=${eventoId}`,
  eliminar_lote: (eventoId: number, loteId: number) => `${baseUrl}/eventos/user/v1/lotes/eventos/lotes?eventoId=${eventoId}&loteId=${loteId}`,
  actualizar_tickets_disponibles: (loteId: number, nuevaCantidad: number) => `${baseUrl}/eventos/user/v1/lotes/tickets-disponibles?loteId=${loteId}&nuevaCantidad=${nuevaCantidad}`,

  // Endpoints para cambiar estado de lotes
  pausar_lote: (loteId: number) => `${baseUrl}/eventos/user/v1/lotes/pausar?loteId=${loteId}`,
  cancelar_lote: (loteId: number) => `${baseUrl}/eventos/user/v1/lotes/cancelar?loteId=${loteId}`,
  activar_lote: (loteId: number) => `${baseUrl}/eventos/user/v1/lotes/reactivar?loteId=${loteId}`,

  // Nuevo endpoint para recuperar contraseña
  recuperar_password: `${baseUrl}/auth/public/v1/recover-password`,
};

/**
 * Función para obtener los datos del usuario autenticado
 * @returns Promise con la respuesta de la API
 * @throws Error si no hay token o si la petición falla
 */
export const GETME = async () => {
  // Obtiene el token de autenticación del localStorage
  const token = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')!).accessToken
    : null;

  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  // Realiza la petición GET con el token en los headers
  const response = await axios.get(api_url.get_me, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Guardar en localStorage para mantener sincronizado
  localStorage.setItem('me', JSON.stringify(response.data));

  return response;
};