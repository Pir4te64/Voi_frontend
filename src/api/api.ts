const baseUrl = "http://localhost:8080/api/auth";

export const api_url = {
  login: `${baseUrl}/public/v1/login`,
  register_user: `${baseUrl}/public/v1/register/usuario`,
  register_productora: `${baseUrl}/public/v1/register/productora`,
  register_revendedor: `${baseUrl}/public/v1/register/revendedor`,
  get_me: `${baseUrl}/user/v1/get-me`,
  admin_solicitudes_get: `${baseUrl}/admin/v1/productoras/pending`,
  admin_solicitudes_put: `${baseUrl}/admin/v1/productoras/status`,
};
