/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const {gql} = require('apollo-server');

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    password: String
    email: String
    creado: String
    rol: EstadoUsuario
  }

  type Producto {
    id: ID
    nombre: String
    stock: Int
    creado: String
    detalle: String
    fecha: String

  }

  type ClienteMayorista {
    id: ID
    nombre: String
    apellido: String
    email: String
    telefono: String
    movil: String
    provincia: String
    localidad: String
    direccion: String
    empresa: String
    fecha: String
  }

  type Token {
    token: String
  }

  type ClienteMinorista {
    id: ID
    nombre: String
    numerocliente: String
    apellido: String
    email: String
    telefono: String
    movil: String
    provincia: String
    localidad: String
    direccion: String
    entrecalles: String
    fecha: String
  }

  type Pedido {
    id: ID
    productos: [PedidoGrupo]
    cliente: ID
    fecha: String
    nombre: String
    apellido: String
    estado: EstadoPedido
    detalle: String
    fechaModificacion: String
  }

  type PedidoGrupo {
    id: ID
    cantidad: Int
    nombre: String
    detalle: String
  }

  type Alarma {
    id: ID
    productos: [ProductosAlarma]
    nombre: String
    tipo: String
    cantidad: Int
    fecha: String
  }

  type ProductosAlarma {
    ## Referencia a Alarma.JS ##

    id: ID
    cantidad: Int
    nombre: String
  }

  type Reparaciones {
    id: ID
    numerocliente: String
    observaciones: String
    detalle: String
    tecnico: String
    fecha: String
    componente: String
    estado: EstadoPedido
  }

  type PedidoMinorista {
    id: ID
    productos: [PedidoMinoristaProductos]
    clienteId: ID
    nombreCliente: String
    numeroCliente: String
    comentario: String
    alarmas: [AlarmaPedido]
    estado: EstadoInstalacion
    fecha: String
    fechaModificacion: String
    actualizada: String
}

type AlarmaPedido {
  idAlarma: ID!
  cantidadAlarmas: Int!
  nombreAlarma: String
}

type IsdStock {
  tecnico: String
  productos: [IsdStockProductos]
  tecnicoId: ID!
  fecha: String
}

type IsdStockProductos {
  id: ID
  cantidad: Int
  nombre: String
}


type PedidoMinoristaProductos {
  id: ID
  cantidad: Int
  nombre: String
}


type Fallas {
  productos: [PedidoGrupo]
  id: ID!
  detalle: String
  fecha: String
}

type Salida {
  tecnico: String
  fecha: String
  detalle: String
  tipo: String
  productos: [PedidoGrupo]
}

type Entrada {
  proveedor: String
  numerofactura: String
  detalle: String
  tipo: String
  fecha: String
}

type Datos {
  entrada: [Entrada]
  salida: [Salida]
}

type FallasComponentes {
  productos: String
  detalle: String
  fecha: String
  tecnico: String
  numerocliente: String
}

type actualizarObservacionInput {
  observaciones: String
}

enum EstadoUsuario {
  Admin
  Deposito
  Tecnico
  SuperAdmin
}



  ################################################################################################################################


  input ClienteMinoristaInput {
    id: ID
    nombre: String
    numerocliente: String
    apellido: String
    email: String
    telefono: String
    movil: String
    provincia: String
    localidad: String
    direccion: String
    entrecalles: String
    fecha: String
  }

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
    rol: EstadoUsuario!
  }

  input AutenticarInput {
    email: String
    password: String
  }

  input ProductoInput {
    nombre: String
    stock: Int
    detalle: String
    fecha: String
  }

  input ClienteMayoristaInput {
    id: ID
    nombre: String
    apellido: String
    email: String
    telefono: String
    movil: String!
    provincia: String
    localidad: String
    direccion: String
    empresa: String
    fecha: String
  }

  input AlarmaInput {
    productos: [ProductosAlarmaInput]
    nombre: String!
    cantidad: Int
    tipo: String
    fecha: String
  }

  input ProductosAlarmaInput {
    id: ID!
    cantidad: Int!
    nombre: String
  }

  input PedidoInput {
    productos: [PedidoProductoInput]
    nombre: String
    cliente: ID
    estado: EstadoPedido
    fecha: String
    detalle: String
    fechaModificacion: String
  }

  input PedidoProductoInput {
    id: ID
    cantidad: Int
    nombre: String
  }

  input ReparacionesInput {
    numerocliente: String
    detalle: String
    tecnico: String
    fecha: String
    componente: String
    estado: EstadoPedido
  }

  input actualizarReparacionesInput {
    estado: EstadoPedido
  }

  enum EstadoPedido {
    CANCELADO
    PENDIENTE
    FINALIZADO
    ENTREGADO
    REPARADA
  }

  enum EstadoInstalacion {
    PENDIENTE
    FINALIZADA
    INSTALADA
  }

  enum EstadoPlacas {
    REPARADA
    PENDIENTE
    CAMBIAR
  }

  enum EstadoUsuario {
    Admin
    Deposito
    Tecnico
    SuperAdmin
  }

  input PedidoMinoristaInput {
    productos: [PedidoMinoristaProductosInput]
    clienteId: ID
    nombreCliente: String
    numeroCliente: String
    comentario: String
    alarmas: [AlarmaPedidoInput]
    fecha: String
    fechaModificacion: String
    estado: EstadoInstalacion
}

