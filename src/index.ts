import WeatherController from './controller/WeatherController';
import WeatherDataModel from './model/WeatherDataModel';
import ForecastView from './views/ForecastView/ForecastView';
import './style.css';

(async function Main() {
  const forecastView = await new ForecastView();
  const weatherDM = await new WeatherDataModel(forecastView);
  const weatherCtrl = await new WeatherController(weatherDM);
})();
