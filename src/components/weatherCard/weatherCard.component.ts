import { WeatherData } from '../../interfaces';
import WeatherService from '../../WeatherService';
import Card from '../card/card.component';

const WEATHER_CONTENT_KEY = {
  feels_like: 'Feels like',
  humidity: 'Humidity',
  temp: 'Temp',
  temp_max: 'Max temp',
  temp_min: 'Min temp',
};

function buildWeatherDataContent(data: WeatherData): HTMLParagraphElement[] {
  const $weatherInfo: HTMLParagraphElement[] = Object.entries(data).map(
    ([key, value]: [string, any]) => {
      const $p: HTMLParagraphElement = document.createElement('p');

      // Necessary because KEY obj doesn't have a data type,
      // and TS recognises that `key` might not be a valid index
      const contentKey: string =
        WEATHER_CONTENT_KEY[key as keyof typeof WEATHER_CONTENT_KEY];

      $p.textContent = `${contentKey}: ${value}`;

      return $p;
    }
  );

  return $weatherInfo;
}

export default async function WeatherCard(): Promise<HTMLDivElement> {
  const data = await WeatherService.getCurrentForecast();
  const { name, main } = data;

  const weatherData = Object.fromEntries(
    Object.entries(main).filter(([key, _]: [string, any]) => key !== 'pressure')
  );

  const normalisedWeatherData: WeatherData = Object.entries(weatherData).reduce(
    (data: any, [key, value]: [string, any]) => {
      return {
        ...data,
        ...(isNaN(value) ? { [key]: value } : { [key]: Math.round(value) }),
      };
    },
    {}
  );

  const $weatherContent: HTMLParagraphElement[] = buildWeatherDataContent(
    normalisedWeatherData
  );
  const $weatherCard: HTMLDivElement = Card(name, $weatherContent);

  return $weatherCard;
}
