/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable new-cap */
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const ClienteMayorista = require('../models/ClienteMayorista');
const ClienteMinorista = require('../models/ClienteMinorista');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Alarma = require('../models/Alarma');
const Reparaciones = require('../models/Reparaciones');
const PedidoMinorista = require('../models/PedidoMinorista');
const Fallas = require('../models/Fallas');
const Salida = require('../models/Salida');
const Entrada = require('../models/Entrada');
const IsdStock = require('../models/IsdStock');
const FallasComponentes = require('../models/FallasComponentes');
require('dotenv').config({path: 'variables.env'});

// Funciones

const crearToken = (Usuario, secreta) => {
  const {id, rol} = Usuario;
  return jwt.sign({id, rol}, secreta);
};

const resolvers = {
  Query: {
    obtenerUsuario: async (_, {}, ctx) => {
      return ctx.usuario;
    },

    // Obtener los productos de la BD
    obtenerProductos: async (_, {}, ctx) => {
      try {
        obtenerProductos = await Producto.find({});
        return obtenerProductos;
      } catch (error) {}
    },

    obtenerProductosId: async (_, {id}, ctx) => {
      // Revisando si existe
      const producto = await Producto.findById(id);
      if (!producto) {
        throw new Error('Producto no encontrado en la Base de datos');
      }
      return producto;
    },

    obtenerClienteMayorista: async (_, {}) => {
      try {
        const clientes = await ClienteMayorista.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerClientesVendedor: async (_, {}, ctx) => {
      try {
        const obtenerCliente = await ClienteMayorista.find({
          vendedor: ctx.usuario.id.toString(),
        });
        return obtenerCliente;
      } catch (error) {}
    },

    obtenerPedidos: async (_, {}) => {
      try {
        const pedidos = await Pedido.find({});
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerClienteMinorista: async (_, {}) => {
      try {
        const clientes = await ClienteMinorista.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerClienteMayoristaId: async (_, {id}) => {
      const clienteMayorista = await ClienteMayorista.findById(id);
      if (!clienteMayorista) {
        throw new Error('El Cliente no se encuentra en la base de datos');
      }

      return clienteMayorista;
    },

    obtenerClienteMinoristaId: async (_, {id}) => {
      const clienteMinorista = ClienteMinorista.findById(id);
      if (!clienteMinorista) {
        throw new error('El cliente no se encuentra en la base de datos');
      }

      return clienteMinorista;
    },
    obtenerReparacion: async (_, {}) => {
      try {
        const reparacion = await Reparaciones.find({});
        return reparacion;
      } catch (error) {
        console.log(error);
        throw new Error('Hubo un error');
      }
    },

    obtenerPedidosId: async (_, {id}) => {
      const pedidoid = Pedido.findById(id);
      const resultado = pedidoid;
      return resultado;
    },

    obtenerAlarma: async (_, {}) => {
      try {
        const alarma = await Producto.find({});
        const resultado = alarma;
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPedidosMinoritas: async (_, {}) => {
      try {
        const pedidoMinorista = await PedidoMinorista.find({});
        const resultado = pedidoMinorista;
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerFallasComponentes: async (_, {}) => {
      try {
        const fallascomponentes = await FallasComponentes.find({});
        const resultado = fallascomponentes;
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerFallas: async (_, {}) => {
      try {
        const fallas = await Fallas.find({});
        const resultado = fallas;
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerSalidas: async (_, {}) => {
      try {
        const salidas = await Salida.find({});
        const resultado = salidas;
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerEntradas: async (_, {}) => {
      try {
        const entradas = Entrada.find({});
        const resultado = entradas;
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerDatos: async (_, {}) => {
      try {
        const entradas = Entrada.find({});
        const salidas = Salida.find({});
        return {entradas, salidas};
      } catch (error) {
        console.log(error);
      }
    },

    obtenerComentarios: async (_, {id}) => {
      const comentario = await PedidoMinorista.findById(id);
      return comentario;
    },

    obtenerStockPorTecnico: async (_, {tecnicoId}) => {
      try {
        const stockIsd = await IsdStock.find({tecnicoId: tecnicoId});
        return stockIsd;
      } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock');
      }
    },
  }, // Finalizacion de las Query's y Resolvers

  // Inicio de los Mutations

  Mutation: {
    nuevoUsuario: async (_, {input}, ctx) => {
      // Revisar Usuario
      const {email, password} = input;
      const existeUsuario = await Usuario.findOne({email});
      if (existeUsuario) {
        throw new Error('El usuario se encuentra Registrado');
      }

      if (ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      // Hasheo del Password

      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);
      // Guardar usuario
      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.error('El usuario no se puede guardar en la base de datos');
        console.log(error);
      }
    },
    autenticarUsuario: async (_, {input}) => {
      const {email, password} = input;

      // Verificacion si existe el usuario
      const existeUsuario = await Usuario.findOne({email});
      if (!existeUsuario) {
        throw new Error('El usuario no existe');
      }

      // Revisar si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(
          password,
          existeUsuario.password,
      );
      if (!passwordCorrecto) {
        throw new Error('El password es Incorrecto');
      }

      // Crear Token

      return {
        token: crearToken(existeUsuario, process.env.SECRETA, '24'),
      };
    },

    // Almacenar en Mongo(DB)

    nuevoProducto: async (_, {input}, ctx) => {
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      try {
        const nuevoProducto = new Producto(input);
        const resultado = await nuevoProducto.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarProducto: async (_, {id, input}, ctx) => {
      const producto = await Producto.findById(id);
      if (!producto) {
        throw new Error('El Producto no existe en la base de datos');
      }

      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      const stockActual = parseInt(producto.stock, 10);
      const cantidadAgregar = parseInt(input.stock, 10);
      const nuevoStock = stockActual + cantidadAgregar;

      producto.stock = nuevoStock.toString();
      await producto.save();

      return producto;
    },

    // Eliminando el producto

    eliminarProducto: async (_, {id}, ctx) => {
      const producto = await Producto.findById(id);
      if (!producto) {
        throw new Error('El producto no existe en la base de datos');
      }

      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      await Producto.findOneAndDelete({_id: id});
      return 'Producto Eliminado';
    },

    nuevoClienteMinorista: async (_, {input}, ctx) => {
      const {email, numerocliente} = input;

      const clienteEmail = await ClienteMinorista.findOne({email});
      const clienteNumero = await ClienteMinorista.findOne({numerocliente});

      if (clienteEmail || clienteNumero) {
        throw new Error(
            'El Cliente con ese email o número de cliente ya está registrado',
        );
      }

      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      const nuevoClienteMinorista = new ClienteMinorista(input);
      nuevoClienteMinorista.vendedor = ctx.usuario.id;

      try {
        const resultado = await nuevoClienteMinorista.save();
        return resultado;
      } catch (error) {
        console.error(error);
        throw new Error('Error al guardar el cliente minorista');
      }
    },

    actualizarClienteMinorista: async (_, {id, input}, ctx) => {
      let clienteMinoristaActualizar = ClienteMinorista.findById(id);
      if (!clienteMinoristaActualizar) {
        throw new Error('El Cliente no se encuentra en la base de datos');
      }

      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      clienteMinoristaActualizar = await ClienteMinorista.findOneAndUpdate(
          {_id: id},
          input,
          {new: true},
      );
      return clienteMinoristaActualizar;
    },

    eliminarClienteMinorista: async (_, {id}, ctx) => {
      const eliminarClienteMinorista = await ClienteMinorista.findById(id);
      if (!eliminarClienteMinorista) {
        throw new Error('El Cliente no se encuentra en la base de datos');
      }

      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      await ClienteMinorista.findOneAndDelete({_id: id});
      return 'Cliente Eliminado con Exito';
    },

    nuevoClienteMayorista: async (_, {input}, ctx) => {
      const {email} = input;
      const cliente = await ClienteMayorista.find({email});
      if (!cliente) {
        throw new Error('El Cliente se encuentra Registrado');
      }

      const verificacionemail = await ClienteMayorista.findOne({email});
      if (verificacionemail) {
        throw new Error('El Cliente ya se encuentra registrado con ese email');
      }

      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      // Asignar Vendedor
      const nuevoClienteMayorista = new ClienteMayorista(input);
      nuevoClienteMayorista.vendedor = ctx.usuario.id;

      // Guardarlo en la base de Datos

      try {
        const resultado = await nuevoClienteMayorista.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarClienteMayorista: async (_, {id, input}, ctx) => {
      let clienteActualizar = ClienteMayorista.findById(id);
      if (!clienteActualizar) {
        throw new Error('El cliente no se encuentra');
      }

      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      clienteActualizar = await ClienteMayorista.findOneAndUpdate(
          {_id: id},
          input,
          {new: true},
      );
      return clienteActualizar;
    },

    eliminarCliente: async (_, {id}) => {
      const cliente = await ClienteMayorista.findById(id);
      if (!cliente) {
        throw new Error('El cliente no existe en la base de datos');
      }

      await ClienteMayorista.findOneAndDelete({_id: id});
      return 'Cliente Eliminado';
    },

    nuevoPedido: async (_, {input}, ctx) => {
      const {cliente, productos} = input;

      // Verificar si el cliente existe
      const clienteExiste = await ClienteMayorista.findById(cliente);
      if (!clienteExiste) {
        throw new Error('El cliente no existe en la base de datos');
      }

      // Verificar los permisos del usuario
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      // Preparar un mapa para los productos a actualizar después de la validación
      const componentesParaActualizar = new Map();

      // Primero, validar el stock para cada producto
      for (const articulo of productos) {
        const {id, cantidad} = articulo;
        const producto = await Producto.findById(id);

        if (!producto) {
          throw new Error(`El producto con ID: ${id} no fue encontrado`);
        }

        if (producto.tipo === 'Kit' || producto.tipo === 'Alarma') {
          const kitOAlarma = await Alarma.findById(producto.id);

          for (const componente of kitOAlarma.productos) {
            const prodComponente = await Producto.findById(componente.id);
            if (!prodComponente) {
              throw new Error(
                  `Componente con ID: ${componente.id} no encontrado en el kit/alarma con ID: ${id}`,
              );
            }
            const cantidadTotalComponente =
              (componentesParaActualizar.get(prodComponente.id) || 0) +
              cantidad * componente.cantidad;
            componentesParaActualizar.set(
                prodComponente.id,
                cantidadTotalComponente,
            );
          }
        } else {
          // Productos individuales (que no son kits/alarma)
          if (isNaN(cantidad) || isNaN(producto.stock)) {
            throw new Error(`Cantidad inválida para el producto con ID: ${id}`);
          }
          const cantidadTotal =
            (componentesParaActualizar.get(producto.id) || 0) + cantidad;
          componentesParaActualizar.set(producto.id, cantidadTotal);
        }
      }

      // Verificar el stock total antes de confirmar el pedido
      for (const [componenteId, cantidadTotal] of componentesParaActualizar) {
        const componente = await Producto.findById(componenteId);
        if (cantidadTotal > componente.stock) {
          throw new Error(
              `El stock de ${componente.nombre} es insuficiente para completar el pedido`,
          );
        }
      }

      // Actualizar el stock de los componentes
      for (const [componenteId, cantidad] of componentesParaActualizar) {
        const componente = await Producto.findById(componenteId);
        componente.stock -= cantidad;
        await componente.save();
      }

      // Guardar el nuevo pedido
      const nuevoPedido = new Pedido(input);
      const resultado = await nuevoPedido.save();
      return resultado;
    },

    eliminarPedido: async (_, {id}, ctx) => {
      if (ctx.usuario.rol !== 'SuperAdmin' && ctx.usuario.rol !== 'Admin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      const pedido = await Pedido.findById(id);
      if (!pedido) {
        throw new Error('El pedido no existe en la base de datos');
      }

      if (pedido.estado === 'CANCELADO') {
        throw new Error('El pedido ya está cancelado');
      }

      const {productos} = pedido;
      for await (const articulo of productos) {
        const {id} = articulo;
        const producto = await Producto.findById(id);

        if (producto) {
          // Verificar si es un kit o alarma
          if (producto.tipo === 'Kit' || producto.tipo === 'Alarma') {
            const kitOAlarma = await Alarma.findById(id);
            for (const componente of kitOAlarma.productos) {
              const prodComponente = await Producto.findById(componente.id);
              if (prodComponente) {
                prodComponente.stock =
                  Number(prodComponente.stock) +
                  Number(componente.cantidad) * Number(articulo.cantidad);
                await prodComponente.save();
              }
            }
          } else {
            // Producto individual
            producto.stock = Number(producto.stock) + Number(articulo.cantidad);
            await producto.save();
          }
        }
      }
      pedido.estado = 'CANCELADO';
      await pedido.save();
      return 'Pedido Cancelado';
    },

    nuevaAlarma: async (_, {input}, ctx) => {
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }

      const nuevaAlarma = new Alarma(input);
      const resultado = nuevaAlarma.save();
      return resultado;
    },

    nuevaReparacion: async (_, {input}) => {
      try {
        const nuevaReparacion = await Reparaciones(input);
        const resultado = nuevaReparacion.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarReparacion: async (_, {id, input}, ctx) => {
      const {estado, observaciones} = input;
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }
      const actualizarReparacion = await Reparaciones.findByIdAndUpdate(
          id,
          {estado},
          {observaciones},
          {new: true},
      );
      return actualizarReparacion;
    },

    eliminarProductoDePedido: async (_, {pedidoId, productoId}, ctx) => {
      try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
          throw new Error('Pedido no encontrado');
        }
        const productoEnPedido = pedido.productos.find(
            (producto) => producto.id === productoId,
        );

        if (productoEnPedido) {
          const producto = await Producto.findById(productoId);

          if (producto) {
            // Verificar si es un kit o alarma
            if (producto.tipo === 'Kit' || producto.tipo === 'Alarma') {
              const kitOAlarma = await Alarma.findById(productoId);
              for (const componente of kitOAlarma.productos) {
                const prodComponente = await Producto.findById(componente.id);
                if (prodComponente) {
                  prodComponente.stock =
                    Number(prodComponente.stock) +
                    Number(componente.cantidad) *
                      Number(productoEnPedido.cantidad);
                  await prodComponente.save();
                }
              }
            } else {
              producto.stock =
                Number(producto.stock) + Number(productoEnPedido.cantidad);
              await producto.save();
            }
          } else {
            throw new Error('Producto no encontrado en la base de datos');
          }
        } else {
          throw new Error('Producto no encontrado en el pedido');
        }
        pedido.productos = pedido.productos.filter(
            (producto) => producto.id !== productoId,
        );
        await pedido.save();

        return pedido;
      } catch (error) {
        console.log(error);
        throw new Error('Error al procesar la solicitud');
      }
    },

    agregarProductoAPedido: async (_, {pedidoId, productoInput}, ctx) => {
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      const pedido = await Pedido.findById(pedidoId);
      if (!pedido) {
        throw new Error('El Pedido no existe');
      }

      const producto = await Producto.findById(productoInput.id);
      if (!producto) {
        throw new Error(`El producto con ID: ${productoInput.id} no existe`);
      }

      if (productoInput.cantidad > producto.stock) {
        throw new Error(
            `El producto ${producto.nombre} no tiene suficiente stock`,
        );
      }

      const productoEnPedido = pedido.productos.find(
          (p) => p.id === productoInput.id,
      );
      if (productoEnPedido) {
        throw new Error(
            `El producto ${producto.nombre} ya se encuentra en el pedido`,
        );
      } else {
        pedido.productos.push({
          id: productoInput.id,
          cantidad: productoInput.cantidad,
          nombre: productoInput.nombre,
        });
      }

      producto.stock -= productoInput.cantidad;
      await producto.save();
      await pedido.save();
      return pedido;
    },

    crearPedidoMinorista: async (_, {input}, ctx) => {
      const {clienteId, alarmas} = input;

      // Verificar los permisos del usuario
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      // Validar si el cliente minorista existe
      const clienteExiste = await ClienteMinorista.findById(clienteId);
      if (!clienteExiste) {
        throw new Error('El cliente no existe en la base de datos');
      }

      // Procesar cada alarma del pedido y acumular el total de cada producto
      const productosParaActualizar = new Map();
      const alarmasConNombre = []; // Almacenar las alarmas con sus nombres

      for (const {idAlarma, cantidadAlarmas} of alarmas) {
        if (cantidadAlarmas <= 0) {
          throw new Error('La cantidad debe ser mayor a 0');
        }

        const alarma = await Alarma.findById(idAlarma);
        if (!alarma || alarma.tipo !== 'Alarma') {
          throw new Error('El producto no es una Alarma');
        }

        for (const componente of alarma.productos) {
          const producto = await Producto.findById(componente.id);
          if (!producto) {
            throw new Error(
                `El producto con ID: ${componente.id} no fue encontrado`,
            );
          }

          const cantidadTotal = componente.cantidad * cantidadAlarmas;
          if (productosParaActualizar.has(componente.id)) {
            productosParaActualizar.get(componente.id).cantidadTotal +=
              cantidadTotal;
          } else {
            productosParaActualizar.set(componente.id, {
              producto,
              cantidadTotal,
            });
          }
        }

        // Añadir la alarma y su nombre al array
        alarmasConNombre.push({
          idAlarma: alarma.id,
          cantidadAlarmas: cantidadAlarmas,
          nombreAlarma: alarma.nombre, // Incluir el nombre de la alarma
        });
      }

      // Actualizar el stock de cada producto
      for (const {
        producto,
        cantidadTotal,
      } of productosParaActualizar.values()) {
        if (cantidadTotal > producto.stock) {
          throw new Error(
              `El artículo: ${producto.nombre} excede la cantidad disponible`,
          );
        }
        producto.stock -= cantidadTotal;
        await producto.save();
      }

      const nuevoPedidoMinorista = new PedidoMinorista({
        clienteId: clienteId,
        nombreCliente: clienteExiste.nombre,
        numeroCliente: clienteExiste.numerocliente,
        alarmas: alarmasConNombre,
        estado: 'PENDIENTE',
        fecha: new Date().toISOString(),
      });

      const resultado = await nuevoPedidoMinorista.save();
      return resultado;
    },

    agregarProductoPedidoMinorista: async (_, {id, input}, ctx) => {
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      const pedido = await PedidoMinorista.findById(id);
      if (!pedido) {
        throw new Error('El Pedido no existe');
      }

      for (const productoInput of input.productos) {
        const producto = await Producto.findById(productoInput.id);
        if (!producto) {
          throw new Error(`El producto con ID: ${productoInput.id} no existe`);
        }

        if (productoInput.cantidad > producto.stock) {
          throw new Error(
              `El producto ${producto.nombre} no tiene suficiente stock`,
          );
        }

        const productoEnPedido = pedido.productos.find(
            (p) => p.id === productoInput.id,
        );
        if (productoEnPedido) {
          throw new Error(
              `El producto ${producto.nombre} ya se encuentra en el pedido`,
          );
        } else {
          pedido.productos.push({
            id: productoInput.id,
            cantidad: productoInput.cantidad,
            nombre: productoInput.nombre,
          });

          producto.stock -= productoInput.cantidad;
          await producto.save();
        }
      }

      await pedido.save();
      return pedido;
    },

    actualizarPedidoMinorista: async (_, {id, input}, ctx) => {
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }
      const pedidoActual = await PedidoMinorista.findById(id);
      if (!pedidoActual) {
        throw new Error('El pedido no existe');
      }

      for (const alarma of pedidoActual.alarmas) {
        const alarmaExistente = await Alarma.findById(alarma.idAlarma);
        for (const componente of alarmaExistente.productos) {
          const producto = await Producto.findById(componente.id);
          producto.stock += componente.cantidad * alarma.cantidadAlarmas;
          await producto.save();
        }
      }

      pedidoActual.alarmas = [];
      for (const {idAlarma, cantidadAlarmas} of input.alarmas) {
        const alarmaNueva = await Alarma.findById(idAlarma);
        if (!alarmaNueva || alarmaNueva.tipo !== 'Alarma') {
          throw new Error('El producto no es una Alarma');
        }

        for (const componente of alarmaNueva.productos) {
          const producto = await Producto.findById(componente.id);
          if (producto.stock < componente.cantidad * cantidadAlarmas) {
            throw new Error(
                `El producto ${producto.nombre} no tiene suficiente stock`,
            );
          }
          producto.stock -= componente.cantidad * cantidadAlarmas;
          await producto.save();
        }

        pedidoActual.alarmas.push({
          idAlarma,
          cantidadAlarmas,
          nombreAlarma: alarmaNueva.nombre,
        });
      }

      await pedidoActual.save();

      return pedidoActual;
    },

    eliminarPedidoMinorista: async (_, {id}, ctx) => {
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      const pedido = await PedidoMinorista.findById(id);
      if (!pedido) {
        throw new Error('El Pedido no existe');
      }

      for (const alarmaPedido of pedido.alarmas) {
        const alarma = await Alarma.findById(alarmaPedido.idAlarma);
        if (alarma) {
          for (const componente of alarma.productos) {
            const producto = await Producto.findById(componente.id);
            if (producto) {
              producto.stock +=
                componente.cantidad * alarmaPedido.cantidadAlarmas;
              await producto.save();
            }
          }
        }
      }

      await PedidoMinorista.findByIdAndRemove(id);
      return 'Pedido eliminado correctamente';
    },

    eliminarProductoPedidoMinorista: async (
        _,
        {idPedido, idProducto},
        ctx,
    ) => {
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      const pedido = await PedidoMinorista.findById(idPedido);
      if (!pedido) {
        throw new Error('El pedido no existe');
      }

      const indiceProducto = pedido.productos.findIndex(
          (p) => p.id === idProducto,
      );
      if (indiceProducto === -1) {
        throw new Error('El producto no se encuentra en el pedido');
      }

      const producto = await Producto.findById(idProducto);
      if (!producto) {
        throw new Error('El producto no existe');
      }

      const cantidadProductoPedido = parseInt(
          pedido.productos[indiceProducto].cantidad,
          10,
      );
      if (isNaN(cantidadProductoPedido)) {
        throw new Error(
            'La cantidad del producto en el pedido no es un número válido',
        );
      }

      producto.stock += cantidadProductoPedido;
      await producto.save();

      pedido.productos.splice(indiceProducto, 1);

      await pedido.save();

      return pedido;
    },

    nuevaFalla: async (_, {input}, ctx) => {
      const {productos} = input;
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      for (const articulo of productos) {
        const {id, cantidad, nombre} = articulo;
        const producto = await Producto.findById(id);
        if (!producto) {
          throw new Error(
              `El Producto ${nombre} no existe en la base de datos`,
          );
        } else {
          producto.stock -= cantidad;
          await producto.save();
        }
        const falla = new Fallas(input);
        const resultado = await falla.save();
        return resultado;
      }
    },

    nuevaSalida: async (_, {input}, ctx) => {
      const {productos} = input;
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }
      for (const articulo of productos) {
        const {id, cantidad} = articulo;
        const producto = await Producto.findById(id);
        if (cantidad > producto.stock) {
          throw new Error('La cantidad excede el stock del inventario');
        } else {
          producto.stock -= cantidad;
          await producto.save();
        }
        const salida = new Salida(input);
        const resultado = await salida.save();
        return resultado;
      }
    },

    nuevaEntrada: async (_, {input}, ctx) => {
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }
      const entrada = new Entrada(input);
      const resultado = entrada.save();
      return resultado;
    },
    actualizarObservacion: async (_, {id, input}, ctx) => {
      const {observaciones} = input;
      if (ctx.usuario.rol !== 'Deposito' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      const actualizarObservacion = await Reparaciones.findByIdAndUpdate(
          id,
          {observaciones},
          {new: true},
      );
      return actualizarObservacion;
    },

    actualizarEstadoMayorista: async (_, {id, input}, ctx) => {
      const {estado} = input;

      if (
        ctx.usuario.rol !== 'Deposito' &&
        ctx.usuario.rol !== 'Admin' &&
        ctx.usuario.rol !== 'SuperAdmin'
      ) {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      // Obtener la fecha y hora actual en formato argentino.
      const fechaModificacion = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });

      // Actualizar el estado del pedido y la fecha de modificación.
      const actualizarEstadoMayorista = await Pedido.findByIdAndUpdate(
          id,
          {
            estado,
            fechaModificacion,
          },
          {new: true},
      );

      return actualizarEstadoMayorista;
    },

    actualizarPedido: async (_, {id, input}, ctx) => {
      const {cliente, productos: productosNuevos} = input;

      // Verificar permisos del usuario
      if (ctx.usuario.rol !== 'Admin' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }

      // Verificar existencia del pedido y del cliente
      const existePedido = await Pedido.findById(id);
      if (!existePedido) {
        throw new Error('El Pedido no existe en la base de datos');
      }

      if (existePedido.estado === 'CANCELADO') {
        throw new Error('No se puede modificar un pedido Cancelado');
      }

      const existeCliente = await ClienteMayorista.findById(cliente);
      if (!existeCliente) {
        throw new Error('El Cliente no existe en la base de datos');
      }

      // Devolver los productos del pedido original al stock
      for (const articulo of existePedido.productos) {
        const kitOriginal = await Alarma.findById(articulo.id);
        if (kitOriginal && kitOriginal.productos) {
          for (const productoKit of kitOriginal.productos) {
            const productoIndividual = await Producto.findById(productoKit.id);
            if (productoIndividual) {
              productoIndividual.stock +=
                articulo.cantidad * productoKit.cantidad;
              await productoIndividual.save();
            }
          }
        }
      }

      // Descontar los productos del nuevo pedido del stock
      for (const articulo of productosNuevos) {
        const kitNuevo = await Alarma.findById(articulo.id);
        if (kitNuevo && kitNuevo.productos) {
          for (const productoKit of kitNuevo.productos) {
            const productoIndividual = await Producto.findById(productoKit.id);
            if (productoIndividual) {
              productoIndividual.stock -=
                articulo.cantidad * productoKit.cantidad;
              await productoIndividual.save();
            }
          }
        }
      }

      // Actualizar el pedido con los nuevos productos
      const pedidoActualizado = await Pedido.findByIdAndUpdate(
          id,
          {...input, productos: productosNuevos},
          {new: true},
      );

      return pedidoActualizado;
    },

    actualizarEstadoMinorista: async (_, {id, input}, ctx) => {
      const {estado} = input;

      // Obtener la fecha y hora actual en formato argentino.
      const fechaModificacion = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });

      // Actualizar el estado del pedido y la fecha de modificación.
      const actualizarEstadoMinorista = await PedidoMinorista.findByIdAndUpdate(
          id,
          {
            estado,
            fechaModificacion,
          },
          {new: true},
      );
      return actualizarEstadoMinorista;
    },
    agregarComentario: async (_, {id, comentario}, ctx) => {
      if (ctx.usuario.rol !== 'SuperAdmin' && ctx.usuario.rol !== 'Admin') {
        throw new Error('No tienes permisos para realizar esta accion');
      }
      return await PedidoMinorista.findByIdAndUpdate(
          id,
          {$set: {comentario: comentario}},
          {new: true},
      );
    },

    agregarStockCamioneta: async (_, {input}, ctx) => {
      const {productos} = input;
      if (ctx.usuario.rol !== 'Tecnico' && ctx.usuario.rol !== 'SuperAdmin') {
        throw new Error('No tienes permisos para realizar esta acción');
      }
      for (const articulo of productos) {
        const {cantidad, id} = articulo;
        const productoscamioneta = await Producto.findById(id);
        if (cantidad > productoscamioneta.stock) {
          throw new Error('La cantidad excede el stock del inventario');
        } else {
          productoscamioneta.stock -= cantidad;
          await productoscamioneta.save();
        }
        const stockcamioneta = new IsdStock(input);
        const resultado = await stockcamioneta.save();
        return resultado;
      }
    },

    nuevaFallaComponente: async (_, {input}, ctx) => {
      if (ctx.usuario.rol !== 'SuperAdmin' && ctx.usuario.rol !== 'Deposito') {
        throw new Error('No tienes permisos para realizar esta acción');
      }
      try {
        const fallacomponente = new FallasComponentes(input);
        const resultado = await fallacomponente.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
  }, // Finalizacion de todas las funciones
};
module.exports = resolvers;
