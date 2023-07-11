import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { mergedAndFormatResult } from './utils/utils';
import {
  Response,
  TrafficLocationImage,
  WeatherAndNameResult,
} from './utils/types';

@Injectable()
export class AppService {
  private readonly trafficUrl: string;
  private readonly weatherUrl: string;
  constructor(private readonly httpService: HttpService) {
    this.trafficUrl = 'https://api.data.gov.sg/v1/transport/traffic-images';

    this.weatherUrl =
      'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
  }

  async getLocationAndWeather(dateTime: string): Promise<Response[]> {
    try {
      /**
       * this function will return
       * - image
       * - location
       */
      const imageResult = await this.fetchTrafficLocationImages(
        encodeURIComponent(dateTime),
      );

      if (imageResult.length === 0) return [];

      /**
       * this function will return
       * - location
       * - name
       * - weather
       */
      const weatherResult = await this.fetchWeatherForecast(
        imageResult[0].timestamp,
      );

      /**
       * first API + second API - to get a list of - location, name, image, weather
       */
      const result = mergedAndFormatResult(imageResult, weatherResult);
      return result;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private async fetchTrafficLocationImages(
    encodedDateTime: string,
  ): Promise<TrafficLocationImage[]> {
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
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private async fetchWeatherForecast(
    timestamp: string,
  ): Promise<WeatherAndNameResult[]> {
    try {
      const formattedTimestamp = timestamp.substr(0, 19);
      const result = await this.httpService
        .get(
          `${this.weatherUrl}?date_time=${encodeURIComponent(
            formattedTimestamp,
          )}`,
        )
        .toPromise();
      const { items, area_metadata } = result.data;
      return items[0].forecasts.map((forecast, forecastIndex) => {
        return {
          name: forecast.area,
          weather: forecast.forecast,
          location: area_metadata[forecastIndex].label_location,
        };
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
