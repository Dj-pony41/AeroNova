-- Creación de la base de datos (MySQL no tiene opciones de archivos como SQL Server)
CREATE DATABASE IF NOT EXISTS AeroNova CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE AeroNova;

-- Tabla Destino
CREATE TABLE Destino (
    IdDestino INT NOT NULL,
    Ciudad VARCHAR(100),
    Pais VARCHAR(100),
    Aeropuerto VARCHAR(150),
    CodigoIATA VARCHAR(10),
    PRIMARY KEY (IdDestino)
) ENGINE=InnoDB;

-- Tabla Nave
CREATE TABLE Nave (
    IdNave INT NOT NULL,
    Tipo VARCHAR(50),
    CapacidadEjecutiva INT,
    CapacidadTuristica INT,
    Matricula VARCHAR(20),
    UltimoVuelo BIGINT,
    HorasVueloTotal DECIMAL(10, 2),
    CiclosVuelo INT,
    DistanciaTotal DECIMAL(10, 2),
    PRIMARY KEY (IdNave),
    UNIQUE KEY (Matricula)
) ENGINE=InnoDB;

-- Tabla Ruta
CREATE TABLE Ruta (
    IdRuta INT NOT NULL,
    CostoEjecutiva DECIMAL(10, 2),
    CostoTuristica DECIMAL(10, 2),
    OrigenID INT,
    DestinoID INT,
    PRIMARY KEY (IdRuta),
    FOREIGN KEY (OrigenID) REFERENCES Destino(IdDestino),
    FOREIGN KEY (DestinoID) REFERENCES Destino(IdDestino)
) ENGINE=InnoDB;

-- Tabla Vuelo
CREATE TABLE Vuelo (
    IdVuelo INT NOT NULL,
    FechaHoraSalida BIGINT,
    IdRuta INT,
    IdNave INT,
    CodigoVuelo VARCHAR(10),
    EsInternacional TINYINT(1),
    FechaHoraLlegada BIGINT,
    PRIMARY KEY (IdVuelo),
    UNIQUE KEY (CodigoVuelo),
    FOREIGN KEY (IdRuta) REFERENCES Ruta(IdRuta),
    FOREIGN KEY (IdNave) REFERENCES Nave(IdNave)
) ENGINE=InnoDB;

-- Tabla Pasajero
CREATE TABLE Pasajero (
    Pasaporte INT NOT NULL,
    NombreCompleto VARCHAR(100),
    PRIMARY KEY (Pasaporte)
) ENGINE=InnoDB;

-- Tabla Asiento
CREATE TABLE Asiento (
    IdAsiento INT NOT NULL,
    IdVuelo INT,
    NumeroAsiento VARCHAR(10),
    Clase VARCHAR(10),
    Estado VARCHAR(15),
    UltimaActualizacion BIGINT,
    VectorClock JSON,
    PRIMARY KEY (IdAsiento),
    FOREIGN KEY (IdVuelo) REFERENCES Vuelo(IdVuelo),
    CONSTRAINT chk_Clase CHECK (Clase IN ('Turistica', 'Ejecutiva')),
    CONSTRAINT chk_Estado CHECK (Estado IN ('Devolucion', 'Vendido', 'Reservado', 'Libre'))
) ENGINE=InnoDB;

-- Tabla HistorialAsiento
CREATE TABLE HistorialAsiento (
    IdHistorial INT NOT NULL AUTO_INCREMENT,
    IdAsiento INT,
    EstadoAnterior VARCHAR(15),
    EstadoNuevo VARCHAR(15),
    EpochCambio BIGINT,
    NodoOrigen INT,
    PRIMARY KEY (IdHistorial),
    FOREIGN KEY (IdAsiento) REFERENCES Asiento(IdAsiento)
) ENGINE=InnoDB;

-- Tabla Transaccion
CREATE TABLE Transaccion (
    IdTransaccion INT NOT NULL,
    IdAsiento INT,
    Pasaporte INT,
    Operacion VARCHAR(15),
    FechaOperacion BIGINT,
    OrigenTransaccion VARCHAR(30),
    VectorClock JSON,
    ServidorConectado INT,
    PRIMARY KEY (IdTransaccion),
    FOREIGN KEY (IdAsiento) REFERENCES Asiento(IdAsiento),
    FOREIGN KEY (Pasaporte) REFERENCES Pasajero(Pasaporte),
    CONSTRAINT chk_Operacion CHECK (Operacion IN ('Devolucion', 'Anulacion', 'Venta', 'Reserva'))
) ENGINE=InnoDB;