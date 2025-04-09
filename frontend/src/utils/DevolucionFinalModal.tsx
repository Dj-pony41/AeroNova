import '../Styles/DevolucionModal.css' // Puedes usar el mismo CSS si ya tienes estilos base

interface Props {
  visible: boolean
  progreso: number // de 0 a 100
}

const DevolucionFinalModal = ({ visible, progreso }: Props) => {
  if (!visible) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>Procesando devolución</span>
        </div>

        <div className="modal-body center">
          <div className="modal-icono red">
            <span style={{ fontSize: "1.5rem" }}>🔄</span>
          </div>

          <h2 className="modal-titulo red">EN PROCESO</h2>
          <p className="modal-texto">
            Su devolución está siendo procesada. <br />
            Por favor espere...
          </p>

          <div className="barra-progreso">
            <div className="barra-interna" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevolucionFinalModal
