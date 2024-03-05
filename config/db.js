/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexion a la base de Datos Exitosa');
  } catch (error) {
    console.log('No se puede conectar a la Base de Datos');
    process.exit(1);
  }
};

module.exports = conectarDB;
