import argon2 from 'argon2';
import { User } from '../entities/User';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { FindOneOptions } from 'typeorm';
import { UserMutationResponse } from '../types/UserRes';
import { RegisterInput } from '../types/RegisterInput';
import { validateRegisterInput } from '../utils/validateRegisterInput';
import { LoginInput } from '../types/LoginInput';
import { Context } from '../types/Context';


@Resolver ()
export class  UserResolver {
  @Mutation (_return => UserMutationResponse, {nullable:true})
  async register (
    @Arg('registerInput') registerInput: RegisterInput
    
  ) : Promise<UserMutationResponse>
  {
       const validateRegisterInputErrors = validateRegisterInput (registerInput)
       if (validateRegisterInputErrors)
       {
          return{
            code: 400,
            success: false,
            ...validateRegisterInputErrors

            }              
       }
       try {
        const {username,email,password} = registerInput
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

  @Mutation(_return => UserMutationResponse)
  async login(@Arg('loginInput') {usernameOremail , password} : LoginInput ,
              @Ctx() {req} : Context
  ) : Promise<UserMutationResponse>{
    try {

      const filter  : FindOneOptions<User> = {
       where : [  usernameOremail.includes('@') ? { email: usernameOremail } : { username: usernameOremail }]
      }
      const existingUser = await User.findOne(filter)

      if(!existingUser)
      {
       return {
        code: 400,
        success: false,
        message: 'User not found',
        error :[
          {field :'usernameOremail', message: 'Username of Email is incorrect'}
        ]
       }
      
      }
       const passwordValid = await argon2.verify(existingUser.password , password )

       if(!passwordValid) {
          return {
            code: 400,
            success: false,
            message: 'Password is wrong',
            error:
            [ {field:'password', message:'Wrong password'}]
          }
        }
        // Create session and Return Cookies
        req.session.userId = existingUser.id 
   
       return {
          code: 200,
          success: true,
          message: 'Logged in successfully',
          user: existingUser
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
