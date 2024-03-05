/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};


const IsdStock = mongoose.Schema({
  tecnico: {
    type: String,
    require: true,
    trim: true,
  },
  productos: {
    type: Array,
    require: true,
  },
  tecnicoId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Usuarios',
  },
  fecha: {
    type: String,
    default: fechaArgentina,
  },
});

module.exports = mongoose.model('IsdStock', IsdStock);
