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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const checkAuth = ({ context: { req } }, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        throw new apollo_server_core_1.AuthenticationError('Not Authenticated to perform GraphQL operations');
    }
    const result = yield next();
    return result;
});
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map