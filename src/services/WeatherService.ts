import { QueryParams } from '../types';

class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = require('../../config.json')['API_KEY'];

  async getNewForecast(queryParams: QueryParams): Promise<any> {
    const url: string = `${this.baseUrl}?apikey=${this.apiKey}`;
    const finalUrl: string = Object.entries(queryParams).reduce(
      (resultUrl, [key, value]): string => `${resultUrl}&${key}=${value}`,
      url
    );

    /**
     * TODO: Handle *unexpected* failed network requests
     * 1. Needs to gracefully fail by catching the error and printing out to console
     * 2. Display a try again later message on the UI
     *
     * TODO: Handle expected fails like the location cannot be found, propagate it to show an
     * 'Unknown location' message on the UI
     */
    const response: Response = await fetch(finalUrl);
    const rawForecast: any = await response.json();

    return rawForecast;
  }
}

export default new WeatherService();
