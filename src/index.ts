import WeatherService from './WeatherService';

(function Main() {
  const londonBtn = document.getElementById('londonBtn');

  londonBtn?.addEventListener('click', async () => {
    const data = await WeatherService.getCurrentForecast();
    console.log(data);
  });
})();
