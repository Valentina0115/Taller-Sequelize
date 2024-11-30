const { DataTypes } = require('sequelize'); // Asegúrate de usar DataTypes correctamente
const sequelize = require('../config/database');

const Usuario = sequelize.define(
  'usuarios', // Nombre del modelo
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Los correos deben ser únicos
      validate: {
        isEmail: true, // Validación para asegurarse de que sea un correo válido
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('usuario', 'admin'), // Define los roles disponibles
      defaultValue: 'usuario', // Por defecto, los usuarios serán "usuario"
    },
  },
  {
    tableName: 'usuarios', // Nombre de la tabla en la base de datos
    timestamps: false,
    indexes: []      // No agregar automáticamente las columnas createdAt y updatedAt
  }
);

module.exports = Usuario;
