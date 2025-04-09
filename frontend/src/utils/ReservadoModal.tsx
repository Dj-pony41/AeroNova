// src/Components/ReservaModal.tsx
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

const ReservaModal = ({ visible, onClose, asiento }: Props) => {
  if (!visible || !asiento) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>Información de Asiento</span>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="info-asiento">
            <div className="estado-color reservado" />
            <div className="asiento-detalle">
              <p><strong>Asiento:</strong> {asiento.id}</p>
              <p className="estado"><strong>Estado:</strong> Reservado</p>
              <p className="precio"><strong>Precio:</strong> ${asiento.precio}</p>
            </div>
          </div>

          <div className="icono-info reservado">ℹ️</div>
          <h2 className="titulo-estado reservado">RESERVADO</h2>
          <p className="descripcion reservado">Este asiento ya ha sido reservado por otro pasajero</p>

          <button className="btn-aceptar1" onClick={onClose}>Aceptar</button>
        </div>




      </div>
    </div>
  )
}

export default ReservaModal
