export type Location = {
    latitude: number;
    longitude: number;
};
export type TrafficLocationImage = {
    timestamp: string;
    image: string;
    location: Location;
};
export type WeatherAndNameResult = {
    name: string;
    weather: string;
    location: Location;
};
export type CorrectInfo = {
    image: string;
} & WeatherAndNameResult;
export type Response = {
    id: number;
} & CorrectInfo;
