import WeatherController from '../../controller/WeatherController';
import './search.style.css';

class Search {
  private ctrl: WeatherController;
  private $search: HTMLFormElement = document.createElement('form');
  private $lookup: HTMLInputElement = document.createElement('input');
  private $lookupBtn: HTMLButtonElement = document.createElement('button');

  constructor(ctrl: WeatherController) {
    this.ctrl = ctrl;

    this.$lookup.id = 'lookup';
    this.$lookup.placeholder = 'Forecast lookup';

    this.$lookupBtn.id = 'lookup-btn';
    this.$lookupBtn.className = 'glass';
    this.$lookupBtn.textContent = 'Search';

    this.$search.id = 'forecast-search';
    this.$search.replaceChildren(this.$lookup, this.$lookupBtn);

    this.setEventListeners();
  }

  private clearInput(): void {
    this.$lookup.value = '';
  }

  private lookupHandler(evt: SubmitEvent): void {
    evt.preventDefault();

    const $lookup: HTMLInputElement = (evt.target as HTMLElement).querySelector(
      `#${this.$lookup.id}`
    ) as HTMLInputElement;
    const value = $lookup.value;

    const location: string = value.trim().toLowerCase();
    if (location !== '') this.ctrl.updateForecast({ q: location });

    this.clearInput();
  }

  private setEventListeners(): void {
    this.$search.addEventListener('submit', this.lookupHandler.bind(this));
  }

  build(): HTMLFormElement {
    return this.$search;
  }
}

export default Search;
