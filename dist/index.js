"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Post_1 = require("./entities/Post");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const apollo_server_core_1 = require("apollo-server-core");
const user_1 = require("./resolvers/user");
const sayHello_1 = require("./resolvers/sayHello");
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const constants_1 = require("./constants");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'QReddit',
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User_1.User, Post_1.Post]
    });
    const app = (0, express_1.default)();
    const mongoUrl = `mongodb+srv://ddhuu:${process.env.SESSION_DB_PASSWORD_DEV_PROD}@reddit.rpp0hor.mongodb.net/?retryWrites=true&w=majority`;
    yield mongoose_1.default.connect(mongoUrl);
    console.log('Mongo DB connected');
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: connect_mongo_1.default.create({ mongoUrl }),
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: constants_1.__prod__,
            sameSite: 'lax',
        },
        secret: process.env.SESSION_SECRET_DEV_PROD,
        saveUninitialized: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({ resolvers: [sayHello_1.sayhello, user_1.UserResolver], validate: false }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()]
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}. GraphQL Server started on localhost: ${PORT}${apolloServer.graphqlPath}`));
});
main().catch(error => console.log(error));
//# sourceMappingURL=index.js.map