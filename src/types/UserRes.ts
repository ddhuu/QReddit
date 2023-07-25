import { Field, ObjectType } from 'type-graphql';
import { IMutaionResponse } from './MutationRes';
import { User } from '../entities/User';
import { FieldError } from './FieldError';

@ObjectType({implements : IMutaionResponse})

export class UserMutationResponse implements  IMutaionResponse{
     code  : number 
     success: boolean
     message?: string

     @Field({nullable: true})
     user ?: User

     @Field(_typed => [FieldError, {nullable: true}])
     error ?: FieldError[]
    
}