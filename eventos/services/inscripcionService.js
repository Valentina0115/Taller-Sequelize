
const { where } = require('sequelize');
let Inscripcion = require('../models/inscripcionModel');
let Usuario = require('../models/usuarioModel')
let Evento = require('../models/eventoModel');

class InscripcionService {
    static async obtenerT(){
        try{// findAll traer todo lo que tenga en metodo de siquelize 
           let evento = await Inscripcion.findAll();
           return evento
        } catch(e){
            console.log('error')
        }
    }

    static async inscribirUsuario(eventoId, usuarioId) {
        try {
            // Verificar que el evento existe
            let evento = await Evento.findByPk(eventoId);
            if (!evento) {
                return('Evento no encontrado');
            }

            // Verificar que hay cupo disponible
            if (evento.inscripciones >= evento.capacidad) {
                return('El evento está lleno');
            }

            // Crear la inscripción
            await Inscripcion.create({ usuarioId, eventoId });

            // Incrementar el contador de inscripciones del evento
            await Evento.update(
                { inscripciones: evento.inscripciones + 1 },
                { where: { id: eventoId } }
            );

            return { mensaje: `Inscripción exitosa en el evento: ${evento.nombre}` };
        } catch (error) {
            console.log(`Error al inscribir: ${error}`);
        }
       
    }

static async cancelar(usuarioId, eventoId){
    try {
        const inscripcion = await Inscripcion.findOne({
            where: { usuarioId, eventoId },
        });

        if (!inscripcion) {
            return  ('Inscripción no encontrada o no pertenece al usuario' );
        }

        let evento = await Evento.findByPk(eventoId);
            if (!evento) {
                return('Evento no encontrado');
            }
            // Eliminar la inscripción
            await inscripcion.destroy();

            // Reducir el contador de inscripciones del evento
            const nuevasInscripciones = evento.inscripciones - 1;
            await Evento.update(
                { inscripciones: nuevasInscripciones },
                { where: { id: eventoId } }
            );

    return { message: 'Inscripción cancelada con éxito' };
    } catch (error) {
        console.log('Error al cancelar la inscripción:', error);
    }
}

static async inscripciones(){
    try{
        let inscrip = await Inscripcion.findAll({
            attributes:[],
            include:[
            {
            model: Usuario,
            attributes:['nombre']
            },
            {
            model: Evento,
            attributes:['nombre']
            }
            ]
    })
    return inscrip;
        
    }catch{
        console.log('error al obtener inscripcion')
    }
}

}

module.exports = InscripcionService;
