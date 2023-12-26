import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { DataProviders, entities } from "../utils";

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: DataProviders.Database,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: configService.get("DB_host"),
        port: configService.get("DB_port"),
        username: configService.get("DB_username"),
        password: configService.get("DB_password"),
        database: configService.get("DB_database"),
        entities,
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
