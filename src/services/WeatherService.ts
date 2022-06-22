import { QueryParams } from '../types';
import { Unit } from '../constants/Unit';

class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = require('../../config.json')['API_KEY'];
  private defaultParams: QueryParams = { q: 'London', units: Unit.Metric };

  async getCurrentForecast(
    queryParams: QueryParams = this.defaultParams
  ): Promise<any> {
    const url: string = `${this.baseUrl}?apikey=${this.apiKey}`;
    const finalUrl: string = Object.entries(queryParams).reduce(
      (resultUrl, [key, value]): string => `${resultUrl}&${key}=${value}`,
      url
    );

    const response: Response = await fetch(finalUrl);
    const currentForecast: any = await response.json();

    return currentForecast;
  }
}

export default new WeatherService();
