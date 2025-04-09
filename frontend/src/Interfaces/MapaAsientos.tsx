import { useState } from 'react'

interface Props {
  totalAsientos: number
}

const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const columnas = 29

const MapaAsientos = ({ totalAsientos }: Props) => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<number[]>([])

  const generarEstado = (id: number) => {
    if (id % 17 === 0) return 'reservado'
    if (id % 13 === 0) return 'ocupado'
    return 'disponible'
  }

  const manejarSeleccion = (id: number) => {
    if (generarEstado(id) !== 'disponible') return
    setAsientosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const renderGrupo = (grupo: string[], offsetFila: number) => {
    return grupo.map((letra, filaIndex) => {
      const inicioFila = (filaIndex + offsetFila) * columnas
      return (
        <div className="fila-con-letra" key={letra}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: columnas }, (_, colIndex) => {
              const asientoId = inicioFila + colIndex + 1
              if (asientoId > totalAsientos) return null

              const estado = generarEstado(asientoId)
              const seleccionado = asientosSeleccionados.includes(asientoId)
              const clase =
                estado === 'reservado'
                  ? 'asiento reservado'
                  : estado === 'ocupado'
                  ? 'asiento ocupado'
                  : seleccionado
                  ? 'asiento seleccionado'
                  : 'asiento disponible'

              return (
                <div
                  key={asientoId}
                  className={clase}
                  onClick={() => manejarSeleccion(asientoId)}
                  title={`Asiento ${letra}${colIndex + 1}`}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      )
    })
  }

  const renderNumeros = () => (
    <div className="numeros">
      <div className="letra-fila espacio-wc" /> {/* Espacio izq */}
      <div className="fila">
        {Array.from({ length: columnas }, (_, i) => (
          <span key={i} className="numero">
            {String(i + 1).padStart(2, '0')}
          </span>
        ))}
      </div>
      <div className="letra-fila espacio-wc" /> {/* Espacio der */}
    </div>
  )

  return (
    <div className="mapa-contenedor">
      <div className="iconos-wc">🚻</div>
      {renderGrupo(filas.slice(0, 4), 0)}
      {renderNumeros()}
      {renderGrupo(filas.slice(4, 8), 4)}
      <div className="iconos-wc">🚻</div>
    </div>
  )
}

export default MapaAsientos