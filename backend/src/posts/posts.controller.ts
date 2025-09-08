import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { PostsService } from "./posts.service";
import type { UpdatedPost } from "./posts.postinterface";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get() // http://localhost:3000/posts
    getAll() {
        return this.postsService.findAll();
    }

    @Get("user/:userId") // Find all posts of a user
    getByUser(@Param("userId") userId: string) {
        return this.postsService.findByUser(+userId);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.postsService.delete(+id);
    }

    @Delete("user/:userId")
    deleteByUser(@Param("userId") userId: string) {
        return this.postsService.deleteByUser(+userId);
    }

    @Post()
    create(@Body() post: UpdatedPost) {
        return this.postsService.create(post);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() post: UpdatedPost) {
        return this.postsService.update(+id, post);
    }
}
