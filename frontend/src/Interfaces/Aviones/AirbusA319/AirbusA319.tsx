import { useEffect, useState } from 'react'
import '../../../Styles/Aviones/AirbusA319/AirbusA319.css'
import { simularAsientos, Asiento } from '../../../utils/simuladorAsientos'
import '../../../Styles/estadosAsientos.css'
import ReservadoModal from '../../../utils/ReservadoModal' // ajusta si tu ruta es distinta


type AsientoSeleccionado = {
  id: string;
  estado: string;
  precio: number;
} | null;


const AirbusA319 = () => {
  const filasEjecutiva = ['A', 'B', 'C']
  const grupoSuperior = ['A', 'B', 'C']
  const grupoInferior = ['D', 'E', 'F']
  const totalAsientos = 150

  const [asientos, setAsientos] = useState<Asiento[]>([])
  const [modalVisible, setModalVisible] = useState(false)
  const [asientoSeleccionado, setAsientoSeleccionado] = useState<AsientoSeleccionado>(null)

  useEffect(() => {
    setAsientos(simularAsientos(totalAsientos))
  }, [])

  const obtenerEstado = (letra: string, numero: number): string => {
    const id = `${letra}${numero}`
    return asientos.find(a => a.id === id)?.estado || 'libre'
  }

  const handleClickAsiento = (letra: string, numero: number, tipo: string) => {
    const id = `${letra}${numero}`;
    const estado = obtenerEstado(letra, numero);
    if (estado === 'libre') return;
  
    const precio = tipo === 'ejecutivo' ? 400 : 200;
    setAsientoSeleccionado({ id, estado, precio }); // ahora sí, todo está correcto
    setModalVisible(true);
  };
  

  const renderEjecutiva = () => (
    <div className="zona primera-clase">
      <h4 className="titulo-zona">Primera Clase</h4>
      {filasEjecutiva.map((letra) => (
        <div className="fila-con-letra" key={letra}>
          <div className="letra-fila">{letra}</div>
          <div className="fila fila-centro">
            {Array.from({ length: 10 }, (_, i) => {
              const estado = obtenerEstado(letra, i + 1)
              return (
                <div
                  key={i}
                  className={`asiento ejecutivo ${estado}`}
                  title={`Ejecutiva - ${letra}${i + 1} (${estado})`}
                  onClick={() => handleClickAsiento(letra, i + 1, 'ejecutivo')}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}
      <div className="numeros numeros-centro">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="numero">{String(i + 1).padStart(2, '0')}</span>
        ))}
      </div>
    </div>
  )

  const renderTurista = () => (
    <div className="zona clase-turista">
      <h4 className="titulo-zona">Clase Turista</h4>

      {grupoSuperior.map((letra) => (
        <div className="fila-con-letra" key={`top-${letra}`}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: 20 }, (_, i) => {
              const estado = obtenerEstado(letra, i + 1)
              return (
                <div
                  key={i}
                  className={`asiento turista ${estado}`}
                  title={`Turista - ${letra}${i + 1} (${estado})`}
                  onClick={() => handleClickAsiento(letra, i + 1, 'turista')}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}

      <div className="fila-con-letra">
        <div className="letra-fila"></div>
        <div className="fila">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className={`numero ${i === 20 ? 'espaciado' : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="letra-fila"></div>
      </div>

      {grupoInferior.map((letra) => (
        <div className="fila-con-letra" key={`bottom-${letra}`}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: 20 }, (_, i) => {
              const estado = obtenerEstado(letra, i + 1)
              return (
                <div
                  key={i}
                  className={`asiento turista ${estado}`}
                  title={`Turista - ${letra}${i + 1} (${estado})`}
                  onClick={() => handleClickAsiento(letra, i + 1, 'turista')}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="a319-container-horizontal">
        <div className="zona zona-ejecutiva">{renderEjecutiva()}</div>
        <div className="separator-bar" />
        <div className="zona zona-turista">{renderTurista()}</div>
      </div>

      <ReservadoModal visible={modalVisible} onClose={() => setModalVisible(false)} asiento={asientoSeleccionado} />
    </>
  )
}

export default AirbusA319
