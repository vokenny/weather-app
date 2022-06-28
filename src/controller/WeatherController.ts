import WeatherDataModel from '../model/WeatherDataModel';
import WeatherService from '../services/WeatherService';
import { QueryParams } from '../types';
import ForecastView from '../views/ForecastView/ForecastView';

class WeatherController {
  private weatherDataModel;
  private forecastView: ForecastView;

  constructor(dataModel: WeatherDataModel, forecastView: ForecastView) {
    this.weatherDataModel = dataModel;
    this.forecastView = forecastView;
    this.updateForecast();
  }

  async updateForecast({ q, units }: QueryParams = {}): Promise<void> {
    const wdmQueryParams: QueryParams = {
      q: this.weatherDataModel.location,
      units: this.weatherDataModel.unitSystem,
    };

    // If searching for the same city, do nothing
    if (!units && q === wdmQueryParams.q) return;

    let args: QueryParams;

    if (!q && !units) {
      args = wdmQueryParams; // Use initialised values in the DM
    } else {
      args = !q ? { ...wdmQueryParams, units } : { ...wdmQueryParams, q }; // Use given values
    }

    this.forecastView.loading();
    const response: Response = await WeatherService.getNewForecast(args);

    switch (true) {
      case response.status === 200: {
        const rawForecast: any = await response.json();

        units
          ? this.weatherDataModel.setNewForecast(rawForecast, units)
          : this.weatherDataModel.setNewForecast(rawForecast);

        break;
      }

      case response.status === 404: {
        console.info('[INFO]', 'City not found');
        this.weatherDataModel.noForecast();
        this.forecastView.notFound();
        break;
      }

      default:
        console.error('[ERROR]', `${response.status} ${response.statusText}`);
        this.weatherDataModel.noForecast();
        this.forecastView.tryAgainLater();
    }
  }
}

export default WeatherController;
