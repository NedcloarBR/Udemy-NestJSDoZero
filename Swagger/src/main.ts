import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import {
  Conflict,
  Database,
  NotFound,
  Unauthorized,
} from "./common/interceptors/Interceptors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(Conflict, Database, NotFound, Unauthorized);

  const SwaggerConfig = new DocumentBuilder()
    .setTitle("Swagger NestJS API Docs")
    .setDescription("API Descriptions")
    .setVersion("1.0")
    .build();
  const SwaggerDocument = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup("api/docs", app, SwaggerDocument);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
