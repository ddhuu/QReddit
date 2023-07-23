import { Query, Resolver } from 'type-graphql';

@Resolver()
export class sayhello {
  @Query(_return => String)
  hello (){
    return 'say hello'
  }
}
