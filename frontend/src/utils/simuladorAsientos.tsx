// utils/simuladorAsientos.ts

export type EstadoAsiento = "Libre" | "Vendido" | "Reservado" | "Devolucion";

export interface Asiento {
  id: string
  estado: EstadoAsiento
}

export function simularAsientos(filas: string[], columnas: number): Asiento[] {
  const total = filas.length * columnas

  const vendidos = Math.floor(total * (Math.random() * 0.2 + 0.4)) // 40% a 60%
  const reservados = Math.floor(total * (Math.random() * 0.2 + 0.1)) // 10% a 30%
  const libres = total - vendidos - reservados

  const estados: EstadoAsiento[] = [
    ...Array(vendidos).fill("Vendido"),
    ...Array(reservados).fill("Reservado"),
    ...Array(libres).fill("Libre"),
    
  ]

  estados.sort(() => Math.random() - 0.5) // Mezclar

  const asientos: Asiento[] = []
  let index = 0

  for (const fila of filas) {
    for (let col = 1; col <= columnas; col++) {
      asientos.push({
        id: `${fila}${col}`,
        estado: estados[index++],
      })
    }
  }

  return asientos
}