import { ConflictInterceptor } from "./conflict.interceptor";
import { DatabaseInterceptor } from "./database.interceptor";
import { NotFoundInterceptor } from "./notfound.interceptor";
import { UnauthorizedInterceptor } from "./unauthorized.interceptor";

export const Conflict = new ConflictInterceptor();
export const Database = new DatabaseInterceptor();
export const NotFound = new NotFoundInterceptor();
export const Unauthorized = new UnauthorizedInterceptor();
