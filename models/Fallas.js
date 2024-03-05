/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const fechaArgentina = () => {
  return moment
      .tz('America/Argentina/Buenos_Aires')
      .format('YYYY-MM-DDTHH:mm:ss');
};

const FallasSchema = mongoose.Schema({
  productos: {
    type: Array,
    require: true,
  },
  detalle: {
    type: String,
    require: true,
    trim: true,
  },
  fecha: {
    type: String,
    default: fechaArgentina,
    ref: 'fecha',
  },
});

module.exports = mongoose.mongoose.model('Fallas', FallasSchema);
