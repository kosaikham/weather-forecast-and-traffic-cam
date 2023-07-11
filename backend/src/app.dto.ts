import { IsNotEmpty, IsDateString } from 'class-validator';

export class DateTimeQueryDto {
  @IsNotEmpty()
  @IsDateString()
  date_time: string;
}
