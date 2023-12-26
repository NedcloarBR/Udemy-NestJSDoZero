export enum Services {
  COURSES = "COURSES_SERVICE",
}

export enum Routes {
  Courses = "courses",
  CoursesFindAll = "list",
  CoursesFindOne = ":id",
  CoursesCreate = "create",
  CoursesUpdate = ":id",
  CoursesDelete = ":id",
}

export enum DataProviders {
  Database = "DATA_SOURCE",
  Couses = "COURSES_REPOSITORY",
  Tags = "TAGS_REPOSITORY",
}
