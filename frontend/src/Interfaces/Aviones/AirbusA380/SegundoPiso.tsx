import '../../../Styles/Aviones/AirbusA380/AirbusA380Style.css'
import PrimeraClaseSegundoPiso from './PrimeraClaseSegundoPiso'

const SegundoPiso = () => {
    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const grupoSuperior = filas.slice(5, 10) // F-J
    const grupoInferior = filas.slice(0, 5)  // A-E

    const renderGrupo = (grupo: string[], offset: number) => (
        grupo.map((letra, filaIndex) => (
            <div className="fila-con-letra" key={letra}>
                <div className="letra-fila">{letra}</div>
                <div className="fila">
                    {Array.from({ length: 29 }, (_, idx) => (
                        <div key={idx} className="asiento turista" />
                    ))}
                </div>
                <div className="letra-fila">{letra}</div>
            </div>
        ))
    )

    return (
        <>
          <div className="ejecutiva">
          <PrimeraClaseSegundoPiso />
          </div>
          <div className="turista">
            <div className="turista-layout">
              <h4 className="titulo-zona">Clase Turista - Segundo Piso</h4>
             
              {renderGrupo(grupoSuperior, 0)}
              <div className="numeros">
                {Array.from({ length: 29 }, (_, i) => (
                  <span key={i} className="numero">{String(i + 30).padStart(2, '0')}</span>
                ))}
              </div>
              {renderGrupo(grupoInferior, 5)}
             
            </div>
          </div>
        </>
      )
}

export default SegundoPiso
