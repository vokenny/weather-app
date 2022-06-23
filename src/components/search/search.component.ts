import './search.style.css';

class Search {
  private $search: HTMLFormElement = document.createElement('form');
  private $lookup: HTMLInputElement = document.createElement('input');
  private $lookupBtn: HTMLButtonElement = document.createElement('button');

  constructor() {
    this.$lookup.id = 'lookup';
    this.$lookup.placeholder = 'Forecast lookup';

    this.$lookupBtn.id = 'lookup-btn';
    this.$lookupBtn.className = 'glass';
    this.$lookupBtn.textContent = 'Search';

    this.$search.id = 'forecast-search';
    this.$search.replaceChildren(this.$lookup, this.$lookupBtn);
  }

  update(): HTMLFormElement {
    return this.$search;
  }
}

export default Search;
