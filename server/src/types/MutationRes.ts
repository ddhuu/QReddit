import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()

export abstract class IMutaionResponse {
   @Field()
   code: number 

   @Field()
   success : boolean

   @Field({nullable: true})
   message?: string

}