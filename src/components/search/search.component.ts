import './search.style.css';

class Search {
  $search: HTMLInputElement = document.createElement('input');

  constructor() {
    this.$search.id = 'search';
  }

  update(): HTMLInputElement {
    return this.$search;
  }
}

export default Search;
