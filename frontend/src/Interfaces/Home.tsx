import { useEffect, useState } from 'react'
import '../Styles/HomeStyle.css'
import MapaAsientos from './MapaAsientos'

function App() {
    const [currentTime, setCurrentTime] = useState("")
    const [location, setLocation] = useState("Bogotá, Colombia")

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

                <div className="datetime">
                    <label>Fecha y hora actual</label>
                    <p>{currentTime}</p>
                </div>
            </div>

            <div className="flight-panel">
                <label>Vuelo</label>
                <select className="flight-select">
                    <option>
                        B-101 Ucrania(Kiev) - Bolivia(Cochabamba) 18:55 20/Abr/2024
                    </option>
                    <option>
                        B-202 Argentina(Buenos Aires) - Perú(Lima) 14:30 22/Abr/2024
                    </option>
                    <option>
                        B-303 México(CDMX) - Colombia(Bogotá) 10:15 25/Abr/2024
                    </option>
                </select>
            </div>
            <MapaAsientos totalAsientos={255} />


        </div>
    )
}

export default App
