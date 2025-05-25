import axios from "axios";

const baseUrl = "https://voi-gateway-production.up.railway.app/api";

export const api_url = {
  login: `${baseUrl}/auth/public/v1/login`,
  register_user: `${baseUrl}/auth/public/v1/register/usuario`,
  register_productora: `${baseUrl}/auth/public/v1/register/productora`,
  register_revendedor: `${baseUrl}/auth/public/v1/register/revendedor`,
  get_me: `${baseUrl}/auth/user/v1/get-me`,
  admin_solicitudes_get: `${baseUrl}/auth/admin/v1/productoras/pending`,
  admin_solicitudes_put: `${baseUrl}/auth/admin/v1/productoras/status`,
  crear_evento: `${baseUrl}/eventos/user/v1/eventos`,
};

export const GETME = () => {
  const token = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')!).accessToken
    : null;
  return axios.get(api_url.get_me, {
    headers: { Authorization: `Bearer ${token}` },
  });
};