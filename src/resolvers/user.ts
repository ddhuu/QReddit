import argon2 from 'argon2';
import { User } from '../entities/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { FindOneOptions } from 'typeorm';


@Resolver ()
export class  UserResolver {
  @Mutation (_return => User, {nullable:true})
  async register (
    @Arg('email') email : string,
    @Arg('username') username : string,
    @Arg('password') password : string
  )
  {
       try {
        const filter  : FindOneOptions<User> = {
          where :{username}
        }
        const existingUser = await User.findOne(filter)
        if ( existingUser) return  null
        
        const hashedPassword = await argon2.hash(password)

        const newUser = User.create({
          username,
          password: hashedPassword,
          email
        })
        return await User.save(newUser)


        
       } catch (error) {
        console.log(error)
        return null
       }
  }
}
