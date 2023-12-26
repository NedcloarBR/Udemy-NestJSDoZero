import { NotFoundException, Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";
import { Course } from "../database/entities/course.entity";
import { Tag } from "../database/entities/tag.entity";
import { DataProviders } from "src/utils";

@Injectable()
export class CoursesService {
  constructor(
    @Inject(DataProviders.Couses)
    private courseRepository: Repository<Course>,
    @Inject(DataProviders.Tags)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.courseRepository.find({ relations: ["tags"] });
  }

  async findOne(id: string) {
    const Course = await this.courseRepository.findOne({
      where: { id },
      relations: ["tags"],
    });

    if (!Course) {
      throw new NotFoundException(`Course ID: ${id} not found`);
    }

    return Course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );

    const Course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });
    return this.courseRepository.save(Course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));

    const Course = await this.courseRepository.preload({
      id,
      ...updateCourseDTO,
      tags,
    });

    if (!Course) {
      throw new NotFoundException(`Course ID: ${id} not found`);
    }

    return this.courseRepository.save(Course);
  }

  async delete(id: string) {
    const Course = await this.courseRepository.findOne({ where: { id } });

    if (!Course) {
      throw new NotFoundException(`Course ID: ${id} not found`);
    }

    return this.courseRepository.remove(Course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const Tag = await this.tagRepository.findOne({ where: { name } });

    if (Tag) {
      return Tag;
    }

    return this.tagRepository.create({ name });
  }
}
