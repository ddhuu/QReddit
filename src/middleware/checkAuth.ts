import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';
import { AuthenticationError } from 'apollo-server-core';

export const checkAuth : MiddlewareFn <Context> = async ({context: {req}},next)=>
{
    if (!req.session.userId) {
      throw new AuthenticationError('Not Authenticated to perform GraphQL operations')

    }
    const result = await next() 
    return result
};