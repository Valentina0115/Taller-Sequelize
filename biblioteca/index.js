const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const libroRouter = require('./routes/LibroRouter');
const usuarioRouter = require('./routes/UsuarioRouter');
const prestamoRouter = require('./routes/PrestamoRouter');
const Prestamo = require('./models/PrestamoModel'); // Importar el modelo Prestamo
const Libro = require('./models/LibroModel'); // Importar el modelo Libro


dotenv.config();
const App = express();
const port = process.env.PORT || 3000;

App.use(express.json());

Libro.hasMany(Prestamo, { foreignKey: 'libro_id',constraints:false });
Prestamo.belongsTo(Libro, { foreignKey: 'libro_id', constraints: false });
// Rutas API
App.use('/api', libroRouter);
App.use('/api', usuarioRouter);
App.use('/api', prestamoRouter);

const startDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Sincroniza los modelos con la base de datos
    console.log('Base de datos sincronizada');

    App.listen(port, () => {
      console.log(`El servidor se está ejecutando en el puerto ${port}`);
    });
  } catch (e) {
    console.error('Error al conectar la base de datos:', e.message);
    process.exit(1); // Finaliza la ejecución si falla la conexión
  }
};

startDB();
