/**
 * Transforma las claves de un objeto (payload) según un mapeo dado.
 * Si la clave es "idAsiento", se deja sin cambios.
 *
 * @param payload - Objeto original con las claves a transformar.
 * @param mapping - Objeto que indica: key es el nombre original y value es el nuevo nombre deseado.
 * @returns Objeto transformado con las claves modificadas según el mapeo.
 */
export function transformPayload(payload: any, mapping: Record<string, string>): any {
    const transformed: any = {};
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const newKey = key === 'idAsiento' ? key : (mapping[key] || key);
        transformed[newKey] = payload[key];
      }
    }
    return transformed;
  }
  