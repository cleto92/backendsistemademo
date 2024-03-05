/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const FallasComponentes = mongoose.Schema({
  tecnico: {
    type: String,
    require: true,
    trim: true,
  },
  productos: {
    type: String,
    require: true,
    trim: true,
  },
  fecha: {
    type: String,
    default: fechaArgentina,
    ref: 'fecha',
  },
  detalle: {
    type: String,
    require: true,
    trim: true,
  },
  numerocliente: {
    type: String,
    require: true,
    trim: true,
  },
});

module.exports = mongoose.mongoose.model('FallasComponentes', FallasComponentes);
