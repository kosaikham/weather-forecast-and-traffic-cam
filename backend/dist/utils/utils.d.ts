import { CorrectInfo, Response, TrafficLocationImage, WeatherAndNameResult } from './types';
export declare function mergedAndFormatResult(imageAndLocationResult: TrafficLocationImage[], weatherAndLocationResult: WeatherAndNameResult[]): Response[];
export declare function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
export declare function toRadians(degrees: number): number;
export declare function findNearestLocation(target: TrafficLocationImage, weatherAndNameList: WeatherAndNameResult[]): CorrectInfo | null;
