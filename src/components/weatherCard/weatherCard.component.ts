import { WeatherData } from '../../interfaces';
import WeatherService from '../../WeatherService';
import Card from '../card/card.component';

function buildWeatherDataContent(data: WeatherData): HTMLDivElement {
  const box = document.createElement('div');
  return box;
}

export default async function WeatherCard() {
  const data = await WeatherService.getCurrentForecast();
  const { name, main } = data;

  const weatherData = Object.fromEntries(
    Object.entries(main).filter(([key]) => key !== 'pressure')
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

  console.log(normalisedWeatherData);

  // TODO: Pass in title and weather content
  const weatherCard: HTMLDivElement = Card('todo', 'todo');

  return weatherCard;
}
