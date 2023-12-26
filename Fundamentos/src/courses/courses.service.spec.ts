import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CoursesService } from "./courses.service";
import { Course } from "../database/entities/course.entity";
import { Tag } from "../database/entities/tag.entity";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe("CoursesService", () => {
  let service: CoursesService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Service Methods", () => {
    describe("Find Course by Id", () => {
      it("should return the object", async () => {
        const id = "1";
        const expectedCourse = {};

        courseRepository.findOne.mockReturnValue(expectedCourse);
        const course = await service.findOne(id);
        expect(course).toEqual(expectedCourse);
      });

      it("should return NotFoundException", async () => {
        const id = "1";

        courseRepository.findOne.mockReturnValue(undefined);
        try {
          await service.findOne(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Course ID: ${id} not found`);
        }
      });
    });
  });
});
