import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getLocationAndWeather: jest.fn().mockResolvedValue(result),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should return an array of weather, location and images', async () => {
    expect(
      await controller.getLocationAndWeather({
        date_time: '2023-07-02T17:03:00',
      }),
    ).toEqual(result);
    expect(service.getLocationAndWeather).toHaveBeenCalled();
  });
});
