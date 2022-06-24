import { Unit } from '../constants/Unit';
import WeatherDataModel from '../model/WeatherDataModel';
import WeatherService from '../services/WeatherService';
import { QueryParams } from '../types';
import ForecastView from '../views/ForecastView/ForecastView';

class WeatherController {
  private weatherDataModel;
  private forecastView: ForecastView;
  private defaultArgs: QueryParams = { q: 'London', units: Unit.Metric };

  constructor(dataModel: WeatherDataModel, forecastView: ForecastView) {
    this.weatherDataModel = dataModel;
    this.forecastView = forecastView;
    this.updateForecast();
  }

  async updateForecast(location?: string): Promise<void> {
    const args: QueryParams = !location
      ? this.defaultArgs
      : {
          ...this.defaultArgs,
          q: location,
        };

    /**
     * TODO: Handle *unexpected* failed network requests
     * 1. Needs to gracefully fail by catching the error and printing out to console
     * 2. Display a try again later message on the UI
     *
     * TODO: Handle *expected* fails like the location cannot be found, propagate it to show an
     * 'Unknown location' message on the UI
     */
    const newForecastData: any = await WeatherService.getNewForecast(args);
    this.forecastView.loading();
    this.weatherDataModel.setNewForecast(newForecastData);
  }
}

export default WeatherController;
