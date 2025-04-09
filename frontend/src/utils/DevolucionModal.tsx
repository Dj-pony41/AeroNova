import '../Styles/DevolucionModal.css'

// Asegúrate de tener definido el tipo AsientoCompra
type AsientoCompra = {
  id: string
  pasajero: string
  pasaporte: string
  precio: number
  estado: 'Vendido' | 'Reservado'
}

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  asiento: AsientoCompra | null
}

const DevolucionModal = ({ visible, onClose, onConfirm, asiento }: Props) => {
  if (!visible || !asiento) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>Confirmar devolución</span>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body center">
          <div className="modal-icono">
            <span>ℹ️</span>
          </div>

          <h2 className="modal-titulo">¿ESTÁ SEGURO?</h2>
          <p className="modal-texto">
            ¿Seguro que quiere devolver el pasaje del asiento <strong>{asiento.id}</strong>? <br />
            Esto tomará 5 minutos.
          </p>

          <div className="botonera">
            <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button className="btn-aceptar" onClick={onConfirm}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevolucionModal
