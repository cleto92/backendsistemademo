/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const ReparacionesSchema = mongoose.Schema({
  numerocliente: {
    type: Number,
    require: true,
    trim: true,
  },
  observaciones: {
    type: String,
    default: 'Esperando Revision',
  },
  detalle: {
    type: String,
    require: true,
    trim: true,
  },
  componente: {
    type: String,
    require: true,
    trim: true,
  },
  tecnico: {
    type: String,
    require: true,
    trim: true,
  },
  estado: {
    type: String,
    default: 'PENDIENTE',
  },
  fecha: {
    type: String,
    default: fechaArgentina,
    ref: 'fecha',
  },
});

module.exports = mongoose.model('Reparaciones', ReparacionesSchema);
