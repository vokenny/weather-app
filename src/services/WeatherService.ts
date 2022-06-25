import { Config, QueryParams } from '../types';

class WeatherService {
  private config: Config = require('../../config.json');
  private baseUrl: string = this.config.BASE_URL;
  private apiKey: string = this.config.API_KEY;

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
