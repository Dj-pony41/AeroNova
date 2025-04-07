import '../../../Styles/Aviones/AirbusA380/AirbusA380Style.css'
import PrimeraClase from './PrimeraClase'
import ClaseTurista from './ClaseTurista'
import { useState } from 'react'

const AirbusA380 = () => {
  const [piso, setPiso] = useState<'primero' | 'segundo'>('primero')

  return (
    <div className="airbus-container">
      <div className="airbus-tabs">
        <button className={piso === 'primero' ? 'tab active' : 'tab'} onClick={() => setPiso('primero')}>Primer Piso</button>
        <button className={piso === 'segundo' ? 'tab active' : 'tab'} onClick={() => setPiso('segundo')}>Segundo Piso</button>
      </div>

      <div className="airbus-layout">
        <div className="ejecutiva">
          <PrimeraClase />
        </div>

        <div className="turista">
          <ClaseTurista piso={piso} />
        </div>
      </div>
    </div>
  )
}

export default AirbusA380
