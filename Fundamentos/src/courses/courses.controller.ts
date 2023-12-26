import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";
import { Routes } from "../utils";
@Controller(Routes.Courses)
export class CoursesController {
  constructor(private readonly coursesServise: CoursesService) {}

  @Get(Routes.CoursesFindAll)
  findAll() {
    return this.coursesServise.findAll();
  }

  @Get(Routes.CoursesFindOne)
  findOne(@Param("id") id: string) {
    return this.coursesServise.findOne(id);
  }

  @Post(Routes.CoursesCreate)
  create(@Body() createCourseDTO: CreateCourseDTO) {
    return this.coursesServise.create(createCourseDTO);
  }

  @Patch(Routes.CoursesUpdate)
  update(@Param("id") id: string, @Body() updateCourseDTO: UpdateCourseDTO) {
    return this.coursesServise.update(id, updateCourseDTO);
  }

  @Delete(Routes.CoursesDelete)
  delete(@Param("id") id: string) {
    return this.coursesServise.delete(id);
  }
}
