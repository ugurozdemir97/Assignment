import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()  // http://localhost:3000/users
  getAll() {return this.usersService.findAll()}

  @Get(':id')  // Find one user from his id
  getOne(@Param('id') id: string) {return this.usersService.findOne(+id)}

  /*

  @Post()
  create(@Body() user: any) {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: any) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }*/

}