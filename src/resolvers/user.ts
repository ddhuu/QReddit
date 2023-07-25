import argon2 from 'argon2';
import { User } from '../entities/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { FindOneOptions } from 'typeorm';
import { UserMutationResponse } from '../types/UserRes';
import { RegisterInput } from '../types/RegisterInput';


@Resolver ()
export class  UserResolver {
  @Mutation (_return => UserMutationResponse, {nullable:true})
  async register (
    @Arg('registerInput') {username , email , password} : RegisterInput
  ) : Promise<UserMutationResponse>
  {
       try {
        const filter  : FindOneOptions<User> = {
          where :[{username} , {email}]
        }
        const existingUser = await User.findOne(filter)
        if ( existingUser)
         return  {
          code: 400 ,
          success : false,
          message: "Duplicate username or email",
          error :[
            {
            field: existingUser.username === username ? 'username' : 'email',
            message: `${existingUser.username === username ? 'Username':'email'} already taken !`
            }
          ]


         }
        
        const hashedPassword = await argon2.hash(password)

        const newUser = User.create({
          username,
          password: hashedPassword,
          email
        })
        return {
          code : 200,
          success: true,
          message: 'User Registration Successful',
          user : await User.save(newUser)
        }

        
       } catch (error) {
        console.log(error)
        return {
          code: 500 ,
          success: false,
          message: `Internal Server Error: ${error.message}`
        }
       }
  }
}
