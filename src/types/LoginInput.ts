
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  usernameOremail: string 

  @Field()
  password: string
}