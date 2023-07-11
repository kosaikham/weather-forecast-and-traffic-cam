import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [AppService],
    // }).compile();

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should return an array of weather,images and locations', async () => {
    const result = [
      {
        name: 'Geylang',
        weather: 'Cloudy',
        location: {
          latitude: 1.319535712,
          longitude: 103.8750668,
        },
        image:
          'https://images.data.gov.sg/api/traffic-images/2023/07/b944f860-55fd-4e64-996e-468b24ca0087.jpg',
        id: 0,
      },
      {
        name: 'Paya Lebar',
        weather: 'Cloudy',
        location: {
          latitude: 1.363519886,
          longitude: 103.905394,
        },
        image:
          'https://images.data.gov.sg/api/traffic-images/2023/07/322940fc-a045-4283-a884-d3b4d258960a.jpg',
        id: 1,
      },
    ];
    jest
      .spyOn(service, 'getLocationAndWeather')
      .mockImplementation(() => Promise.resolve(result));

    expect(await service.getLocationAndWeather('2023-10-05T17:25:16')).toBe(
      result,
    );
  });
});
