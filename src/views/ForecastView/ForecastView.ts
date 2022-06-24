import { UnitSystem, UNITS } from '../../constants/Unit';
import Card from '../../components/card/card.component';
import Search from '../../components/search/search.component';
import WeatherController from '../../controller/WeatherController';
import { WeatherData } from '../../interfaces';
import { ObjFilter } from '../../utils/ObjFilter';
import BaseView from '../BaseView/BaseView';
import './forecastView.style.css';

class ForecastView extends BaseView {
  private WEATHER_CONTENT_KEY = {
    feels_like: 'Feels like',
    humidity: 'Humidity',
    temp: 'Temp',
    temp_max: 'Max. temp',
    temp_min: 'Min. temp',
  };

  private ctrl: WeatherController | null = null;
  private unitSystem: UnitSystem = UnitSystem.Metric;
  private $search: Search | null = null;
  private $forecastCard: Card;
  private $weatherContent: HTMLParagraphElement[] = [];

  constructor() {
    super();
    this.$forecastCard = new Card('forecast');
    this.$view.className = 'forecast-view';
  }

  setCtrl(ctrl: WeatherController): void {
    this.ctrl = ctrl;
  }

  loading(): HTMLDivElement {
    return this.$forecastCard.loading();
  }

  build(): void {
    if (this.ctrl) this.$search = new Search(this.ctrl);

    const children = [
      ...(this.$search ? [this.$search.update()] : []),
      this.loading(),
    ];

    this.$view.replaceChildren(...children);

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

        const unit: string =
          contentKey === 'humidity' ? '%' : UNITS[this.unitSystem];

        $p.textContent = `${contentKey}: ${value} ${unit}`;

        return $p;
      }
    );

    return $weatherInfo;
  }

  updateForecast(forecast: WeatherData, unitSystem?: UnitSystem) {
    if (unitSystem) this.unitSystem = unitSystem;

    this.$weatherContent = this.buildWeatherDataContent(forecast);

    const children = [
      ...(this.$search ? [this.$search.update()] : []),
      this.$forecastCard.update(forecast.name, this.$weatherContent),
    ];

    this.$view.replaceChildren(...children);

    this.update();
  }
}

export default ForecastView;
