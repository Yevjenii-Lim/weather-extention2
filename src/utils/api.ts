const OPEN_WEATHER_API_KEY = 'bc80a80c7590edbc430b5761c6463007';

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
    icon: string;
    id: string;
    main: string;
  }[];
  widnd: {
    deg: number;
    speed: number;
  };
}

export type OpenWeatherTempScale = 'metric' | 'imperial';

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );
  if (!res.ok) {
    throw new Error('City not found');
  }
  const data: OpenWeatherData = await res.json();
  return data;
}

export function getWeatherIcon(iconCode: string): string {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
