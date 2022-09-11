import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { WEATHER_URL } from '../../environments';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (!+req.query.page || req.query.page <= 0) {
      req.query.page = 1;
    }
    next();
  }
}

@Injectable()
export class WeatherInsertMiddleware implements NestMiddleware {
  constructor(private httpService: HttpService) {}

  async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
    const { data } = await firstValueFrom(this.httpService.get(WEATHER_URL));

    req.body.weather = data.current.condition.text;

    next();
  }
}
