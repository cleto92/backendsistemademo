/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const {ApolloServer} = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario');
require('dotenv').config({path: 'variables.env'});


conectarDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const {id} = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.SECRETA,
        );
        const usuario = await Usuario.findById(id);
        return {
          usuario,
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`Servidor Listo en la  URL: ${url}`);
});
