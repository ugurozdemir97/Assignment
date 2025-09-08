import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true})],
    controllers: [AppController, UsersController, PostsController],
    providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
