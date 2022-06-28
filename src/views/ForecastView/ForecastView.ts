import { UnitSystem, UNITS } from '../../constants/Unit';
import Card from '../../components/card/card.component';
import Search from '../../components/search/search.component';
import WeatherController from '../../controller/WeatherController';
import { WeatherData } from '../../interfaces';
import { ObjFilter } from '../../utils/ObjFilter';
import BaseView from '../BaseView/BaseView';
import './forecastView.style.css';
import UnitsToggle from '../../components/unitsToggle/unitsToggle.component';

class ForecastView extends BaseView {
  private WEATHER_CONTENT_KEY = {
    feels_like: 'Feels like',
    humidity: 'Humidity',
    temp: 'Temp',
    temp_max: 'Max. temp',
    temp_min: 'Min. temp',
  };

  private ctrl: WeatherController | null = null;
  private $search: Search | null = null;
  private $forecastCard: Card;
  private $weatherContent: HTMLParagraphElement[] = [];
  private $unitsToggle: UnitsToggle | null = null;

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
    if (this.ctrl) {
      this.$search = new Search(this.ctrl);
      this.$unitsToggle = new UnitsToggle(this.ctrl);
    }

    const children = [
      ...(this.$search ? [this.$search.build()] : []),
      this.loading(),
      ...(this.$unitsToggle ? [this.$unitsToggle.build()] : []),
    ];

    this.$view.replaceChildren(...children);
    this.update();
  }

  private buildWeatherDataContent(
    forecast: WeatherData,
    unitSystem: UnitSystem
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
          contentKey === this.WEATHER_CONTENT_KEY.humidity
            ? '%'
            : UNITS[unitSystem];

        $p.textContent = `${contentKey}: ${value} ${unit}`;
        return $p;
      }
    );

    return $weatherInfo;
  }

  private buildViewChildren({
    title,
    content,
    unitsToggleEnabled,
  }: {
    title: string;
    content: HTMLElement[];
    unitsToggleEnabled: boolean;
  }): HTMLElement[] {
    const children = [
      ...(this.$search ? [this.$search.build()] : []),
      this.$forecastCard.update(title, content),
      ...(unitsToggleEnabled && this.$unitsToggle
        ? [this.$unitsToggle.build()]
        : []),
    ];

    return children;
  }

  updateForecast(forecast: WeatherData, unitSystem: UnitSystem): void {
    this.$weatherContent = this.buildWeatherDataContent(forecast, unitSystem);

    const children = this.buildViewChildren({
      title: forecast.name,
      content: this.$weatherContent,
      unitsToggleEnabled: true,
    });

    this.$view.replaceChildren(...children);
    this.update();
  }

  notFound(): void {
    const $notFoundMsg: HTMLParagraphElement = document.createElement('p');
    $notFoundMsg.textContent =
      'We were unable to find your city. Please try again.';

    const children = this.buildViewChildren({
      title: 'City not found',
      content: [$notFoundMsg],
      unitsToggleEnabled: false,
    });

    this.$view.replaceChildren(...children);
    this.update();
  }

  tryAgainLater(): void {
    const $tryAgainLater: HTMLParagraphElement = document.createElement('p');
    $tryAgainLater.textContent = 'Something went wrong. Try again later.';

    const children = this.buildViewChildren({
      title: 'Sorry',
      content: [$tryAgainLater],
      unitsToggleEnabled: false,
    });

    this.$view.replaceChildren(...children);
    this.update();
  }
}

export default ForecastView;
