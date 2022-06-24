import { QueryParams } from '../types';

class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = require('../../config.json')['API_KEY'];

  async getNewForecast(queryParams: QueryParams): Promise<Response> {
    const url: string = `${this.baseUrl}?apikey=${this.apiKey}`;
    const finalUrl: string = Object.entries(queryParams).reduce(
      (resultUrl, [key, value]): string => `${resultUrl}&${key}=${value}`,
      url
    );

    return await fetch(finalUrl);
  }
}

export default new WeatherService();
