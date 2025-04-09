import '../Styles/VendidoModal.css'

interface Props {
  visible: boolean
  onClose: () => void
  asiento: {
    id: string
    estado: string
    precio: number
  } | null
}

const VendidoModal = ({ visible, onClose, asiento }: Props) => {
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
            <div className="estado-color vendido" />
            <div className="asiento-detalle">
              <p><strong>Asiento:</strong> {asiento.id}</p>
              <p className="estado"><strong>Estado:</strong> Vendido</p>
              <p className="preciovendido"><strong>Precio:</strong> ${asiento.precio}</p>
            </div>
          </div>

          <div className="icono-info vendido">ℹ️</div>
          <h2 className="titulo-estado vendido">VENDIDO</h2>
          <p className="descripcion vendido">Este asiento ya ha sido comprado por otro pasajero</p>

          <button className="btn-aceptar2" onClick={onClose}>Aceptar</button>
        </div>

      </div>
    </div>
  )
}

export default VendidoModal
