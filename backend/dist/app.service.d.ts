import { HttpService } from '@nestjs/axios';
import { Response } from './utils/types';
export declare class AppService {
    private readonly httpService;
    private readonly trafficUrl;
    private readonly weatherUrl;
    constructor(httpService: HttpService);
    getLocationAndWeather(dateTime: string): Promise<Response[]>;
    private fetchTrafficLocationImages;
    private fetchWeatherForecast;
}
