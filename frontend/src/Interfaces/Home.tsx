import { useEffect, useState, useRef } from 'react'
import '../Styles/HomeStyle.css'

import AirbusA380 from './Aviones/AirbusA380/AirbusA380'
import AirbusA319 from './Aviones/AirbusA319/AirbusA319'
import Boeing737900ER from './Aviones/Boeing737900ER/Boeing737900ER'
import AirbusA310 from './Aviones/AirbusA310/AirbusA310'
import Boeing7878 from './Aviones/Boeing7878/Boeing7878'
import AirbusA330neo from './Aviones/AirbusA330neo/AirbusA330neo'
import servidorIcon from '../assets/servidor.png'
import DevolucionModal from '../utils/DevolucionModal'
import SeleccionAsientoModal from '../utils/SeleccionAsientoModal'


type AsientoCompra = {
    id: string;
    pasajero: string;
    pasaporte: string;
    precio: number;
    estado: 'Vendido' | 'Reservado';
    enProcesoDeDevolucion?: boolean; // ← nueva propiedad
};


function Home() {
    const [currentTime, setCurrentTime] = useState("")
    const [location, setLocation] = useState("Bogotá, Colombia")
    const [selectedFlight, setSelectedFlight] = useState("B-101")

    const [asientosComprados, setAsientosComprados] = useState<AsientoCompra[]>([]);

    const [asientoADevolver, setAsientoADevolver] = useState<AsientoCompra | null>(null);

    const [devolucionModalVisible, setDevolucionModalVisible] = useState(false);

    const avionRef = useRef<any>(null);
    const actualizarEstadoTemporal = (id: string, nuevoEstado: string) => {
        if (avionRef.current && typeof avionRef.current.actualizarEstadoAsiento === 'function') {
            avionRef.current.actualizarEstadoAsiento(id, nuevoEstado);
        }
    };

    const [modalCompraVisible, setModalCompraVisible] = useState(false);
    const [asientoAComprar, setAsientoAComprar] = useState<AsientoCompra | null>(null);



    const flights = [
        { code: "B-101", route: "Ucrania(Kiev) - Bolivia(Cochabamba) 18:55 20/Abr/2024", aircraft: "A380" },
        { code: "B-202", route: "Argentina(Buenos Aires) - Perú(Lima) 14:30 22/Abr/2024", aircraft: "A319" },
        { code: "B-303", route: "México(CDMX) - Colombia(Bogotá) 10:15 25/Abr/2024", aircraft: "737" },
        { code: "B-404", route: "Brasil(Rio) - Ecuador(Quito) 11:00 26/Abr/2024", aircraft: "A310" },
        { code: "B-505", route: "España(Madrid) - Chile(Santiago) 17:40 27/Abr/2024", aircraft: "787" },
        { code: "B-606", route: "Francia(París) - Panamá(Ciudad) 08:20 29/Abr/2024", aircraft: "A330" },
    ]

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = {
                weekday: "short",
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }
            setCurrentTime(now.toLocaleString("es-CO", options))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    const registrarCompra = (id: string, pasajero: string, pasaporte: string, precio: number) => {
        setAsientosComprados((prev) => [...prev, { id, pasajero, pasaporte, precio, estado: 'Vendido' }]);
    };

    const registrarReserva = (id: string, pasajero: string, pasaporte: string, precio: number) => {
        setAsientosComprados((prev) => [...prev, { id, pasajero, pasaporte, precio, estado: 'Reservado' }]);
    };



    return (
        <div className="container">
            <header className="header">
                <h1>Sistema de Reserva de Asientos</h1>
                <p>Seleccione un asiento disponible para continuar</p>
            </header>

            <div className="panel">
                <div className="location">
                    <label>Estoy comprando desde</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option>Bogotá, Colombia</option>
                        <option>Medellín, Colombia</option>
                        <option>Cali, Colombia</option>
                        <option>Cartagena, Colombia</option>
                    </select>
                </div>

                {/* Servidores */}
                <div className="servers">
                    <div className="server-option active">
                        <img src={servidorIcon} alt="MySQL" />
                        <span>MySQL</span>
                    </div>
                    <div className="server-option">
                        <img src={servidorIcon} alt="MySQL2" />
                        <span>MySQL2</span>
                    </div>
                    <div className="server-option">
                        <img src={servidorIcon} alt="Mongo" />
                        <span>Mongo</span>
                    </div>
                </div>
                <div className="datetime">
                    <label>Fecha y hora actual</label>
                    <p>{currentTime}</p>
                </div>
            </div>

            <div className="flight-panel">
                <label>Vuelo</label>
                <select
                    className="flight-select"
                    value={selectedFlight}
                    onChange={(e) => setSelectedFlight(e.target.value)}
                >
                    {flights.map((flight) => (
                        <option key={flight.code} value={flight.code}>
                            {flight.code} {flight.route}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render del avión seleccionado */}
            {selectedFlight === "B-101" && <AirbusA380 />}
            {selectedFlight === "B-202" && (
                <AirbusA319
                    ref={avionRef}
                    onCompra={registrarCompra}
                    onReservar={registrarReserva}
                />
            )}
            {selectedFlight === "B-303" && <Boeing737900ER />}
            {selectedFlight === "B-404" && <AirbusA310 />}
            {selectedFlight === "B-505" && <Boeing7878 />}
            {selectedFlight === "B-606" && <AirbusA330neo />}

            <div className="info-panel">
                {/* Estados de asientos */}
                <div className="card">
                    <h4>Estados de asientos</h4>
                    <div className="estados-grid">
                        <div className="estado">
                            <span className="color libre" />
                            <span>Libre</span>
                        </div>
                        <div className="estado">
                            <span className="color reserva" />
                            <span>Reserva</span>
                        </div>
                        <div className="estado">
                            <span className="color venta" />
                            <span>Venta</span>
                        </div>
                        <div className="estado">
                            <span className="color devolucion" />
                            <span>Devolución</span>
                        </div>
                    </div>

                    <hr style={{ borderColor: '#444', marginBottom: '0.8rem' }} />

                    <div className="estado">
                        <span className="color ejecutivo" />
                        <span>Clase Ejecutiva - <strong>$400</strong></span>
                    </div>
                    <div className="estado">
                        <span className="color turista" />
                        <span>Clase Turista - <strong>$200</strong></span>
                    </div>
                </div>

                {/* Información de vuelo */}
                <div className="card vuelo">
                    <h4>Información de vuelo</h4>
                    <div className="info-row">
                        <div>
                            <p><strong>Origen</strong></p>
                            <p className="subinfo">Ucrania - Kiev</p>
                        </div>
                        <div>
                            <p><strong>Hora local</strong></p>
                            <p className="subinfo">UTC+2 4:23:16</p>
                        </div>
                    </div>
                    <div className="info-row">
                        <div>
                            <p><strong>Destino</strong></p>
                            <p className="subinfo">Bolivia - Cochabamba</p>
                        </div>
                        <div>
                            <p><strong>Hora local</strong></p>
                            <p className="subinfo">UTC-4 22:23:16</p>
                        </div>
                    </div>
                </div>

                {asientosComprados.length > 0 && (
                    <div className="card compras">
                        <h4>Mis asientos comprados</h4>
                        <div className="lista-compras">
                            {asientosComprados.map((a, idx) => (
                                <div className="asiento-compra" key={idx}>
                                    <div className="detalle">
                                        {/* Estado-color dinámico */}
                                        <div className="id-linea">
                                            <span className={`estado-color ${a.estado.toLowerCase()}`} />
                                            <span className={`id ${a.estado.toLowerCase()}`}>{a.id}</span>
                                        </div>

                                        <span className="nombre">{a.pasajero}</span>
                                        <span className="pasaporte">Pasaporte: {a.pasaporte}</span>
                                        <span className={`precio ${a.estado.toLowerCase()}`}>
                                            ${a.precio}
                                        </span>
                                    </div>
                                    {a.enProcesoDeDevolucion && (
                                        <div className="barra-devolucion">
                                            <div className="barra-progreso" />
                                        </div>
                                    )}
                                    {/* Solo mostrar el botón si el asiento está reservado */}
                                    {a.estado === "Reservado" && (
                                        <>
                                            <button
                                                className="devolver-btn"
                                                onClick={() => {
                                                    setAsientoADevolver(a);
                                                    setDevolucionModalVisible(true);
                                                }}
                                            >
                                                ↻
                                            </button>

                                            <button
                                                className="comprar-btn"
                                                onClick={() => {
                                                    // Guardamos el asiento que vamos a confirmar compra
                                                    setAsientoAComprar(a);
                                                    setModalCompraVisible(true);
                                                }}
                                            >
                                                💳Comprar
                                            </button>
                                        </>
                                    )}


                                </div>
                            ))}
                        </div>

                        <div className="total">
                            <strong>Total:</strong>{" "}
                            <span style={{ color: "#3bdf93" }}>
                                ${asientosComprados.reduce((acc, a) => acc + a.precio, 0)}
                            </span>
                        </div>
                    </div>

                )}
                {devolucionModalVisible && asientoADevolver && (
                    <DevolucionModal
                        visible={devolucionModalVisible}
                        asiento={asientoADevolver}
                        onClose={() => setDevolucionModalVisible(false)}
                        onConfirm={() => {
                            if (!asientoADevolver) return;

                            // 1️⃣ Muestra la barra de devolución (estado visual)
                            setAsientosComprados(prev =>
                                prev.map(a =>
                                    a.id === asientoADevolver.id
                                        ? { ...a, enProcesoDeDevolucion: true }
                                        : a
                                )
                            );

                            // 2️⃣ Oculta el modal
                            setDevolucionModalVisible(false);

                            // 3️⃣ Cambia a estado "Devolución" cuando inicia la barra
                            actualizarEstadoTemporal(asientoADevolver.id, "Devolucion");

                            // 4️⃣ Espera 5 segundos y luego cambia a "Libre" y elimina del panel
                            setTimeout(() => {
                                actualizarEstadoTemporal(asientoADevolver.id, "Libre");

                                setAsientosComprados(prev =>
                                    prev.filter(a => a.id !== asientoADevolver.id)
                                );

                                setAsientoADevolver(null);
                            }, 5000);
                        }}
                    />
                )}
                {modalCompraVisible && asientoAComprar && (
                    <SeleccionAsientoModal
                        visible={modalCompraVisible}
                        onClose={() => setModalCompraVisible(false)}
                        asiento={{
                            id: asientoAComprar.id,
                            estado: 'Reservado', // puede estar como vendido también si se desea protegerlo
                            precio: asientoAComprar.precio,
                        }}
                        onComprar={() => {
                            // Cambiar estado a Vendido visualmente
                            actualizarEstadoTemporal(asientoAComprar.id, "Vendido");

                            // Actualizar el array de asientos comprados
                            setAsientosComprados(prev =>
                                prev.map(a =>
                                    a.id === asientoAComprar.id
                                        ? { ...a, estado: "Vendido" }
                                        : a
                                )
                            );

                            setModalCompraVisible(false);
                        }}
                        onReservar={() => { }} // no es necesario usar en este caso
                    />
                )}

            </div>
        </div>
    )
}
export default Home
