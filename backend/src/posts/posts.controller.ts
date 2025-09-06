import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')  
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()  // http://localhost:3000/posts
  getAll() {return this.postsService.findAll()}

  @Get('user/:userId')  // Find all posts of a user
  getByUser(@Param('userId') userId: string) {return this.postsService.findByUser(+userId);}

  /*
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Post()
  create(@Body() post: any) {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() post: any) {
    return this.postsService.update(+id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
  */
}