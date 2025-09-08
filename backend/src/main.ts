import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: "http://localhost:5173" }); // This is frontend's port
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
    console.error("Failed to start server:", err);
});
