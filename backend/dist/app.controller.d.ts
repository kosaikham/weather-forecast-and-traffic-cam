import { AppService } from './app.service';
import { DateTimeQueryDto } from './app.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getLocationAndWeather(query: DateTimeQueryDto): Promise<import("./utils/types").Response[]>;
}
