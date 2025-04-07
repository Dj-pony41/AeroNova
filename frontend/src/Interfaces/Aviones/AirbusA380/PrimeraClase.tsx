import '../../../Styles/Aviones/AirbusA380/AirbusA380Style.css'

const PrimeraClase = () => {
    const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    const grupos = [
        { filas: filas.slice(6, 9) }, // G-I
        { filas: filas.slice(3, 6) }, // D-F
        { filas: filas.slice(0, 3) }  // A-C
    ]

    return (
        <div className="primera-clase">
            <h4 className="titulo-zona">Primera Clase</h4>
            {grupos.map((grupo, i) => (
                <div className="bloque-ejecutiva" key={i}>
                    {grupo.filas.map((letra) => (
                        <div className="fila-con-letra" key={letra}>
                            <div className="letra-fila">{letra}</div>
                            <div className="fila">
                                {Array.from({ length: 10 }, (_, idx) => (
                                    <div key={idx} className="asiento ejecutivo" />
                                ))}
                            </div>
                            <div className="letra-fila">{letra}</div>
                        </div>
                    ))}
                    <div className="numeros numeros-ejecutiva">
                        {Array.from({ length: 10 }, (_, i) => (
                            <span key={i} className="numero">{String(i + 1).padStart(2, '0')}</span>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default PrimeraClase
