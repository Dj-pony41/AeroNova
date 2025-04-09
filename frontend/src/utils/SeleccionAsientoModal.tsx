import '../Styles/SeleccionAsientoModal.css'
import { useEffect, useState } from 'react'

interface Props {
    visible: boolean;
    onClose: () => void;
    asiento: {
        id: string;
        estado: string;
        precio: number;
    } | null;
    onComprar: (pasajero: string, pasaporte: string) => void;
    onReservar: (pasajero: string, pasaporte: string) => void;
}


const SeleccionAsientoModal = ({
    visible,
    onClose,
    asiento,
    onComprar,
    onReservar
}: Props) => {
    const [pasajero, setPasajero] = useState("");
    const [pasaporte, setPasaporte] = useState("");

    if (!visible || !asiento) return null

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <span>Selección de Asiento</span>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="info-asiento">
                        <div className="estado-color" />
                        <div className="asiento-detalle">
                            <p><strong>Asiento:</strong> {asiento.id}</p>
                            <p className="estado"><strong>Estado:</strong> {asiento.estado}</p>
                            <p className="precio"><strong>Precio:</strong> ${asiento.precio}</p>
                        </div>
                    </div>

                    <label>Pasaporte</label>
                    <input
                        type="text"
                        value={pasaporte}
                        onChange={(e) => setPasaporte(e.target.value)}
                        placeholder="Ingrese el número de pasaporte"
                    />

                    <label>Pasajero</label>
                    <input
                        type="text"
                        value={pasajero}
                        onChange={(e) => setPasajero(e.target.value)}
                        placeholder="Nombre del pasajero"
                    />

                    <div className="botonera">
                        <button className="btn-comprar" onClick={() => onComprar(pasajero, pasaporte)}>Comprar</button>
                        <button className="btn-reservar" onClick={() => onReservar(pasajero, pasaporte)}>Reservar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeleccionAsientoModal
