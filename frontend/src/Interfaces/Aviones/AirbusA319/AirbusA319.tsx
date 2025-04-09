import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import '../../../Styles/Aviones/AirbusA319/AirbusA319.css'
import { simularAsientos, Asiento, EstadoAsiento } from '../../../utils/simuladorAsientos'
import '../../../Styles/estadosAsientos.css'
import ReservadoModal from '../../../utils/ReservadoModal'
import VendidoModal from '../../../utils/VendidoModal'
import SeleccionAsientoModal from '../../../utils/SeleccionAsientoModal'

type AsientoSeleccionado = {
  id: string;
  estado: string;
  precio: number;
} | null;

export interface RefAvion {
  actualizarEstadoAsiento: (id: string, nuevoEstado: EstadoAsiento) => void;
}

interface Props {
  onCompra: (id: string, pasajero: string, pasaporte: string, precio: number) => void;
  onReservar: (id: string, pasajero: string, pasaporte: string, precio: number) => void;
}

export default forwardRef<RefAvion, Props>(({ onCompra, onReservar }, ref) => {
  const filasEjecutiva = ['A', 'B', 'C']
  const grupoSuperior = ['A', 'B', 'C']
  const grupoInferior = ['D', 'E', 'F']

  const [asientos, setAsientos] = useState<Asiento[]>([])
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoModal, setTipoModal] = useState<'' | 'reservado' | 'vendido' | 'seleccion'>('');
  const [asientoSeleccionado, setAsientoSeleccionado] = useState<AsientoSeleccionado>(null);

  useEffect(() => {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F']
    const columnas = 20
    setAsientos(simularAsientos(letras, columnas))
  }, [])

  useImperativeHandle(ref, () => ({
    actualizarEstadoAsiento(id: string, nuevoEstado: EstadoAsiento) {
      setAsientos(prev =>
        prev.map(a => a.id === id ? { ...a, estado: nuevoEstado } : a)
      );
    },
  }));

  const obtenerEstado = (letra: string, numero: number): string => {
    const id = `${letra}${numero}`
    return asientos.find(a => a.id === id)?.estado || 'libre'
  }

  const handleClickAsiento = (letra: string, numero: number, tipo: string) => {
    const id = `${letra}${numero}`;
    const estado = obtenerEstado(letra, numero);
    const precio = tipo === 'ejecutivo' ? 400 : 200;

    setModalVisible(false);
    setTipoModal('');
    setAsientoSeleccionado(null);

    setTimeout(() => {
      const nuevoAsiento = { id, estado, precio };
      setAsientoSeleccionado(nuevoAsiento);

      if (estado === 'Reservado') {
        setTipoModal('reservado');
      } else if (estado === 'Vendido') {
        setTipoModal('vendido');
      } else if (estado === 'Libre') {
        setTipoModal('seleccion');
      }

      setModalVisible(true);
    }, 10);
  };

  const actualizarEstadoAsiento = (nuevoEstado: "Vendido" | "Reservado") => {
    if (!asientoSeleccionado) return;

    const nuevos = asientos.map(a =>
      a.id === asientoSeleccionado.id ? { ...a, estado: nuevoEstado } : a
    );
    setAsientos(nuevos);
    setModalVisible(false);
    setAsientoSeleccionado(null);
  };

  const handleCompra = (pasajero: string, pasaporte: string) => {
    if (!asientoSeleccionado) return;
    actualizarEstadoAsiento("Vendido");
    onCompra(asientoSeleccionado.id, pasajero, pasaporte, asientoSeleccionado.precio);
    setModalVisible(false);
  };

  const handleReserva = (pasajero: string, pasaporte: string) => {
    if (!asientoSeleccionado) return;
    actualizarEstadoAsiento("Reservado");
    onReservar(asientoSeleccionado.id, pasajero, pasaporte, asientoSeleccionado.precio);
    setModalVisible(false);
  };

  const renderEjecutiva = () => (
    <div className="zona primera-clase">
      <h4 className="titulo-zona">Primera Clase</h4>
      {filasEjecutiva.map((letra) => (
        <div className="fila-con-letra" key={letra}>
          <div className="letra-fila">{letra}</div>
          <div className="fila fila-centro">
            {Array.from({ length: 10 }, (_, i) => {
              const estado = obtenerEstado(letra, i + 1)
              return (
                <div
                  key={i}
                  className={`asiento ejecutivo ${estado}`}
                  title={`Ejecutiva - ${letra}${i + 1} (${estado})`}
                  onClick={() => handleClickAsiento(letra, i + 1, 'ejecutivo')}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}
      <div className="numeros numeros-centro">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="numero">{String(i + 1).padStart(2, '0')}</span>
        ))}
      </div>
    </div>
  )

  const renderTurista = () => (
    <div className="zona clase-turista">
      <h4 className="titulo-zona">Clase Turista</h4>

      {grupoSuperior.map((letra) => (
        <div className="fila-con-letra" key={`top-${letra}`}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: 20 }, (_, i) => {
              const estado = obtenerEstado(letra, i + 1)
              return (
                <div
                  key={i}
                  className={`asiento turista ${estado}`}
                  title={`Turista - ${letra}${i + 1} (${estado})`}
                  onClick={() => handleClickAsiento(letra, i + 1, 'turista')}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}

      <div className="fila-con-letra">
        <div className="letra-fila"></div>
        <div className="fila">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className={`numero ${i === 20 ? 'espaciado' : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="letra-fila"></div>
      </div>

      {grupoInferior.map((letra) => (
        <div className="fila-con-letra" key={`bottom-${letra}`}>
          <div className="letra-fila">{letra}</div>
          <div className="fila">
            {Array.from({ length: 20 }, (_, i) => {
              const estado = obtenerEstado(letra, i + 1)
              return (
                <div
                  key={i}
                  className={`asiento turista ${estado}`}
                  title={`Turista - ${letra}${i + 1} (${estado})`}
                  onClick={() => handleClickAsiento(letra, i + 1, 'turista')}
                />
              )
            })}
          </div>
          <div className="letra-fila">{letra}</div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="a319-container-horizontal">
        <div className="zona zona-ejecutiva">{renderEjecutiva()}</div>
        <div className="separator-bar" />
        <div className="zona zona-turista">{renderTurista()}</div>
      </div>

      <ReservadoModal
        visible={modalVisible && tipoModal === 'reservado'}
        onClose={() => setModalVisible(false)}
        asiento={asientoSeleccionado}
      />

      <VendidoModal
        visible={modalVisible && tipoModal === 'vendido'}
        onClose={() => setModalVisible(false)}
        asiento={asientoSeleccionado}
      />

      <SeleccionAsientoModal
        visible={modalVisible && tipoModal === 'seleccion'}
        onClose={() => setModalVisible(false)}
        asiento={asientoSeleccionado}
        onComprar={handleCompra}
        onReservar={handleReserva}
      />
    </>
  )
});

