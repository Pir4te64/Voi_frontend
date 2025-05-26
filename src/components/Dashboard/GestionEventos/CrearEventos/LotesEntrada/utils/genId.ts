/** Devuelve un ID único corto sin depender de librerías externas */
export const genId = () =>
  crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
