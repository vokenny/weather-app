import './search.style.css';

export default function Search(): HTMLInputElement {
  const $search: HTMLInputElement = document.createElement('input');
  $search.classList.add('search');

  return $search;
}
