import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { DatabaseModule } from "src/database/database.module";
import { coursesProviders, tagsProviders } from "./courses.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [...coursesProviders, ...tagsProviders, CoursesService],
})
export class CoursesModule {}
