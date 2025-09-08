import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import type { User, UpdatedUser } from "./users.userinterface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get() // http://localhost:3000/users
    getAll() {
        return this.usersService.findAll();
    }

    @Get(":id") // Find one user from his id
    getOne(@Param("id") id: string) {
        return this.usersService.findOne(+id);
    }

    @Post("signup")
    signup(@Body() user: User) {
        return this.usersService.signup(user);
    }

    @Post("login")
    login(@Body() body: { username: string; password: string }) {
        return this.usersService.login(body.username, body.password);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.usersService.delete(+id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() post: UpdatedUser) {
        return this.usersService.update(+id, post);
    }
}
