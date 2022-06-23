import Card from '../components/card/card.component';
import Search from '../components/search/search.component';
import { WeatherData } from '../interfaces';
import { ObjFilter } from '../utils/ObjFilter';
import BaseView from './BaseView';

class ForecastView extends BaseView {
  private WEATHER_CONTENT_KEY = {
    feels_like: 'Feels like',
    humidity: 'Humidity',
    temp: 'Temp',
    temp_max: 'Max temp',
    temp_min: 'Min temp',
  };

  $search: Search;
  $forecastCard: Card;

  private $weatherContent: HTMLParagraphElement[] = [];

  constructor() {
    super();
    this.$search = new Search();
    this.$forecastCard = new Card('forecast');
    this.$view.className = 'forecast-view';

    this.$view.replaceChildren(
      this.$search.update(),
      this.$forecastCard.update('Loading', [])
    );

    this.update();
  }

  private buildWeatherDataContent(
    forecast: WeatherData
  ): HTMLParagraphElement[] {
    const metricData = ObjFilter(
      forecast,
      ([key, _]: [string, any]) => key !== 'name'
    );

    const $weatherInfo: HTMLParagraphElement[] = Object.entries(metricData).map(
      ([key, value]: [string, any]): HTMLParagraphElement => {
        const $p: HTMLParagraphElement = document.createElement('p');

        // Necessary because KEY obj doesn't have a data type,
        // and TS recognises that `key` might not be a valid index
        const contentKey: string =
          this.WEATHER_CONTENT_KEY[
            key as keyof typeof this.WEATHER_CONTENT_KEY
          ];

        $p.textContent = `${contentKey}: ${value}`;

        return $p;
      }
    );

    return $weatherInfo;
  }

  updateForecast(forecast: WeatherData) {
    this.$weatherContent = this.buildWeatherDataContent(forecast);

    this.$view.replaceChildren(
      this.$search.update(),
      this.$forecastCard.update(forecast.name, this.$weatherContent)
    );

    this.update();
  }
}

export default ForecastView;
