/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const ClienteMayoristaSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  apellido: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  movil: {
    type: String,
    require: true,
    trim: true,
  },
  empresa: {
    type: String,
    require: true,
    trim: true,
  },
  provincia: {
    type: String,
    require: true,
    trim: true,
  },
  localidad: {
    type: String,
    require: true,
    trim: true,
  },
  direccion: {
    type: String,
    require: true,
    trim: true,
  },
  fecha: {
    type: String,
    default: fechaArgentina,
    ref: 'fecha',
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Usuario',
  },

});

module.exports = mongoose.model('ClienteMayorista', ClienteMayoristaSchema);
