/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const fechaArgentina = () => {
  return moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DDTHH:mm:ss');
};

const AlarmaSchema = mongoose.Schema({
  productos: {
    type: Array,
    require: true,
  },
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  cantidad: {
    type: Number,
    require: true,
    trim: true,
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Usuario',
  },
  tipo: {
    type: String,
    default: 'Alarma',
  },

  estado: {
    type: String,
    default: 'Pendiente',
  },
  fecha: {
    type: String,
    default: fechaArgentina,
    ref: 'fecha',
  },


});

module.exports = mongoose.model('Alarma', AlarmaSchema, 'productos');
