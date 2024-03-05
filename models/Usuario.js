/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
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
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  rol: {
    type: String,
    require: true,
    trim: true,
    enum: ['Admin', 'Deposito', 'SuperAdmin', 'Tecnico'],
    default: 'Tecnico',
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
