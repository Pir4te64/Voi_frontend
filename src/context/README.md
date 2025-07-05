# Hooks y Contextos

## usePageTitle

Hook personalizado para establecer el título de las páginas con el formato "VOI - título".

### Uso

```tsx
import { usePageTitle } from '@/context/usePageTitle';

const MiPagina: React.FC = () => {
  usePageTitle('Mi Página');
  
  return (
    <div>
      {/* Contenido de la página */}
    </div>
  );
};
```

### Características

- **Formato automático**: Agrega automáticamente el prefijo "VOI - " al título
- **Limpieza automática**: Restaura el título a "VOI" cuando el componente se desmonta
- **Reactivo**: Se actualiza automáticamente cuando cambia el título

### Ejemplos de uso

```tsx
// Página de inicio
usePageTitle('Inicio');

// Página de eventos
usePageTitle('Eventos');

// Página de perfil
usePageTitle('Mi Perfil');

// Página de compras
usePageTitle('Mis Compras');
```

### Resultado

El título de la página se mostrará como:
- "VOI - Inicio"
- "VOI - Eventos"
- "VOI - Mi Perfil"
- "VOI - Mis Compras" 