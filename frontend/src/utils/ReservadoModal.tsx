import '../Styles/ReservadoModal.css'

interface Props {
  visible: boolean
  onClose: () => void
  asiento: {
    id: string
    estado: string
    precio: number
  } | null
}

const ReservadoModal = ({ visible, onClose, asiento }: Props) => {
  if (!visible || !asiento) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>Información de Asiento</span>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className={`estado-color ${asiento.estado}`} />
          <p><strong>Asiento:</strong> {asiento.id}</p>
          <p><strong>Estado:</strong> {asiento.estado.charAt(0).toUpperCase() + asiento.estado.slice(1)}</p>
          <p><strong>Precio:</strong> ${asiento.precio}</p>

          <div className="icono-info">ℹ️</div>
          <h2 className="titulo-estado">
            {asiento.estado.toUpperCase()}
          </h2>
          <p className="descripcion">Este asiento ya ha sido reservado por otro pasajero</p>

          <button className="btn-aceptar" onClick={onClose}>Aceptar</button>
        </div>
      </div>
    </div>
  )
}

export default ReservadoModal
