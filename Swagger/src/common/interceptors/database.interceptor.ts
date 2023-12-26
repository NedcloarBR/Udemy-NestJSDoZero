import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { DatabaseError } from "../errors/DatabaseError";
import { handleDatabaseErrors } from "../utils/HandleDatabaseErrors";
import { isPrismaError } from "../utils/IsPrismaError";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) error = handleDatabaseErrors(error);

        if (error instanceof DatabaseError)
          throw new BadRequestException(error.message);

        throw error;
      }),
    );
  }
}
