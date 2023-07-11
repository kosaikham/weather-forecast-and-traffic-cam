import {
  CorrectInfo,
  TrafficLocationImage,
  WeatherAndNameResult,
} from './types';
import { calculateDistance, findNearestLocation } from './utils';

describe('calculateDistance', () => {
  it('calculates distance between two points correctly', () => {
    const lat1 = 1.341244001;
    const lon1 = 103.6439134;
    const lat2 = 1.357;
    const lon2 = 103.987;
    const expectedDistance = 38.17; // Expected distance in kilometers
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    expect(distance).toBeCloseTo(expectedDistance, 1);
  });
});

// Unit tests for findNearestLocation function
describe('findNearestLocation', () => {
  it('returns null if the locations list is empty', () => {
    const targetLocation: TrafficLocationImage = {
      timestamp: '2023-07-05T17:21:36+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2023/07/2fc049b8-a47a-423a-a6cb-8b583c4c7bf1.jpg',
      location: { latitude: 1.341244001, longitude: 103.6439134 },
    };
    const locations: WeatherAndNameResult[] = [];

    const nearestLocation = findNearestLocation(targetLocation, locations);
    expect(nearestLocation).toBeNull();
  });

  it('returns the nearest location from the list', () => {
    const targetLocation: TrafficLocationImage = {
      timestamp: '2023-07-05T17:21:36+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2023/07/2fc049b8-a47a-423a-a6cb-8b583c4c7bf1.jpg',
      location: { latitude: 1.317036, longitude: 103.988598 },
    };

    const locations: WeatherAndNameResult[] = [
      {
        name: 'Bishan',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.350772, longitude: 103.839 },
      },
      {
        name: 'Boon Lay',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.304, longitude: 103.701 },
      },
      {
        name: 'Bukit Batok',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.353, longitude: 103.754 },
      },
      {
        name: 'Bukit Merah',
        weather: 'Thundery Showers',
        location: { latitude: 1.277, longitude: 103.819 },
      },
      {
        name: 'Bukit Panjang',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.362, longitude: 103.77195 },
      },
      {
        name: 'Bukit Timah',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.325, longitude: 103.791 },
      },
      {
        name: 'Central Water Catchment',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.38, longitude: 103.805 },
      },
      {
        name: 'Changi',
        weather: 'Light Showers',
        location: { latitude: 1.357, longitude: 103.987 },
      },
      {
        name: 'Choa Chu Kang',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.377, longitude: 103.745 },
      },
      {
        name: 'Clementi',
        weather: 'Heavy Thundery Showers',
        location: { latitude: 1.315, longitude: 103.76 },
      },
      {
        name: 'City',
        weather: 'Thundery Showers',
        location: { latitude: 1.292, longitude: 103.844 },
      },
    ];
    const expectedNearestLocation: CorrectInfo = {
      name: 'Changi',
      weather: 'Light Showers',
      location: { latitude: 1.317036, longitude: 103.988598 },
      image:
        'https://images.data.gov.sg/api/traffic-images/2023/07/2fc049b8-a47a-423a-a6cb-8b583c4c7bf1.jpg',
    };

    const nearestLocation = findNearestLocation(targetLocation, locations);
    expect(nearestLocation).toEqual(expectedNearestLocation);
  });
});
