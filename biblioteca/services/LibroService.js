const sequelize = require('../config/database'); // Ruta a tu archivo database.js

const Libro = require('../models/LibroModel');
const Prestamo = require('../models/PrestamoModel'); // Asegúrate de tener un modelo para gestionar los préstamos.

class LibroService {
    // Obtener todos los libros
    static async obtenerT() {
        try {
            const libros = await Libro.findAll();
            return libros;
        } catch (error) {
            console.error('Error al obtener los libros:', error.message);
            throw new Error('No se pudieron obtener los libros');
        }
    }

    // Obtener un libro por ID
    static async ObtenerLibroid(id) {
        try {
            const libro = await Libro.findByPk(id);
            if (!libro) {
                throw new Error('Libro no encontrado');
            }
            return libro;
        } catch (error) {
            console.error('Error al obtener el libro:', error.message);
            throw new Error('No se pudo obtener el libro');
        }
    }

    // Crear un nuevo libro
    static async crearLibro(datos) {
        try {
            const nuevoLibro = await Libro.create(datos);
            return nuevoLibro;
        } catch (error) {
            console.error('Error al crear el libro:', error.message);
            throw new Error('No se pudo crear el libro');
        }
    }

    // Actualizar un libro existente
    static async actualizarLibro(id, datos) {
        try {
            const [actualizado] = await Libro.update(datos, { where: { id } });
            if (actualizado === 0) {
                throw new Error('Libro no encontrado para actualizar');
            }
            // Opcional: Devolver el libro actualizado
            const libroActualizado = await Libro.findByPk(id);
            return libroActualizado;
        } catch (error) {
            console.error('Error al actualizar el libro:', error.message);
            throw new Error('No se pudo actualizar el libro');
        }
    }

    // Eliminar un libro
    static async eliminarLibro(id) {
        try {
            const eliminado = await Libro.destroy({ where: { id } });
            if (eliminado === 0) {
                throw new Error('Libro no encontrado para eliminar');
            }
            return { mensaje: 'Libro eliminado correctamente' };
        } catch (error) {
            console.error('Error al eliminar el libro:', error.message);
            throw new Error('No se pudo eliminar el libro');
        }
    }

    // Generar informe de los libros más solicitados
    static async librosMasSolicitados() {
        try {
            const resultado = await Prestamo.findAll({
                attributes: [
                    'libro_id',
                    [sequelize.fn('COUNT', sequelize.col('libro_id')), 'cantidad_prestamos'],
                ],
                include: [{
                    model: Libro,
                    attributes: ['titulo', 'autor'], // Asegúrate de que estas columnas existan
                }],
                group: ['libro_id'],
                order: [[sequelize.fn('COUNT', sequelize.col('libro_id')), 'DESC']],
                limit: 10,
            });
            return resultado;
        } catch (error) {
            console.error('Error al obtener los libros más solicitados:', error.message);
            throw new Error('No se pudieron obtener los libros más solicitados');
        }
    }

      
    
    // Generar informe de los préstamos más recientes
    static async prestamosMasRecientes() {
      try {
          const prestamosRecientes = await Prestamo.findAll({
              attributes: ['id', 'fecha_prestamo', 'estado'],
              order: [['fecha_prestamo', 'DESC']],
              limit: 10,
              include: [{
                  model: Libro,
                  attributes: ['titulo', 'autor']
              }]
          });
  
          return prestamosRecientes;
      } catch (error) {
          console.error('Error al obtener los préstamos recientes:', error.message);
          throw new Error('No se pudieron obtener los préstamos recientes');
      }
  }
  
}

module.exports = LibroService;
