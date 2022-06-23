import { WeatherData } from '../interfaces';
import { ObjFilter } from '../utils/ObjFilter';
import ForecastView from '../views/ForecastView';

class WeatherDataModel {
  private forecast: WeatherData = {
    name: '',
    feels_like: 0,
    humidity: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  };

  private forecastView: ForecastView;

  constructor(forecastView: ForecastView) {
    this.forecastView = forecastView;
  }

  private normaliseWeatherData(rawForecast: any): WeatherData {
    const { name, main } = rawForecast;

    const weatherData = ObjFilter(
      main,
      ([key, _]: [string, any]) => key !== 'pressure'
    );

    const normalisedWeatherData: WeatherData = Object.entries(
      weatherData
    ).reduce(
      (data: any, [key, value]: [string, any]) => {
        return {
          ...data,
          ...(isNaN(value) ? { [key]: value } : { [key]: Math.round(value) }),
        };
      },
      { name }
    );

    return normalisedWeatherData;
  }

  get currentForecast(): WeatherData {
    return this.forecast;
  }

  setNewForecast(rawForecast: any): void {
    const normalisedWeatherData: WeatherData =
      this.normaliseWeatherData(rawForecast);

    this.forecast = normalisedWeatherData;
    this.forecastView.updateForecast(this.forecast);

    // TESTING:
    // setTimeout(() => {
    //   this.forecastView.updateForecast(this.forecast);
    // }, 2000);
  }
}

export default WeatherDataModel;
