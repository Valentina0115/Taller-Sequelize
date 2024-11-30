const { where } = require('sequelize');
let Usuario = require('../models/UsuarioModel')
class UsuarioService {
    static async verificarAdmin(usuario_id) {
        try {
          const usuario = await Usuario.findByPk(usuario_id);
          if (!usuario) {
            return false;
          }
          return usuario.rol === 'admin'; // Retorna true si el rol es admin
        } catch (error) {
          throw new Error('Error al verificar el rol del usuario: ' + error.message);
        }
      }
    static async obtenerT(){
        try{// findAll traer todo lo que tenga en metodo de siquelize 
           let usuario = await Usuario.findAll();
           return usuario
        } catch(e){
            console.log('error')
        }
    }
    static async ObtenerUsuarioid(id){
        try{
            let usuarioid= await Usuario.findByPk(id);
            if(!usuarioid){
                console.log('Usuario no encontrada')
            }else{
                return usuarioid
            }
            
        }catch(e){
            console.log('error al obtener la Usuario ')
        }
    }

    static async crearUsuario(datos){
        try {
           let catego =  await Usuario.create(datos)
           return catego
        } catch (e) {
            console.log('Usuario no creada'+e);
        }
    }

    static async actualizarUsuario(id, datos) {
        try {
            let [actualizar] = await Usuario.update(datos, { where: { id } });
            //let Usuario = await Usuario.findByPk(id);
            if (actualizar == 0) {
                console.log('Usuario no encontrada');
            } else {
                Usuario.save()
                return datos;
            }
        } catch (e) {
            console.log('Error al actualizar Usuario: ' +e);
}
            // let tare= await Tarea.findByPk(id);
            // return tare este es para que muestre los datos actualizados
            
    }

    static async eliminarUsuario(id){
        try{
            let cate = await Usuario.destroy({where:{id}})
            return cate

        }catch(e){
            console.log('No se puede eliminar la Usuario', e);

        }
    }

    static async obtenerUsuarioPorEmail(email) {
        return await Usuario.findOne({ where: { email } });
      }
    
      // Método para obtener un usuario por su ID
      static async obtenerUsuarioPorId(id) {
        return await Usuario.findByPk(id);
      }
    
    
}
module.exports = UsuarioService