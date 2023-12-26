import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoursesModule } from "./courses/courses.module";
import { DatabaseModule } from "./database/database.module";

const configService = new ConfigService();
let envFilePath = ".env.development";
if (configService.get("ENVIRONMENT") === "PRODUCTION")
  envFilePath = ".env.production";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    DatabaseModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
