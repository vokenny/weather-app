import WeatherService from './WeatherService';

(function Main() {
  const londonBtn = document.getElementById('londonBtn');

  londonBtn?.addEventListener('click', async () => {
    const data = await WeatherService.getCurrentForecast({
      q: 'london',
    });

    console.log(data);
  });
})();
