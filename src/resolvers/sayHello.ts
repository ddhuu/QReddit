import { Context } from '../types/Context';
import { Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class sayhello {
  @Query(_return => String)
  hello (
    @Ctx() {req} : Context
  ){
    console.log(req.session.userId)
    return 'say hello'
  }
}
