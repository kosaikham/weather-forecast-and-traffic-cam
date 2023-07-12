export type Location = {
    latitude: number;
    longitude: number;
}

export type APIResponse = {
  id: number;
  name: string;
  weather: string;
  location: Location;
  image: string;
};