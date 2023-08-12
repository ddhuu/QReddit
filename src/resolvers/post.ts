
import { PostMutationRes } from '../types/PostMutationRes';
import { CreatePostInput } from '../types/CreatePostInput';
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post';
import { __Type } from 'graphql';
import { FindOneOptions } from 'typeorm';
import { UpdatePostInput } from '../types/UpdatePostInput';

@Resolver()
export class PostResolver {
  @Mutation(_return => PostMutationRes , {nullable: true})
    async createPost (@Arg('createPostInput'){title,text} : CreatePostInput) : Promise<PostMutationRes>{
          try {
            let newPost = Post.create({
              title,
              text
            })

            newPost = await newPost.save()
            return {
              code : 200,
              success: true,
              message: 'Post created successfully',
              post : newPost
            }
          } catch (error) {
            console.log(error)
        return {
          code: 500 ,
          success: false,
          message: `Internal Server Error: ${error.message}`,
        }
          }        
    }
    @Query(_return => [Post]) 
    async posts() : Promise<Post[] | undefined>{
      try {
        const posts = await Post.find() 
        return  posts
      } catch (error) {
        console.log(error)
        return undefined
      }
      
    }

    @Query(_return => Post, {nullable: true})
    async post(@Arg('id',_type => ID) id : number) : Promise<Post|null>{
      try {
        const filter  : FindOneOptions<Post> = { where :[{id}] }
          const post = await Post.findOne(filter)
          return post
      } catch (error) {
        console.log(error)
        return null
      }
     
    }

    @Mutation(_return => PostMutationRes) 
    async updatePost(@Arg('updateInput') {id,title,text}:  UpdatePostInput )  : Promise<PostMutationRes>{
      const filter  : FindOneOptions<Post> = { where :[{id}] }
      const existingPost = await Post.findOne(filter)
      if (!existingPost)
      {
          return {
            code : 400,
            success: false,
            message: 'Post not found'
          }

      }
      existingPost.title = title 
      existingPost.text = text

      await existingPost.save()
      return {
        code : 200,
        success: true,
        message: 'Post updated successfully',
        post: existingPost

    }
  }

  @Mutation(_return => PostMutationRes)
  async deletePost(@Arg('id',_type => ID)id: number) : Promise<PostMutationRes>
  {
      const filter  : FindOneOptions<Post> = { where :[{id}] }
      const existingPost = await Post.findOne(filter)
      if (!existingPost)
      {
          return {
            code : 400,
            success: false,
            message: 'Post not found'
          }

      }
      await Post.delete({id})
      return{
        code: 200,
        success: true,
        message: 'Post deleted successfully'
      }
  }

}