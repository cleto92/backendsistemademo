/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const PedidoSchema = mongoose.Schema({
  productos: {
    type: Array,
    require: true,
  },
  cantidad: {
    type: Number,
    require: true,
  },
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  detalle: {
    type: String,
    trim: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'ClienteMayorista',
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Usuario',
  },
  estado: {
    type: String,
    default: 'PENDIENTE',
  },
  fecha: {
    type: String,
    default: fechaArgentina,
  },
  fechaModificacion: {
    type: String,
    default: null, // No hay modificación inicialmente
  },
});

module.exports = mongoose.model('PedidoMayorista', PedidoSchema);
