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

    let args: QueryParams;

    if (!q && !units) {
      args = wdmQueryParams;
    } else {
      args = !q ? { ...wdmQueryParams, units } : { ...wdmQueryParams, q };
    }

    /**
     * TODO: Handle *unexpected* failed network requests
     * 1. Needs to gracefully fail by catching the error and printing out to console
     * 2. Display a try again later message on the UI
     *
     * TODO: Handle *expected* fails like the location cannot be found, propagate it to show an
     * 'Unknown location' message on the UI
     */
    const response: Response = await WeatherService.getNewForecast(args);
    const rawForecast: any = await response.json();

    this.forecastView.loading();

    units
      ? this.weatherDataModel.setNewForecast(rawForecast, units)
      : this.weatherDataModel.setNewForecast(rawForecast);
  }
}

export default WeatherController;
