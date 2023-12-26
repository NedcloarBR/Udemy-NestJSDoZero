import { DataSource } from "typeorm";
import { DataProviders } from "../utils";
import { Course, Tag } from "../database/entities";

export const coursesProviders = [
  {
    provide: DataProviders.Couses,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Course),
    inject: [DataProviders.Database],
  },
];

export const tagsProviders = [
  {
    provide: DataProviders.Tags,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: [DataProviders.Database],
  },
];
