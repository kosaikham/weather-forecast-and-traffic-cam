import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DateTimeQueryDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  getLocationAndWeather(@Query() query: DateTimeQueryDto) {
    const { date_time } = query;
    return this.appService.getLocationAndWeather(date_time);
  }
}
