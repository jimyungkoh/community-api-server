import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!+req.query.page || req.query.page <= 0) {
      req.query.page = 1;
    }
    next();
  }
}
