"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const PostMutationRes_1 = require("../types/PostMutationRes");
const CreatePostInput_1 = require("../types/CreatePostInput");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entities/Post");
const UpdatePostInput_1 = require("../types/UpdatePostInput");
const checkAuth_1 = require("../middleware/checkAuth");
let PostResolver = exports.PostResolver = class PostResolver {
    createPost({ title, text }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newPost = Post_1.Post.create({
                    title,
                    text
                });
                newPost = yield newPost.save();
                return {
                    code: 200,
                    success: true,
                    message: 'Post created successfully',
                    post: newPost
                };
            }
            catch (error) {
                console.log(error);
                return {
                    code: 500,
                    success: false,
                    message: `Internal Server Error: ${error.message}`,
                };
            }
        });
    }
    posts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield Post_1.Post.find();
                return posts;
            }
            catch (error) {
                console.log(error);
                return undefined;
            }
        });
    }
    post(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = { where: [{ id }] };
                const post = yield Post_1.Post.findOne(filter);
                return post;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updatePost({ id, title, text }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { where: [{ id }] };
            const existingPost = yield Post_1.Post.findOne(filter);
            if (!existingPost) {
                return {
                    code: 400,
                    success: false,
                    message: 'Post not found'
                };
            }
            existingPost.title = title;
            existingPost.text = text;
            yield existingPost.save();
            return {
                code: 200,
                success: true,
                message: 'Post updated successfully',
                post: existingPost
            };
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { where: [{ id }] };
            const existingPost = yield Post_1.Post.findOne(filter);
            if (!existingPost) {
                return {
                    code: 400,
                    success: false,
                    message: 'Post not found'
                };
            }
            yield Post_1.Post.delete({ id });
            return {
                code: 200,
                success: true,
                message: 'Post deleted successfully'
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(_return => PostMutationRes_1.PostMutationRes, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('createPostInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostInput_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Query)(_return => [Post_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(_return => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', _type => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => PostMutationRes_1.PostMutationRes),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('updateInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePostInput_1.UpdatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(_return => PostMutationRes_1.PostMutationRes),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)('id', _type => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
exports.PostResolver = PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
//# sourceMappingURL=post.js.map