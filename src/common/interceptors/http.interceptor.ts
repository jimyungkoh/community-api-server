import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import {
  EntityNotFoundException,
  IncorrectPasswordException,
} from '../exceptions/exception';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityNotFoundException) {
          throw new NotFoundException(
            'The requested URL was not found on this server.',
          );
        } else {
          throw error;
        }
      }),
    );
  }
}

@Injectable()
export class ForbiddenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof IncorrectPasswordException) {
          throw new ForbiddenException(
            "you don't have permission to access this resource",
          );
        } else {
          throw error;
        }
      }),
    );
  }
}
