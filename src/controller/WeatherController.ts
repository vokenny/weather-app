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

  async updateForecast(location?: string) {
    const args: QueryParams = !location
      ? this.defaultArgs
      : {
          ...this.defaultArgs,
          q: location,
        };

    const newForecastData: any = await WeatherService.getNewForecast(args);
    this.weatherDataModel.setNewForecast(newForecastData);
  }
}

export default WeatherController;
