import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { CoursesModule } from "../../src/courses/courses.module";
import { Routes } from "../../src/utils";
import { CreateCourseDTO } from "../../src/courses/dto/create-course.dto";

const configService = new ConfigService();
let envFilePath = ".env.development";
if (configService.get("ENVIRONMENT") === "PRODUCTION")
  envFilePath = ".env.production";

describe("CousesController (e2e)", () => {
  let app: INestApplication;

  const course: CreateCourseDTO = {
    name: "NestJS with TypeORM",
    description: "Creating an API Restful with NestJS",
    tags: ["nestjs", "typeorm", "nodejs", "typescript"],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath }),
        TypeOrmModule.forRoot({
          type: "postgres",
          host: configService.get("DBTests_host"),
          port: configService.get("DBTests_port"),
          username: configService.get("DBTests_username"),
          password: configService.get("DBTests_password"),
          database: configService.get("DBTests_database"),
          autoLoadEntities: true,
          synchronize: true,
        }),
        CoursesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Create POST /courses", async () => {
    return request(app.getHttpServer())
      .post(Routes.Courses)
      .send(course)
      .expect(HttpStatus.CREATED);
  });
});
