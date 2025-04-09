import { useEffect, useState } from 'react'
import '../Styles/HomeStyle.css'

import AirbusA380 from './Aviones/AirbusA380/AirbusA380'
import AirbusA319 from './Aviones/AirbusA319/AirbusA319'
import Boeing737900ER from './Aviones/Boeing737900ER/Boeing737900ER'
import AirbusA310 from './Aviones/AirbusA310/AirbusA310'
import Boeing7878 from './Aviones/Boeing7878/Boeing7878'
import AirbusA330neo from './Aviones/AirbusA330neo/AirbusA330neo'
import servidorIcon from '../assets/servidor.png'



function Home() {
    const [currentTime, setCurrentTime] = useState("")
    const [location, setLocation] = useState("Bogotá, Colombia")
    const [selectedFlight, setSelectedFlight] = useState("B-101")

    


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
            {selectedFlight === "B-202" && <AirbusA319 />}
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
            </div>

        </div>
    )
}

export default Home
