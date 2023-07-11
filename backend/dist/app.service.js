"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils/utils");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.trafficUrl = 'https://api.data.gov.sg/v1/transport/traffic-images';
        this.weatherUrl =
            'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
    }
    async getLocationAndWeather(dateTime) {
        try {
            const imageResult = await this.fetchTrafficLocationImages(encodeURIComponent(dateTime));
            if (imageResult.length === 0)
                return [];
            const weatherResult = await this.fetchWeatherForecast(imageResult[0].timestamp);
            const result = (0, utils_1.mergedAndFormatResult)(imageResult, weatherResult);
            return result;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async fetchTrafficLocationImages(encodedDateTime) {
        try {
            const result = await this.httpService
                .get(`${this.trafficUrl}?date_time=${encodedDateTime}`)
                .toPromise();
            const { items } = result.data;
            return items && items.length > 0 && items[0].cameras
                ? items[0].cameras.map((camera) => {
                    const { timestamp, image, location } = camera;
                    return {
                        timestamp,
                        image,
                        location,
                    };
                })
                : [];
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async fetchWeatherForecast(timestamp) {
        try {
            const formattedTimestamp = timestamp.substr(0, 19);
            const result = await this.httpService
                .get(`${this.weatherUrl}?date_time=${encodeURIComponent(formattedTimestamp)}`)
                .toPromise();
            const { items, area_metadata } = result.data;
            return items[0].forecasts.map((forecast, forecastIndex) => {
                return {
                    name: forecast.area,
                    weather: forecast.forecast,
                    location: area_metadata[forecastIndex].label_location,
                };
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map