require('dotenv').config();
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm';
import {User} from './entities/User'
import { Post } from './entities/Post';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { UserResolver } from './resolvers/user';
import { sayhello } from './resolvers/sayHello';
import mongoose from 'mongoose';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { COOKIE_NAME, __prod__ } from './constants';


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

  // Store Session/ Cookies
  const mongoUrl = `mongodb+srv://ddhuu:${process.env.SESSION_DB_PASSWORD_DEV_PROD}@reddit.rpp0hor.mongodb.net/?retryWrites=true&w=majority`
  await mongoose.connect(mongoUrl);
  
  
  console.log('Mongo DB connected')
  app.use(session({
    name : COOKIE_NAME,
    store: MongoStore.create ({mongoUrl}),
    cookie:
    {
      maxAge: 1000*60*60,
      httpOnly: true ,  // JS front-end cannot  acess the cookie
      secure: __prod__  , // cookie only works in https
      sameSite: 'lax', //protection against CSRF
    },
    secret:  process.env.SESSION_SECRET_DEV_PROD as string ,
    saveUninitialized: false , // don't save empty sessio, right from the start
  }))
  
  const apolloServer = new ApolloServer({
    schema :  await buildSchema({resolvers: [sayhello,UserResolver], validate : false}),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
  })
  
  await apolloServer.start()
  apolloServer.applyMiddleware({app, cors : false})
  const PORT = process.env.PORT || 4000
  app.listen(PORT,() => console.log(`Server started on port ${PORT}. GraphQL Server started on localhost: ${PORT}${apolloServer.graphqlPath}`))
}

main().catch(error=> console.log(error));
