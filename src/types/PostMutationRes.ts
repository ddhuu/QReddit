import { Field, ObjectType } from 'type-graphql';
import { IMutaionResponse } from './MutationRes';
import { FieldError } from './FieldError';
import { Post } from '../entities/Post';

@ObjectType({implements : IMutaionResponse})

export class PostMutationRes implements  IMutaionResponse{
     code  : number 
     success: boolean
     message?: string

     @Field({nullable: true})
     post ?: Post

     @Field(_typed => [FieldError, {nullable: true}])
     error ?: FieldError[]
    
}