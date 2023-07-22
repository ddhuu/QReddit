
import {Resolver, Query} from  'type-graphql'

@Resolver()
export class sayHello {
  @Query(_returns => String)
  sayHello() {
    return 'Hello World'
  }
}
