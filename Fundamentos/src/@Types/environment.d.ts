declare namespace NodeJS {
  export interface ProcessEnv {
    // Type
    ENVIRONMENT: Environment;
    // Project
    PORT?: string;
    SECRET?: string;
    // Database
    DB_type?: string;
    DB_host?: string;
    DB_port?: number;
    DB_username?: string;
    DB_password?: string;
    DB_database?: string;
  }
  export type Environment = "DEVELOPMENT" | "PRODUCTION";
}
