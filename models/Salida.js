/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const SalidaSchema = mongoose.Schema({
  productos: {
    type: Array,
    require: true,
  },
  tecnico: {
    type: String,
    require: true,
    trim: true,
  },
  detalle: {
    type: String,
    require: true,
    trim: true,
  },
  tipo: {
    type: String,
    default: 'Salida',
  },
  fecha: {
    type: String,
    default: fechaArgentina,
    ref: 'fecha',
  },
});

module.exports = mongoose.model('Salidas', SalidaSchema);
