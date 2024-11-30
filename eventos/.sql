-- Crear la base de datos
CREATE DATABASE eventos;
USE eventos;

-- Crear la tabla usuario
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) ,
    email VARCHAR(255) ,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) ,
    descripcion TEXT,
    fecha DATETIME,
    ubicacion VARCHAR(255),
    capacidad INT ,
    inscripciones INT ,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE inscripcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId INT ,
    eventoId INT ,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuarioId) REFERENCES usuario(id),
    FOREIGN KEY (eventoId) REFERENCES evento(id) 
);

INSERT INTO usuario (nombre, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('Ana Gómez', 'ana.gomez@example.com'),
('Carlos Martínez', 'carlos.martinez@example.com');

INSERT INTO evento (nombre, descripcion, fecha, ubicacion, capacidad,inscripciones) VALUES 
('Conferencia Tech', 'Una conferencia sobre avances tecnológicos', '2024-12-01', 'Auditorio Central', 100,56), 
('Taller de Innovación', 'Un taller práctico sobre creatividad e innovación', '2024-12-02', 'Sala 101', 50,10), 
('Seminario de Liderazgo', 'Aprende habilidades de liderazgo', '2024-12-03', 'Sala Magna', 75,34);