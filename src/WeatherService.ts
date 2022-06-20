class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = require('../config.json')['API_KEY'];

  async getCurrentForecast(queryParams: any): Promise<any> {
    if (!queryParams.q)
      throw new Error('Location has not been defined in query parameters!');

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
