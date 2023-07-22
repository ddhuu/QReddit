require('dotenv').config();
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm';
import {User} from './entities/User'
import { Post } from './entities/Post';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { sayHello } from './resolvers/sayHello';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const main = async() => {
  await createConnection({
    type:'postgres',
    database: 'QReddit',
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    logging: true,
    synchronize: true,
    entities : [User, Post]
  })
  const app = express()
  const apolloServer = new ApolloServer({
    schema :  await buildSchema({resolvers: [sayHello], validate : false}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({app, cors : false})
  const PORT = process.env.PORT || 4000
  app.listen(PORT,() => console.log('Server started.'))
}

main().catch(error=> console.log(error));