input AlarmaPedidoInput {
  idAlarma: ID!
  cantidadAlarmas: Int!
  nombreAlarma: String
}

input PedidoMinoristaProductosInput {
    id: ID
    cantidad: Int
    nombre: String
}
input FallasInput {
  productos: [PedidoProductoInput]
  id: ID
  detalle: String
  fecha: String
}

input SalidaInput {
  tecnico: String
  fecha: String
  detalle: String
  tipo: String
  productos: [PedidoProductoInput]
}

input IsdStockInput {
  tecnico: String
  productos: [IsdStockProductosInput]
  cantidad: Int
  tecnicoId: ID!
  fecha: String
}

input IsdStockProductosInput {
  id: ID
  cantidad: Int
  nombre: String
}

input FallasComponenteInput {
  tecnico: String
  detalle: String
  fecha: String
  productos: String
  numerocliente: String
}

input EntradaInput {
  proveedor: String
  numerofactura: String
  detalle: String
  tipo: String
  fecha: String
}

input actualizarObservacionInput {
  observaciones: String
}

  type Query {
    ############################################################## Query Usuarios ##########################################################

    obtenerUsuario: Usuario

    ############################################################## Query Productos ##########################################################

    obtenerProductos: [Producto]
    obtenerProductosId(id: ID!): Producto
    obtenerAlarma: [Alarma]

    ############################################################## Query Clientes ###########################################################

    obtenerClienteMayorista: [ClienteMayorista]
    obtenerClienteMayoristaId(id: ID!): ClienteMayorista
    obtenerClientesVendedor: [ClienteMayorista]
    obtenerClienteMinorista: [ClienteMinorista]
    obtenerClienteMinoristaId(id: ID!): ClienteMinorista
    obtenerReparacion: [Reparaciones]
    obtenerPedidosMinoritas: [PedidoMinorista]
    obtenerFallas: [Fallas]
    obtenerComentarios(id: ID!): PedidoMinorista
    obtenerStockPorTecnico(tecnicoId: ID!): [IsdStock]
    obtenerFallasComponentes: [FallasComponentes]

    ############################################################## Query Pedidos ############################################################

    obtenerPedidos: [Pedido]
    obtenerPedidosId(id: ID!) : Pedido

   ################################################################################## Entradas / Salidas
   obtenerSalidas: [Salida]
   obtenerEntradas: [Entrada]
   obtenerDatos: [Datos]
  }

  ###################################################################################################################################

  type Mutation {
    ############################################################## Mutations Usuarios #######################################################

    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    ############################################################## Mutations Productos ######################################################

    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
    eliminarProducto(id: ID!): String
    agregarStockCamioneta(input: IsdStockInput) : IsdStock

    ############################################################## Mutations Clientes #######################################################

    nuevoClienteMayorista(input: ClienteMayoristaInput): ClienteMayorista
    actualizarClienteMayorista(
      id: ID!
      input: ClienteMayoristaInput
    ): ClienteMayorista
    eliminarCliente(id: ID!): String
    nuevoClienteMinorista(input: ClienteMinoristaInput): ClienteMinorista
    actualizarClienteMinorista(
      id: ID!
      input: ClienteMinoristaInput
    ): ClienteMinorista
    eliminarClienteMinorista(id: ID!): String
    agregarComentario(id: ID! comentario: String) : PedidoMinorista

    ############################################################## Mutations Pedidos ########################################################
    nuevoPedido(input: PedidoInput): Pedido
    actualizarPedido(id: ID!, input: PedidoInput): Pedido
    eliminarPedido(id: ID!, input: PedidoInput): String
    eliminarProductoDePedido(pedidoId: ID!, productoId: ID!): Pedido
    agregarProductoAPedido(pedidoId: ID!, productoInput: PedidoProductoInput!): Pedido

    ############################################################## Mutations Alarmas ########################################################
    nuevaAlarma(input: AlarmaInput): Alarma
    actualizarAlarma(id: ID!, input: AlarmaInput): Alarma
    crearPedidoMinorista(input: PedidoMinoristaInput): PedidoMinorista
    agregarProductoPedidoMinorista(id: ID!, input: PedidoMinoristaInput): PedidoMinorista
    actualizarPedidoMinorista(id: ID!, input: PedidoMinoristaInput): PedidoMinorista
    eliminarPedidoMinorista(id: ID!): PedidoMinorista
    eliminarProductoPedidoMinorista(idPedido: ID!, idProducto: ID!): PedidoMinorista

    ###############################################################################################
    nuevaFalla(input: FallasInput) : Fallas
    nuevaFallaComponente(input: FallasComponenteInput) : FallasComponentes


    ############################################################## Mutations Reparaciones ###################################################

    nuevaReparacion(input: ReparacionesInput): Reparaciones
    actualizarReparacion(id: ID! input: actualizarReparacionesInput): Reparaciones
    actualizarObservacion(id: ID! input: actualizarObservacionInput) : Reparaciones
    actualizarEstadoMayorista(id: ID! input: PedidoInput) : Pedido
    actualizarEstadoMinorista(id: ID! input: PedidoMinoristaInput) : PedidoMinorista

    ############################################################################ Mutations Entrada / Salida
    nuevaSalida(input: SalidaInput) : Salida
    nuevaEntrada(input: EntradaInput) : Entrada
  }
`;

module.exports = typeDefs;
