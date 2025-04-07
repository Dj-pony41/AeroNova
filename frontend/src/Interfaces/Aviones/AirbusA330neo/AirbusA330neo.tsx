import '../../../Styles/Aviones/AirbusA330neo/AirbusA330neo.css'

const AirbusA330neo = () => {
  const bloquesEjecutiva = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J']
  ]
  const grupoSuperior = ['A', 'B', 'C', 'D', 'E']
  const grupoInferior = ['F', 'G', 'H', 'I', 'J']
  const columnasEjecutiva = 8
  const columnasTurista = 30 // 2 bloques de 30 columnas

  const renderEjecutiva = () => (
    <div className="zona zona-ejecutiva">
      <h4 className="titulo-zona">Primera Clase</h4>
      {bloquesEjecutiva.map((bloque, bloqueIndex) => (
        <div key={bloqueIndex} className="bloque-ejecutiva">
          {bloque.map((letra) => (
            <div className="fila-con-letra" key={letra}>
              <div className="letra-fila">{letra}</div>
              <div className="fila fila-centro">
                {Array.from({ length: columnasEjecutiva }, (_, i) => (
                  <div
                    key={i}
                    className="asiento ejecutivo"
                    title={`Ejecutiva - ${letra}${i + 1}`}
                  />
                ))}
              </div>
              <div className="letra-fila">{letra}</div>
            </div>
          ))}
          <div className="numeros numeros-centro">
            {Array.from({ length: columnasEjecutiva }, (_, i) => (
              <span key={i} className="numero">{String(i + 1).padStart(2, '0')}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderTurista = () => (
    <div className="zona clase-turista">
      <h4 className="titulo-zona">Clase Turista</h4>

      {/* Grupo superior */}
      {grupoSuperior.map((letra) => (
        <div className="fila-con-letra" key={`sup-${letra}`}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: columnasTurista }, (_, i) => (
              <div key={i} className="asiento turista" title={`Turista - ${letra}${i + 1}`} />
            ))}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}

      {/* Números entre bloques */}
      <div className="fila-con-letra">
        <div className="letra-fila" />
        <div className="fila">
          {Array.from({ length: columnasTurista }, (_, i) => (
            <span key={i} className={`numero ${i === 30 ? 'espaciado' : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="letra-fila" />
      </div>

      {/* Grupo inferior */}
      {grupoInferior.map((letra) => (
        <div className="fila-con-letra" key={`inf-${letra}`}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: columnasTurista }, (_, i) => (
              <div key={i} className="asiento turista" title={`Turista - ${letra}${i + 1}`} />
            ))}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="a330neo-container-horizontal">
      {renderEjecutiva()}
      <div className="separator-bar" />
      {renderTurista()}
    </div>
  )
}

export default AirbusA330neo
