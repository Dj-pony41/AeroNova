import '../../../Styles/Aviones/AirbusA319/AirbusA319.css'

const AirbusA319 = () => {
    const filasEjecutiva = ['A', 'B', 'C']
    const grupoSuperior = ['A', 'B', 'C']
    const grupoInferior = ['D', 'E', 'F']
    

    const renderEjecutiva = () => (
        <div className="zona primera-clase">
            <h4 className="titulo-zona">Primera Clase</h4>
            {filasEjecutiva.map((letra) => (
                <div className="fila-con-letra" key={letra}>
                    <div className="letra-fila">{letra}</div>
                    <div className="fila fila-centro">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="asiento ejecutivo" title={`Ejecutiva - ${letra}${i + 1}`} />
                        ))}
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
      
          {/* Grupo superior */}
          {grupoSuperior.map((letra) => (
            <div className="fila-con-letra" key={`top-${letra}`}>
              <div className="letra-fila">{letra}</div>
              <div className="fila">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="asiento turista"
                    title={`Turista - ${letra}${i + 1}`}
                  />
                ))}
              </div>
              <div className="letra-fila">{letra}</div>
            </div>
          ))}
      
          {/* Números */}
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
      
          {/* Grupo inferior */}
          {grupoInferior.map((letra) => (
            <div className="fila-con-letra" key={`bottom-${letra}`}>
              <div className="letra-fila">{letra}</div>
              <div className="fila">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="asiento turista"
                    title={`Turista - ${letra}${i + 1}`}
                  />
                ))}
              </div>
              <div className="letra-fila">{letra}</div>
            </div>
          ))}
        </div>
      )
      

      return (
        <div className="a319-container-horizontal">
          <div className="zona zona-ejecutiva">
            {renderEjecutiva()}
          </div>
      
          <div className="separator-bar" />
      
          <div className="zona zona-turista">
            {renderTurista()}
          </div>
        </div>
      )
      
}

export default AirbusA319
