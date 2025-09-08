import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({origin: process.env.FRONTEND_URL}); // This is frontend's port
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
    console.error("Failed to start server:", err);
});
