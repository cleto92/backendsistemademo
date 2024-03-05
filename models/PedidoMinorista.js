/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const PedidoMinoristaSchema = mongoose.Schema({
  productos: {
    type: Array,
    required: true,
  },
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'ClienteMinorista',
  },
  nombreCliente: {
    type: String,
    required: true,
    trim: true,
  },
  comentario: {
    type: String,
    trim: true,
  },
  numeroCliente: {
    type: String,
    required: true,
    trim: true,
  },
  alarmas: {
    type: Array,
    require: true,
    ref: 'Alarma',
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
    default: null,
  },
});

module.exports = mongoose.model('PedidoMinorista', PedidoMinoristaSchema);
