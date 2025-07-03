# Sistema de Dashboards por Tipo de Usuario

## Estructura

Este sistema implementa dashboards específicos para cada tipo de usuario, evitando conflictos de rutas y proporcionando una experiencia personalizada.

### Archivos Principales

- **`DashboardRouter.tsx`** - Componente router que renderiza el dashboard correcto según el tipo de usuario
- **`DashboardProductora.tsx`** - Dashboard específico para usuarios PRODUCTORA
- **`DashboardRevendedor.tsx`** - Dashboard específico para usuarios REVENDEDOR  
- **`DashboardUsuario.tsx`** - Dashboard específico para usuarios USUARIO
- **`Index.tsx`** - Dashboard específico para usuarios ADMIN (ya existía)

### Rutas

Todas las rutas de dashboard utilizan `/dashboard` como base, pero el contenido se renderiza dinámicamente según el tipo de usuario:

- **ADMIN**: `/dashboard` → `Index.tsx` (Dashboard Admin)
- **PRODUCTORA**: `/dashboard` → `DashboardProductora.tsx`
- **REVENDEDOR**: `/dashboard` → `DashboardRevendedor.tsx`
- **USUARIO**: `/dashboard` → `DashboardUsuario.tsx`

### Funcionamiento

1. El usuario navega a `/dashboard`
2. `DashboardRouter.tsx` verifica el tipo de usuario usando `useUserInfo()`
3. Se renderiza el componente de dashboard correspondiente
4. Cada dashboard muestra métricas y funcionalidades específicas para ese rol

### Métricas por Tipo de Usuario

#### Admin
- Productoras registradas
- Eventos activos
- Revendedores registrados
- Usuarios particulares
- Solicitudes pendientes

#### Productora
- Eventos activos
- Lotes de entrada
- Revendedores activos
- Ventas totales
- Tickets escaneados

#### Revendedor
- Tickets vendidos
- Ventas totales
- Comisiones generadas
- Eventos activos
- Notificaciones pendientes
- QR personalizado

#### Usuario Regular
- Mis compras
- Mis eventos
- Tickets activos
- Favoritos
- Historial

### Ventajas

✅ **Sin conflictos de rutas** - Todos usan `/dashboard` pero contenido diferente
✅ **Experiencia personalizada** - Cada usuario ve métricas relevantes
✅ **Escalable** - Fácil agregar nuevos tipos de usuario
✅ **Mantenible** - Código organizado y separado por responsabilidades 