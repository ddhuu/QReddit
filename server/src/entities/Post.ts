import { Field, ID, ObjectType } from 'type-graphql'
import {Entity , Column , BaseEntity ,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
@ObjectType()
@Entity() 
export class Post extends BaseEntity  {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  id !: number 

  @Field()
  @Column()
  title !: string

  @Field()
  @Column()
  text !: string

  @Field()
  @CreateDateColumn() 
  createAt : Date

  @Field()
  @UpdateDateColumn()
  updateAt : Date

}