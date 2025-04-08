// utils/simuladorAsientos.ts

export type EstadoAsiento = "Libre" | "Vendido" | "Reservado"

export interface Asiento {
  id: string
  estado: EstadoAsiento
}

export function simularAsientos(cantidad: number): Asiento[] {
  const asientos: Asiento[] = []
  const vendidos = Math.floor(cantidad * (Math.random() * 0.2 + 0.4)) // 40% a 60%
  const reservados = Math.floor(cantidad * (Math.random() * 0.2 + 0.1)) // 10% a 30%
  const libres = cantidad - vendidos - reservados

  const estados: EstadoAsiento[] = [
    ...Array(vendidos).fill("Vendido"),
    ...Array(reservados).fill("Reservado"),
    ...Array(libres).fill("Libre"),
  ]

  // Mezclamos los estados
  estados.sort(() => Math.random() - 0.5)

  for (let i = 0; i < cantidad; i++) {
    asientos.push({
      id: `A${i + 1}`,
      estado: estados[i],
    })
  }

  return asientos
}
