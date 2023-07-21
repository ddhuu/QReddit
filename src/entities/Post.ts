import {Entity , Column , BaseEntity ,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
@Entity() 
export class Post extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id !: number 

  @Column()
  title !: string

  @Column()
  content !: string

  @CreateDateColumn() 
  createAt : Date

  @UpdateDateColumn()
  updateAt : Date

}