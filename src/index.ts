import Search from './components/search/search.component';
import WeatherCard from './components/weatherCard/weatherCard.component';
import './style.css';

(async function Main() {
  const $main: HTMLElement = document.getElementById(
    'main-content'
  ) as HTMLElement;

  const $search: HTMLInputElement = Search();
  const $weatherCard: HTMLDivElement = await WeatherCard();

  $main.append($search, $weatherCard);
})();
