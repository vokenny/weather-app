import WeatherService from '../../WeatherService';
import Card from '../card/card.component';

export default async function WeatherCard() {
  const data = await WeatherService.getCurrentForecast();
  const { name, main } = data;

  const weatherData = Object.fromEntries(
    Object.entries(main).filter(([key, _]) => key !== 'pressure')
  );

  const normalisedWeatherData = Object.entries(weatherData).reduce(
    (data: any, [key, value]: [string, any]) => {
      return {
        ...data,
        ...(isNaN(value) ? { [key]: value } : { [key]: Math.round(value) }),
      };
    },
    {}
  );

  console.log(normalisedWeatherData);

  const weatherCard: HTMLDivElement = Card();

  return weatherCard;
}
