import './card.style.css';

export default function Card(title: string, content: any): HTMLDivElement {
  const $card: HTMLDivElement = document.createElement('div');
  $card.classList.add('card');

  const $heading = document.createElement('h1');
  $heading.textContent = title;

  $card.append($heading, content);

  return $card;
}
