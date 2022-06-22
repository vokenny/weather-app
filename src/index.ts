import WeatherService from './WeatherService';
import './style.css';
import Card from './components/card/card.component';

(function Main() {
  const main = document.getElementById('main-content') as HTMLElement;
  const londonBtn = document.getElementById('londonBtn');

  londonBtn?.addEventListener('click', async () => {
    const data = await WeatherService.getCurrentForecast();
    console.log(data);
  });

  const weatherCard = Card();
  main.appendChild(weatherCard);
})();
