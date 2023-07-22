
import {Resolver, Query} from  'type-graphql'

@Resolver()
export class sayHello {
  @Query(_returns => String)
  hello() {
    return 'Hello World'
  }
}
