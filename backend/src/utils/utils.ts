import {
  CorrectInfo,
  Response,
  TrafficLocationImage,
  WeatherAndNameResult,
} from './types';

export function mergedAndFormatResult(
  imageAndLocationResult: TrafficLocationImage[],
  weatherAndLocationResult: WeatherAndNameResult[],
): Response[] {
  const correctLocations: Response[] = [];
  let id = 0;
  for (const item of imageAndLocationResult) {
    const nearestLocation = findNearestLocation(item, weatherAndLocationResult);
    correctLocations.push({
      ...nearestLocation,
      id,
    });
    id++;
  }
  return correctLocations;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Haversine Formula on Wikipedia --> https://en.wikipedia.org/wiki/Haversine_formula
export function findNearestLocation(
  target: TrafficLocationImage,
  weatherAndNameList: WeatherAndNameResult[],
): CorrectInfo | null {
  if (weatherAndNameList.length === 0) {
    return null;
  }

  let nearestLocation: CorrectInfo | null = null;
  let minDistance = Infinity;

  for (const item of weatherAndNameList) {
    const { location } = item;
    const distance = calculateDistance(
      target.location.latitude,
      target.location.longitude,
      location.latitude,
      location.longitude,
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = {
        ...item,
        location: target.location,
        image: target.image,
      };
    }
  }

  return nearestLocation;
}
