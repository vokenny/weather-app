import { Unit } from '../constants/Unit';
import WeatherDataModel from '../model/WeatherDataModel';
import WeatherService from '../services/WeatherService';
import { QueryParams } from '../types';

class WeatherController {
  private weatherDataModel;
  private defaultArgs: QueryParams = { q: 'London', units: Unit.Metric };

  constructor(dataModel: WeatherDataModel) {
    this.weatherDataModel = dataModel;
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
