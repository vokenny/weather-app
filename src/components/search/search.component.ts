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

  private setEventListeners(): void {
    this.$search.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(
        (evt.target as HTMLElement).querySelector(`#${this.$lookup.id}`)
      );
    });
  }

  update(): HTMLFormElement {
    return this.$search;
  }
}

export default Search;
