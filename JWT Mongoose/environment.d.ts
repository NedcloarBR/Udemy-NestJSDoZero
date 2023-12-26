declare namespace NodeJS {
  export interface ProcessEnv {
    // Type
    ENVIRONMENT: Environment;
    // Project
    PORT?: string;
    SECRET?: string;
    // Database
    MONGO_USER?: string;
    MONGO_PASSWORD?: string;
    MONGO_URI?: string;
    // JWT
    JWT_SECRET?: string;
    ENCRYPT_JWT_SECRET?: string;
    JWT_EXPIRATION?: string;
  }
  export type Environment = 'DEVELOPMENT' | 'PRODUCTION';
}
