import WeatherCard from './components/weatherCard/weatherCard.component';
import './style.css';

(async function Main() {
  const main: HTMLElement = document.getElementById(
    'main-content'
  ) as HTMLElement;

  const weatherCard: HTMLDivElement = await WeatherCard();

  main.appendChild(weatherCard);
})();
