import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ConflictInterceptor } from "./common/interceptors/conflict.interceptor";
import { DatabaseInterceptor } from "./common/interceptors/database.interceptor";
import { NotFoundInterceptor } from "./common/interceptors/notfound.interceptor";
import { UnauthorizedInterceptor } from "./common/interceptors/unauthorized.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new ConflictInterceptor(),
    new DatabaseInterceptor(),
    new UnauthorizedInterceptor(),
    new NotFoundInterceptor(),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
